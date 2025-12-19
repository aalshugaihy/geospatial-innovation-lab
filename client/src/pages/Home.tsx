/**
 * Design Philosophy: Geospatial Futuristic
 * - Comprehensive structure matching InnovationCast reference
 * - Deep navy (#0A1628), cyber cyan (#00F5A0), golden (#FFB800)
 * - Multiple sections: hero, partners, audience, pillars, stats, testimonials, initiatives, use cases, blog
 */

import { useAuth } from "@/_core/hooks/useAuth";
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
  Building2,
  Lightbulb,
  Network,
  Search,
  FileText,
  Telescope,
  Quote,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const partners = [
    "ESRI", "SAP", "Oracle", "Trimble", "Hexagon", "Bentley Systems"
  ];

  const targetAudience = [
    {
      icon: Rocket,
      title: "رواد الأعمال والشركات الناشئة",
      description: "لا تضيع وقتك في البحث عن الموارد. احصل على الدعم الكامل لتحويل فكرتك إلى مشروع ناجح. ركز على الأمر الأكثر أهمية: وهو بناء منتجك وتطوير أعمالك.",
      image: "/images/innovation-hub.png",
    },
    {
      icon: Code,
      title: "المطورون والمبرمجون",
      description: "يمكنك إيجاد ما يصلح لك وتسريع تطويره. يمكنك تجربة أفكارك الإبداعية والتخلص من العوائق. يمكنك الوصول إلى أحدث التقنيات الجيومكانية والأدوات المتطورة لبناء حلول مبتكرة.",
      image: "/images/hackathon-event.png",
    },
    {
      icon: GraduationCap,
      title: "الباحثون والأكاديميون",
      description: "إنك لست مكلفاً بالتطوير التجاري بشكل مباشر ولكنه جزء من رؤيتك. باستخدام معمل الابتكار الجيومكاني سيكون بمقدورك تحويل أبحاثك إلى تطبيقات عملية تخدم المجتمع.",
      image: "/images/training-program.png",
    },
  ];

  const pillars = [
    {
      icon: Building2,
      title: "البنية التحتية",
      description: "سوف نوفر لك بنية تحتية متكاملة من مساحات عمل مجهزة، معامل تقنية، وأدوات جيومكانية متقدمة. لا تبدأ من الصفر. ابدأ ببنية تحتية جاهزة مستوحاة من أفضل الممارسات العالمية والتي يمكن تخصيصها حسب احتياجاتك في وقت قياسي.",
      image: "/images/innovation-workspace.webp",
    },
    {
      icon: Users,
      title: "الإرشاد والتوجيه",
      description: "معمل الابتكار الجيومكاني يساعد في بناء القدرات والمهارات والأفكار المناسبة. فهو يساعد في جذب الخبراء المناسبين وتدريبهم وإشراكهم في أنشطة الابتكار لديك. يمكنك الاستفادة من خبراء بواقع 10-100 ضعف ومساعدتهم على الإسهام في نجاحك بطرق هادفة.",
      image: "/images/team-collaboration.jpg",
    },
    {
      icon: Network,
      title: "الشبكة والشراكات",
      description: "معمل الابتكار الجيومكاني سيكون بمثابة مركز الابتكار في القطاع حيث يتواصل الأفراد والمؤسسات من خلاله للتعاون في توليد أفكار وتحويلها إلى واقع. وسوف تساعدك شبكتنا الواسعة على التواصل مع الشركاء والمستثمرين بسرعة وسهولة.",
      image: "/images/partners-logos.jpg",
    },
  ];

  const stats = [
    {
      number: "10x",
      title: "زيادة في معدل النجاح",
      description: "تفيد الشركات الناشئة التي انضمت للمعمل أنها شهدت زيادة كبيرة في معدل نجاح مشاريعها وصلت إلى 10 أضعاف مقارنة بالعمل المنفرد.",
    },
    {
      number: "5x",
      title: "أسرع في الوصول للسوق",
      description: "أفضل المنتجات تصل للسوق بسرعة من خلال دعم الخبراء وتوفير الموارد. تمتع بتسريع تطوير منتجك على النحو الذي تستحقه.",
    },
    {
      number: "60%",
      title: "من الوقت تم توفيره في التطوير",
      description: "يصرح رواد الأعمال أنهم شهدوا توفيرات في الوقت غير معقولة من خلال الوصول السريع للموارد والخبرات. وهذا الأمر وحده يثبت قيمة الانضمام.",
    },
    {
      number: "ملايين",
      title: "حرفياً، في الاستثمارات والتمويل",
      description: "التمويل الجديد وزيادة الاستثمارات وجذب الشركاء. يفيد مستفيدونا أنهم حققوا ملايين الريالات في المراحل الأولى والنهائية.",
    },
    {
      number: "8x",
      title: "أسرع في تنفيذ المشاريع",
      description: "توجد حلول أخرى تزعم أنها توفر درجة عالية من الدعم. ولكنها قد تستغرق فترة طويلة. نحن نوفر دعماً فورياً ومرناً.",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "يمكنك البدء في غضون أيام وليس شهور",
      description: "ركز على الأمر الأكثر أهمية: وهو بناء منتجك وتطوير أعمالك. لا توجد صعوبات في البدء.",
    },
    {
      icon: Target,
      title: "تجربة مخصصة حسب احتياجاتك",
      description: "يمكن تعديل البرامج حسب احتياجاتك دون تكاليف إضافية. يمكن تهيئتها وإعدادها بسرعة.",
    },
    {
      icon: Lightbulb,
      title: "من الفكرة إلى تحقيق القيمة",
      description: "كل ما تحتاجه من أجل اكتشاف الفرص واحتضانها وتحويلها إلى واقع. في مكان واحد.",
    },
    {
      icon: Users,
      title: "تعاون هادف",
      description: "الأفكار يتم توليدها ورعايتها بواسطة المجتمع. تحفيز التعاون في كل اتجاه.",
    },
    {
      icon: Award,
      title: "خبرة تزيد عن 10 أعوام",
      description: "برامج وورش عمل للابتكار الجيومكاني. سهل الانضمام والاستفادة.",
    },
    {
      icon: CheckCircle2,
      title: "نقدم يد العون طول الطريق",
      description: "مشورة ودعم عملي غير مسبوق من خبراء القطاع.",
    },
  ];

  const initiatives = [
    {
      icon: Building2,
      title: "حاضنات الأعمال",
      subtitle: "الاحتضان",
      description: "نوفر بيئة داعمة للشركات الناشئة في مجال التقنيات الجيومكانية مع توفير الإرشاد والموارد اللازمة للنمو المستدام.",
      details: "تعد القدرة على احتضان الأفكار والتعلم منها ونشرها هي العامل الرئيسي وراء الابتكار المثمر. الأفكار الطموحة قد تنجح. أو قد لا تنجح... فكيف يمكنك معرفة هذا دون إنفاق أموال طائلة؟ نوفر لك البيئة والأدوات المناسبة.",
      link: "/initiatives/incubator",
      image: "/images/innovation-hub.png",
    },
    {
      icon: TrendingUp,
      title: "مسرعات الأعمال",
      subtitle: "التسريع",
      description: "برامج مكثفة لتسريع نمو الشركات الناشئة وتطوير نماذج أعمالها في القطاع الجيومكاني بشكل احترافي.",
      details: "الغالبية العظمى من الأفكار الابتكارية تحتاج للدعم. نعلم جميعاً هذا الأمر. ولهذا السبب أنت بحاجة إلى استراتيجية تسريع مرنة: من شأنها تعديل الدعم باستمرار بناءً على التقدم والقيمة المحتملة.",
      link: "/initiatives/accelerator",
      image: "/images/business-accelerator.png",
    },
    {
      icon: Code,
      title: "الهاكاثونات الجيومكانية",
      subtitle: "الاكتشاف والانتقاء",
      description: "فعاليات تنافسية تجمع المبدعين والمطورين لابتكار حلول جيومكانية مبتكرة خلال فترة زمنية محددة.",
      details: "يمكنك التقاط الأفكار المبتكرة التي قد تؤثر على القطاع. تسمح الهاكاثونات بسرعة تبادل الأفكار بين الأفراد. يستطيع أي فرد الاعتماد على أفكار الآخر والبناء عليها.",
      link: "/initiatives/hackathons",
      image: "/images/hackathon-event.png",
    },
    {
      icon: GraduationCap,
      title: "المعسكرات التدريبية",
      subtitle: "بناء القدرات",
      description: "برامج تدريبية مكثفة لتطوير المهارات التقنية في مجال نظم المعلومات الجغرافية والتقنيات الجيومكانية.",
      details: "العثور على المهارات التي تحفز على الابتكار. اسمح للمشاركين بتحديد الفرص وتطوير المهارات اللازمة لتحويلها إلى واقع من خلال برامج تدريبية متخصصة.",
      link: "/initiatives/bootcamps",
      image: "/images/training-program.png",
    },
  ];

  const useCases = [
    {
      icon: Users,
      title: "ابتكار رواد الأعمال",
      description: "يجب مشاركة رواد الأعمال في الابتكار التعاوني.",
    },
    {
      icon: Globe,
      title: "إتاحة فرص الابتكار",
      description: "عليك إتاحة الفرص أمام المبتكرين للابتكار.",
    },
    {
      icon: Network,
      title: "شبكات الابتكار",
      description: "يجب إنشاء مراكز أو قواعد للابتكار الجيومكاني.",
    },
    {
      icon: Lightbulb,
      title: "التعهيد الجماعي للأفكار",
      description: "احصل على الأفكار من المجتمع والشركاء.",
    },
    {
      icon: Search,
      title: "فحص البيئة",
      description: "يجب معرفة بيئة العمل الداخلية والخارجية.",
    },
    {
      icon: Telescope,
      title: "رصد التقنيات",
      description: "اكتشف التقنيات الجديدة والخبرات ذات الرؤية.",
    },
  ];

  const testimonials = [
    {
      name: "د. أحمد المالكي",
      role: "مؤسس شركة جيوتك",
      company: "GeoTech Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "معمل الابتكار الجيومكاني نجح في تحويل فكرتنا إلى واقع! إنها خطوة كبيرة للأمام في عملية الابتكار ومشاركة المجتمع. الدعم الذي حصلنا عليه كان استثنائياً.",
    },
    {
      name: "سارة العتيبي",
      role: "مديرة التطوير",
      company: "MapSmart",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "تمت إدارة عشرات المشاريع الجيومكانية، مما أثر بشكل إيجابي على أكثر من 5 قطاعات. المعمل نجح في تحسين صنع القرار لدينا من خلال الإرشاد والدعم المستمر.",
    },
  ];

  const blogPosts = [
    {
      title: "مستقبل التقنيات الجيومكانية في المملكة",
      category: "تقنية",
      excerpt: "استكشف كيف تساهم التقنيات الجيومكانية في تحقيق رؤية 2030 وتطوير البنية التحتية الذكية.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      author: "فريق المعمل",
    },
    {
      title: "كيف تبدأ مشروعك الجيومكاني الناجح",
      category: "ريادة أعمال",
      excerpt: "دليل شامل للمبتدئين في مجال ريادة الأعمال الجيومكانية مع نصائح عملية من خبراء القطاع.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      author: "د. محمد الشهري",
    },
    {
      title: "قصص نجاح من هاكاثون الخرائط الذكية 2024",
      category: "فعاليات",
      excerpt: "تعرف على الفرق الفائزة والمشاريع المبتكرة التي خرجت من هاكاثون الخرائط الذكية.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      author: "لجنة التحكيم",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/hero-background.png"
            alt="Geospatial Innovation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30 animate-in fade-in duration-700">
              <span className="text-accent font-semibold text-sm">
                منصة الابتكار الجيومكاني الرائدة في المملكة
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
              منصة بسيطة وجديدة، بل{" "}
              <span className="text-accent">وفعالة على نحو متفرد</span>{" "}
              للابتكار الجيومكاني
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              تقدم كل شركة على الابتكار لتسريع وتيرة التأثير والنمو. هل تعرف لماذا
              بعض الشركات تشهد نموًا سريعًا بينما أغلبها تبذل جهودًا كبيرة ولكنها
              تواجه صعوبات للحصول على نتائج؟ نحن نعرف السبب.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
              >
                احجز جلسة مجانية مدتها 25 دقيقة
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

            {/* Platform Screenshot */}
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <img
                src="/images/innovation-hub.png"
                alt="معمل الابتكار الجيومكاني"
                className="rounded-2xl shadow-2xl border-4 border-accent/30"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <p className="text-center text-muted-foreground mb-8">
            يستخدمه ومدعوم من رواد ملهمين من أمثال
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section 1 */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              هل تريد معرفة كيف يمكن أن <span className="text-accent">ينجح معك</span>؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              معمل الابتكار الجيومكاني يساعد شركات مثل شركتك في نجاح ابتكارها. هيا
              نتواصل لمعرفة كيف يمكنك أنت أيضًا تنفيذ هذا الأمر في مؤسستك لتحفيز
              الإنتاجية والنمو.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan">
              احجز جلسة مجانية مع متخصص مدتها 25 دقيقة
              <ArrowRight className="mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              هل أنت ضمن <span className="text-accent">مجتمع الابتكار</span>؟
              <br />
              عملك على وشك الحصول على <span className="text-secondary">أساليب</span> أفضل
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              سئم المبتكرون من الأدوات المعقدة والتي تستغرق وقتًا كبيرًا. نحن ندرك
              مشكلاتهم ونعرف ما يعانون منه. ولهذا السبب قمنا بتصميم معمل الابتكار
              الجيومكاني.
            </p>
          </div>

          <div className="space-y-16">
            {targetAudience.map((audience, index) => (
              <Card
                key={index}
                className={`overflow-hidden border-border hover:border-accent transition-all duration-500 ${
                  index % 2 === 0 ? "" : ""
                }`}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`relative h-80 md:h-auto ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <img
                      src={audience.image}
                      alt={audience.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                  </div>
                  <CardContent className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                      <audience.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{audience.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {audience.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-background">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            كل ما تحتاجه لخروج <span className="text-accent">الابتكار</span> إلى النور.
            <br />
            في <span className="text-secondary">مكان واحد</span>.
          </h2>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
            alt="Innovation"
            className="rounded-2xl shadow-xl mx-auto mt-12 max-w-4xl"
          />
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              لماذا نحن <span className="text-accent">مختلفين</span>؟
              <br />
              تلك هي مقومات نجاحنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              يستخدم مستفيدونا معمل الابتكار الجيومكاني في الكشف عن الأفكار التي
              تحدث فرقًا والتحقق من صلاحيتها وتنفيذها.
            </p>
          </div>

          <div className="space-y-20">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <pillar.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ما <span className="text-accent">النتائج</span> المناسبة لك؟
            </h2>
            <p className="text-2xl text-muted-foreground">
              شهادات مستفيدي معمل الابتكار الجيومكاني
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.slice(0, 5).map((stat, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{stat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <svg className="w-20 h-20 text-accent mx-auto" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              آراء المستفيدين
              <br />
              بشأن <span className="text-accent">معمل الابتكار الجيومكاني</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              معمل الابتكار الجيومكاني® عبارة عن منصة للابتكار التعاوني من شأنها
              مساعدة المبتكرين في إشراك الأفراد للمشاركة في إيجاد أفكار وخروجها
              للنور.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <img
              src="/images/innovation-hub.png"
              alt="Platform"
              className="rounded-2xl shadow-xl mx-auto max-w-4xl mb-8"
            />
            <p className="text-lg text-muted-foreground">
              يستخدمه رواد ملهمين من أمثال <span className="font-bold">ESRI</span> و{" "}
              <span className="font-bold">SAP</span>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-accent/20 mb-4" />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}، {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              احجز جلسة مع متخصص مدتها 25 دقيقة
              <ArrowRight className="mr-2" />
            </Button>
            <p className="text-muted-foreground mt-4">
              اكتشف كيف يمكنك البدء في غضون <span className="font-bold text-accent">أسابيع</span>، وليس أشهر
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Detail Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ما <span className="text-accent">آلية عمل</span> معمل الابتكار الجيومكاني؟
            </h2>
            <div className="flex justify-center gap-4 flex-wrap mt-8">
              {initiatives.map((init, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold"
                >
                  {init.subtitle}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-24">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                  <div className="mb-6">
                    <initiative.icon className="w-16 h-16 text-accent mb-4" />
                    <span className="text-accent font-semibold text-sm">
                      {initiative.subtitle}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {initiative.details}
                  </p>
                  <Link href={initiative.link}>
                    <Button variant="outline" className="group">
                      عرض التفاصيل
                      <ArrowRight className="mr-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              كيف يستخدم مستفيدونا الذين يفكرون في{" "}
              <span className="text-accent">المستقبل</span>
              <br />
              معمل الابتكار الجيومكاني
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 group"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <useCase.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              موصى بها من <span className="text-accent">مدونتنا</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            الحصول على نتائج الابتكار في غضون{" "}
            <span className="text-accent">أسابيع</span>، وليس أعوام
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            اكتشف السبب وراء كون معمل الابتكار الجيومكاني أفضل منصة لمساندة منظومة
            الابتكار لديك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
            >
              تواصل معنا الآن
              <ArrowRight className="mr-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
            >
              اعرف المزيد عن المعمل
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
