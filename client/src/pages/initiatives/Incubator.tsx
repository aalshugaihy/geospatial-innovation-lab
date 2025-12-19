/**
 * Design Philosophy: Geospatial Futuristic
 * - Incubator program page matching InnovationCast's "Incubate" structure
 * - Deep navy, cyber cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  CheckCircle2,
  Clock,
  Users,
  Target,
  TrendingUp,
  Lightbulb,
  Award,
  ArrowRight,
  Rocket,
  Globe,
  Zap,
} from "lucide-react";

export default function Incubator() {
  const benefits = [
    {
      icon: Building2,
      title: "مساحة عمل مجهزة",
      description: "مكاتب ومساحات عمل مشتركة مجهزة بأحدث التقنيات",
    },
    {
      icon: Users,
      title: "إرشاد متخصص",
      description: "مرشدون خبراء في التقنيات الجيومكانية وريادة الأعمال",
    },
    {
      icon: Globe,
      title: "شبكة واسعة",
      description: "الوصول إلى شبكة من الشركاء والمستثمرين",
    },
    {
      icon: Zap,
      title: "أدوات وتقنيات",
      description: "الوصول المجاني لأحدث أدوات GIS والتقنيات الجيومكانية",
    },
    {
      icon: TrendingUp,
      title: "دعم تطوير الأعمال",
      description: "مساعدة في تطوير نموذج العمل واستراتيجية النمو",
    },
    {
      icon: Award,
      title: "فرص التمويل",
      description: "ربط مع مستثمرين وفرص تمويل متنوعة",
    },
  ];

  const process = [
    {
      step: "1",
      title: "التقديم",
      description: "قدم طلبك مع وصف مفصل لفكرتك ورؤيتك",
    },
    {
      step: "2",
      title: "التقييم",
      description: "يتم تقييم الطلبات من قبل لجنة من الخبراء",
    },
    {
      step: "3",
      title: "المقابلة",
      description: "مقابلة شخصية مع الفرق المختارة",
    },
    {
      step: "4",
      title: "القبول",
      description: "الإعلان عن الفرق المقبولة والبدء في البرنامج",
    },
    {
      step: "5",
      title: "الاحتضان",
      description: "فترة احتضان من 6-12 شهراً مع دعم كامل",
    },
    {
      step: "6",
      title: "التخرج",
      description: "التخرج والانتقال إلى المرحلة التالية",
    },
  ];

  const criteria = [
    "فكرة مبتكرة في مجال التقنيات الجيومكانية",
    "فريق متكامل بمهارات متنوعة",
    "رؤية واضحة لحل مشكلة حقيقية",
    "إمكانية التوسع والنمو",
    "التزام بالمشاركة الكاملة في البرنامج",
    "استعداد للتعلم والتطوير المستمر",
  ];

  const successStories = [
    {
      name: "جيوتك",
      founder: "د. أحمد المالكي",
      description: "منصة لتحليل البيانات الجيومكانية باستخدام الذكاء الاصطناعي",
      achievement: "حصلت على تمويل بقيمة 5 مليون ريال",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      name: "MapSmart",
      founder: "سارة العتيبي",
      description: "حلول خرائط ذكية للمدن والتخطيط الحضري",
      achievement: "تعاقدت مع 3 جهات حكومية كبرى",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      name: "GeoGuard",
      founder: "م. خالد الشمري",
      description: "نظام مراقبة وحماية البنية التحتية باستخدام GIS",
      achievement: "توسعت إلى 3 دول في الخليج",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/innovation-hub.png"
            alt="Incubator"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <div className="inline-block mb-6">
            <Building2 className="w-20 h-20 text-accent mx-auto mb-4" />
            <span className="text-accent font-semibold text-lg">الاحتضان</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">حاضنات الأعمال</span> الجيومكانية
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            اختبار الأفكار بسرعة وبأقل تكلفة
          </p>

          <div className="max-w-4xl mx-auto text-white/90 text-lg leading-relaxed">
            <p>
              تعد القدرة على احتضان الأفكار والتعلم منها ونشرها هي العامل الرئيسي
              وراء الابتكار المثمر. الأفكار الطموحة قد تنجح. أو قد لا تنجح... فكيف
              يمكنك معرفة هذا دون إنفاق أموال طائلة؟ لا يمكن أن تتيقن من النتائج
              مسبقاً. لكن يمكنك تزويد فريقك بالأدوات المناسبة والعمليات والهيكل
              لتمكينهم من إجراء التجارب واستخلاص الدروس المستفادة بسرعة وبأقل تكلفة.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                ما هي <span className="text-accent">حاضنة الأعمال</span>؟
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  حاضنة الأعمال الجيومكانية هي برنامج شامل يوفر بيئة داعمة للشركات
                  الناشئة في مراحلها الأولى. نوفر كل ما تحتاجه لتحويل فكرتك إلى
                  منتج قابل للتطبيق في السوق.
                </p>
                <p>
                  خلال فترة الاحتضان التي تتراوح بين 6-12 شهراً، ستحصل على مساحة
                  عمل مجهزة، إرشاد متخصص، وصول لأحدث التقنيات، وشبكة واسعة من
                  الشركاء والمستثمرين.
                </p>
                <p>
                  نركز على مساعدتك في بناء نموذج عمل مستدام، تطوير منتجك، واختبار
                  فرضياتك في السوق بأقل تكلفة وأسرع وقت ممكن.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                >
                  قدم الآن
                  <ArrowRight className="mr-2" />
                </Button>
                <Button size="lg" variant="outline">
                  تحميل الدليل
                </Button>
              </div>
            </div>

            <div>
              <img
                src="/images/innovation-hub.png"
                alt="Incubator Program"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ماذا <span className="text-accent">ستحصل</span> عليه؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مجموعة شاملة من الخدمات والموارد لدعم نمو مشروعك
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

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">آلية</span> الانضمام
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              عملية واضحة وشفافة للانضمام إلى برنامج الحاضنة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 relative"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-accent">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-4 w-8 h-0.5 bg-accent/30"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/team-collaboration.jpg"
                alt="Criteria"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-accent">معايير</span> القبول
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                نبحث عن فرق متحمسة ومبتكرة تمتلك أفكاراً واعدة في مجال التقنيات
                الجيومكانية. إليك المعايير الأساسية للقبول:
              </p>

              <div className="space-y-4">
                {criteria.map((criterion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground text-lg">{criterion}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                >
                  ابدأ التقديم الآن
                  <ArrowRight className="mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">قصص نجاح</span> من الحاضنة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              شركات ناشئة بدأت رحلتها في حاضنتنا وحققت نجاحات ملموسة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                  <p className="text-accent text-sm mb-3">{story.founder}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Award className="w-4 h-4" />
                    <span>{story.achievement}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">الجدول الزمني</span> للبرنامج
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        المدة: 6-12 شهراً
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        مدة البرنامج مرنة حسب احتياجات كل مشروع ومدى تقدمه
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Rocket className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        فترة التقديم: مفتوحة على مدار العام
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        نستقبل الطلبات بشكل مستمر مع دفعات قبول كل 3 أشهر
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        الدفعة القادمة: يناير 2025
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        آخر موعد للتقديم: 15 ديسمبر 2024
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            هل أنت مستعد <span className="text-accent">لبدء رحلتك</span>؟
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            انضم إلى حاضنة الأعمال الجيومكانية وحول فكرتك إلى مشروع ناجح
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
              تحدث مع مستشار
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
