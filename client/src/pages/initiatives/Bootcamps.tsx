/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Bootcamps page with educational and transformative feel
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Award,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

export default function Bootcamps() {
  const programs = [
    {
      title: "معسكر تطوير تطبيقات GIS",
      duration: "8 أسابيع",
      level: "مبتدئ - متوسط",
      description: "تعلم تطوير تطبيقات نظم المعلومات الجغرافية من الصفر",
      topics: [
        "أساسيات GIS والخرائط الرقمية",
        "برمجة تطبيقات الويب الجيومكانية",
        "استخدام ArcGIS و QGIS",
        "تطوير تطبيقات الموبايل الجيومكانية",
      ],
      icon: "🗺️",
    },
    {
      title: "معسكر تحليل البيانات الجيومكانية",
      duration: "6 أسابيع",
      level: "متوسط - متقدم",
      description: "إتقان تحليل ومعالجة البيانات الجيومكانية الضخمة",
      topics: [
        "Python للتحليل الجيومكاني",
        "معالجة الصور الفضائية",
        "التعلم الآلي للبيانات المكانية",
        "تصور البيانات الجيومكانية",
      ],
      icon: "📊",
    },
    {
      title: "معسكر الاستشعار عن بعد",
      duration: "6 أسابيع",
      level: "متوسط - متقدم",
      description: "تقنيات الاستشعار عن بعد وتحليل الصور الجوية والفضائية",
      topics: [
        "أساسيات الاستشعار عن بعد",
        "معالجة الصور متعددة الأطياف",
        "تطبيقات الأقمار الصناعية",
        "تحليل التغيرات الزمنية",
      ],
      icon: "🛰️",
    },
    {
      title: "معسكر ريادة الأعمال الجيومكانية",
      duration: "4 أسابيع",
      level: "جميع المستويات",
      description: "تحويل أفكارك الجيومكانية إلى مشاريع ناجحة",
      topics: [
        "نماذج الأعمال الجيومكانية",
        "التسويق والمبيعات",
        "التمويل والاستثمار",
        "بناء الفريق والقيادة",
      ],
      icon: "💼",
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: "تدريب عملي مكثف",
      description: "70% من المحتوى عملي مع مشاريع حقيقية",
    },
    {
      icon: Users,
      title: "مدربون خبراء",
      description: "تدريب من خبراء الصناعة والأكاديميين المتميزين",
    },
    {
      icon: Award,
      title: "شهادات معتمدة",
      description: "شهادات معتمدة من المعمل وشركاء دوليين",
    },
    {
      icon: Zap,
      title: "أدوات وتقنيات حديثة",
      description: "الوصول لأحدث البرمجيات والتقنيات الجيومكانية",
    },
    {
      icon: Target,
      title: "مشاريع تطبيقية",
      description: "بناء محفظة أعمال قوية من خلال مشاريع حقيقية",
    },
    {
      icon: TrendingUp,
      title: "فرص وظيفية",
      description: "ربط مع شركات توظيف وفرص عمل في القطاع",
    },
  ];

  const schedule = [
    {
      week: "الأسبوع 1-2",
      title: "الأساسيات والمفاهيم",
      description: "بناء أساس قوي في المفاهيم الأساسية",
    },
    {
      week: "الأسبوع 3-4",
      title: "التطبيق العملي",
      description: "تطبيق المفاهيم من خلال مشاريع عملية",
    },
    {
      week: "الأسبوع 5-6",
      title: "المشاريع المتقدمة",
      description: "العمل على مشاريع معقدة ومتكاملة",
    },
    {
      week: "الأسبوع 7-8",
      title: "المشروع النهائي",
      description: "تطوير وعرض المشروع النهائي",
    },
  ];

  const testimonials = [
    {
      name: "أحمد السعيد",
      role: "مطور GIS",
      company: "شركة التقنية الجيومكانية",
      text: "المعسكر غير مساري المهني بالكامل. تعلمت مهارات عملية ساعدتني في الحصول على وظيفة أحلامي.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      name: "نورة المطيري",
      role: "محللة بيانات جيومكانية",
      company: "وزارة البيئة",
      text: "المدربون محترفون والمحتوى عملي جداً. أنصح به بشدة لكل من يريد دخول المجال.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      name: "خالد الدوسري",
      role: "رائد أعمال",
      company: "GeoStartup",
      text: "معسكر ريادة الأعمال ساعدني في تحويل فكرتي إلى شركة ناشئة ناجحة.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
  ];

  const stats = [
    { number: "500+", label: "خريج" },
    { number: "95%", label: "نسبة الرضا" },
    { number: "80%", label: "حصلوا على وظائف" },
    { number: "15+", label: "معسكر سنوياً" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/training-program.png"
            alt="Bootcamps"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <div className="inline-block mb-6">
            <GraduationCap className="w-20 h-20 text-accent mx-auto mb-4" />
            <span className="text-accent font-semibold text-lg">التدريب</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">المعسكرات التدريبية</span> الجيومكانية
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            برامج تدريبية مكثفة لتطوير مهاراتك في التقنيات الجيومكانية
          </p>

          <div className="max-w-4xl mx-auto text-white/90 text-lg leading-relaxed">
            <p>
              المعسكرات التدريبية الجيومكانية هي برامج تعليمية مكثفة تمتد من 4 إلى
              8 أسابيع، مصممة لتزويدك بالمهارات العملية اللازمة للنجاح في القطاع
              الجيومكاني. سواء كنت مبتدئاً أو محترفاً تسعى لتطوير مهاراتك، لدينا
              البرنامج المناسب لك.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">برامجنا</span> التدريبية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر البرنامج الذي يناسب أهدافك ومستواك
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <div className="flex gap-4 mb-4">
                    <span className="text-sm text-accent font-semibold">
                      {program.duration}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {program.level}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm mb-3">
                      المواضيع الرئيسية:
                    </p>
                    {program.topics.map((topic, tIndex) => (
                      <div key={tIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    التفاصيل والتسجيل
                    <ArrowRight className="mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              لماذا <span className="text-accent">معسكراتنا</span>؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مزايا فريدة تجعل معسكراتنا الخيار الأمثل
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">الجدول</span> الزمني النموذجي
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              رحلة تعليمية منظمة ومتدرجة
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {schedule.map((phase, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-lg font-bold mb-4">
                    {phase.week}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">إنجازاتنا</span> بالأرقام
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <p className="text-lg text-primary-foreground/90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ماذا يقول <span className="text-accent">خريجونا</span>؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              قصص نجاح من خريجي معسكراتنا التدريبية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-accent">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Bootcamp CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <Card className="border-border overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-primary text-primary-foreground">
                <h2 className="text-3xl font-bold mb-6">
                  المعسكر <span className="text-accent">القادم</span>
                </h2>
                <h3 className="text-2xl font-semibold mb-6">
                  معسكر تطوير تطبيقات GIS
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-accent" />
                    <span>يبدأ: 1 فبراير 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-accent" />
                    <span>المدة: 8 أسابيع</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-accent" />
                    <span>مقر المعمل - الرياض</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-accent" />
                    <span>30 مقعد متاح</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground w-full glow-cyan"
                >
                  سجل الآن
                  <ArrowRight className="mr-2" />
                </Button>
              </div>
              <div className="p-12 bg-muted/30">
                <h4 className="text-xl font-bold mb-4">ما ستتعلمه:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>تطوير تطبيقات ويب جيومكانية تفاعلية</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>استخدام ArcGIS API و Leaflet</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>تصميم قواعد بيانات جيومكانية</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span>نشر التطبيقات على السحابة</span>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm font-semibold text-accent mb-2">
                    عرض خاص للمسجلين الأوائل
                  </p>
                  <p className="text-sm">
                    خصم 20% على رسوم التسجيل للـ 10 مسجلين الأوائل
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
