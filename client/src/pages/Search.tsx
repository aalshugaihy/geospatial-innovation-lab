/**
 * Advanced Search Page
 * Full-text search with multi-criteria filtering and sorting
 */

import { useState } from "react";
// import { trpc } from "@/_core/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Filter, SlidersHorizontal, FileText, Video, Link as LinkIcon, Folder } from "lucide-react";
import { RatingDisplay } from "@/components/StarRating";

type SearchType = "all" | "resources" | "projects";
type SortBy = "relevance" | "newest" | "rating" | "popular";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Simulated search results - in real implementation, this would call a search API
  const mockResources = [
    {
      id: 1,
      title: "دليل البيانات الجيومكانية المفتوحة",
      description: "دليل شامل للوصول إلى البيانات الجيومكانية المفتوحة واستخدامها",
      resourceType: "document" as "document" | "video" | "link",
      category: "geospatial",
      averageRating: 4.5,
      ratingCount: 12,
      downloadCount: 245,
    },
    {
      id: 2,
      title: "مقدمة في نظم المعلومات الجغرافية (GIS)",
      description: "سلسلة فيديوهات تعليمية عن أساسيات GIS",
      resourceType: "video" as "document" | "video" | "link",
      category: "technical",
      averageRating: 4.8,
      ratingCount: 28,
      downloadCount: 567,
    },
  ];

  const mockProjects = [
    {
      id: 1,
      title: "منصة الخرائط التفاعلية",
      description: "تطوير منصة ويب لعرض الخرائط التفاعلية",
      stage: "development" as const,
      priority: "high" as const,
      progress: 65,
    },
  ];

  const handleSearch = () => {
    // In real implementation, this would trigger the search API call
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-gradient-to-br from-[#002937] via-[#003d4f] to-[#14BEC3] text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">البحث المتقدم</h1>
            <p className="text-xl text-white/90 mb-8">
              ابحث في الموارد والمشاريع والفعاليات
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="ابحث عن موارد، مشاريع، أو فعاليات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pr-10 h-14 text-lg"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="h-14 px-8 bg-[#46C18F] hover:bg-[#3da878] text-white"
                >
                  <SearchIcon className="h-5 w-5 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Results */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    التصفية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">الفئة</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        <SelectItem value="geospatial">جيومكاني</SelectItem>
                        <SelectItem value="business">أعمال</SelectItem>
                        <SelectItem value="technical">تقني</SelectItem>
                        <SelectItem value="legal">قانوني</SelectItem>
                        <SelectItem value="marketing">تسويق</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">النوع</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="document">مستند</SelectItem>
                        <SelectItem value="video">فيديو</SelectItem>
                        <SelectItem value="link">رابط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">الترتيب حسب</label>
                    <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">الأكثر صلة</SelectItem>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                        <SelectItem value="popular">الأكثر شعبية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => {
                    setCategoryFilter("all");
                    setTypeFilter("all");
                    setSortBy("relevance");
                  }}>
                    إعادة تعيين الفلاتر
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <Tabs value={searchType} onValueChange={(v) => setSearchType(v as SearchType)}>
                <div className="flex items-center justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="all">الكل</TabsTrigger>
                    <TabsTrigger value="resources">الموارد</TabsTrigger>
                    <TabsTrigger value="projects">المشاريع</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-muted-foreground">
                    {mockResources.length + mockProjects.length} نتيجة
                  </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                  {/* Resources */}
                  {mockResources.map((resource) => (
                    <Card key={`resource-${resource.id}`} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {resource.resourceType === "document" && <FileText className="h-5 w-5 text-[#46C18F]" />}
                              {resource.resourceType === "video" && <Video className="h-5 w-5 text-[#46C18F]" />}
                              {resource.resourceType === "link" && <LinkIcon className="h-5 w-5 text-[#46C18F]" />}
                              <Badge variant="secondary">{resource.category}</Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <RatingDisplay rating={resource.averageRating} count={resource.ratingCount} />
                          <div className="text-sm text-muted-foreground">
                            {resource.downloadCount} تحميل
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Projects */}
                  {mockProjects.map((project) => (
                    <Card key={`project-${project.id}`} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Folder className="h-5 w-5 text-[#14BEC3]" />
                              <Badge variant={project.priority === "high" ? "destructive" : "secondary"}>
                                {project.priority === "high" ? "أولوية عالية" : "أولوية متوسطة"}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
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
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  {mockResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {resource.resourceType === "document" && <FileText className="h-5 w-5 text-[#46C18F]" />}
                              {resource.resourceType === "video" && <Video className="h-5 w-5 text-[#46C18F]" />}
                              {resource.resourceType === "link" && <LinkIcon className="h-5 w-5 text-[#46C18F]" />}
                              <Badge variant="secondary">{resource.category}</Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <RatingDisplay rating={resource.averageRating} count={resource.ratingCount} />
                          <div className="text-sm text-muted-foreground">
                            {resource.downloadCount} تحميل
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  {mockProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Folder className="h-5 w-5 text-[#14BEC3]" />
                              <Badge variant={project.priority === "high" ? "destructive" : "secondary"}>
                                {project.priority === "high" ? "أولوية عالية" : "أولوية متوسطة"}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
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
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
