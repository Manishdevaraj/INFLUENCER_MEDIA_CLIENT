//@ts-nocheck

import { Button } from "./ui/button"
import { ImageWithFallback } from "./ImageWithFallBack"
import { ArrowRight, Users, Target } from "lucide-react"
import {useNavigate} from "react-router-dom"


export function HeroSection() {
  const navigate=useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-background dark:to-pink-900/20 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover Top Influencers & Grow Your Brand
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with the perfect influencers for your brand using AI-powered matching and comprehensive analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={()=>{navigate("/auth?type=brand")}}
              >
                <Target className="mr-2 h-5 w-5" />
                Sign Up as Brand
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                onClick={()=>navigate('/auth?type=influencer')}
              >
                <Users className="mr-2 h-5 w-5" />
                Sign Up as Influencer
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-muted-foreground">Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1M+</div>
                <div className="text-sm text-muted-foreground">Campaigns</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1646953372576-b33eea3c4047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZsdWVuY2VyJTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzU3OTQzMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Influencer marketing platform"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Live Campaign</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border">
              <div className="text-sm font-medium text-purple-600">+23% ROI</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}