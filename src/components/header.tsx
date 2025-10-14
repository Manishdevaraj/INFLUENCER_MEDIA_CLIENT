//@ts-nocheck
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useNavigate } from "react-router-dom";


export function Header() {
  const { theme, toggleTheme } = useTheme()
  const navigate=useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <span className="font-bold text-xl">InfluenceHub</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="outline" onClick={()=>navigate('/auth?type=influencer')}>Login</Button>
          <Button onClick={()=>navigate('/auth')}>Get Started</Button>
        </div>
      </div>
    </header>
  )
}