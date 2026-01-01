/**
 * Notification Settings Component
 * Allows users to enable/disable push notifications
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Bell, BellOff, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  isPushNotificationSupported,
  requestNotificationPermission,
  registerServiceWorker,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  getNotificationPermission,
  showLocalNotification,
} from '@/lib/notifications';

export default function NotificationSettings() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    setIsSupported(isPushNotificationSupported());
    setPermission(getNotificationPermission());

    // Register service worker on mount
    if (isPushNotificationSupported()) {
      registerServiceWorker();
    }
  }, []);

  const handleEnableNotifications = async () => {
    setIsLoading(true);

    try {
      // Request permission
      const perm = await requestNotificationPermission();
      setPermission(perm);

      if (perm === 'granted') {
        // Subscribe to push notifications
        const subscription = await subscribeToPushNotifications();
        
        if (subscription) {
          setIsSubscribed(true);
          toast.success('تم تفعيل الإشعارات بنجاح!');
          
          // Show test notification
          showLocalNotification('معمل الابتكار الجيومكاني', {
            body: 'تم تفعيل الإشعارات! سنرسل لك إشعارات عند وجود رسائل جديدة.',
            icon: '/geosa-logo.png',
          });

          // TODO: Send subscription to backend
          console.log('[Notifications] Subscription:', JSON.stringify(subscription));
        } else {
          toast.error('فشل الاشتراك في الإشعارات');
        }
      } else if (perm === 'denied') {
        toast.error('تم رفض إذن الإشعارات. يرجى تفعيلها من إعدادات المتصفح.');
      }
    } catch (error) {
      console.error('[Notifications] Error:', error);
      toast.error('حدث خطأ أثناء تفعيل الإشعارات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);

    try {
      const success = await unsubscribeFromPushNotifications();
      
      if (success) {
        setIsSubscribed(false);
        toast.success('تم إيقاف الإشعارات');
      } else {
        toast.error('فشل إيقاف الإشعارات');
      }
    } catch (error) {
      console.error('[Notifications] Error:', error);
      toast.error('حدث خطأ أثناء إيقاف الإشعارات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await handleEnableNotifications();
    } else {
      await handleDisableNotifications();
    }
  };

  const handleTestNotification = () => {
    if (permission === 'granted') {
      showLocalNotification('إشعار تجريبي', {
        body: 'هذا إشعار تجريبي من معمل الابتكار الجيومكاني',
        icon: '/geosa-logo.png',
        badge: '/geosa-logo.png',
      });
      toast.success('تم إرسال إشعار تجريبي');
    } else {
      toast.error('يجب تفعيل الإشعارات أولاً');
    }
  };

  if (!isSupported) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5 text-muted-foreground" />
            الإشعارات غير مدعومة
          </CardTitle>
          <CardDescription>
            متصفحك لا يدعم الإشعارات الفورية
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            إعدادات الإشعارات
          </div>
          {permission === 'granted' && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 ml-1" />
              مفعّل
            </Badge>
          )}
          {permission === 'denied' && (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 ml-1" />
              محظور
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          احصل على إشعارات فورية عند وصول رسائل جديدة أو تحديثات مهمة
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h4 className="font-semibold mb-1">تفعيل الإشعارات</h4>
            <p className="text-sm text-muted-foreground">
              استقبل إشعارات حتى عند إغلاق الموقع
            </p>
          </div>
          <Switch
            checked={permission === 'granted' && isSubscribed}
            onCheckedChange={handleToggle}
            disabled={isLoading || permission === 'denied'}
          />
        </div>

        {/* Permission Status */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">حالة الإذن:</h4>
          <div className="flex items-center gap-2">
            {permission === 'granted' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">تم منح الإذن</span>
              </>
            )}
            {permission === 'denied' && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">
                  تم رفض الإذن - يرجى تفعيله من إعدادات المتصفح
                </span>
              </>
            )}
            {permission === 'default' && (
              <>
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  لم يتم طلب الإذن بعد
                </span>
              </>
            )}
          </div>
        </div>

        {/* Notification Types */}
        {permission === 'granted' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">أنواع الإشعارات:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm">رسائل جديدة</span>
                <Switch defaultChecked disabled={!isSubscribed} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm">تذكير بالفعاليات</span>
                <Switch defaultChecked disabled={!isSubscribed} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm">تحديثات الطلبات</span>
                <Switch defaultChecked disabled={!isSubscribed} />
              </div>
            </div>
          </div>
        )}

        {/* Test Button */}
        {permission === 'granted' && (
          <Button
            onClick={handleTestNotification}
            variant="outline"
            className="w-full"
          >
            <Bell className="w-4 h-4 ml-2" />
            إرسال إشعار تجريبي
          </Button>
        )}

        {/* Enable Button */}
        {permission === 'default' && (
          <Button
            onClick={handleEnableNotifications}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'جارٍ التفعيل...' : 'تفعيل الإشعارات'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
