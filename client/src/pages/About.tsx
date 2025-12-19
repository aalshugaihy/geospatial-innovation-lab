/**
 * Design Philosophy: Geospatial Futuristic
 * - About page with mission, vision, team, and achievements
 * - Deep navy, cyber cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Target,
  Eye,
  Award,
  Users,
  Globe,
  Rocket,
  TrendingUp,
  Heart,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const team = [
    {
      name: "د. عبدالله السعيد",
      role: "المدير التنفيذي",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "خبير في التقنيات الجيومكانية مع أكثر من 15 عاماً من الخبرة",
    },
    {
      name: "د. نورة المطيري",
      role: "مديرة الابتكار",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "متخصصة في إدارة الابتكار وريادة الأعمال التقنية",
    },
    {
      name: "م. فهد الدوسري",
      role: "مدير البرامج التدريبية",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "مهندس نظم معلومات جغرافية ومدرب معتمد",
    },
    {
      name: "سارة العتيبي",
      role: "مديرة العلاقات والشراكات",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "خبيرة في بناء الشراكات الاستراتيجية وتطوير الأعمال",
    },
  ];

  const achievements = [
    {
      icon: Rocket,
      number: "150+",
      title: "مشروع ناشئ",
      description: "تم احتضانها وتسريعها",
    },
    {
      icon: Users,
      number: "5000+",
      title: "مشارك",
      description: "في الفعاليات والبرامج",
    },
    {
      icon: Award,
      number: "25+",
      title: "جائزة وتكريم",
      description: "محلية ودولية",
    },
    {
      icon: TrendingUp,
      number: "200M+",
      title: "ريال سعودي",
      description: "تمويلات حصلت عليها الشركات",
    },
  ];

  const values = [
    {
      icon: Zap,
      title: "الابتكار",
      description: "نؤمن بقوة الأفكار الجديدة والحلول الإبداعية",
    },
    {
      icon: Users,
      title: "التعاون",
      description: "نبني مجتمعاً قوياً من المبتكرين والخبراء",
    },
    {
      icon: Target,
      title: "التميز",
      description: "نسعى للتميز في كل ما نقدمه من برامج وخدمات",
    },
    {
      icon: Heart,
      title: "التأثير",
      description: "نركز على خلق تأثير إيجابي ومستدام في القطاع",
    },
    {
      icon: Globe,
      title: "الانفتاح",
      description: "نرحب بالجميع ونشجع التنوع والشمولية",
    },
    {
      icon: Rocket,
      title: "النمو",
      description: "ندعم النمو المستمر للأفراد والمشاريع",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/hero-background.png"
            alt="About"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            عن <span className="text-accent">معمل الابتكار الجيومكاني</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            نحن منصة رائدة تهدف إلى تمكين المبتكرين في القطاع الجيومكاني من تحويل
            أفكارهم إلى واقع ملموس يخدم المجتمع والاقتصاد
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-border hover:border-accent transition-all duration-300">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold mb-6">رسالتنا</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  تمكين المبتكرين ورواد الأعمال في القطاع الجيومكاني من خلال توفير
                  بيئة داعمة ومتكاملة تشمل البنية التحتية التقنية، الإرشاد المتخصص،
                  والشبكة الواسعة من الشركاء والخبراء. نسعى لتحويل الأفكار الإبداعية
                  إلى مشاريع ناجحة تساهم في تحقيق رؤية المملكة 2030 وتطوير الاقتصاد
                  الرقمي.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-accent transition-all duration-300">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold mb-6">رؤيتنا</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  أن نكون المركز الرائد في منطقة الشرق الأوسط للابتكار الجيومكاني،
                  ومحرك أساسي لتطوير الحلول التقنية المتقدمة في مجال نظم المعلومات
                  الجغرافية والتقنيات المكانية. نطمح لبناء نظام بيئي متكامل يربط
                  المبتكرين بالمستثمرين والشركاء الاستراتيجيين لخلق تأثير مستدام في
                  القطاع.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                قصة <span className="text-accent">المعمل</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  انطلق معمل الابتكار الجيومكاني في عام 2020 من رؤية طموحة لتمكين
                  المبتكرين في القطاع الجيومكاني. لاحظنا الفجوة الكبيرة بين الأفكار
                  الإبداعية والموارد اللازمة لتحويلها إلى واقع.
                </p>
                <p>
                  بدأنا بفريق صغير من الخبراء المتحمسين ومساحة عمل متواضعة. اليوم،
                  أصبحنا مركزاً رائداً يضم أكثر من 150 مشروعاً ناشئاً وشبكة واسعة من
                  الشركاء المحليين والدوليين.
                </p>
                <p>
                  نفخر بما حققناه من إنجازات، ولكننا نؤمن أن الرحلة لم تنته بعد.
                  نواصل العمل يومياً لتطوير برامجنا وتوسيع نطاق تأثيرنا لخدمة المزيد
                  من المبتكرين ورواد الأعمال.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/images/team-collaboration.jpg"
                alt="Our Story"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">قيمنا</span> الأساسية
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              القيم التي توجه عملنا وتشكل ثقافتنا المؤسسية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-accent">إنجازاتنا</span> بالأرقام
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نفخر بما حققناه من نتائج ملموسة في دعم الابتكار الجيومكاني
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-5xl font-bold text-accent mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              تعرف على <span className="text-accent">فريقنا</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              فريق من الخبراء المتحمسين لدعم الابتكار والمبتكرين
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-accent text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
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
            هل أنت مستعد <span className="text-accent">للانضمام</span>؟
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            انضم إلى مجتمعنا من المبتكرين ورواد الأعمال وابدأ رحلتك نحو النجاح
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
              استكشف المبادرات
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
