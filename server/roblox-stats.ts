import { storage } from "./storage";

const GAMES = [
  { id: 5, universeId: 8251982469, name: "Dance or Pass" },
  { id: 6, universeId: 9032091894, name: "Keyboard ASMR Troll Tower" },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K+`;
  }
  return num.toString();
};

async function fetchRobloxStats(universeId: number, gameName: string) {
  try {
    console.log(`Fetching stats for ${gameName} (Universe ID: ${universeId})...`);

    const url = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch ${gameName}: Status ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    const game = data.data?.[0];
    if (!game) {
      console.error(`No game data found for ${gameName}`);
      return null;
    }

    const stats = {
      activePlayers: formatNumber(game.playing || 0),
      playSessions: formatNumber(game.visits || 0),
    };

    console.log(
      `✓ ${gameName}: ${stats.activePlayers} playing, ${stats.playSessions} visits`
    );
    return stats;
  } catch (error) {
    console.error(`Error fetching stats for ${gameName}:`, error);
    return null;
  }
}

export async function updateGameStats() {
  console.log("\n=== Running Game Stats Update ===");
  const timestamp = new Date().toISOString();
  console.log(`Timestamp: ${timestamp}`);

  for (const game of GAMES) {
    try {
      const stats = await fetchRobloxStats(game.universeId, game.name);
      if (stats) {
        await storage.updateProjectStats(game.id, {
          activePlayers: stats.activePlayers,
          playSessions: stats.playSessions,
        });
        console.log(`📊 Updated database for ${game.name}`);
      }
    } catch (error) {
      console.error(`Failed to update ${game.name}:`, error);
    }
  }
  console.log("=== Update Complete ===\n");
}

export function startStatsUpdater() {
  console.log("Starting Roblox stats updater...");
  updateGameStats();
  setInterval(updateGameStats, 10 * 1000);
}
