import { motion } from "framer-motion";
import { ExternalLink, Users, PlayCircle } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden bg-secondary border border-white/5 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
          <a
            href={project.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-white text-background font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105"
          >
            <PlayCircle className="w-5 h-5" />
            Play Now
          </a>
        </div>
      </div>

      <div className="p-6 relative z-30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold font-heading text-white group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.isFeatured && (
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold bg-accent/20 text-accent border border-accent/20">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-white/60">
          {project.activePlayers && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              <span>{project.activePlayers} Playing</span>
            </div>
          )}
          {project.playSessions && (
            <div className="flex items-center gap-1.5">
              <PlayCircle className="w-4 h-4 text-accent" />
              <span>{project.playSessions} Visits</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
