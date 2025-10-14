//@ts-nocheck

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { 
  Users,  
  BarChart3, 
  Sparkles, 
  Globe, 
  Heart, 
  TrendingUp,
  Shield,
  Zap,
  Award
} from "lucide-react"
import { useNavigate } from "react-router-dom";

export function AboutSection() {
  const navigate = useNavigate();
  const values = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description: "We believe in genuine partnerships that create meaningful relationships between brands and creators."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Results",
      description: "Our AI-powered platform provides actionable insights to maximize campaign performance and ROI."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Built on a foundation of trust with transparent pricing, secure payments, and verified profiles."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with influencers and brands worldwide, breaking geographical barriers in digital marketing."
    }
  ]

  const teamStats = [
    { label: "Years of Experience", value: "8+" },
    { label: "Team Members", value: "50+" },
    { label: "Countries Served", value: "120+" },
    { label: "Success Stories", value: "10K+" }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300 dark:border-purple-800 mb-4">
            About InfluenceHub
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Revolutionizing Influencer Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to bridge the gap between brands and creators, making influencer marketing 
            more accessible, transparent, and effective through cutting-edge AI technology.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Story</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2016, InfluenceHub began as a simple idea: what if we could use technology 
                to make influencer marketing as easy as a few clicks? Our founders, experienced marketers 
                and tech entrepreneurs, witnessed the struggles brands faced in finding the right creators 
                and the challenges influencers encountered in monetizing their content.
              </p>
              <p>
                Today, we've evolved into a comprehensive platform that serves thousands of brands and 
                creators worldwide. Our AI-powered matching system has facilitated over 50,000 successful 
                collaborations, generating millions in revenue for our community.
              </p>
              <p>
                We're not just a platform – we're a community of creators, brands, and innovators working 
                together to shape the future of digital marketing.
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Button 
                onClick={()=>navigate("/auth?type=influencer")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Join Our Community
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {teamStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 mr-4" />
              <h3 className="text-3xl font-bold">Powered by Advanced AI</h3>
            </div>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Our proprietary AI algorithms analyze millions of data points to ensure perfect brand-creator matches, 
              predict campaign performance, and optimize results in real-time. Experience the future of 
              influencer marketing today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Zap className="h-8 w-8 mb-3 opacity-80" />
                <div className="font-semibold mb-1">Smart Matching</div>
                <div className="text-sm opacity-75">AI-powered influencer discovery</div>
              </div>
              <div className="flex flex-col items-center">
                <BarChart3 className="h-8 w-8 mb-3 opacity-80" />
                <div className="font-semibold mb-1">Predictive Analytics</div>
                <div className="text-sm opacity-75">Forecast campaign performance</div>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 mb-3 opacity-80" />
                <div className="font-semibold mb-1">Quality Assurance</div>
                <div className="text-sm opacity-75">Automated fraud detection</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of brands and creators who are already experiencing the future of influencer marketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={()=>navigate("/auth?type=brand")}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              Start Your Journey
            </Button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Free to join • No setup fees • Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}