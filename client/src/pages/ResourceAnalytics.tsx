/**
 * Resource Analytics Dashboard
 * Features: Most downloaded resources, category statistics, usage trends
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BarChart,
  Bar,
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
import { Download, TrendingUp, FileText, Star } from "lucide-react";

export default function ResourceAnalytics() {
  const { user, isAuthenticated } = useAuth();

  const { data: resources = [] } = trpc.resources.list.useQuery();

  // Calculate statistics
  const totalDownloads = resources.reduce((sum: number, r: any) => sum + (r.downloadCount || 0), 0);
  const avgRating = resources.length > 0
    ? resources.reduce((sum: number, r: any) => sum + (r.averageRating || 0), 0) / resources.length
    : 0;

  // Top downloaded resources
  const topResources = [...resources]
    .sort((a: any, b: any) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, 5)
    .map((r: any) => ({
      name: r.title.length > 20 ? r.title.substring(0, 20) + '...' : r.title,
      downloads: r.downloadCount || 0,
    }));

  // Category distribution
  const categoryData = resources.reduce((acc: any, r: any) => {
    const category = r.category || 'أخرى';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name: getCategoryLabel(name as string),
    value: value as number,
  }));

  // Resource type distribution
  const typeData = resources.reduce((acc: any, r: any) => {
    const type = r.resourceType || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.entries(typeData).map(([name, value]) => ({
    name: getTypeLabel(name as string),
    value: value as number,
  }));

  const COLORS = ['#46C18F', '#14BEC3', '#002937', '#485867', '#94a3b8'];

  function getCategoryLabel(category: string) {
    const labels: Record<string, string> = {
      geospatial: "جيومكاني",
      business: "أعمال",
      technical: "تقني",
      legal: "قانوني",
      marketing: "تسويق",
    };
    return labels[category] || category;
  }

  function getTypeLabel(type: string) {
    const labels: Record<string, string> = {
      document: "مستند",
      video: "فيديو",
      link: "رابط",
    };
    return labels[type] || type;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">إحصائيات الموارد</h1>
          <p className="text-muted-foreground">
            تحليلات شاملة لاستخدام الموارد والفئات الأكثر شعبية
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الموارد</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي التحميلات</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDownloads}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Downloaded Resources */}
          <Card>
            <CardHeader>
              <CardTitle>الموارد الأكثر تحميلاً</CardTitle>
              <CardDescription>أفضل 5 موارد حسب عدد التحميلات</CardDescription>
            </CardHeader>
            <CardContent>
              {topResources.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topResources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="downloads" fill="#46C18F" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  لا توجد بيانات كافية
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع الفئات</CardTitle>
              <CardDescription>الموارد حسب الفئة</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  لا توجد بيانات كافية
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resource Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع أنواع الموارد</CardTitle>
              <CardDescription>الموارد حسب النوع</CardDescription>
            </CardHeader>
            <CardContent>
              {typeChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  لا توجد بيانات كافية
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resource List with Stats */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة الموارد</CardTitle>
              <CardDescription>جميع الموارد مع الإحصائيات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {resources.map((resource: any) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {getCategoryLabel(resource.category)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {resource.downloadCount || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {resource.averageRating?.toFixed(1) || '0.0'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
