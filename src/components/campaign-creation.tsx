//@ts-nocheck
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Checkbox } from "./ui/checkbox"
import { Textarea } from "./ui/textarea"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription } from "./ui/alert"
import { 
  ArrowLeft,
  Target,
  Users,
  DollarSign,
  Calendar,
  Globe,
  Filter,
  Sparkles,
  Star,
  Heart,
  Eye,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  Zap
} from "lucide-react"

interface CampaignCreationProps {
  onBack: () => void
}

export function CampaignCreation({ onBack }: CampaignCreationProps) {
  const [step, setStep] = useState(1)
  const [isMatching, setIsMatching] = useState(false)
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])
  
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    budget: [5000],
    duration: 30,
    targetAge: [18, 35],
    targetGender: 'all',
    targetCountries: ['usa'],
    niche: '',
    campaignType: 'awareness'
  })

  // Mock AI-matched influencers data
  const matchedInfluencers = [
    {
      id: '1',
      name: 'Emma Wilson',
      handle: '@emma_lifestyle',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      followers: 125000,
      engagement: 6.2,
      trustScore: 95,
      audienceFit: 94,
      niche: 'Lifestyle',
      country: 'USA',
      avgLikes: 7800,
      avgComments: 245,
      estimatedReach: 78000,
      collaborationCost: 2500,
      aiScore: 96,
      demographics: {
        age: { '18-24': 35, '25-34': 45, '35-44': 15, '45+': 5 },
        gender: { female: 68, male: 30, other: 2 },
        countries: { usa: 65, canada: 20, uk: 10, other: 5 }
      }
    },
    {
      id: '2',
      name: 'Sofia Rodriguez',
      handle: '@sofia_beauty',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      followers: 234000,
      engagement: 5.8,
      trustScore: 92,
      audienceFit: 89,
      niche: 'Beauty',
      country: 'Spain',
      avgLikes: 13600,
      avgComments: 456,
      estimatedReach: 135000,
      collaborationCost: 3200,
      aiScore: 93,
      demographics: {
        age: { '18-24': 42, '25-34': 38, '35-44': 15, '45+': 5 },
        gender: { female: 78, male: 20, other: 2 },
        countries: { spain: 45, usa: 25, mexico: 15, other: 15 }
      }
    },
    {
      id: '3',
      name: 'Maya Patel',
      handle: '@maya_food',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
      followers: 98000,
      engagement: 8.2,
      trustScore: 87,
      audienceFit: 91,
      niche: 'Food',
      country: 'UK',
      avgLikes: 8040,
      avgComments: 287,
      estimatedReach: 80300,
      collaborationCost: 2100,
      aiScore: 90,
      demographics: {
        age: { '18-24': 28, '25-34': 48, '35-44': 18, '45+': 6 },
        gender: { female: 62, male: 35, other: 3 },
        countries: { uk: 55, usa: 25, australia: 12, other: 8 }
      }
    },
    {
      id: '4',
      name: 'Alex Chen',
      handle: '@alextech',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      followers: 89000,
      engagement: 7.1,
      trustScore: 88,
      audienceFit: 86,
      niche: 'Technology',
      country: 'Canada',
      avgLikes: 6300,
      avgComments: 189,
      estimatedReach: 63200,
      collaborationCost: 1800,
      aiScore: 87,
      demographics: {
        age: { '18-24': 32, '25-34': 45, '35-44': 18, '45+': 5 },
        gender: { female: 38, male: 60, other: 2 },
        countries: { canada: 50, usa: 30, uk: 12, other: 8 }
      }
    }
  ]

  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }))
  }

  const handleFindMatches = () => {
    setIsMatching(true)
    setTimeout(() => {
      setIsMatching(false)
      setStep(2)
    }, 3000)
  }

  const handleInfluencerToggle = (influencerId: string) => {
    setSelectedInfluencers(prev =>
      prev.includes(influencerId)
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    )
  }

  const getTotalEstimatedCost = () => {
    return selectedInfluencers.reduce((total, id) => {
      const influencer = matchedInfluencers.find(inf => inf.id === id)
      return total + (influencer?.collaborationCost || 0)
    }, 0)
  }

  const getTotalEstimatedReach = () => {
    return selectedInfluencers.reduce((total, id) => {
      const influencer = matchedInfluencers.find(inf => inf.id === id)
      return total + (influencer?.estimatedReach || 0)
    }, 0)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    if (score >= 80) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Campaign</h1>
              <p className="text-muted-foreground">Set up your campaign and find the perfect influencers</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm">Campaign Details</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm">Select Influencers</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          /* Campaign Setup Form */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Campaign Details */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span>Campaign Information</span>
                  </CardTitle>
                  <CardDescription>Basic details about your campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      placeholder="Summer Product Launch"
                      value={campaignData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Campaign Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your campaign goals and key messaging..."
                      value={campaignData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Campaign Type</Label>
                    <Select value={campaignData.campaignType} onValueChange={(value) => handleInputChange('campaignType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                        <SelectItem value="reach">Reach</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Niche</Label>
                    <Select value={campaignData.niche} onValueChange={(value) => handleInputChange('niche', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign niche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fitness">Fitness & Health</SelectItem>
                        <SelectItem value="food">Food & Travel</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Budget & Duration</span>
                  </CardTitle>
                  <CardDescription>Set your campaign budget and timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Budget: ${campaignData.budget[0].toLocaleString()}</Label>
                    <Slider
                      value={campaignData.budget}
                      onValueChange={(value) => handleInputChange('budget', value)}
                      max={50000}
                      min={1000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$1,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Campaign Duration: {campaignData.duration} days</Label>
                    <Slider
                      value={[campaignData.duration]}
                      onValueChange={(value) => handleInputChange('duration', value[0])}
                      max={365}
                      min={7}
                      step={7}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>7 days</span>
                      <span>365 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Target Audience */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Target Audience</span>
                  </CardTitle>
                  <CardDescription>Define your ideal audience demographics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Age Range: {campaignData.targetAge[0]} - {campaignData.targetAge[1]} years</Label>
                    <Slider
                      value={campaignData.targetAge}
                      onValueChange={(value) => handleInputChange('targetAge', value)}
                      max={65}
                      min={13}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>13</span>
                      <span>65+</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={campaignData.targetGender} onValueChange={(value) => handleInputChange('targetGender', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Genders</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Countries</Label>
                    <Select value={campaignData.targetCountries[0]} onValueChange={(value) => handleInputChange('targetCountries', [value])}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="spain">Spain</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>AI Matching Preview</span>
                  </CardTitle>
                  <CardDescription>See how AI will match influencers to your campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-medium mb-2">Matching Criteria</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Audience Fit:</span>
                        <span className="font-medium">85%+ match</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trust Score:</span>
                        <span className="font-medium">80+ minimum</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement Rate:</span>
                        <span className="font-medium">5%+ average</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Budget Compatibility:</span>
                        <span className="font-medium">Within range</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleFindMatches}
                    disabled={!campaignData.name || !campaignData.niche || isMatching}
                  >
                    {isMatching ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Finding Perfect Matches...</span>
                      </div>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Find AI Matches
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Influencer Selection */
          <div className="space-y-6">
            {/* Selection Summary */}
            {selectedInfluencers.length > 0 && (
              <Alert className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-purple-700 dark:text-purple-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>{selectedInfluencers.length} influencer(s) selected</strong> • 
                      Estimated reach: {getTotalEstimatedReach().toLocaleString()} • 
                      Total cost: ${getTotalEstimatedCost().toLocaleString()}
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Launch Campaign
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* AI Matching Results */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>AI-Matched Influencers</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    {matchedInfluencers.length} matches found
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Influencers ranked by AI compatibility score based on your campaign criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchedInfluencers.map((influencer, index) => (
                    <div key={influencer.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={selectedInfluencers.includes(influencer.id)}
                          onCheckedChange={() => handleInfluencerToggle(influencer.id)}
                          className="mt-2"
                        />
                        
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={influencer.avatar} />
                          <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{influencer.name}</h3>
                                <span className="text-muted-foreground">{influencer.handle}</span>
                                <Badge variant="outline">{influencer.niche}</Badge>
                                <Badge className={getScoreBadgeColor(influencer.aiScore)}>
                                  <Zap className="h-3 w-3 mr-1" />
                                  AI Score: {influencer.aiScore}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {influencer.followers.toLocaleString()} followers
                                </span>
                                <span className="flex items-center">
                                  <Heart className="h-4 w-4 mr-1" />
                                  {influencer.engagement}% engagement
                                </span>
                                <span className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {influencer.estimatedReach.toLocaleString()} estimated reach
                                </span>
                                <span className="flex items-center">
                                  <Globe className="h-4 w-4 mr-1" />
                                  {influencer.country}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-lg">${influencer.collaborationCost.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">per post</div>
                            </div>
                          </div>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center mb-1">
                                <Star className={`h-4 w-4 mr-1 ${getScoreColor(influencer.trustScore)}`} />
                                <span className={`font-semibold ${getScoreColor(influencer.trustScore)}`}>
                                  {influencer.trustScore}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">Trust Score</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center mb-1">
                                <Target className={`h-4 w-4 mr-1 ${getScoreColor(influencer.audienceFit)}`} />
                                <span className={`font-semibold ${getScoreColor(influencer.audienceFit)}`}>
                                  {influencer.audienceFit}%
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">Audience Fit</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center justify-center mb-1">
                                <TrendingUp className={`h-4 w-4 mr-1 ${getScoreColor(influencer.engagement * 10)}`} />
                                <span className={`font-semibold ${getScoreColor(influencer.engagement * 10)}`}>
                                  {influencer.engagement}%
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">Engagement</div>
                            </div>
                          </div>

                          {/* Demographics Preview */}
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-medium text-sm mb-2 text-blue-800 dark:text-blue-300">Audience Demographics</h4>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <div className="text-muted-foreground mb-1">Age Groups</div>
                                <div className="space-y-1">
                                  {Object.entries(influencer.demographics.age).slice(0, 2).map(([age, percent]) => (
                                    <div key={age} className="flex justify-between">
                                      <span>{age}:</span>
                                      <span className="font-medium">{percent}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Gender</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Female:</span>
                                    <span className="font-medium">{influencer.demographics.gender.female}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Male:</span>
                                    <span className="font-medium">{influencer.demographics.gender.male}%</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Top Countries</div>
                                <div className="space-y-1">
                                  {Object.entries(influencer.demographics.countries).slice(0, 2).map(([country, percent]) => (
                                    <div key={country} className="flex justify-between">
                                      <span className="capitalize">{country}:</span>
                                      <span className="font-medium">{percent}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}