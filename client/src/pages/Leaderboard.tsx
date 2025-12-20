/**
 * Leaderboard Page
 * Displays top users with points, rankings, and achievements
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp, Star, FolderKanban, FileText } from "lucide-react";

export default function Leaderboard() {
  // Mock data - in real implementation, fetch from API
  const topUsers = [
    {
      id: 1,
      rank: 1,
      name: "أحمد محمد",
      totalPoints: 2450,
      monthlyPoints: 850,
      projectsCount: 8,
      ratingsCount: 45,
      resourcesContributed: 12,
      achievements: 15,
    },
    {
      id: 2,
      rank: 2,
      name: "فاطمة علي",
      totalPoints: 2280,
      monthlyPoints: 720,
      projectsCount: 6,
      ratingsCount: 38,
      resourcesContributed: 10,
      achievements: 12,
    },
    {
      id: 3,
      rank: 3,
      name: "خالد عبدالله",
      totalPoints: 2150,
      monthlyPoints: 680,
      projectsCount: 7,
      ratingsCount: 42,
      resourcesContributed: 8,
      achievements: 14,
    },
    {
      id: 4,
      rank: 4,
      name: "نورة سعد",
      totalPoints: 1980,
      monthlyPoints: 620,
      projectsCount: 5,
      ratingsCount: 35,
      resourcesContributed: 9,
      achievements: 11,
    },
    {
      id: 5,
      rank: 5,
      name: "عمر حسن",
      totalPoints: 1850,
      monthlyPoints: 580,
      projectsCount: 6,
      ratingsCount: 32,
      resourcesContributed: 7,
      achievements: 10,
    },
    {
      id: 6,
      rank: 6,
      name: "سارة إبراهيم",
      totalPoints: 1720,
      monthlyPoints: 540,
      projectsCount: 4,
      ratingsCount: 28,
      resourcesContributed: 6,
      achievements: 9,
    },
    {
      id: 7,
      rank: 7,
      name: "يوسف عبدالعزيز",
      totalPoints: 1650,
      monthlyPoints: 510,
      projectsCount: 5,
      ratingsCount: 30,
      resourcesContributed: 5,
      achievements: 8,
    },
    {
      id: 8,
      rank: 8,
      name: "ريم محمود",
      totalPoints: 1580,
      monthlyPoints: 480,
      projectsCount: 4,
      ratingsCount: 26,
      resourcesContributed: 6,
      achievements: 8,
    },
    {
      id: 9,
      rank: 9,
      name: "عبدالرحمن فهد",
      totalPoints: 1490,
      monthlyPoints: 450,
      projectsCount: 3,
      ratingsCount: 24,
      resourcesContributed: 5,
      achievements: 7,
    },
    {
      id: 10,
      rank: 10,
      name: "لينا خالد",
      totalPoints: 1420,
      monthlyPoints: 420,
      projectsCount: 4,
      ratingsCount: 22,
      resourcesContributed: 4,
      achievements: 7,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-[#FFC107]" />;
      case 2:
        return <Medal className="h-8 w-8 text-[#C0C0C0]" />;
      case 3:
        return <Medal className="h-8 w-8 text-[#CD7F32]" />;
      default:
        return <div className="h-8 w-8 flex items-center justify-center font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#002937] via-[#003d4f] to-[#14BEC3] text-white py-16">
          <div className="container text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-[#FFC107]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">لوحة المتصدرين</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              تعرّف على أكثر المستخدمين نشاطاً وإنجازاً في معمل الابتكار الجيومكاني
            </p>
          </div>
        </div>

        {/* Points System Explanation */}
        <div className="container py-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-[#46C18F]" />
                كيف يتم حساب النقاط؟
              </CardTitle>
              <CardDescription>
                نظام النقاط يكافئ المشاركة الفعّالة والمساهمات القيّمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#46C18F]/10 flex items-center justify-center flex-shrink-0">
                    <FolderKanban className="h-5 w-5 text-[#46C18F]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">المشاريع</div>
                    <div className="text-sm text-muted-foreground">
                      100 نقطة لكل مشروع جديد
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#14BEC3]/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-[#14BEC3]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">التقييمات</div>
                    <div className="text-sm text-muted-foreground">
                      10 نقاط لكل تقييم مفيد
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#FFC107]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#FFC107]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">الموارد</div>
                    <div className="text-sm text-muted-foreground">
                      50 نقطة لكل مورد تعليمي
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for All-time vs Monthly */}
          <Tabs defaultValue="monthly">
            <TabsList className="mb-6">
              <TabsTrigger value="monthly">الترتيب الشهري</TabsTrigger>
              <TabsTrigger value="alltime">الترتيب العام</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="space-y-4">
                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {topUsers.slice(0, 3).map((user, index) => (
                    <Card
                      key={user.id}
                      className={`${
                        index === 0
                          ? "md:order-2 border-[#FFC107] shadow-lg scale-105"
                          : index === 1
                          ? "md:order-1"
                          : "md:order-3"
                      } hover:shadow-xl transition-all`}
                    >
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            {getRankIcon(user.rank)}
                          </div>
                          <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-[#46C18F]/20">
                            <AvatarFallback className="bg-[#46C18F] text-white text-xl">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold text-lg mb-2">{user.name}</h3>
                          <div className="text-3xl font-bold text-[#46C18F] mb-4">
                            {user.monthlyPoints.toLocaleString()}
                            <span className="text-sm text-muted-foreground mr-1">نقطة</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div>
                              <div className="font-semibold">{user.projectsCount}</div>
                              <div className="text-muted-foreground">مشروع</div>
                            </div>
                            <div>
                              <div className="font-semibold">{user.ratingsCount}</div>
                              <div className="text-muted-foreground">تقييم</div>
                            </div>
                            <div>
                              <div className="font-semibold">{user.achievements}</div>
                              <div className="text-muted-foreground">إنجاز</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Remaining Rankings */}
                <div className="space-y-3">
                  {topUsers.slice(3).map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {getRankIcon(user.rank)}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-[#46C18F]/20">
                            <AvatarFallback className="bg-[#46C18F] text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{user.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <FolderKanban className="h-3 w-3" />
                                {user.projectsCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {user.ratingsCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {user.achievements}
                              </span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-2xl font-bold text-[#46C18F]">
                              {user.monthlyPoints.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">نقطة</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alltime">
              <div className="space-y-3">
                {topUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Badge className={`${getRankBadgeColor(user.rank)} px-3 py-1 text-sm font-bold`}>
                          #{user.rank}
                        </Badge>
                        <Avatar className="h-12 w-12 border-2 border-[#46C18F]/20">
                          <AvatarFallback className="bg-[#46C18F] text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{user.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <FolderKanban className="h-3 w-3" />
                              {user.projectsCount} مشروع
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {user.resourcesContributed} مورد
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {user.achievements} إنجاز
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-2xl font-bold text-[#002937]">
                            {user.totalPoints.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">إجمالي النقاط</div>
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
