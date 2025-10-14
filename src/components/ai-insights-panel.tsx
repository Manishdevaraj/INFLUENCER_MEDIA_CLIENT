//@ts-nocheck
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"
import { 
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Brain,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Zap,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { useTheme } from "./theme-provider"

interface AIInsightsPanelProps {
  userType: 'brand' | 'influencer'
  isExpanded?: boolean
}

export function AIInsightsPanel({ userType, isExpanded = false }: AIInsightsPanelProps) {
  const { theme } = useTheme()
  const [expandedSections, setExpandedSections] = useState({
    predictions: isExpanded,
    recommendations: isExpanded,
    trends: isExpanded
  })

  // Mock AI prediction data
  const followerPrediction = [
    { week: 'Week 1', current: 65200, predicted: 66800, confidence: 85 },
    { week: 'Week 2', current: 65200, predicted: 68400, confidence: 82 },
    { week: 'Week 3', current: 65200, predicted: 70100, confidence: 78 },
    { week: 'Week 4', current: 65200, predicted: 71900, confidence: 75 }
  ]

  const engagementPrediction = [
    { week: 'Week 1', current: 6.0, predicted: 6.2, confidence: 88 },
    { week: 'Week 2', current: 6.0, predicted: 6.5, confidence: 85 },
    { week: 'Week 3', current: 6.0, predicted: 6.8, confidence: 80 },
    { week: 'Week 4', current: 6.0, predicted: 7.1, confidence: 76 }
  ]

  const audienceInterests = [
    { category: 'Beauty & Skincare', current: 45, predicted: 52, trend: 'up' },
    { category: 'Lifestyle & Wellness', current: 38, predicted: 41, trend: 'up' },
    { category: 'Fashion', current: 32, predicted: 28, trend: 'down' },
    { category: 'Travel', current: 25, predicted: 35, trend: 'up' },
    { category: 'Technology', current: 18, predicted: 15, trend: 'down' }
  ]

  const aiRecommendations = [
    {
      id: 1,
      category: 'Content Strategy',
      title: 'Increase Video Content',
      description: 'Video posts generate 45% higher engagement. Consider creating 2-3 videos per week.',
      impact: 'High',
      confidence: 92,
      timeframe: '2-4 weeks',
      metrics: { engagement: '+15%', reach: '+25%' }
    },
    {
      id: 2,
      category: 'Posting Schedule',
      title: 'Optimize Posting Times',
      description: 'Your audience is most active on Wednesday-Sunday, 6-8 PM EST. Shift your posting schedule.',
      impact: 'Medium',
      confidence: 87,
      timeframe: '1-2 weeks',
      metrics: { engagement: '+8%', impressions: '+12%' }
    },
    {
      id: 3,
      category: 'Audience Growth',
      title: 'Collaborate with Micro-Influencers',
      description: 'Partner with influencers in the 10K-50K range for cross-promotion in beauty niche.',
      impact: 'High',
      confidence: 84,
      timeframe: '4-8 weeks',
      metrics: { followers: '+18%', reach: '+35%' }
    },
    {
      id: 4,
      category: 'Brand Partnerships',
      title: 'Focus on Skincare Brands',
      description: 'Your audience shows 35% higher engagement with skincare content vs. general beauty.',
      impact: 'Medium',
      confidence: 89,
      timeframe: '2-6 weeks',
      metrics: { engagement: '+12%', conversion: '+20%' }
    }
  ]

  const trendingOpportunities = [
    {
      trend: 'Sustainable Beauty',
      growth: '+127%',
      relevance: 94,
      description: 'Eco-friendly and sustainable beauty products are trending heavily in your demographic.'
    },
    {
      trend: 'Wellness Tech',
      growth: '+89%',
      relevance: 78,
      description: 'Health and wellness technology gaining traction among your follower base.'
    },
    {
      trend: 'DIY Skincare',
      growth: '+156%',
      relevance: 91,
      description: 'Homemade and DIY skincare content showing explosive growth.'
    }
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600'
    if (confidence >= 70) return 'text-yellow-600'
    return 'text-orange-600'
  }

  if (userType === 'influencer') {
    return null // AI insights panel is only for brands as specified
  }

  return (
    <div className="space-y-6">
      {/* AI Predictions */}
      <Card className="border-0 shadow-lg">
        <Collapsible open={expandedSections.predictions} onOpenChange={() => toggleSection('predictions')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <CardTitle>AI Growth Predictions</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                    Next 4 Weeks
                  </Badge>
                  {expandedSections.predictions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              <CardDescription>
                AI-powered forecasts based on current performance trends and market analysis
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Follower Growth Prediction */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Follower Growth Forecast</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(79)}`}>79%</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={followerPrediction}>
                    <defs>
                      <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="week" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        color: theme === 'dark' ? '#f9fafb' : '#111827'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      fill="url(#followerGradient)" 
                      name="Predicted Followers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Projected Growth: +10.3% (6,700 new followers)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on current engagement patterns and seasonal trends
                  </p>
                </div>
              </div>

              {/* Engagement Prediction */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Engagement Rate Forecast</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(82)}`}>82%</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={engagementPrediction}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="week" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        color: theme === 'dark' ? '#f9fafb' : '#111827'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                      name="Predicted Engagement %"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-pink-600" />
                    <span className="text-sm font-medium">Projected Growth: +18% engagement rate improvement</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Influenced by optimized content strategy and timing
                  </p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* AI Recommendations */}
      <Card className="border-0 shadow-lg">
        <Collapsible open={expandedSections.recommendations} onOpenChange={() => toggleSection('recommendations')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-orange-600" />
                  <CardTitle>Smart Recommendations</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                    {aiRecommendations.length} insights
                  </Badge>
                  {expandedSections.recommendations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              <CardDescription>
                Personalized action items to optimize campaign performance
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <div>
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {rec.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(rec.impact)}>
                          {rec.impact} Impact
                        </Badge>
                        <span className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                          {rec.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">Timeline: {rec.timeframe}</span>
                        <div className="flex items-center space-x-2">
                          {Object.entries(rec.metrics).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Audience Interest Trends */}
      <Card className="border-0 shadow-lg">
        <Collapsible open={expandedSections.trends} onOpenChange={() => toggleSection('trends')}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <CardTitle>Audience Interest Shifts</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                    Trending Now
                  </Badge>
                  {expandedSections.trends ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
              <CardDescription>
                Emerging trends and shifting interests in your target audience
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Interest Categories */}
              <div className="space-y-4">
                <h4 className="font-medium">Category Interest Changes</h4>
                {audienceInterests.map((interest, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(interest.trend)}
                      <span className="font-medium">{interest.category}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">
                        {interest.current}% → {interest.predicted}%
                      </div>
                      <div className={`text-sm font-medium ${
                        interest.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {interest.trend === 'up' ? '+' : ''}{interest.predicted - interest.current}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Opportunities */}
              <div className="space-y-4">
                <h4 className="font-medium">Trending Opportunities</h4>
                {trendingOpportunities.map((opp, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{opp.trend}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {opp.growth}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Progress value={opp.relevance} className="w-16 h-2" />
                          <span className="text-sm text-muted-foreground">{opp.relevance}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{opp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  )
}