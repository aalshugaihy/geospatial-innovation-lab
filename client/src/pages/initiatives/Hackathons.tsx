/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Hackathons page with competitive and energetic feel
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Code,
  Trophy,
  Users,
  Calendar,
  Clock,
  MapPin,
  Award,
  Zap,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Hackathons() {
  const benefits = [
    {
      icon: Trophy,
      title: "جوائز قيمة",
      description: "جوائز نقدية تصل إلى 150,000 ريال للفرق الفائزة",
    },
    {
      icon: Users,
      title: "فرص التواصل",
      description: "التعرف على خبراء الصناعة والشركاء المحتملين",
    },
    {
      icon: Lightbulb,
      title: "تطوير المهارات",
      description: "تعلم تقنيات جديدة وتطوير مهاراتك التقنية",
    },
    {
      icon: Zap,
      title: "ورش عمل تقنية",
      description: "ورش عمل متخصصة في التقنيات الجيومكانية الحديثة",
    },
    {
      icon: Target,
      title: "فرص استثمارية",
      description: "عرض مشروعك أمام مستثمرين ومسرعات أعمال",
    },
    {
      icon: Award,
      title: "شهادات مشاركة",
      description: "شهادات معتمدة لجميع المشاركين",
    },
  ];

  const tracks = [
    {
      title: "المدن الذكية",
      description: "حلول جيومكانية لتطوير وإدارة المدن الذكية",
      icon: "🏙️",
      challenges: [
        "إدارة حركة المرور",
        "تخطيط البنية التحتية",
        "الخدمات الذكية للمواطنين",
      ],
    },
    {
      title: "الاستدامة البيئية",
      description: "تطبيقات لمراقبة وحماية البيئة",
      icon: "🌱",
      challenges: [
        "مراقبة جودة الهواء",
        "إدارة الموارد المائية",
        "حماية الغطاء النباتي",
      ],
    },
    {
      title: "الزراعة الذكية",
      description: "تقنيات جيومكانية للزراعة الدقيقة",
      icon: "🌾",
      challenges: [
        "مراقبة المحاصيل",
        "إدارة الري",
        "تحليل التربة",
      ],
    },
    {
      title: "الأمن والسلامة",
      description: "حلول لتعزيز الأمن والاستجابة للطوارئ",
      icon: "🛡️",
      challenges: [
        "إدارة الكوارث",
        "مراقبة الحدود",
        "الاستجابة السريعة",
      ],
    },
  ];

  const timeline = [
    {
      time: "اليوم الأول - الصباح",
      title: "الافتتاح والتعريف",
      activities: [
        "حفل الافتتاح",
        "عرض التحديات",
        "تكوين الفرق",
        "ورشة عمل تمهيدية",
      ],
    },
    {
      time: "اليوم الأول - المساء",
      title: "البدء في التطوير",
      activities: [
        "جلسات العصف الذهني",
        "تصميم الحلول",
        "بدء البرمجة",
        "استشارات مع الموجهين",
      ],
    },
    {
      time: "اليوم الثاني - الصباح",
      title: "التطوير المكثف",
      activities: [
        "استكمال البرمجة",
        "اختبار الحلول",
        "ورش عمل تقنية",
        "جلسات إرشادية",
      ],
    },
    {
      time: "اليوم الثاني - المساء",
      title: "التقديم والتقييم",
      activities: [
        "إعداد العروض",
        "عروض الفرق",
        "تقييم لجنة التحكيم",
        "إعلان النتائج وتوزيع الجوائز",
      ],
    },
  ];

  const prizes = [
    {
      place: "المركز الأول",
      prize: "75,000 ريال",
      benefits: [
        "الجائزة النقدية",
        "قبول مباشر في حاضنة الأعمال",
        "دعم فني لمدة 6 أشهر",
        "لقاء مع مستثمرين",
      ],
    },
    {
      place: "المركز الثاني",
      prize: "50,000 ريال",
      benefits: [
        "الجائزة النقدية",
        "فرصة للانضمام لحاضنة الأعمال",
        "دعم فني لمدة 3 أشهر",
        "اشتراك مجاني في الفعاليات",
      ],
    },
    {
      place: "المركز الثالث",
      prize: "25,000 ريال",
      benefits: [
        "الجائزة النقدية",
        "دعم فني لمدة شهرين",
        "اشتراك مجاني في ورش العمل",
        "شهادة تقدير",
      ],
    },
  ];

  const pastEvents = [
    {
      name: "هاكاثون المدن الذكية 2024",
      date: "مارس 2024",
      participants: "120 مشارك",
      projects: "25 مشروع",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    },
    {
      name: "هاكاثون الاستدامة 2023",
      date: "نوفمبر 2023",
      participants: "95 مشارك",
      projects: "20 مشروع",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    },
    {
      name: "هاكاثون الزراعة الذكية 2023",
      date: "يونيو 2023",
      participants: "80 مشارك",
      projects: "18 مشروع",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop",
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
            src="/images/hackathon-event.png"
            alt="Hackathons"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <div className="inline-block mb-6">
            <Code className="w-20 h-20 text-accent mx-auto mb-4" />
            <span className="text-accent font-semibold text-lg">التحدي</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">الهاكاثونات</span> الجيومكانية
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
            تحديات تقنية مكثفة لابتكار حلول جيومكانية إبداعية
          </p>

          <div className="max-w-4xl mx-auto text-white/90 text-lg leading-relaxed">
            <p>
              الهاكاثونات الجيومكانية هي فعاليات تقنية مكثفة تجمع المطورين،
              المصممين، وخبراء البيانات الجيومكانية لمدة 48 ساعة من الابتكار
              المتواصل. نتحدى المشاركين لتطوير حلول مبتكرة لمشاكل حقيقية في
              القطاع الجيومكاني، مع فرصة الفوز بجوائز قيمة وفرص استثمارية.
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
                ما هو <span className="text-accent">الهاكاثون</span>؟
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  الهاكاثون هو ماراثون برمجي يستمر لمدة 48 ساعة، حيث تتنافس
                  الفرق على تطوير حلول مبتكرة لتحديات محددة في مجال التقنيات
                  الجيومكانية.
                </p>
                <p>
                  نوفر بيئة تعاونية مليئة بالطاقة، مع إمكانية الوصول إلى أحدث
                  الأدوات والتقنيات، وإرشاد من خبراء الصناعة، وورش عمل تقنية
                  متخصصة.
                </p>
                <p>
                  سواء كنت مطوراً، مصمماً، أو خبير بيانات، ستجد في هاكاثوناتنا
                  فرصة لتطوير مهاراتك، بناء شبكة علاقات قوية، والمنافسة على
                  جوائز قيمة وفرص استثمارية.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                >
                  سجل الآن
                  <ArrowRight className="mr-2" />
                </Button>
                <Button size="lg" variant="outline">
                  الهاكاثون القادم
                </Button>
              </div>
            </div>

            <div>
              <img
                src="/images/hackathon-event.png"
                alt="Hackathon"
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
              لماذا <span className="text-accent">تشارك</span>؟
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              فوائد متعددة تتجاوز الجوائز النقدية
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

      {/* Tracks */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">مسارات</span> التحدي
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر المسار الذي يناسب اهتماماتك ومهاراتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tracks.map((track, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{track.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{track.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {track.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-accent mb-2">
                      أمثلة على التحديات:
                    </p>
                    {track.challenges.map((challenge, cIndex) => (
                      <div key={cIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{challenge}</span>
                      </div>
                    ))}
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
              <span className="text-accent">جدول</span> الفعالية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              48 ساعة من الابتكار المتواصل
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((phase, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-accent font-semibold mb-1">
                        {phase.time}
                      </p>
                      <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.activities.map((activity, aIndex) => (
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

      {/* Prizes */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">الجوائز</span> والمكافآت
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              جوائز قيمة ومزايا إضافية للفائزين
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {prizes.map((prize, index) => (
              <Card
                key={index}
                className={`border-border hover:border-accent transition-all duration-300 ${
                  index === 0 ? "md:scale-105" : ""
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{prize.place}</h3>
                  <div className="text-4xl font-bold text-accent mb-6">
                    {prize.prize}
                  </div>
                  <div className="space-y-3 text-right">
                    {prize.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">هاكاثونات</span> سابقة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نظرة على فعالياتنا السابقة ونجاحاتها
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                  <p className="text-accent text-sm mb-4">{event.date}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {event.participants}
                      </p>
                      <p className="text-xs text-muted-foreground">مشارك</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary">
                        {event.projects}
                      </p>
                      <p className="text-xs text-muted-foreground">مشروع</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Event CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                الهاكاثون <span className="text-accent">القادم</span>
              </h2>
              <h3 className="text-2xl font-semibold mb-4">
                هاكاثون المدن الذكية 2025
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-accent" />
                  <span className="text-lg">15-17 فبراير 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-accent" />
                  <span className="text-lg">مقر المعمل - الرياض</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent" />
                  <span className="text-lg">150 مقعد متاح</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 glow-cyan"
                >
                  سجل الآن
                  <ArrowRight className="mr-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
                >
                  تفاصيل الفعالية
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold mb-4 text-white">
                    معلومات التسجيل
                  </h4>
                  <div className="space-y-3 text-white/90">
                    <p>✓ التسجيل مجاني بالكامل</p>
                    <p>✓ الوجبات والمشروبات مجانية</p>
                    <p>✓ أدوات وتقنيات متاحة</p>
                    <p>✓ ورش عمل وإرشاد مجاني</p>
                    <p>✓ شهادات مشاركة لجميع المشاركين</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
