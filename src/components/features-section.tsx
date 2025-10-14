
//@ts-nocheck
import { ImageWithFallback } from "./ImageWithFallBack"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

import { Search, Brain, TrendingUp, Zap, Shield, BarChart3 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Influencer Discovery",
      description: "Find the perfect influencers for your brand using advanced filters and AI-powered recommendations based on audience fit and engagement quality.",
      icon: Search,
      image: "https://images.unsplash.com/photo-1646953372576-b33eea3c4047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZsdWVuY2VyJTIwbWFya2V0aW5nJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzU3OTQzMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Insights",
      description: "Get intelligent recommendations and predictions powered by machine learning to optimize your influencer marketing strategy and maximize reach.",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1Nzg2MjI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Campaign ROI",
      description: "Track and measure your campaign performance with detailed analytics, ROI calculations, and comprehensive reporting tools.",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1744854185466-cf95c3064cec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMHJldmVudWV8ZW58MXx8fHwxNzU3OTQzMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  const additionalFeatures = [
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor campaign performance as it happens"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified influencers with fraud protection"
    },
    {
      icon: BarChart3,
      title: "Advanced Reporting",
      description: "Comprehensive insights and data visualization"
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run successful influencer campaigns, powered by AI and backed by data.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}