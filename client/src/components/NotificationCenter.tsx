/**
 * Notification Center Component
 * Displays user notifications with unread counter
 */

import { useState } from "react";
import { Bell, Check, X, FileText, Calendar, BookOpen, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";

interface Notification {
  id: number;
  type: "application_status" | "session_reminder" | "new_resource" | "achievement_earned" | "project_update" | "general";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

export default function NotificationCenter() {
  // Mock data - in real implementation, fetch from API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "application_status",
      title: "تم قبول طلبك",
      message: "تم قبول طلبك للانضمام إلى حاضنة الأعمال الجيومكانية",
      link: "/dashboard",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 2,
      type: "session_reminder",
      title: "تذكير بجلسة إرشادية",
      message: "لديك جلسة إرشادية غداً الساعة 2:00 مساءً",
      link: "/schedule-session",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 3,
      type: "new_resource",
      title: "مورد جديد متاح",
      message: "تم إضافة مورد جديد: دليل البيانات الجيومكانية المفتوحة",
      link: "/resources",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: 4,
      type: "achievement_earned",
      title: "إنجاز جديد!",
      message: "حصلت على شارة \"المساهم النشط\"",
      link: "/profile",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: 5,
      type: "project_update",
      title: "تحديث على مشروعك",
      message: "تم نقل مشروعك إلى مرحلة الاختبار",
      link: "/projects",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "application_status":
        return <FileText className="h-5 w-5 text-[#46C18F]" />;
      case "session_reminder":
        return <Calendar className="h-5 w-5 text-[#14BEC3]" />;
      case "new_resource":
        return <BookOpen className="h-5 w-5 text-[#002937]" />;
      case "achievement_earned":
        return <Award className="h-5 w-5 text-[#FFC107]" />;
      case "project_update":
        return <TrendingUp className="h-5 w-5 text-[#46C18F]" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#46C18F] text-white text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">الإشعارات</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-[#46C18F] hover:text-[#46C18F]/80"
            >
              تعليم الكل كمقروء
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${
                    !notification.isRead ? "bg-[#46C18F]/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.isRead && (
                          <div className="h-2 w-2 rounded-full bg-[#46C18F] flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.createdAt)}
                        </span>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-7 px-2 text-xs"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              تعليم كمقروء
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {notification.link && (
                        <Link href={notification.link}>
                          <a className="text-xs text-[#46C18F] hover:underline mt-2 inline-block">
                            عرض التفاصيل ←
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-3 border-t text-center">
            <Link href="/notifications">
              <a className="text-sm text-[#46C18F] hover:underline">
                عرض جميع الإشعارات
              </a>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
