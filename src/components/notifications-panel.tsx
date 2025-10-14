//@ts-nocheck
import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { 
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Calendar,
  Settings,
  Trash2
} from "lucide-react"

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  category: 'campaign' | 'payment' | 'collaboration' | 'system' | 'engagement'
}

interface NotificationsPanelProps {
  userType: 'brand' | 'influencer'
}

export function NotificationsPanel({ userType }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Campaign Milestone Reached',
      message: 'Your "Summer Beauty Collection" campaign has reached 1M impressions!',
      timestamp: '2 hours ago',
      isRead: false,
      category: 'campaign'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Engagement Drop Alert',
      message: 'Your engagement rate dropped by 15% this week. Check your content strategy.',
      timestamp: '5 hours ago',
      isRead: false,
      category: 'engagement'
    },
    {
      id: '3',
      type: 'info',
      title: 'New Collaboration Request',
      message: 'TechCorp Inc. wants to collaborate with you on a product launch campaign.',
      timestamp: '1 day ago',
      isRead: true,
      category: 'collaboration'
    },
    {
      id: '4',
      type: 'success',
      title: 'Payment Processed',
      message: 'Your payment of $2,500 for the "Fitness Challenge" campaign has been processed.',
      timestamp: '2 days ago',
      isRead: true,
      category: 'payment'
    },
    {
      id: '5',
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly performance report is now available for download.',
      timestamp: '3 days ago',
      isRead: false,
      category: 'system'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Campaign Budget Alert',
      message: 'Your "Tech Launch" campaign is 85% through its allocated budget.',
      timestamp: '3 days ago',
      isRead: true,
      category: 'campaign'
    }
  ])

  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'success') return <CheckCircle className="h-4 w-4 text-green-600" />
    if (type === 'warning') return <AlertTriangle className="h-4 w-4 text-orange-600" />
    if (type === 'error') return <X className="h-4 w-4 text-red-600" />
    
    switch (category) {
      case 'payment': return <DollarSign className="h-4 w-4 text-green-600" />
      case 'collaboration': return <Users className="h-4 w-4 text-blue-600" />
      case 'engagement': return <Heart className="h-4 w-4 text-pink-600" />
      case 'campaign': return <TrendingUp className="h-4 w-4 text-purple-600" />
      default: return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'campaign': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
      case 'payment': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'collaboration': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'engagement': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300'
      case 'system': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Filter notifications based on user type
  const filteredNotifications = notifications.filter(notification => {
    if (userType === 'brand') {
      return ['campaign', 'payment', 'collaboration', 'system'].includes(notification.category)
    } else {
      return ['engagement', 'collaboration', 'payment', 'system'].includes(notification.category)
    }
  })

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">Notifications</h3>
          {filteredNotifications.length > 0 && (
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="h-96">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll let you know when something important happens
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div 
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-purple-50/50 dark:bg-purple-900/10 border-l-4 border-l-purple-500' : ''
                    }`}
                    onClick={() => !notification.isRead && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={getCategoryColor(notification.category)}>
                                  {notification.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              dismissNotification(notification.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < filteredNotifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {filteredNotifications.length > 0 && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}