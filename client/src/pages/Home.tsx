/**
 * Design Philosophy: Geospatial Futuristic
 * - Layered sections mimicking GIS layers
 * - Deep navy (#0A1628), cyber cyan (#00F5A0), golden (#FFB800)
 * - Smooth map-like navigation and parallax effects
 * - Geometric shapes inspired by coordinates and maps
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket,
  TrendingUp,
  Code,
  GraduationCap,
  Users,
  Target,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Award,
} from "lucide-react";

export default function Home() {
  const initiatives = [
    {
      icon: Rocket,
      title: "حاضنات الأعمال",
      description: "نوفر بيئة داعمة للشركات الناشئة في مجال التقنيات الجيومكانية مع توفير الإرشاد والموارد اللازمة للنمو.",
      image: "/images/innovation-hub.png",
      color: "accent",
    },
    {
      icon: TrendingUp,
      title: "مسرعات الأعمال",
      description: "برامج مكثفة لتسريع نمو الشركات الناشئة وتطوير نماذج أعمالها في القطاع الجيومكاني.",
      image: "/images/business-accelerator.png",
      color: "secondary",
    },
    {
      icon: Code,
      title: "الهاكاثونات الجيومكانية",
      description: "فعاليات تنافسية تجمع المبدعين والمطورين لابتكار حلول جيومكانية مبتكرة خلال فترة زمنية محددة.",
      image: "/images/hackathon-event.png",
      color: "accent",
    },
    {
      icon: GraduationCap,
      title: "المعسكرات التدريبية",
      description: "برامج تدريبية مكثفة لتطوير المهارات التقنية في مجال نظم المعلومات الجغرافية والتقنيات الجيومكانية.",
      image: "/images/training-program.png",
      color: "secondary",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "مجتمع نشط",
      description: "انضم إلى شبكة من المبتكرين والخبراء في المجال الجيومكاني",
    },
    {
      icon: Target,
      title: "أهداف واضحة",
      description: "برامج مصممة بعناية لتحقيق أهداف محددة وقابلة للقياس",
    },
    {
      icon: Zap,
      title: "تقنيات متقدمة",
      description: "الوصول إلى أحدث التقنيات والأدوات في المجال الجيومكاني",
    },
    {
      icon: Globe,
      title: "شراكات عالمية",
      description: "تعاون مع مؤسسات وشركات رائدة على المستوى المحلي والعالمي",
    },
  ];

  const stats = [
    { number: "500+", label: "مشارك" },
    { number: "50+", label: "مشروع ناجح" },
    { number: "20+", label: "شريك استراتيجي" },
    { number: "15+", label: "فعالية سنوياً" },
  ];

  const upcomingEvents = [
    {
      title: "هاكاثون الخرائط الذكية 2024",
      date: "15-17 يناير 2024",
      type: "هاكاثون",
      participants: "200 مشارك",
    },
    {
      title: "معسكر تطوير تطبيقات GIS",
      date: "1-14 فبراير 2024",
      type: "معسكر تدريبي",
      participants: "50 مشارك",
    },
    {
      title: "برنامج تسريع الشركات الناشئة",
      date: "1 مارس - 31 مايو 2024",
      type: "مسرع أعمال",
      participants: "10 شركات",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/hero-background.png"
            alt="Geospatial Innovation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        {/* Content */}
        <div className="container relative z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
              <span className="text-accent font-semibold text-sm">
                منصة الابتكار الجيومكاني الرائدة
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
              معمل الابتكار
              <br />
              <span className="text-accent">الجيومكاني</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              نمكّن المبتكرين والشركات الناشئة من تحويل أفكارهم إلى واقع من خلال
              حاضنات الأعمال، المسرعات، الهاكاثونات والمعسكرات التدريبية المتخصصة
              في التقنيات الجيومكانية
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
              >
                ابدأ رحلتك الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
              >
                استكشف المبادرات
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              عن <span className="text-accent">معمل الابتكار</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              معمل الابتكار الجيومكاني هو منصة متكاملة تهدف إلى تعزيز الابتكار في
              القطاع الجيومكاني من خلال توفير بيئة داعمة للمبتكرين والشركات الناشئة.
              نقدم مجموعة شاملة من البرامج والمبادرات التي تساعد على تحويل الأفكار
              الإبداعية إلى حلول عملية تخدم المجتمع والاقتصاد.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:glow-cyan group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">مبادراتنا</span> الرائدة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة متنوعة من المبادرات المصممة لدعم الابتكار في كل مرحلة من
              مراحل رحلتك الريادية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border hover:border-accent transition-all duration-500 group hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-accent rounded-lg flex items-center justify-center glow-cyan">
                    <initiative.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {initiative.description}
                  </p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                  >
                    اعرف المزيد
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              الفعاليات <span className="text-secondary">القادمة</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              انضم إلى فعالياتنا القادمة وكن جزءاً من مجتمع الابتكار الجيومكاني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:glow-golden group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{event.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">{event.participants}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-all"
                  >
                    سجل الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              هل أنت مستعد لبدء رحلة <span className="text-accent">الابتكار</span>؟
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed">
              انضم إلى معمل الابتكار الجيومكاني اليوم واحصل على الدعم والموارد اللازمة
              لتحويل فكرتك إلى واقع ملموس
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
              >
                تواصل معنا
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
              >
                حمّل دليل المبادرات
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
              {[
                "دعم شامل من خبراء المجال",
                "وصول إلى أحدث التقنيات",
                "شبكة واسعة من الشركاء",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
