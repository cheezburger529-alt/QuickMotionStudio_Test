import CountUp from "react-countup";
import { motion } from "framer-motion";

interface StatProps {
  end?: number;
  suffix?: string;
  label: string;
  delay?: number;
  decimals?: number;
  displayText?: string;
}

export function StatsCounter({ end, suffix = "", label, delay = 0, decimals = 0, displayText }: StatProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
    >
      {displayText ? (
        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 tracking-tight">
          {displayText}
        </div>
      ) : (
        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 tracking-tight">
          <CountUp
            end={end || 0}
            duration={2.5}
            suffix={suffix}
            separator=","
            decimals={decimals}
            enableScrollSpy
            scrollSpyOnce
          />
        </div>
      )}
      <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{label}</p>
    </motion.div>
  );
}
