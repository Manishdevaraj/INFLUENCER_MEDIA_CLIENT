//@ts-nocheck
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area,
  
} from "recharts"
import { 
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Share,
  
  Sparkles,
  Target,
  Globe,
  Award,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { useNavigate } from "react-router-dom"

import {useFirebase} from "../Service/Firebase.context.jsx"

export function InfluencerReports() {
  const { theme } = useTheme()
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days')
  // const [date, setDate] = useState<Date>()
  const navigate=useNavigate();
  const {dbUser}=useFirebase();

  // Extended mock data for comprehensive reports
  const weeklyData = [
    { date: 'Jul 1', followers: 58200, engagement: 5.2, posts: 7, reach: 45600, likes: 2840, comments: 187, shares: 92 },
    { date: 'Jul 8', followers: 59100, engagement: 5.5, posts: 6, reach: 48300, likes: 3160, comments: 203, shares: 108 },
    { date: 'Jul 15', followers: 60400, engagement: 5.8, posts: 8, reach: 52100, likes: 3520, comments: 225, shares: 125 },
    { date: 'Jul 22', followers: 61800, engagement: 6.1, posts: 5, reach: 48900, likes: 3280, comments: 198, shares: 115 },
    { date: 'Jul 29', followers: 63500, engagement: 6.3, posts: 7, reach: 55200, likes: 3840, comments: 267, shares: 145 },
    { date: 'Aug 5', followers: 64200, engagement: 5.9, posts: 6, reach: 51800, likes: 3590, comments: 234, shares: 132 },
    { date: 'Aug 12', followers: 65200, engagement: 6.0, posts: 8, reach: 56700, likes: 3920, comments: 278, shares: 158 }
  ]

  const monthlyGrowth = [
    { month: 'Jan', followers: 45000, posts: 28, totalLikes: 98400, totalComments: 5200, totalShares: 2100 },
    { month: 'Feb', followers: 47000, posts: 26, totalLikes: 105600, totalComments: 5890, totalShares: 2340 },
    { month: 'Mar', followers: 51000, posts: 31, totalLikes: 128900, totalComments: 6750, totalShares: 2890 },
    { month: 'Apr', followers: 54000, posts: 29, totalLikes: 142300, totalComments: 7200, totalShares: 3150 },
    { month: 'May', followers: 58000, posts: 32, totalLikes: 165400, totalComments: 8100, totalShares: 3680 },
    { month: 'Jun', followers: 62000, posts: 30, totalLikes: 178900, totalComments: 8950, totalShares: 4100 },
    { month: 'Jul', followers: 65200, posts: 33, totalLikes: 195600, totalComments: 9800, totalShares: 4590 }
  ]

  const genderData = [
    { name: 'Female', value: 68, color: '#ec4899' },
    { name: 'Male', value: 30, color: '#8b5cf6' },
    { name: 'Other', value: 2, color: '#06b6d4' }
  ]

  const ageData = [
    { name: '18-24', value: 32, color: '#f59e0b' },
    { name: '25-34', value: 45, color: '#10b981' },
    { name: '35-44', value: 18, color: '#3b82f6' },
    { name: '45+', value: 5, color: '#ef4444' }
  ]

  const countryData = [
    { name: 'USA', value: 42, color: '#8b5cf6' },
    { name: 'Canada', value: 22, color: '#ec4899' },
    { name: 'UK', value: 16, color: '#06b6d4' },
    { name: 'Australia', value: 12, color: '#10b981' },
    { name: 'Others', value: 8, color: '#f59e0b' }
  ]

  const topPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=80&h=80&fit=crop&crop=face",
      caption: "Summer vibes with my new favorite skincare routine! ✨ #SkinCare #Summer",
      date: "Jul 29, 2024",
      likes: 15600,
      comments: 456,
      shares: 189,
      reach: 89200,
      engagement: 9.2,
      type: "Photo"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
      caption: "Behind the scenes of today's photoshoot 📸 Can't wait to share more!",
      date: "Jul 26, 2024",
      likes: 12300,
      comments: 312,
      shares: 145,
      reach: 76500,
      engagement: 8.1,
      type: "Video"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=80&h=80&fit=crop",
      caption: "Grateful for this amazing collaboration opportunity! #Blessed #Partnership",
      date: "Jul 22, 2024",
      likes: 11800,
      comments: 287,
      shares: 132,
      reach: 71200,
      engagement: 7.8,
      type: "Photo"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=80&h=80&fit=crop",
      caption: "Morning routine essentials that actually work! Swipe for details →",
      date: "Jul 19, 2024",
      likes: 10900,
      comments: 234,
      shares: 98,
      reach: 65800,
      engagement: 7.2,
      type: "Carousel"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      caption: "Throwback to last week's amazing event! Still can't believe it happened 🎉",
      date: "Jul 15, 2024",
      likes: 9800,
      comments: 198,
      shares: 87,
      reach: 58900,
      engagement: 6.8,
      type: "Photo"
    }
  ]

  const aiInsights = [
    {
      category: "Growth",
      insight: "Your follower growth rate increased by 23% this month. The beauty and lifestyle content is performing exceptionally well.",
      confidence: 92,
      trend: "up"
    },
    {
      category: "Engagement",
      insight: "Stories with behind-the-scenes content generate 35% higher engagement. Consider posting more BTS content.",
      confidence: 87,
      trend: "up"
    },
    {
      category: "Audience",
      insight: "Your audience is most active on Wednesdays and Sundays between 6-8 PM EST. Schedule important posts during these times.",
      confidence: 89,
      trend: "neutral"
    },
    {
      category: "Content",
      insight: "Video content outperforms static images by 45%. Consider increasing video content ratio to boost engagement.",
      confidence: 94,
      trend: "up"
    },
    {
      category: "Collaboration",
      insight: "Brand partnership posts have 28% higher reach. Your trust score makes you attractive for premium brand collaborations.",
      confidence: 91,
      trend: "up"
    }
  ]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const getMetricChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      icon: change > 0 ? TrendingUp : TrendingDown
    }
  }

  // Calculate current week vs previous week metrics
  const currentWeek = weeklyData[weeklyData.length - 1]
  const previousWeek = weeklyData[weeklyData.length - 2]

  const followersChange = getMetricChange(currentWeek.followers, previousWeek.followers)
  const engagementChange = getMetricChange(currentWeek.engagement, previousWeek.engagement)
  const reachChange = getMetricChange(currentWeek.reach, previousWeek.reach)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={()=>navigate(`/${dbUser.role}-dashboard`)} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Performance Reports</h1>
              <p className="text-muted-foreground">Comprehensive analytics and insights for your content</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Followers</p>
                  <p className="text-3xl font-bold">{currentWeek.followers.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {React.createElement(followersChange.icon, { 
                      className: `h-4 w-4 mr-1 ${followersChange.isPositive ? 'text-green-600' : 'text-red-600'}` 
                    })}
                    <span className={`text-sm ${followersChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {followersChange.value}% this week
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  <p className="text-3xl font-bold">{currentWeek.engagement}%</p>
                  <div className="flex items-center mt-1">
                    {React.createElement(engagementChange.icon, { 
                      className: `h-4 w-4 mr-1 ${engagementChange.isPositive ? 'text-green-600' : 'text-red-600'}` 
                    })}
                    <span className={`text-sm ${engagementChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {engagementChange.value}% this week
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Reach</p>
                  <p className="text-3xl font-bold">{currentWeek.reach.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {React.createElement(reachChange.icon, { 
                      className: `h-4 w-4 mr-1 ${reachChange.isPositive ? 'text-green-600' : 'text-red-600'}` 
                    })}
                    <span className={`text-sm ${reachChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {reachChange.value}% this week
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Posts This Week</p>
                  <p className="text-3xl font-bold">{currentWeek.posts}</p>
                  <div className="flex items-center mt-1">
                    <BarChart3 className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="text-sm text-blue-600">
                      Avg: {(weeklyData.reduce((sum, week) => sum + week.posts, 0) / weeklyData.length).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Follower Growth Trend</CardTitle>
              <CardDescription>Weekly follower count progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="followersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
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
                    dataKey="followers" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fill="url(#followersGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Engagement & Reach Trends</CardTitle>
              <CardDescription>Weekly engagement rate and reach metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <YAxis yAxisId="left" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <YAxis yAxisId="right" orientation="right" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#f9fafb' : '#111827'
                    }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                    name="Engagement %"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Reach"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5 text-purple-600" />
                <span>Gender Distribution</span>
              </CardTitle>
              <CardDescription>Audience gender breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {genderData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Age Groups</span>
              </CardTitle>
              <CardDescription>Age distribution of followers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {ageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span>Top Countries</span>
              </CardTitle>
              <CardDescription>Geographic distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {countryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm capitalize">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Posts */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-600" />
              <span>Top Performing Posts</span>
            </CardTitle>
            <CardDescription>Your highest engaging content from the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <img 
                      src={post.image} 
                      alt={`Post ${post.id}`}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium line-clamp-2 mb-1">{post.caption}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{post.date}</span>
                          <Badge variant="outline">{post.type}</Badge>
                          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300">
                            {post.engagement}% engagement
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        <span className="font-medium">{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="font-medium">{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Share className="h-4 w-4 mr-1 text-green-500" />
                        <span className="font-medium">{post.shares}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="font-medium">{post.reach.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-purple-600">{post.engagement}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>AI-Generated Insights</span>
            </CardTitle>
            <CardDescription>Personalized recommendations based on your performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-purple-600">{insight.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{insight.confidence}% confidence</span>
                      {insight.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {insight.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}