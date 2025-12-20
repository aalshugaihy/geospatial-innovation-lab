/**
 * Resources Library Page
 * Features: Search, filter, upload PDFs and videos
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, FileText, Video, Link as LinkIcon, Download, Upload, Filter, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { RatingDisplay } from "@/components/StarRating";
import { useState } from "react";
import { toast } from "sonner";

export default function Resources() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const { data: resources = [] } = trpc.resources.list.useQuery();

  // Filter resources
  const filteredResources = resources.filter((resource: any) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.resourceType === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = [
    "all",
    "geospatial",
    "business",
    "technical",
    "legal",
    "marketing"
  ];

  const resourceTypes = [
    { value: "all", label: "الكل", icon: Filter },
    { value: "document", label: "مستند", icon: FileText },
    { value: "video", label: "فيديو", icon: Video },
    { value: "link", label: "رابط", icon: LinkIcon },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "link":
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      geospatial: "جيومكاني",
      business: "أعمال",
      technical: "تقني",
      legal: "قانوني",
      marketing: "تسويق",
    };
    return labels[category] || category;
  };

  const handleDownload = (resource: any) => {
    window.open(resource.url, '_blank');
    toast.success("جاري تحميل المورد");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">مكتبة الموارد</h1>
              <p className="text-muted-foreground">
                موارد تعليمية وأدوات لدعم رحلتك في الابتكار الجيومكاني
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/resource-analytics">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  الإحصائيات
                </Button>
              </Link>
              {user?.role === 'admin' && (
                <Link href="/upload-resource">
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    رفع مورد جديد
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن الموارد..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع المورد" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "الكل" : getCategoryLabel(category)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">لا توجد موارد</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "all" || selectedType !== "all"
                  ? "لم يتم العثور على موارد تطابق معايير البحث"
                  : "لم يتم إضافة أي موارد بعد"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource: any) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getResourceIcon(resource.resourceType)}
                    </div>
                    {resource.category && (
                      <Badge variant="secondary">
                        {getCategoryLabel(resource.category)}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  {resource.description && (
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <RatingDisplay rating={resource.averageRating || 0} count={resource.ratingCount || 0} />
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {resource.downloadCount || 0} تحميل
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(resource)}
                        className="gap-2"
                    >
                      {resource.resourceType === 'link' ? (
                        <>
                          <LinkIcon className="h-4 w-4" />
                          فتح
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          تحميل
                        </>
                      )}
                    </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
