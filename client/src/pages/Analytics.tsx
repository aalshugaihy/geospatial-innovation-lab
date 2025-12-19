/**
 * Analytics Page - Advanced statistics and charts
 * Features: Progress tracking, acceptance rates, success metrics
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, Award, Target, Download } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Analytics() {
  const { user, isAuthenticated, loading } = useAuth({ redirectOnUnauthenticated: true });

  const { data: applications = [] } = trpc.applications.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: sessions = [] } = trpc.mentoring.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate statistics
  const totalApplications = applications.length;
  const acceptedApplications = applications.filter((a: any) => a.status === 'accepted').length;
  const rejectedApplications = applications.filter((a: any) => a.status === 'rejected').length;
  const pendingApplications = applications.filter((a: any) => 
    a.status === 'submitted' || a.status === 'under_review'
  ).length;
  const acceptanceRate = totalApplications > 0 ? (acceptedApplications / totalApplications * 100).toFixed(1) : 0;

  // Applications by initiative type
  const initiativeData = [
    { name: "حاضنة الأعمال", value: applications.filter((a: any) => a.initiativeType === 'incubator').length },
    { name: "مسرعة الأعمال", value: applications.filter((a: any) => a.initiativeType === 'accelerator').length },
    { name: "الهاكاثون", value: applications.filter((a: any) => a.initiativeType === 'hackathon').length },
    { name: "المعسكر التدريبي", value: applications.filter((a: any) => a.initiativeType === 'bootcamp').length },
    { name: "GeoSandbox", value: applications.filter((a: any) => a.initiativeType === 'geosandbox').length },
  ].filter(item => item.value > 0);

  // Application status distribution
  const statusData = [
    { name: "مقبول", value: acceptedApplications, color: "#46C18F" },
    { name: "مرفوض", value: rejectedApplications, color: "#ef4444" },
    { name: "قيد المراجعة", value: pendingApplications, color: "#14BEC3" },
    { name: "أخرى", value: totalApplications - acceptedApplications - rejectedApplications - pendingApplications, color: "#94a3b8" },
  ].filter(item => item.value > 0);

  // Sessions by status
  const sessionsData = [
    { name: "مجدولة", value: sessions.filter((s: any) => s.status === 'scheduled').length },
    { name: "مؤكدة", value: sessions.filter((s: any) => s.status === 'confirmed').length },
    { name: "مكتملة", value: sessions.filter((s: any) => s.status === 'completed').length },
    { name: "ملغاة", value: sessions.filter((s: any) => s.status === 'cancelled').length },
  ].filter(item => item.value > 0);

  // Monthly trend (mock data - replace with actual monthly aggregation)
  const monthlyData = [
    { month: "يناير", applications: 12, sessions: 8 },
    { month: "فبراير", applications: 18, sessions: 14 },
    { month: "مارس", applications: 25, sessions: 19 },
    { month: "أبريل", applications: 22, sessions: 16 },
    { month: "مايو", applications: 30, sessions: 22 },
    { month: "يونيو", applications: 28, sessions: 20 },
  ];

  const COLORS = ['#46C18F', '#14BEC3', '#002937', '#485867', '#94a3b8'];

  const exportToPDF = async () => {
    const element = document.getElementById('analytics-content');
    if (!element) return;

    try {
      // Show loading toast
      toast.loading('جاري إنشاء ملف PDF...');

      // Create canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297; // A4 height in mm

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      // Save PDF
      pdf.save(`analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('تم تصدير التقرير بنجاح');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('فشل تصدير التقرير');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">التحليلات والإحصائيات</h1>
              <p className="text-muted-foreground">
                تتبع تقدمك ومعدلات النجاح في المبادرات
              </p>
            </div>
            <Button onClick={exportToPDF} className="gap-2">
              <Download className="h-4 w-4" />
              تصدير PDF
            </Button>
          </div>
        </div>

        <div id="analytics-content">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground mt-1">
                عبر جميع المبادرات
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل القبول</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptanceRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {acceptedApplications} من {totalApplications} طلب
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الجلسات المكتملة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sessions.filter((s: any) => s.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                جلسة إرشادية
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23%</div>
              <p className="text-xs text-muted-foreground mt-1">
                مقارنة بالشهر الماضي
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications by Initiative */}
          <Card>
            <CardHeader>
              <CardTitle>الطلبات حسب المبادرة</CardTitle>
              <CardDescription>توزيع الطلبات على المبادرات المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={initiativeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {initiativeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Application Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>حالة الطلبات</CardTitle>
              <CardDescription>توزيع الطلبات حسب الحالة</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#46C18F">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>الاتجاه الشهري</CardTitle>
              <CardDescription>عدد الطلبات والجلسات على مدار الأشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#46C18F" name="الطلبات" strokeWidth={2} />
                  <Line type="monotone" dataKey="sessions" stroke="#14BEC3" name="الجلسات" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Statistics */}
        {sessionsData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الجلسات</CardTitle>
              <CardDescription>توزيع الجلسات الإرشادية حسب الحالة</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#14BEC3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
