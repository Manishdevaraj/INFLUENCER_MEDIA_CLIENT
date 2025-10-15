//@ts-nocheck
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { NotificationsPanel } from "./notifications-panel"
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
  Area
} from "recharts"
import { 
  Users, 
  Heart, 
  Shield, 
  Download, 
  TrendingUp, 
  Eye, 
  MessageCircle,
  Share,
  Calendar,
  Globe,
  User,
  Sparkles,
  Link
} from "lucide-react"
import { useTheme } from "./theme-provider"

import {useFirebase} from "../Service/Firebase.context.jsx"
import { useNavigate } from "react-router-dom"

export function InfluencerDashboard() {
  const { theme } = useTheme()
  const [activeNav, setActiveNav] = useState('insights')
  const {logout,dbUser}=useFirebase();
  const navigate=useNavigate();
  // Mock data for charts
  const followersData = [
    { name: 'Jan', followers: 45000, engagement: 4.2 },
    { name: 'Feb', followers: 47000, engagement: 4.5 },
    { name: 'Mar', followers: 51000, engagement: 4.8 },
    { name: 'Apr', followers: 54000, engagement: 5.1 },
    { name: 'May', followers: 58000, engagement: 5.3 },
    { name: 'Jun', followers: 62000, engagement: 5.6 },
    { name: 'Jul', followers: 65000, engagement: 5.8 }
  ]

  const genderData = [
    { name: 'Female', value: 65, color: '#ec4899' },
    { name: 'Male', value: 32, color: '#8b5cf6' },
    { name: 'Other', value: 3, color: '#06b6d4' }
  ]

  const ageData = [
    { name: '18-24', value: 35, color: '#f59e0b' },
    { name: '25-34', value: 42, color: '#10b981' },
    { name: '35-44', value: 18, color: '#3b82f6' },
    { name: '45+', value: 5, color: '#ef4444' }
  ]

  const countryData = [
    { name: 'USA', value: 45, color: '#8b5cf6' },
    { name: 'Canada', value: 20, color: '#ec4899' },
    { name: 'UK', value: 15, color: '#06b6d4' },
    { name: 'Australia', value: 12, color: '#10b981' },
    { name: 'Others', value: 8, color: '#f59e0b' }
  ]

  const recentPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=100&h=100&fit=crop&crop=face",
      caption: "Summer vibes with my new favorite skincare routine! ✨",
      date: "2 days ago",
      likes: 12500,
      comments: 234,
      shares: 89,
      engagement: 8.2
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      caption: "Behind the scenes of today's photoshoot 📸",
      date: "4 days ago",
      likes: 9800,
      comments: 156,
      shares: 67,
      engagement: 7.5
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=100&h=100&fit=crop",
      caption: "Grateful for this amazing collaboration opportunity!",
      date: "1 week ago",
      likes: 15600,
      comments: 312,
      shares: 145,
      engagement: 9.1
    }
  ]

  const navItems = [
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'connect-accounts', label: 'Connect Accounts', icon: Link, action: () => navigate('/connect-accounts') },
    { id: 'reports', label: 'Reports', icon: Download, action: () => navigate('/influencer-reports') },
    { id: 'settings', label: 'Settings', icon: Sparkles, action: () => navigate('/settings') }
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
if(!dbUser) return <div>loading...</div>
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face" />
               <AvatarFallback>
    {dbUser?.name
      ? dbUser.name
          .split(' ')              // split by space
          .map(word => word[0])    // take first letter of each word
          .join('')
          .toUpperCase()           // make uppercase
      : 'NN'                       // fallback initials if name not available
    }
  </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{dbUser?.name}</h3>
              {/* <p className="text-sm text-muted-foreground">@sarah_lifestyle</p> */}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action()
                  } else {
                    setActiveNav(item.id)
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={()=>logout()} className="w-full">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {dbUser?.name}! 👋</h1>
              <p className="text-muted-foreground">Here's what's happening with your influence today.</p>
            </div>
            <NotificationsPanel userType="influencer" />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Followers</p>
                    <p className="text-3xl font-bold">65.2K</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +5.2% this month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    <p className="text-3xl font-bold">5.8%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +0.6% this month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trust Score</p>
                    <p className="text-3xl font-bold">92</p>
                    <div className="mt-2">
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Follower Growth Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Follower Growth Trend</CardTitle>
                <CardDescription>Your follower count over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={followersData}>
                    <defs>
                      <linearGradient id="followersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
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

            {/* Engagement Rate Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Engagement Rate Trend</CardTitle>
                <CardDescription>Your engagement rate over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={followersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
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
                      dataKey="engagement" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Demographics and Recent Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Gender Demographics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Audience Gender</CardTitle>
                <CardDescription>Gender distribution of your followers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
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

            {/* Age Demographics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Age Groups</CardTitle>
                <CardDescription>Age distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={ageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
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

            {/* Country Demographics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Geographic distribution of followers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
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
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Posts Performance</CardTitle>
                <CardDescription>Your latest posts and their engagement metrics</CardDescription>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => navigate('/influencer-reports')}
              >
                <Download className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <img 
                      src={post.image} 
                      alt={`Post ${post.id}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium mb-1">{post.caption}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300">
                          {post.engagement}% engagement
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </div>
                      <div className="flex items-center">
                        <Share className="h-4 w-4 mr-1" />
                        {post.shares}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}