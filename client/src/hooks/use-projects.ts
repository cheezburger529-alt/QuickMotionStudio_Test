import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: [api.projects.get.path, id],
    queryFn: async () => {
      // Note: We manually construct the URL here since buildUrl helper is on server/shared side
      // In a real app we'd import buildUrl from shared, but for now template consistency:
      const res = await fetch(api.projects.get.path.replace(':id', id.toString()), { 
        credentials: "include" 
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch project");
      return api.projects.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
