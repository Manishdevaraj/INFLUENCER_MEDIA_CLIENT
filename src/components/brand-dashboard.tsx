//@ts-nocheck
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription } from "./ui/alert"
import { Checkbox } from "./ui/checkbox"
import { NotificationsPanel } from "./notifications-panel"
import { AIInsightsPanel } from "./ai-insights-panel"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Search, 
  Filter, 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Building,
  Calendar,
  Globe,
  Settings,
  BarChart3
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { useNavigate } from "react-router-dom"
import {useFirebase} from "../Service/Firebase.context.jsx"

export function BrandDashboard() {
  const { theme } = useTheme()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [nicheFilter, setNicheFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const navigate=useNavigate();
  const {logout}=useFirebase();

  // Mock data
  const campaignMetrics = [
    { name: 'Jan', reach: 1200000, engagement: 85000, roi: 320 },
    { name: 'Feb', reach: 1350000, engagement: 92000, roi: 380 },
    { name: 'Mar', reach: 1450000, engagement: 105000, roi: 420 },
    { name: 'Apr', reach: 1600000, engagement: 115000, roi: 480 },
    { name: 'May', reach: 1750000, engagement: 125000, roi: 520 },
    { name: 'Jun', reach: 1900000, engagement: 138000, roi: 580 }
  ]

  const recommendedInfluencers = [
    {
      id: '1',
      name: 'Emma Wilson',
      handle: '@emma_lifestyle',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      followers: 125000,
      engagement: 6.2,
      trustScore: 95,
      niche: 'Lifestyle',
      country: 'USA',
      audienceFit: 92,
      avgLikes: 7800,
      avgComments: 245,
      collaborationCost: 2500
    },
    {
      id: '2',
      name: 'Alex Chen',
      handle: '@alextech',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      followers: 89000,
      engagement: 7.1,
      trustScore: 88,
      niche: 'Technology',
      country: 'Canada',
      audienceFit: 89,
      avgLikes: 6300,
      avgComments: 189,
      collaborationCost: 1800
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      handle: '@sofia_beauty',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      followers: 234000,
      engagement: 5.8,
      trustScore: 92,
      niche: 'Beauty',
      country: 'Spain',
      audienceFit: 88,
      avgLikes: 13600,
      avgComments: 456,
      collaborationCost: 3200
    },
    {
      id: '4',
      name: 'James Parker',
      handle: '@jamesfit',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      followers: 156000,
      engagement: 6.5,
      trustScore: 90,
      niche: 'Fitness',
      country: 'Australia',
      audienceFit: 85,
      avgLikes: 10100,
      avgComments: 312,
      collaborationCost: 2800
    },
    {
      id: '5',
      name: 'Maya Patel',
      handle: '@maya_food',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
      followers: 98000,
      engagement: 8.2,
      trustScore: 87,
      niche: 'Food',
      country: 'UK',
      audienceFit: 91,
      avgLikes: 8040,
      avgComments: 287,
      collaborationCost: 2100
    }
  ]

  const activeCampaigns = [
    {
      id: 1,
      name: 'Summer Beauty Collection',
      status: 'active',
      influencers: 8,
      reach: 2100000,
      engagement: 156000,
      budget: 25000,
      spent: 18500,
      roi: 4.2,
      endDate: '2024-09-30'
    },
    {
      id: 2,
      name: 'Tech Product Launch',
      status: 'pending',
      influencers: 5,
      reach: 890000,
      engagement: 67000,
      budget: 15000,
      spent: 0,
      roi: 0,
      endDate: '2024-10-15'
    },
    {
      id: 3,
      name: 'Fitness Challenge',
      status: 'completed',
      influencers: 12,
      reach: 3200000,
      engagement: 245000,
      budget: 35000,
      spent: 35000,
      roi: 5.8,
      endDate: '2024-08-31'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Campaign Performance Alert',
      message: 'Summer Beauty Collection engagement is 15% below target',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      title: 'Campaign Milestone',
      message: 'Tech Product Launch reached 1M impressions',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Influencer Match',
      message: '3 new influencers match your fitness campaign criteria',
      time: '2 days ago'
    }
  ]

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'influencers', label: 'Influencers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'ai-insights', label: 'AI Insights', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => navigate('/settings') }
  ]

  const filteredInfluencers = recommendedInfluencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesNiche = nicheFilter === 'all' || influencer.niche.toLowerCase() === nicheFilter.toLowerCase()
    const matchesCountry = countryFilter === 'all' || influencer.country.toLowerCase() === countryFilter.toLowerCase()
    
    return matchesSearch && matchesNiche && matchesCountry
  })

  const handleInfluencerSelect = (influencerId: string) => {
    setSelectedInfluencers(prev => 
      prev.includes(influencerId) 
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'info': return <Bell className="h-4 w-4 text-blue-600" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">TechCorp Inc.</h3>
              <p className="text-sm text-muted-foreground">Brand Account</p>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Brand Dashboard</h1>
              <p className="text-muted-foreground">Manage your influencer campaigns and track performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationsPanel userType="brand" />
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => navigate('/campaign-creation')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>

          {/* Alerts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.slice(0, 2).map((alert) => (
                <Alert key={alert.id} className="border-l-4 border-l-purple-500">
                  {getAlertIcon(alert.type)}
                  <div className="ml-2">
                    <div className="font-medium">{alert.title}</div>
                    <AlertDescription className="text-sm">
                      {alert.message} • {alert.time}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* Campaign Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Reach</p>
                    <p className="text-3xl font-bold">3.2M</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Engagement</p>
                    <p className="text-3xl font-bold">468K</p>
                  </div>
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg ROI</p>
                    <p className="text-3xl font-bold">4.9x</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Monthly reach and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={campaignMetrics}>
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
                    <Bar dataKey="reach" fill="#8b5cf6" name="Reach" />
                    <Bar dataKey="engagement" fill="#ec4899" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>ROI Trend</CardTitle>
                <CardDescription>Return on investment over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignMetrics}>
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
                      dataKey="roi" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Influencers */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended Influencers</CardTitle>
                <CardDescription>AI-curated influencers based on your brand preferences</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search influencers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={nicheFilter} onValueChange={setNicheFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Niches</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">UK</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInfluencers.map((influencer) => (
                  <div key={influencer.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Checkbox
                      checked={selectedInfluencers.includes(influencer.id)}
                      onCheckedChange={() => handleInfluencerSelect(influencer.id)}
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={influencer.avatar} />
                      <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{influencer.name}</h4>
                        <span className="text-sm text-muted-foreground">{influencer.handle}</span>
                        <Badge variant="outline">{influencer.niche}</Badge>
                        <Badge variant="secondary">{influencer.country}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {influencer.followers.toLocaleString()} followers
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {influencer.engagement}% engagement
                        </span>
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {influencer.trustScore} trust score
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${influencer.collaborationCost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">per post</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
              {selectedInfluencers.length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedInfluencers.length} influencer(s) selected</p>
                      <p className="text-sm text-muted-foreground">
                        Total estimated cost: ${selectedInfluencers.reduce((total, id) => {
                          const influencer = recommendedInfluencers.find(i => i.id === id)
                          return total + (influencer?.collaborationCost || 0)
                        }, 0).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      onClick={() => onNavigate('campaign-creation')}
                    >
                      Start Campaign
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights Section */}
          {activeNav === 'ai-insights' ? (
            <AIInsightsPanel userType="brand" isExpanded={true} />
          ) : (
            <>
              {/* Active Campaigns */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Campaign Overview</CardTitle>
                  <CardDescription>Monitor your active and recent campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{campaign.name}</h4>
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                              <span>{campaign.influencers} influencers</span>
                              <span>{campaign.reach.toLocaleString()} reach</span>
                              <span>{campaign.engagement.toLocaleString()} engagement</span>
                              <span>Ends {campaign.endDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.roi > 0 ? `${campaign.roi}x ROI` : 'Pending'}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mini AI Insights Preview */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>AI Insights Preview</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveNav('ai-insights')}
                    >
                      View All Insights
                    </Button>
                  </CardTitle>
                  <CardDescription>Quick AI-powered recommendations for your campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIInsightsPanel userType="brand" isExpanded={false} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}