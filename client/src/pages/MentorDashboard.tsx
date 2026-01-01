/**
 * Mentor Dashboard Page
 * Comprehensive interface for mentors to manage conversations and view analytics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import {
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

interface Conversation {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  status: 'active' | 'archived';
  isOnline: boolean;
}

interface DailyStats {
  date: string;
  messageCount: number;
  conversationCount: number;
  responseTime: number; // in minutes
}

export default function MentorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const { data: user } = trpc.auth.me.useQuery();
  const { data: conversations = [], refetch: refetchConversations } = trpc.chat.getConversations.useQuery(
    undefined,
    { enabled: !!user }
  );
  const { data: stats } = trpc.chat.getDailyStats.useQuery(undefined, { enabled: !!user });

  // Filter conversations based on search and status
  const filteredConversations = conversations.filter((conv: Conversation) => {
    const matchesSearch = conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const totalConversations = conversations.length;
  const activeConversations = conversations.filter((c: Conversation) => c.status === 'active').length;
  const totalUnread = conversations.reduce((sum: number, c: Conversation) => sum + c.unreadCount, 0);
  const onlineUsers = conversations.filter((c: Conversation) => c.isOnline).length;

  // Calculate average response time
  const avgResponseTime = stats && stats.length > 0 
    ? stats.reduce((sum: number, s: DailyStats) => sum + s.responseTime, 0) / stats.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            لوحة تحكم <span className="text-accent">المرشدين</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            إدارة المحادثات ومتابعة الإحصائيات
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageCircle className="w-8 h-8 text-accent" />
                <Badge variant="secondary">{activeConversations} نشط</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{totalConversations}</div>
              <p className="text-sm text-muted-foreground">إجمالي المحادثات</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-green-500" />
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  {onlineUsers} متصل
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{totalUnread}</div>
              <p className="text-sm text-muted-foreground">رسائل غير مقروءة</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {Math.round(avgResponseTime || 0)} دقيقة
              </div>
              <p className="text-sm text-muted-foreground">متوسط وقت الرد</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {stats?.[stats.length - 1]?.messageCount || 0}
              </div>
              <p className="text-sm text-muted-foreground">رسائل اليوم</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>المحادثات النشطة</span>
                  <Badge variant="outline">{filteredConversations.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث عن محادثة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('all')}
                    >
                      الكل
                    </Button>
                    <Button
                      variant={filterStatus === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('active')}
                    >
                      نشط
                    </Button>
                    <Button
                      variant={filterStatus === 'archived' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterStatus('archived')}
                    >
                      مؤرشف
                    </Button>
                  </div>
                </div>

                {/* Conversations */}
                <ScrollArea className="h-[600px]">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لا توجد محادثات</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredConversations.map((conv: Conversation) => (
                        <Card
                          key={conv.id}
                          className={`border cursor-pointer transition-all hover:shadow-md ${
                            selectedConversation === conv.id
                              ? 'border-accent shadow-md'
                              : 'border-border'
                          }`}
                          onClick={() => setSelectedConversation(conv.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                                    {conv.userName.charAt(0)}
                                  </div>
                                  {conv.isOnline && (
                                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold">{conv.userName}</h4>
                                  <p className="text-xs text-muted-foreground">{conv.userEmail}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                {conv.unreadCount > 0 && (
                                  <Badge className="bg-accent text-accent-foreground">
                                    {conv.unreadCount}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(conv.lastMessageAt).toLocaleDateString('ar-SA', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {conv.lastMessage}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            {/* Daily Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">النشاط اليومي</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {stats?.slice(-7).reverse().map((stat: DailyStats, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">
                            {new Date(stat.date).toLocaleDateString('ar-SA', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.conversationCount} محادثة
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-accent">{stat.messageCount}</p>
                          <p className="text-xs text-muted-foreground">رسالة</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 ml-2" />
                  وضع علامة مقروء للكل
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertCircle className="w-4 h-4 ml-2" />
                  عرض المحادثات العاجلة
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 ml-2" />
                  تصدير التقرير الشهري
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
