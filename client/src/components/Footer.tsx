import { SiRoblox } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                <img src="/logo.png" alt="QMS" className="w-full h-full object-cover rounded" />
              </div>
              <span className="text-lg font-bold font-heading">QuickMotionStudios</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Creating the next generation of immersive Roblox experiences. 
              Pushing the boundaries of what's possible on the platform.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.roblox.com/communities/658548871/Dance-or-Pass#!/about" icon={<SiRoblox />} label="Dance or Pass" />
              <SocialLink href="https://www.roblox.com/communities/904709930/Slushy-Delight#!/about" icon={<SiRoblox />} label="Slushy Delight" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-muted-foreground hover:text-accent transition-colors">Home</a></li>
              <li><a href="/#games" className="text-muted-foreground hover:text-accent transition-colors">Experiences</a></li>
              <li><a href="https://www.roblox.com/communities/658548871/Dance-or-Pass#!/about" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">Dance or Pass</a></li>
              <li><a href="https://www.roblox.com/communities/904709930/Slushy-Delight#!/about" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">Slushy Delight</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuickMotionStudios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
