//@ts-nocheck
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./ImageWithFallBack"
import { Star, Quote } from "lucide-react"

export function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Active Influencers", color: "text-purple-600" },
    { value: "500+", label: "Happy Brands", color: "text-pink-600" },
    { value: "1M+", label: "Successful Campaigns", color: "text-blue-600" },
    { value: "95%", label: "Client Satisfaction", color: "text-green-600" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      content: "InfluenceHub helped us find the perfect influencers for our product launch. The ROI exceeded our expectations by 300%.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc1Nzk0MzA3MHww&ixlib=rb-4.1.0&q=80&w=150",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Founder, StartupXYZ",
      content: "The AI insights are game-changing. We've been able to optimize our campaigns in real-time and see immediate improvements.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NTc5NDMwNzB8MA&ixlib=rb-4.1.0&q=80&w=150",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Brand Manager, FashionCo",
      content: "Finding authentic influencers has never been easier. The platform's matching algorithm is incredibly accurate.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTc5NDMwNzB8MA&ixlib=rb-4.1.0&q=80&w=150",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about their experience with InfluenceHub
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <Quote className="h-8 w-8 text-purple-500 opacity-50" />
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}