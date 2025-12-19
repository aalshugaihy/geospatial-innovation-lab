/**
 * Admin Dashboard - Manage applications, users, and sessions
 * Features: Application review, status updates, user management
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");

  const utils = trpc.useUtils();

  // Fetch all applications
  const { data: applications = [], isLoading: loadingApps } = trpc.admin.applications.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const updateStatusMutation = trpc.admin.updateApplicationStatus.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث حالة الطلب بنجاح!");
      utils.admin.applications.invalidate();
      setSelectedApp(null);
      setNewStatus("");
      setReviewNotes("");
    },
    onError: (error) => {
      toast.error("حدث خطأ: " + error.message);
    },
  });

  const handleUpdateStatus = async () => {
    if (!selectedApp || !newStatus) {
      toast.error("الرجاء اختيار الحالة الجديدة");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        id: selectedApp.id,
        status: newStatus,
        reviewNotes: reviewNotes || undefined,
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">غير مصرح</h3>
              <p className="text-muted-foreground">
                هذه الصفحة مخصصة للمسؤولين فقط
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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

  // Calculate statistics
  const stats = {
    total: applications.length,
    pending: applications.filter((a: any) => a.status === 'submitted' || a.status === 'under_review').length,
    accepted: applications.filter((a: any) => a.status === 'accepted').length,
    rejected: applications.filter((a: any) => a.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">لوحة تحكم المسؤولين</h1>
          <p className="text-muted-foreground">
            إدارة الطلبات والمستخدمين والجلسات
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المقبولة</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.accepted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المرفوضة</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">الطلبات</TabsTrigger>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="sessions">الجلسات</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>جميع الطلبات</CardTitle>
                <CardDescription>مراجعة وإدارة طلبات الانضمام للمبادرات</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingApps ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">لا توجد طلبات</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app: any) => (
                      <Card key={app.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{app.projectName}</CardTitle>
                              <CardDescription className="mt-1">
                                {getInitiativeLabel(app.initiativeType)} • معرف المستخدم: {app.userId}
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedApp(app);
                                    setNewStatus(app.status);
                                    setReviewNotes(app.reviewNotes || "");
                                  }}
                                >
                                  <Edit className="ml-2 h-4 w-4" />
                                  مراجعة
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{app.projectName}</DialogTitle>
                                  <DialogDescription>
                                    مراجعة الطلب وتحديث الحالة
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">نوع المبادرة</p>
                                      <p className="font-semibold">{getInitiativeLabel(app.initiativeType)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">حجم الفريق</p>
                                      <p className="font-semibold">{app.teamSize || 'غير محدد'}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">وصف المشروع</p>
                                    <p className="text-sm bg-muted p-3 rounded-lg">{app.projectDescription}</p>
                                  </div>
                                  <div>
                                    <Label htmlFor="status">الحالة الجديدة</Label>
                                    <Select value={newStatus} onValueChange={setNewStatus}>
                                      <SelectTrigger id="status" className="mt-2">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="submitted">مقدم</SelectItem>
                                        <SelectItem value="under_review">قيد المراجعة</SelectItem>
                                        <SelectItem value="accepted">مقبول</SelectItem>
                                        <SelectItem value="rejected">مرفوض</SelectItem>
                                        <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                                        <SelectItem value="completed">مكتمل</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="notes">ملاحظات المراجعة</Label>
                                    <Textarea
                                      id="notes"
                                      value={reviewNotes}
                                      onChange={(e) => setReviewNotes(e.target.value)}
                                      placeholder="أضف ملاحظات حول قرار المراجعة..."
                                      rows={4}
                                      className="mt-2"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={handleUpdateStatus}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    {updateStatusMutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>عرض وإدارة حسابات المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  ستتوفر هذه الميزة قريباً
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الجلسات</CardTitle>
                <CardDescription>عرض وإدارة الجلسات الإرشادية</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  ستتوفر هذه الميزة قريباً
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
