import { useQuery } from "@tanstack/react-query";

interface GameStats {
  activePlayers: string;
  playSessions: string;
}

const GAME_IDS = {
  danceOrPass: 135602053837295,
  keyboardAsmr: 94255092395831,
};

async function fetchGameStats(gameId: number): Promise<GameStats> {
  try {
    const response = await fetch(`/api/roblox-stats/${gameId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    
    const data = await response.json();
    return {
      activePlayers: data.activePlayers || "N/A",
      playSessions: data.playSessions || "N/A",
    };
  } catch (error) {
    console.error("Error fetching Roblox stats:", error);
    return {
      activePlayers: "N/A",
      playSessions: "N/A",
    };
  }
}

export function useRobloxStats(gameId: number) {
  return useQuery({
    queryKey: ["roblox-stats", gameId],
    queryFn: () => fetchGameStats(gameId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

export { GAME_IDS };
