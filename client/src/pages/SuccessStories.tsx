/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Success Stories page with inspiring case studies
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsMapEnhanced from "@/components/ProjectsMapEnhanced";
import {
  Award,
  TrendingUp,
  Users,
  Rocket,
  ArrowRight,
  Quote,
} from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      company: "GeoTech Solutions",
      founder: "أحمد السعيد",
      program: "حاضنة الأعمال",
      year: "2023",
      description: "منصة ذكية لإدارة البنية التحتية باستخدام التقنيات الجيومكانية",
      achievement: "جمع تمويل بقيمة 5 مليون ريال",
      metrics: [
        { label: "العملاء", value: "50+" },
        { label: "الموظفون", value: "25" },
        { label: "النمو السنوي", value: "300%" },
      ],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      logo: "🗺️",
      quote: "المعمل ساعدنا في تحويل فكرتنا إلى شركة ناجحة. الدعم الفني والإرشاد كان لا يقدر بثمن.",
    },
    {
      company: "SkyMap Services",
      founder: "نورة المطيري",
      program: "GeoSandbox",
      year: "2024",
      description: "خدمات مسح جوي متقدمة باستخدام الطائرات بدون طيار",
      achievement: "أول ترخيص تجاري للمسح الجوي في المملكة",
      metrics: [
        { label: "المشاريع", value: "100+" },
        { label: "الإيرادات", value: "3M+" },
        { label: "التوسع", value: "5 مدن" },
      ],
      image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=800&h=600&fit=crop",
      logo: "🚁",
      quote: "GeoSandbox أزال جميع العوائق التنظيمية. الآن نحن رواد في مجالنا.",
    },
    {
      company: "AgriGeo Analytics",
      founder: "خالد الدوسري",
      program: "مسرعة الأعمال",
      year: "2023",
      description: "حلول تحليلية للزراعة الذكية باستخدام الاستشعار عن بعد",
      achievement: "شراكة مع وزارة البيئة والمياه والزراعة",
      metrics: [
        { label: "المزارع", value: "200+" },
        { label: "الهكتارات", value: "50K+" },
        { label: "التوفير", value: "30%" },
      ],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
      logo: "🌾",
      quote: "برنامج المسرعة ساعدنا في التوسع بسرعة والوصول إلى شركاء استراتيجيين.",
    },
    {
      company: "Urban Intelligence",
      founder: "سارة العتيبي",
      program: "حاضنة الأعمال",
      year: "2024",
      description: "منصة تحليلات ذكية للمدن باستخدام البيانات الجيومكانية",
      achievement: "عقود مع 3 بلديات كبرى",
      metrics: [
        { label: "المدن", value: "3" },
        { label: "المستخدمون", value: "1000+" },
        { label: "البيانات", value: "10TB+" },
      ],
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      logo: "🏙️",
      quote: "المعمل وفر لنا البنية التحتية والخبرات التي احتجناها للنجاح.",
    },
  ];

  const stats = [
    { number: "50+", label: "شركة ناشئة", icon: Rocket },
    { number: "200M+", label: "ريال تمويل", icon: TrendingUp },
    { number: "500+", label: "وظيفة جديدة", icon: Users },
    { number: "95%", label: "معدل النجاح", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/innovation-hub.png"
            alt="Success Stories"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">قصص النجاح</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            شركات ناشئة نجحت في تحويل أفكارها إلى مشاريع مؤثرة
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-24">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <Card className="overflow-hidden border-border hover:border-accent transition-all duration-300">
                    <div className="relative h-80">
                      <img
                        src={story.image}
                        alt={story.company}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                      <div className="absolute bottom-6 right-6 text-6xl">
                        {story.logo}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-3 gap-4">
                        {story.metrics.map((metric, mIndex) => (
                          <div key={mIndex} className="text-center">
                            <div className="text-2xl font-bold text-accent mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                    {story.program} • {story.year}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{story.company}</h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {story.description}
                  </p>
                  <div className="flex items-start gap-3 mb-6">
                    <Award className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-lg">{story.achievement}</p>
                      <p className="text-sm text-muted-foreground">
                        المؤسس: {story.founder}
                      </p>
                    </div>
                  </div>
                  <Card className="bg-muted/30 border-accent/20">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-accent mb-4" />
                      <p className="text-muted-foreground italic leading-relaxed">
                        "{story.quote}"
                      </p>
                      <p className="text-sm font-semibold mt-4">
                        - {story.founder}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            هل أنت مستعد لتكون <span className="text-accent">قصة النجاح</span>{" "}
            القادمة؟
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            انضم إلى برامجنا وحول فكرتك إلى مشروع ناجح
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
            >
              قدم طلبك الآن
              <ArrowRight className="mr-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-accent">خريطة</span> المشاريع الناجحة
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              اكتشف توزيع الشركات الناشئة الجيومكانية عبر المملكة
            </p>
          </div>
          <ProjectsMapEnhanced />
        </div>
      </section>

      <Footer />
    </div>
  );
}
