import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsCounter } from "@/components/StatsCounter";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Sparkles, ChevronDown } from "lucide-react";

const parseVisitCount = (str: string): number => {
  const match = str.match(/^([\d.]+)([KM]?)\+?$/);
  if (!match) return 0;
  const [, num, suffix] = match;
  const value = parseFloat(num);
  if (suffix === "K") return value * 1000;
  if (suffix === "M") return value * 1000000;
  return value;
};

const formatTotalVisits = (visits: number): string => {
  if (visits >= 1000000) {
    return `${(visits / 1000000).toFixed(1)}M+`;
  }
  if (visits >= 1000) {
    return `${(visits / 1000).toFixed(1)}K+`;
  }
  return visits.toString();
};

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  const totalVisits = projects
    ? formatTotalVisits(
        parseVisitCount(projects[0]?.playSessions || "0") +
          parseVisitCount(projects[1]?.playSessions || "0")
      )
    : "Loading...";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-accent mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Next Gen Roblox Development</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 tracking-tight leading-none">
              Move Forward with <br />
              <span className="text-gradient-accent">The Future of Roblox</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              QuickMotionStudios creates immersive, high-quality experiences that push the boundaries of the Roblox platform. Join millions of players in our worlds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#games"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-background font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
              >
                Play Our Games
                <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
              <a 
                href="https://www.roblox.com/communities/658548871/Dance-or-Pass#!/about"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                Join Dance or Pass
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCounter displayText={projects?.[0]?.activePlayers || "Loading..."} label="Dance or Pass Players" delay={0.2} />
            <StatsCounter displayText={projects?.[1]?.activePlayers || "Loading..."} label="ASMR Tower Players" delay={0.4} />
            <StatsCounter displayText={totalVisits} label="Total Visits" delay={0.6} />
          </div>
        </div>
      </section>

      <section id="games" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Experiences</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dive into our most popular worlds. From intense dance battles to relaxing ASMR towers, we create variety.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="aspect-video rounded-2xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {projects?.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>



      <Footer />
    </div>
  );
}
