/**
 * User Profile Page
 * Displays user activity, saved resources, projects, and achievements
 */

import { useAuth } from "@/_core/hooks/useAuth";
// import { trpc } from "@/_core/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Award,
  BookMarked,
  FolderKanban,
  TrendingUp,
  Star,
  FileText
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>تسجيل الدخول مطلوب</CardTitle>
              <CardDescription>يرجى تسجيل الدخول لعرض ملفك الشخصي</CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data - in real implementation, fetch from API
  const stats = {
    applications: 3,
    projects: 2,
    savedResources: 12,
    achievements: 5,
    totalRatings: 8,
  };

  const achievements = [
    {
      id: 1,
      type: "first_project",
      title: "أول مشروع",
      description: "أنشأت مشروعك الأول",
      icon: "🚀",
      earnedAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      type: "ten_ratings",
      title: "مقيّم نشط",
      description: "قدّمت 10 تقييمات",
      icon: "⭐",
      earnedAt: new Date("2024-02-20"),
    },
    {
      id: 3,
      type: "resource_contributor",
      description: "ساهمت بموارد تعليمية",
      icon: "📚",
      earnedAt: new Date("2024-03-10"),
    },
    {
      id: 4,
      type: "early_adopter",
      title: "المستخدم المبكر",
      description: "انضممت في الأشهر الأولى",
      icon: "🌟",
      earnedAt: new Date("2024-01-01"),
    },
    {
      id: 5,
      type: "mentor_session",
      title: "طالب متفاعل",
      description: "حضرت 5 جلسات إرشادية",
      icon: "🎓",
      earnedAt: new Date("2024-03-25"),
    },
  ];

  const savedResources = [
    {
      id: 1,
      title: "دليل البيانات الجيومكانية المفتوحة",
      category: "geospatial",
      savedAt: new Date("2024-03-15"),
    },
    {
      id: 2,
      title: "مقدمة في نظم المعلومات الجغرافية",
      category: "technical",
      savedAt: new Date("2024-03-10"),
    },
  ];

  const userProjects = [
    {
      id: 1,
      title: "منصة الخرائط التفاعلية",
      stage: "development",
      progress: 65,
    },
    {
      id: 2,
      title: "تطبيق الملاحة الذكية",
      stage: "testing",
      progress: 85,
    },
  ];

  const activityTimeline = [
    {
      id: 1,
      type: "achievement",
      title: "حصلت على شارة \"طالب متفاعل\"",
      date: new Date("2024-03-25"),
    },
    {
      id: 2,
      type: "rating",
      title: "قيّمت مورد \"دليل البيانات الجيومكانية\"",
      date: new Date("2024-03-20"),
    },
    {
      id: 3,
      type: "project",
      title: "حدّثت مشروع \"منصة الخرائط التفاعلية\"",
      date: new Date("2024-03-18"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#002937] via-[#003d4f] to-[#14BEC3] text-white py-12">
          <div className="container">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarFallback className="bg-[#46C18F] text-white text-2xl">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.name || "مستخدم"}</h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </div>
                  )}
                  {user.organization && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {user.organization}
                    </div>
                  )}
                  {user.jobTitle && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {user.jobTitle}
                    </div>
                  )}
                </div>
                {user.bio && (
                  <p className="mt-4 text-white/80 max-w-2xl">{user.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container -mt-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-[#46C18F]" />
                  <div className="text-2xl font-bold">{stats.applications}</div>
                  <div className="text-sm text-muted-foreground">الطلبات</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <FolderKanban className="h-8 w-8 mx-auto mb-2 text-[#14BEC3]" />
                  <div className="text-2xl font-bold">{stats.projects}</div>
                  <div className="text-sm text-muted-foreground">المشاريع</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookMarked className="h-8 w-8 mx-auto mb-2 text-[#002937]" />
                  <div className="text-2xl font-bold">{stats.savedResources}</div>
                  <div className="text-sm text-muted-foreground">الموارد المحفوظة</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-[#FFC107]" />
                  <div className="text-2xl font-bold">{stats.achievements}</div>
                  <div className="text-sm text-muted-foreground">الإنجازات</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-[#FFC107]" />
                  <div className="text-2xl font-bold">{stats.totalRatings}</div>
                  <div className="text-sm text-muted-foreground">التقييمات</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="container pb-12">
          <Tabs defaultValue="achievements">
            <TabsList className="mb-6">
              <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
              <TabsTrigger value="saved">الموارد المحفوظة</TabsTrigger>
              <TabsTrigger value="projects">المشاريع</TabsTrigger>
              <TabsTrigger value="activity">النشاط</TabsTrigger>
            </TabsList>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {achievement.earnedAt.toLocaleDateString("ar-SA")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Saved Resources Tab */}
            <TabsContent value="saved">
              <div className="space-y-4">
                {savedResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{resource.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary">{resource.category}</Badge>
                            <span className="text-sm">
                              حُفظ في {resource.savedAt.toLocaleDateString("ar-SA")}
                            </span>
                          </CardDescription>
                        </div>
                        <BookMarked className="h-6 w-6 text-[#46C18F]" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription className="mt-2">
                            <Badge variant="secondary">{project.stage}</Badge>
                          </CardDescription>
                        </div>
                        <FolderKanban className="h-6 w-6 text-[#14BEC3]" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">التقدم</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#46C18F] transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity Timeline Tab */}
            <TabsContent value="activity">
              <div className="space-y-4">
                {activityTimeline.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#46C18F]/10 flex items-center justify-center">
                          {activity.type === "achievement" && <Award className="h-5 w-5 text-[#46C18F]" />}
                          {activity.type === "rating" && <Star className="h-5 w-5 text-[#FFC107]" />}
                          {activity.type === "project" && <TrendingUp className="h-5 w-5 text-[#14BEC3]" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.date.toLocaleDateString("ar-SA")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
