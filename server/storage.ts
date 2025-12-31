import { db } from "./db";
import {
  projects,
  messages,
  type InsertProject,
  type InsertMessage,
  type Project,
  type Message
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  seedProjects(): Promise<void>;
  updateProjectStats(id: number, stats: { activePlayers: string; playSessions: string }): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async updateProjectStats(id: number, stats: { activePlayers: string; playSessions: string }): Promise<void> {
    await db.update(projects)
      .set(stats)
      .where(eq(projects.id, id));
  }

  async seedProjects(): Promise<void> {
    const existing = await this.getProjects();
    if (existing.length === 0) {
      const games = [
        {
          universeId: 8251982469,
          placeId: 135602053837295,
          title: "Dance or Pass",
          description: "A fun rhythm game where you dance to the beat or pass to the next song!",
          gameUrl: "https://www.roblox.com/games/135602053837295/Dance-or-Pass"
        },
        {
          universeId: 9032091894,
          placeId: 94255092395831,
          title: "Keyboard ASMR Troll Tower",
          description: "Climb the tower while enjoying satisfying keyboard sounds... or getting trolled!",
          gameUrl: "https://www.roblox.com/games/94255092395831/Keyboard-ASMR-Troll-Tower"
        }
      ];

      const projectsData = games.map((game) => ({
        title: game.title,
        description: game.description,
        imageUrl: `https://www.roblox.com/Thumbs/GameThumbnail.ashx?width=420&height=420&assetId=${game.placeId}`,
        gameUrl: game.gameUrl,
        activePlayers: "Loading...",
        playSessions: "Loading...",
        isFeatured: true
      }));

      await db.insert(projects).values(projectsData);
    }
  }
}

export const storage = new DatabaseStorage();
