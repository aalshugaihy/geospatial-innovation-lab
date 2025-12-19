/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - GeoSandbox: Regulatory sandbox for geospatial innovation
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  FileCheck,
  Scale,
  Lightbulb,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Lock,
  Unlock,
  FileText,
  Target,
  Zap,
  Award,
} from "lucide-react";

export default function GeoSandbox() {
  const benefits = [
    {
      icon: Unlock,
      title: "بيئة تجريبية آمنة",
      description: "اختبر حلولك المبتكرة في بيئة منظمة وآمنة",
    },
    {
      icon: Scale,
      title: "مرونة تنظيمية",
      description: "استثناءات مؤقتة من بعض المتطلبات التنظيمية",
    },
    {
      icon: FileCheck,
      title: "دعم قانوني",
      description: "استشارات قانونية وتنظيمية متخصصة",
    },
    {
      icon: Users,
      title: "تعاون مع الجهات",
      description: "تنسيق مباشر مع الجهات التنظيمية والحكومية",
    },
    {
      icon: TrendingUp,
      title: "تسريع الابتكار",
      description: "تقليل وقت الوصول للسوق والحصول على التراخيص",
    },
    {
      icon: Award,
      title: "شهادة إتمام",
      description: "شهادة رسمية عند إتمام البرنامج بنجاح",
    },
  ];

  const process = [
    {
      step: "1",
      title: "التقديم والتقييم",
      duration: "2-3 أسابيع",
      description: "تقديم الطلب مع وصف تفصيلي للحل المبتكر والتحديات التنظيمية",
      activities: [
        "ملء نموذج التقديم",
        "تقديم خطة العمل",
        "تحديد المتطلبات التنظيمية",
        "التقييم الأولي",
      ],
    },
    {
      step: "2",
      title: "الموافقة والإعداد",
      duration: "2-4 أسابيع",
      description: "مراجعة الطلب والحصول على الموافقات اللازمة",
      activities: [
        "مراجعة لجنة التقييم",
        "التنسيق مع الجهات المعنية",
        "تحديد الاستثناءات المطلوبة",
        "توقيع الاتفاقية",
      ],
    },
    {
      step: "3",
      title: "التنفيذ والاختبار",
      duration: "6-12 شهر",
      description: "تنفيذ الحل في البيئة التجريبية مع مراقبة مستمرة",
      activities: [
        "إطلاق الحل في البيئة التجريبية",
        "جمع البيانات والمقاييس",
        "تقارير دورية",
        "تعديلات وتحسينات",
      ],
    },
    {
      step: "4",
      title: "التقييم والخروج",
      duration: "1-2 شهر",
      description: "تقييم النتائج والانتقال للتشغيل الكامل",
      activities: [
        "تقييم شامل للنتائج",
        "توصيات تنظيمية",
        "الحصول على التراخيص النهائية",
        "الانتقال للسوق",
      ],
    },
  ];

  const eligibility = [
    "شركة ناشئة أو مؤسسة مسجلة في المملكة",
    "حل مبتكر في مجال التقنيات الجيومكانية",
    "وجود تحديات تنظيمية واضحة تعيق الابتكار",
    "خطة عمل واضحة ومؤشرات قابلة للقياس",
    "التزام بالشفافية والتقارير الدورية",
    "استعداد للتعاون مع الجهات التنظيمية",
  ];

  const useCases = [
    {
      title: "خدمات الطائرات بدون طيار",
      description: "اختبار خدمات تجارية جديدة للطائرات بدون طيار",
      icon: "🚁",
      challenge: "متطلبات تنظيمية معقدة للطيران التجاري",
      solution: "بيئة تجريبية محددة مع استثناءات مؤقتة",
    },
    {
      title: "البيانات الجيومكانية الحساسة",
      description: "تطوير خدمات تستخدم بيانات جيومكانية عالية الدقة",
      icon: "🔒",
      challenge: "قيود على استخدام البيانات عالية الدقة",
      solution: "إطار عمل آمن لاستخدام البيانات الحساسة",
    },
    {
      title: "تقنيات الذكاء الاصطناعي",
      description: "تطبيقات AI للتحليل الجيومكاني التلقائي",
      icon: "🤖",
      challenge: "غياب إطار تنظيمي واضح للـ AI",
      solution: "تطوير معايير وإرشادات جديدة",
    },
    {
      title: "الخدمات عبر الحدود",
      description: "خدمات جيومكانية تعمل عبر حدود دولية",
      icon: "🌍",
      challenge: "تعقيدات التنسيق الدولي",
      solution: "نموذج تعاون إقليمي",
    },
  ];

  const successStories = [
    {
      company: "SkyMap Services",
      description: "خدمات مسح جوي بالطائرات بدون طيار",
      achievement: "أول ترخيص تجاري للمسح الجوي بالطائرات بدون طيار",
      duration: "9 أشهر في البرنامج",
    },
    {
      company: "SecureGeo",
      description: "منصة آمنة لمشاركة البيانات الجيومكانية الحساسة",
      achievement: "تطوير إطار عمل جديد لأمن البيانات الجيومكانية",
      duration: "12 شهر في البرنامج",
    },
    {
      company: "AI-Geo Analytics",
      description: "تحليل جيومكاني ذكي باستخدام التعلم الآلي",
      achievement: "أول شهادة لخدمات AI الجيومكانية",
      duration: "10 أشهر في البرنامج",
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
            alt="GeoSandbox"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <div className="inline-block mb-6">
            <Shield className="w-20 h-20 text-accent mx-auto mb-4" />
            <span className="text-accent font-semibold text-lg">
              البيئة التنظيمية
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">GeoSandbox</span>
            <br />
            البيئة التنظيمية الجيومكانية
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            بيئة تجريبية آمنة لاختبار الحلول المبتكرة ضمن إطار تنظيمي مرن
          </p>

          <div className="max-w-4xl mx-auto text-white/90 text-lg leading-relaxed">
            <p>
              GeoSandbox هي مبادرة رائدة توفر بيئة تنظيمية تجريبية للشركات الناشئة
              والمبتكرين في القطاع الجيومكاني. نساعدك على اختبار حلولك المبتكرة في
              بيئة آمنة ومنظمة، مع توفير المرونة التنظيمية اللازمة لتسريع الابتكار
              دون المساس بالمعايير الأمنية والجودة.
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
                ما هي <span className="text-accent">GeoSandbox</span>؟
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  GeoSandbox هي بيئة تنظيمية تجريبية (Regulatory Sandbox) مخصصة
                  للقطاع الجيومكاني، تسمح للشركات الناشئة والمبتكرين باختبار
                  منتجاتهم وخدماتهم الجديدة في بيئة حقيقية ولكن خاضعة للرقابة.
                </p>
                <p>
                  نوفر استثناءات مؤقتة من بعض المتطلبات التنظيمية، مع الحفاظ على
                  الضمانات الأساسية للأمن والخصوصية والجودة. هذا يتيح للمبتكرين
                  التركيز على تطوير حلولهم دون التقيد بالعوائق التنظيمية التقليدية.
                </p>
                <p>
                  البرنامج يستمر من 6 إلى 12 شهراً، حيث نعمل معك بشكل وثيق لفهم
                  التحديات التنظيمية وإيجاد حلول مبتكرة تحقق التوازن بين الابتكار
                  والامتثال.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                >
                  قدم طلبك
                  <ArrowRight className="mr-2" />
                </Button>
                <Button size="lg" variant="outline">
                  دليل البرنامج
                </Button>
              </div>
            </div>

            <div>
              <Card className="border-accent/50 bg-accent/5">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    لماذا GeoSandbox؟
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">تسريع الابتكار</h4>
                        <p className="text-sm text-muted-foreground">
                          تقليل وقت الوصول للسوق من سنوات إلى أشهر
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">بيئة آمنة</h4>
                        <p className="text-sm text-muted-foreground">
                          اختبار الحلول دون مخاطر تنظيمية
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">دعم شامل</h4>
                        <p className="text-sm text-muted-foreground">
                          فريق متخصص لمساعدتك في كل خطوة
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">نتائج ملموسة</h4>
                        <p className="text-sm text-muted-foreground">
                          مسار واضح للحصول على التراخيص النهائية
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">فوائد</span> البرنامج
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مزايا فريدة لتسريع ابتكارك الجيومكاني
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
              <span className="text-accent">آلية</span> العمل
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              عملية واضحة من التقديم إلى الحصول على التراخيص
            </p>
          </div>

          <div className="space-y-8">
            {process.map((stage, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-accent">
                        {stage.step}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{stage.title}</h3>
                      <p className="text-sm text-accent font-semibold">
                        المدة: {stage.duration}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                        {stage.description}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {stage.activities.map((activity, aIndex) => (
                          <div
                            key={aIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">حالات</span> الاستخدام
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أمثلة على الحلول المبتكرة التي يمكن اختبارها
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-destructive mb-1">
                        التحدي:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {useCase.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-accent mb-1">
                        الحل:
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {useCase.solution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/team-collaboration.jpg"
                alt="Eligibility"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-accent">معايير</span> الأهلية
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                للانضمام إلى GeoSandbox، يجب أن تستوفي المعايير التالية:
              </p>

              <div className="space-y-4">
                {eligibility.map((criterion, index) => (
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
                  ابدأ التقديم
                  <ArrowRight className="mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">قصص نجاح</span> من البرنامج
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              شركات نجحت في تجاوز العوائق التنظيمية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{story.company}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {story.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <p className="text-sm font-semibold">{story.achievement}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {story.duration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            هل لديك حل مبتكر <span className="text-accent">يحتاج دعماً</span>{" "}
            تنظيمياً؟
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            انضم إلى GeoSandbox واختبر حلولك في بيئة تنظيمية مرنة وآمنة
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
