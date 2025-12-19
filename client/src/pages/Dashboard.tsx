/**
 * Dashboard Page - Personal dashboard for beneficiaries
 * Features: Application tracking, session scheduling, statistics, notifications
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  BookOpen,
  Video,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch user data
  const { data: applications = [], isLoading: loadingApps } = trpc.applications.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: sessions = [], isLoading: loadingSessions } = trpc.mentoring.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: registrations = [], isLoading: loadingRegs } = trpc.events.myRegistrations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Redirect to login if not authenticated
  if (!loading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const stats = {
    totalApplications: applications.length,
    activeApplications: applications.filter((a: any) => 
      ['submitted', 'under_review', 'accepted', 'in_progress'].includes(a.status)
    ).length,
    upcomingSessions: sessions.filter((s: any) => 
      s.status === 'scheduled' || s.status === 'confirmed'
    ).length,
    completedSessions: sessions.filter((s: any) => s.status === 'completed').length,
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      draft: { label: "مسودة", variant: "secondary" },
      submitted: { label: "مقدم", variant: "default" },
      under_review: { label: "قيد المراجعة", variant: "outline" },
      accepted: { label: "مقبول", variant: "default" },
      rejected: { label: "مرفوض", variant: "destructive" },
      in_progress: { label: "قيد التنفيذ", variant: "default" },
      completed: { label: "مكتمل", variant: "default" },
      withdrawn: { label: "منسحب", variant: "secondary" },
    };
    const config = statusMap[status] || { label: status, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getInitiativeLabel = (type: string) => {
    const labels: Record<string, string> = {
      incubator: "حاضنة الأعمال",
      accelerator: "مسرعة الأعمال",
      hackathon: "الهاكاثون",
      bootcamp: "المعسكر التدريبي",
      geosandbox: "البيئة التنظيمية الجيومكانية",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">مرحباً، {user.name || 'المستخدم'}!</h1>
          <p className="text-muted-foreground">
            تابع تقدمك في المبادرات وجدول جلساتك الإرشادية
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">جميع طلباتك</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات النشطة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeApplications}</div>
              <p className="text-xs text-muted-foreground">قيد المعالجة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الجلسات القادمة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
              <p className="text-xs text-muted-foreground">جلسات مجدولة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الجلسات المكتملة</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedSessions}</div>
              <p className="text-xs text-muted-foreground">تم إنجازها</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">طلباتي</TabsTrigger>
            <TabsTrigger value="sessions">الجلسات الإرشادية</TabsTrigger>
            <TabsTrigger value="events">الفعاليات</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">طلبات الانضمام</h2>
              <Link href="/apply">
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  طلب جديد
                </Button>
              </Link>
            </div>

            {loadingApps ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : applications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد طلبات بعد</h3>
                  <p className="text-muted-foreground mb-4">
                    ابدأ رحلتك بتقديم طلب للانضمام إلى إحدى مبادراتنا
                  </p>
                  <Link href="/apply">
                    <Button>تقديم طلب جديد</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {applications.map((app: any) => (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{app.projectName}</CardTitle>
                          <CardDescription className="mt-1">
                            {getInitiativeLabel(app.initiativeType)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {app.projectDescription}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline h-4 w-4 ml-1" />
                          {app.submittedAt 
                            ? `قُدم في ${format(new Date(app.submittedAt), 'dd MMMM yyyy', { locale: ar })}`
                            : 'لم يُقدم بعد'
                          }
                        </div>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                          <ArrowRight className="mr-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">الجلسات الإرشادية</h2>
              <Link href="/schedule-session">
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  جدولة جلسة
                </Button>
              </Link>
            </div>

            {loadingSessions ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : sessions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد جلسات مجدولة</h3>
                  <p className="text-muted-foreground mb-4">
                    احجز جلسة إرشادية مع أحد خبرائنا لتطوير مشروعك
                  </p>
                  <Link href="/schedule-session">
                    <Button>جدولة جلسة جديدة</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {sessions.map((session: any) => (
                  <Card key={session.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>جلسة مع {session.mentorName}</CardTitle>
                          <CardDescription className="mt-1">
                            {session.sessionType === 'consultation' && 'استشارة'}
                            {session.sessionType === 'technical_review' && 'مراجعة تقنية'}
                            {session.sessionType === 'business_strategy' && 'استراتيجية الأعمال'}
                            {session.sessionType === 'pitch_practice' && 'تدريب على العرض'}
                            {session.sessionType === 'general_guidance' && 'إرشاد عام'}
                          </CardDescription>
                        </div>
                        <Badge variant={session.status === 'completed' ? 'default' : 'outline'}>
                          {session.status === 'scheduled' && 'مجدولة'}
                          {session.status === 'confirmed' && 'مؤكدة'}
                          {session.status === 'completed' && 'مكتملة'}
                          {session.status === 'cancelled' && 'ملغاة'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                          {format(new Date(session.scheduledAt), 'dd MMMM yyyy - HH:mm', { locale: ar })}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                          {session.duration} دقيقة
                        </div>
                        {session.location && (
                          <div className="flex items-center text-sm">
                            <Video className="ml-2 h-4 w-4 text-muted-foreground" />
                            {session.location}
                          </div>
                        )}
                      </div>
                      {session.notes && (
                        <p className="text-sm text-muted-foreground mt-4">
                          {session.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">الفعاليات المسجلة</h2>
              <Link href="/events">
                <Button variant="outline">
                  تصفح جميع الفعاليات
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {loadingRegs ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : registrations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد تسجيلات</h3>
                  <p className="text-muted-foreground mb-4">
                    سجل في فعالياتنا القادمة للتواصل والتعلم
                  </p>
                  <Link href="/events">
                    <Button>استكشف الفعاليات</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {registrations.map((reg: any) => (
                  <Card key={reg.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>فعالية #{reg.eventId}</CardTitle>
                        <Badge variant={reg.status === 'attended' ? 'default' : 'outline'}>
                          {reg.status === 'registered' && 'مسجل'}
                          {reg.status === 'confirmed' && 'مؤكد'}
                          {reg.status === 'attended' && 'حضر'}
                          {reg.status === 'cancelled' && 'ملغي'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        تم التسجيل في {format(new Date(reg.registeredAt), 'dd MMMM yyyy', { locale: ar })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
