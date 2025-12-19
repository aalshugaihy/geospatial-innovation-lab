/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Blog page with articles and insights
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  User,
  ArrowRight,
  Tag,
  Search,
} from "lucide-react";

export default function Blog() {
  const featuredPost = {
    title: "مستقبل التقنيات الجيومكانية في المملكة",
    excerpt: "نظرة شاملة على التطورات المتوقعة في القطاع الجيومكاني وكيف ستشكل مستقبل التنمية في المملكة العربية السعودية",
    author: "د. محمد العمري",
    date: "15 ديسمبر 2024",
    category: "رؤى",
    readTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
  };

  const posts = [
    {
      title: "كيف تبدأ مشروعك الجيومكاني الناجح",
      excerpt: "دليل شامل للمبتدئين في ريادة الأعمال الجيومكانية",
      author: "أحمد السعيد",
      date: "10 ديسمبر 2024",
      category: "ريادة الأعمال",
      readTime: "5 دقائق",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      title: "الذكاء الاصطناعي في التحليل الجيومكاني",
      excerpt: "كيف يغير الذكاء الاصطناعي طريقة تحليلنا للبيانات المكانية",
      author: "نورة المطيري",
      date: "5 ديسمبر 2024",
      category: "تقنية",
      readTime: "7 دقائق",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    },
    {
      title: "قصة نجاح: من فكرة إلى شركة ناشئة",
      excerpt: "رحلة أحد خريجي حاضنة الأعمال في بناء شركته الناجحة",
      author: "خالد الدوسري",
      date: "1 ديسمبر 2024",
      category: "قصص نجاح",
      readTime: "6 دقائق",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
    },
    {
      title: "أفضل الممارسات في تطوير تطبيقات GIS",
      excerpt: "نصائح وإرشادات من خبراء الصناعة لتطوير تطبيقات فعالة",
      author: "سارة العتيبي",
      date: "28 نوفمبر 2024",
      category: "تطوير",
      readTime: "10 دقائق",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      title: "الاستشعار عن بعد: التطبيقات والفرص",
      excerpt: "استكشاف التطبيقات المتنوعة للاستشعار عن بعد في مختلف القطاعات",
      author: "د. فهد الشمري",
      date: "25 نوفمبر 2024",
      category: "تقنية",
      readTime: "8 دقائق",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
    },
    {
      title: "التمويل والاستثمار في الشركات الجيومكانية",
      excerpt: "دليل شامل لجذب المستثمرين وتأمين التمويل لمشروعك",
      author: "عبدالله القحطاني",
      date: "20 نوفمبر 2024",
      category: "ريادة الأعمال",
      readTime: "9 دقائق",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
  ];

  const categories = ["الكل", "تقنية", "ريادة الأعمال", "قصص نجاح", "رؤى", "تطوير"];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/innovation-hub.png"
            alt="Blog"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">المدونة</span> والمقالات
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            رؤى، أخبار، ومقالات متخصصة في القطاع الجيومكاني
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  className="w-full pr-10 pl-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-accent hover:bg-accent/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container">
          <Card className="overflow-hidden border-border hover:border-accent transition-all duration-300 group">
            <div className="grid md:grid-cols-2">
              <div className="relative h-96 md:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    مميز
                  </span>
                </div>
              </div>
              <CardContent className="p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 w-fit">
                  {featuredPost.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-fit">
                  اقرأ المزيد
                  <ArrowRight className="mr-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">
              أحدث <span className="text-accent">المقالات</span>
            </h2>
            <p className="text-muted-foreground">
              تابع آخر المقالات والرؤى في القطاع الجيومكاني
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent font-semibold">
                      {post.readTime}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-accent/80"
                    >
                      اقرأ المزيد
                      <ArrowRight className="mr-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              تحميل المزيد من المقالات
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            اشترك في <span className="text-accent">النشرة البريدية</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            احصل على أحدث المقالات والأخبار مباشرة في بريدك الإلكتروني
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
            >
              اشترك
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
