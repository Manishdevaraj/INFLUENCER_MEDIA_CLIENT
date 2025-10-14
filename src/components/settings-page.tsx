//@ts-nocheck
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription } from "./ui/alert"
import { Separator } from "./ui/separator"
import { 
  ArrowLeft,
  User,
  Shield,
  Bell,
  CreditCard,
  Link as LinkIcon,
  Upload,
  Save,
  Check,
  X,
  Instagram,
  Globe,
  Youtube,
  Twitter,
  Facebook,
  Settings,
  Eye,
  EyeOff
} from "lucide-react"

import { useFirebase } from "../Service/Firebase.context.jsx"
import { useNavigate } from "react-router-dom"


export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const {dbUser}=useFirebase()
  const navigate=useNavigate();
  
  const userType=dbUser?.role;


  // Profile data state
  const [profileData, setProfileData] = useState({
    name: userType === 'brand' ? 'TechCorp Inc.' : 'Sarah Johnson',
    email: userType === 'brand' ? 'hello@techcorp.com' : 'sarah@email.com',
    username: userType === 'brand' ? '@techcorp' : '@sarah_lifestyle',
    bio: userType === 'brand' 
      ? 'Leading technology company focused on innovative consumer products and cutting-edge solutions.'
      : 'Lifestyle content creator sharing beauty tips, wellness advice, and daily inspiration with 65K+ followers.',
    website: userType === 'brand' ? 'https://techcorp.com' : 'https://sarahlifestyle.com',
    location: userType === 'brand' ? 'San Francisco, CA' : 'Los Angeles, CA',
    phone: '+1 (555) 123-4567'
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailCampaignUpdates: true,
    emailPayments: true,
    emailNewOpportunities: true,
    emailWeeklyReports: false,
    pushCampaignMilestones: true,
    pushNewMessages: true,
    pushPaymentAlerts: true,
    pushEngagementAlerts: false
  })

  // Social accounts
  const [socialAccounts, setSocialAccounts] = useState({
    instagram: { connected: true, handle: '@sarah_lifestyle', followers: '65.2K' },
    tiktok: { connected: false, handle: '', followers: '0' },
    youtube: { connected: true, handle: 'Sarah Lifestyle', followers: '12.3K' },
    twitter: { connected: false, handle: '', followers: '0' }
  })

  // Payment settings for brands
  const [paymentSettings, setPaymentSettings] = useState({
    defaultPaymentMethod: 'visa-4242',
    autoPayEnabled: true,
    paymentThreshold: 1000,
    currency: 'USD'
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1500)
  }

  const handleSocialConnect = (platform: string) => {
    // Simulate connecting to social platform
    setSocialAccounts(prev => ({
      ...prev,
      [platform]: { 
        ...prev[platform as keyof typeof prev], 
        connected: !prev[platform as keyof typeof prev].connected 
      }
    }))
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-5 w-5" />
      case 'tiktok': return <Globe className="h-5 w-5" />
      case 'youtube': return <Youtube className="h-5 w-5" />
      case 'twitter': return <Twitter className="h-5 w-5" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-pink-600'
      case 'tiktok': return 'text-black dark:text-white'
      case 'youtube': return 'text-red-600'
      case 'twitter': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={()=>navigate(`/${dbUser.role}-dashboard`)} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and settings</p>
            </div>
          </div>
          {saveMessage && (
            <Alert className="w-auto border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-300">
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            {userType === 'brand' ? (
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
            ) : (
              <TabsTrigger value="social" className="flex items-center space-x-2">
                <LinkIcon className="h-4 w-4" />
                <span>Social</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userType === 'influencer' 
                      ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&crop=face"
                      : "https://images.unsplash.com/photo-1560472355-536de3962603?w=96&h=96&fit=crop"
                    } />
                    <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Change Photo</span>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{userType === 'brand' ? 'Company Name' : 'Full Name'}</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder={userType === 'brand' 
                      ? "Tell potential influencers about your company and brand values..." 
                      : "Share what makes you unique as a creator..."
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    {profileData.bio.length}/500 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Keep your account secure with a strong password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      Enabled
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about important updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Campaign Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about campaign milestones and status changes
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailCampaignUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailCampaignUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about payments and billing
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailPayments}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailPayments: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Opportunities</p>
                        <p className="text-sm text-muted-foreground">
                          {userType === 'brand' 
                            ? 'New influencer matches and recommendations'
                            : 'New collaboration requests and opportunities'
                          }
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNewOpportunities}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailNewOpportunities: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Weekly performance summaries and insights
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailWeeklyReports}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailWeeklyReports: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Push Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Campaign Milestones</p>
                        <p className="text-sm text-muted-foreground">
                          Instant alerts for important campaign achievements
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushCampaignMilestones}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushCampaignMilestones: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">
                          Direct messages and collaboration requests
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNewMessages}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushNewMessages: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab (Brands) or Social Tab (Influencers) */}
          {userType === 'brand' ? (
            <TabsContent value="billing" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods and billing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">**** **** **** 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          Default
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add New Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Billing Preferences</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-pay</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically pay campaign invoices
                        </p>
                      </div>
                      <Switch
                        checked={paymentSettings.autoPayEnabled}
                        onCheckedChange={(checked) => 
                          setPaymentSettings(prev => ({ ...prev, autoPayEnabled: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentThreshold">Payment Threshold</Label>
                      <Select 
                        value={paymentSettings.paymentThreshold.toString()} 
                        onValueChange={(value) => 
                          setPaymentSettings(prev => ({ ...prev, paymentThreshold: parseInt(value) }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">$500</SelectItem>
                          <SelectItem value="1000">$1,000</SelectItem>
                          <SelectItem value="2500">$2,500</SelectItem>
                          <SelectItem value="5000">$5,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select 
                        value={paymentSettings.currency} 
                        onValueChange={(value) => 
                          setPaymentSettings(prev => ({ ...prev, currency: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ) : (
            <TabsContent value="social" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Link your social media accounts to showcase your reach and engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(socialAccounts).map(([platform, account]) => (
                    <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`${getSocialColor(platform)}`}>
                          {getSocialIcon(platform)}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{platform}</p>
                          {account.connected ? (
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground">{account.handle}</p>
                              <Badge variant="outline" className="text-xs">
                                {account.followers} followers
                              </Badge>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not connected</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={account.connected ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleSocialConnect(platform)}
                        className={account.connected ? "text-red-600 hover:text-red-700" : ""}
                      >
                        {account.connected ? (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}