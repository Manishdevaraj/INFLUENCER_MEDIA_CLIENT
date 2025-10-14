
//@ts-nocheck

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"
import { Alert, AlertDescription } from "./ui/alert"
import { 
  Instagram, 
  Youtube, 
  Twitter,
  Facebook,
  Linkedin,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Plus,
  Eye,
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../Service/Firebase.context.jsx"
import { getConnectedAccounts, InstaConnect } from "@/Service/Api.js"

interface SocialAccount {
  id: string
  platform: string
  icon: React.ComponentType<any>
  username: string
  followers: string
  isConnected: boolean
  isActive: boolean
  connectedDate: string
  lastSync: string
  posts: number
  engagement: string
  color: string
}

const allPlatforms = [
  { id: '1', platform: 'Instagram' },
  { id: '2', platform: 'YouTube' },
  { id: '3', platform: 'TikTok' },
  { id: '4', platform: 'Twitter' },
  { id: '5', platform: 'Facebook' },
  { id: '6', platform: 'LinkedIn' },
];

export const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram": return Instagram;
    case "youtube": return Youtube;
    case "twitter": return Twitter;
    case "tiktok": return Twitter; // replace with TikTok icon if available
    case "facebook": return Facebook;
    case "linkedin": return Linkedin;
    default: return Instagram;
  }
};

export const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram": return "from-pink-500 to-purple-500";
    case "youtube": return "from-red-500 to-red-600";
    case "twitter":
    case "tiktok": return "from-black to-gray-800";
    case "facebook": return "from-blue-600 to-blue-700";
    case "linkedin": return "from-blue-700 to-blue-800";
    default: return "from-gray-400 to-gray-600";
  }
};

export function ConnectAccounts() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const navigate = useNavigate();
  const { dbUser } = useFirebase();

  useEffect(() => {
    const fetchConnectedAccounts = async () => {
      if (!dbUser) return;

      const data = await getConnectedAccounts(dbUser._id); // API returns only real accounts
      if (data?.accounts?.length) {
        const formattedAccounts = data.accounts.map((acc: any) => ({
          id: acc._id,
          platform: acc.platform,
          icon: getPlatformIcon(acc.platform),
          username: acc.username || '',
          followers: acc.followers || '0',
          isConnected: true,
          isActive: acc.active,
          connectedDate: acc.createdAt ? new Date(acc.createdAt).toLocaleDateString() : 'Just connected',
          lastSync: acc.lastScrapedAt ? new Date(acc.lastScrapedAt).toLocaleString() : 'Just now',
          posts: acc.postsCount || 0,
          engagement: acc.engagementRate ? acc.engagementRate + '%' : '0%',
          color: getPlatformColor(acc.platform),
        }));
        setAccounts(formattedAccounts);
      }
    };

    fetchConnectedAccounts();
  }, [dbUser]);

  const handleToggleAccount = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId ? { ...account, isActive: !account.isActive } : account
    ));
  }

  const handleDisconnectAccount = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, isConnected: false, isActive: false, username: '', followers: '', connectedDate: '', lastSync: '', posts: 0, engagement: '0%' }
        : account
    ));
  }

  const handleConnectAccount = async (accountId: string) => {
    if (!dbUser) return;

    switch(accountId) {
      case '1': // Instagram
        await InstaConnect(dbUser._id);
        break;
      // Add other platforms if needed
    }
  }

  // Filter accounts
  const connectedAccounts = accounts.filter(account => account.isConnected);
  const availableAccounts = allPlatforms
    .filter(p => !accounts.find(a => a.platform === p.platform))
    .map(p => ({
      ...p,
      icon: getPlatformIcon(p.platform),
      color: getPlatformColor(p.platform)
    }));
   
// Format followers nicely (like 248K)
const formatFollowers = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

/// Total followers across all connected accounts
const totalFollowers = connectedAccounts.reduce((sum, acc) => {
  if (!acc.followers) return sum;

  let followersStr = acc.followers.toString().toUpperCase();
  let multiplier = 1;

  if (followersStr.endsWith('K')) {
    multiplier = 1000;
    followersStr = followersStr.slice(0, -1);
  } else if (followersStr.endsWith('M')) {
    multiplier = 1000000;
    followersStr = followersStr.slice(0, -1);
  }
console.log(sum);
  return sum + parseFloat(followersStr) * multiplier;
}, 0);

// Average engagement across all connected accounts
const avgEngagement = connectedAccounts.length > 0
  ? (
      connectedAccounts.reduce((sum, acc) => sum + parseFloat(acc.engagement.replace('%', '')), 0) 
      / connectedAccounts.length
    ).toFixed(1) + '%'
  : '0%';

// Followers and engagement per platform
// const platformStats = allPlatforms.map(platform => {
//   const acc = connectedAccounts.find(a => a.platform === platform.platform);
//   return {
//     platform: platform.platform,
//     followers: acc ? acc.followers : '0',
//     engagement: acc ? acc.engagement : '0%'
//   };
// });
const AutherisedPlatforms=['instagram']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(`/${dbUser?.role}-dashboard`)} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Connect Accounts</h1>
                <p className="text-sm text-muted-foreground">Manage your social media connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connected Accounts</p>
                  <p className="text-2xl font-bold">{connectedAccounts.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <p className="text-2xl font-bold">{accounts.filter(a => a.isActive).length}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Followers</p>
                  <p className="text-2xl font-bold">{formatFollowers(totalFollowers)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold">{avgEngagement}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Connected Accounts</span>
            </CardTitle>
            <CardDescription>
              Manage your connected social media accounts and their visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            {connectedAccounts.length === 0 ? (
              <div className="text-center py-8">
                <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">No accounts connected yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {connectedAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`h-12 w-12 bg-gradient-to-r ${account.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{account.platform}</h3>
                            <Badge variant={account.isActive ? "default" : "secondary"} className={account.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : ""}>
                              {account.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{account.username}</p>
                          <p className="text-xs text-muted-foreground">{account.connectedDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold">{account.followers}</p>
                          <p className="text-xs text-muted-foreground">followers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{account.posts}</p>
                          <p className="text-xs text-muted-foreground">posts</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{account.engagement}</p>
                          <p className="text-xs text-muted-foreground">engagement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {account.lastSync}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={account.isActive}
                            onCheckedChange={() => handleToggleAccount(account.id)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnectAccount(account.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Accounts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-blue-500" />
              <span>Available Platforms</span>
            </CardTitle>
            <CardDescription>
              Connect additional social media accounts to expand your reach
            </CardDescription>
          </CardHeader>
          <CardContent>
            {availableAccounts.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  All available platforms are connected! You're maximizing your reach across all supported social networks.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <Card key={account.id} className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                      <CardContent className="p-6 text-center">
                        <div className={`h-12 w-12 bg-gradient-to-r ${account.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{account.platform}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect your {account.platform} account to track analytics and engage with your audience
                        </p>
                        {AutherisedPlatforms.includes(account.platform.toLowerCase())?<Button 
                          className={`w-full bg-gradient-to-r ${account.color} hover:opacity-90 text-white`}
                          onClick={() => handleConnectAccount(account.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Connect {account.platform}
                        </Button>: <Button 
                    disabled
                    className={`w-full bg-gray-400 cursor-not-allowed text-white`}
                  >
                    Coming Soon
                  </Button>}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
