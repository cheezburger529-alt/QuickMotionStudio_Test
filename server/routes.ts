import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { startStatsUpdater } from "./roblox-stats";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get("/api/roblox-stats/:gameId", async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const response = await fetch(
        `https://games.roblox.com/v1/games/details?placeIds=${gameId}`
      );
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch from Roblox" });
      }

      const data = await response.json();
      const game = data.data?.[0];

      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }

      const formatNumber = (num: number): string => {
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(1)}M+`;
        }
        if (num >= 1000) {
          return `${(num / 1000).toFixed(1)}K+`;
        }
        return num.toString();
      };

      res.json({
        activePlayers: formatNumber(game.playerCount || 0),
        playSessions: formatNumber(game.visits || 0),
      });
    } catch (error) {
      console.error("Error fetching Roblox stats:", error);
      res.status(500).json({ 
        activePlayers: "N/A",
        playSessions: "N/A",
      });
    }
  });

  await storage.seedProjects();
  startStatsUpdater();

  return httpServer;
}
