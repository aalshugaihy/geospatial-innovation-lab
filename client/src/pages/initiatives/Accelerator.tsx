/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Accelerator program page matching InnovationCast's structure
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket,
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
  Zap,
  Award,
  ArrowRight,
  DollarSign,
  LineChart,
  Briefcase,
  Globe,
} from "lucide-react";

export default function Accelerator() {
  const benefits = [
    {
      icon: DollarSign,
      title: "تمويل أولي",
      description: "تمويل يصل إلى 500,000 ريال لتسريع نمو مشروعك",
    },
    {
      icon: Users,
      title: "إرشاد مكثف",
      description: "جلسات إرشادية أسبوعية مع خبراء الصناعة والمستثمرين",
    },
    {
      icon: LineChart,
      title: "تسريع النمو",
      description: "برنامج مكثف لمدة 3-6 أشهر لتسريع نمو الأعمال",
    },
    {
      icon: Globe,
      title: "شبكة عالمية",
      description: "الوصول إلى شبكة من المستثمرين والشركاء الدوليين",
    },
    {
      icon: Briefcase,
      title: "فرص استثمارية",
      description: "عرض مشروعك أمام مستثمرين محليين ودوليين",
    },
    {
      icon: Award,
      title: "شهادة معتمدة",
      description: "شهادة إتمام البرنامج معتمدة من المعمل",
    },
  ];

  const stages = [
    {
      stage: "المرحلة 1",
      title: "التقييم والقبول",
      duration: "أسبوعان",
      description: "تقييم شامل للمشروع والفريق وإمكانيات النمو",
      activities: [
        "تقديم الطلب والوثائق",
        "مقابلات مع لجنة التقييم",
        "تحليل السوق والمنافسة",
        "تقييم الجدوى المالية",
      ],
    },
    {
      stage: "المرحلة 2",
      title: "التحضير والتخطيط",
      duration: "4 أسابيع",
      description: "وضع خطة عمل مفصلة واستراتيجية النمو",
      activities: [
        "ورش عمل استراتيجية",
        "تطوير نموذج العمل",
        "تحديد مؤشرات الأداء",
        "بناء خطة التسويق",
      ],
    },
    {
      stage: "المرحلة 3",
      title: "التنفيذ والتطوير",
      duration: "8-12 أسبوع",
      description: "تنفيذ الخطة وتطوير المنتج والوصول للسوق",
      activities: [
        "تطوير المنتج/الخدمة",
        "اختبار السوق",
        "بناء قاعدة العملاء",
        "تحسين العمليات",
      ],
    },
    {
      stage: "المرحلة 4",
      title: "التوسع والاستثمار",
      duration: "4 أسابيع",
      description: "التحضير لجولة التمويل والتوسع",
      activities: [
        "إعداد عرض المستثمرين",
        "Demo Day",
        "لقاءات مع المستثمرين",
        "التفاوض والإغلاق",
      ],
    },
  ];

  const criteria = [
    "شركة ناشئة مسجلة رسمياً",
    "منتج أو خدمة جاهزة (MVP) على الأقل",
    "عملاء أو مستخدمين فعليين",
    "إيرادات أولية أو نموذج واضح لتحقيق الإيرادات",
    "فريق متفرغ ومتكامل",
    "إمكانية التوسع والنمو السريع",
    "استعداد لتخصيص 3-6 أشهر كاملة للبرنامج",
  ];

  const successMetrics = [
    {
      metric: "85%",
      title: "نسبة النجاح",
      description: "من الشركات المتخرجة حصلت على تمويل",
    },
    {
      metric: "12x",
      title: "معدل النمو",
      description: "متوسط نمو الإيرادات خلال البرنامج",
    },
    {
      metric: "50M+",
      title: "ريال سعودي",
      description: "إجمالي التمويلات التي حصلت عليها الشركات",
    },
    {
      metric: "30+",
      title: "شركة متخرجة",
      description: "عدد الشركات التي أكملت البرنامج بنجاح",
    },
  ];

  const alumni = [
    {
      name: "GeoVision AI",
      founder: "د. محمد العمري",
      description: "منصة ذكاء اصطناعي لتحليل الصور الجوية والفضائية",
      funding: "15 مليون ريال - Series A",
      growth: "نمو 20x في الإيرادات",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    },
    {
      name: "SmartCity Maps",
      founder: "نورة الدوسري",
      description: "حلول خرائط ذكية للمدن والبنية التحتية",
      funding: "8 مليون ريال - Seed Round",
      growth: "توسعت إلى 5 دول",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
    },
    {
      name: "AgriGeo",
      founder: "م. سعد الشهري",
      description: "تقنيات جيومكانية للزراعة الذكية",
      funding: "10 مليون ريال - Series A",
      growth: "أكثر من 500 مزرعة مشتركة",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
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
            src="/images/business-accelerator.png"
            alt="Accelerator"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <div className="inline-block mb-6">
            <Rocket className="w-20 h-20 text-accent mx-auto mb-4" />
            <span className="text-accent font-semibold text-lg">التسريع</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">مسرعات الأعمال</span> الجيومكانية
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            تسريع نمو الشركات الناشئة من خلال برنامج مكثف وتمويل ودعم استثماري
          </p>

          <div className="max-w-4xl mx-auto text-white/90 text-lg leading-relaxed">
            <p>
              مسرعة الأعمال الجيومكانية هي برنامج مكثف مصمم للشركات الناشئة التي
              تجاوزت مرحلة الفكرة وتمتلك منتجاً جاهزاً وتسعى للنمو السريع والتوسع.
              نوفر تمويلاً أولياً، إرشاداً مكثفاً، وفرصاً استثمارية لتسريع نمو
              مشروعك وتحقيق أهدافك الطموحة.
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
                ما هي <span className="text-accent">مسرعة الأعمال</span>؟
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  مسرعة الأعمال هي برنامج مكثف يستمر من 3 إلى 6 أشهر، مصمم خصيصاً
                  للشركات الناشئة في القطاع الجيومكاني التي تمتلك منتجاً قابلاً
                  للتطبيق وتسعى للنمو السريع.
                </p>
                <p>
                  على عكس حاضنات الأعمال التي تركز على المراحل الأولى، تستهدف
                  المسرعة الشركات الجاهزة للتوسع والتي تحتاج إلى دفعة قوية لتحقيق
                  النمو الأسي.
                </p>
                <p>
                  نوفر تمويلاً يصل إلى 500,000 ريال، إرشاداً مكثفاً من خبراء
                  الصناعة، وفرصة للعرض أمام مستثمرين محليين ودوليين في يوم العرض
                  النهائي (Demo Day).
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
                  تحميل البروشور
                </Button>
              </div>
            </div>

            <div>
              <img
                src="/images/business-accelerator.png"
                alt="Accelerator Program"
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
              ماذا <span className="text-accent">نقدم</span> لك؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مجموعة شاملة من الموارد والدعم لتسريع نمو شركتك الناشئة
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

      {/* Program Stages */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">مراحل</span> البرنامج
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              رحلة منظمة من التقييم إلى التمويل
            </p>
          </div>

          <div className="space-y-8">
            {stages.map((stage, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-lg font-bold mb-2">
                        {stage.stage}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        المدة: {stage.duration}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {stage.description}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {stage.activities.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
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
                نبحث عن شركات ناشئة جادة ومستعدة للنمو السريع. إليك المعايير
                الأساسية:
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
                  تحقق من الأهلية
                  <ArrowRight className="mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">نتائج</span> مثبتة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أرقام تعكس نجاح برنامج المسرعة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((item, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-accent mb-2">
                    {item.metric}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">خريجو</span> المسرعة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              شركات حققت نجاحات استثنائية بعد إتمام البرنامج
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {alumni.map((company, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
                  <p className="text-accent text-sm mb-3">{company.founder}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {company.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>{company.funding}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                      <TrendingUp className="w-4 h-4" />
                      <span>{company.growth}</span>
                    </div>
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
            هل أنت مستعد <span className="text-accent">للتسريع</span>؟
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            انضم إلى مسرعة الأعمال الجيومكانية وحقق نمواً أسياً لشركتك الناشئة
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
              احجز استشارة مجانية
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
