/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Events page with calendar and event listings
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      title: "هاكاثون المدن الذكية 2025",
      date: "15-17 فبراير 2025",
      time: "9:00 صباحاً",
      location: "مقر المعمل - الرياض",
      category: "هاكاثون",
      attendees: "150",
      description: "تحدي تقني لمدة 48 ساعة لتطوير حلول مبتكرة للمدن الذكية",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      status: "التسجيل مفتوح",
    },
    {
      title: "ورشة عمل: تطوير تطبيقات GIS",
      date: "5 مارس 2025",
      time: "2:00 مساءً",
      location: "عبر الإنترنت",
      category: "ورشة عمل",
      attendees: "50",
      description: "ورشة عمل عملية لتعلم أساسيات تطوير تطبيقات نظم المعلومات الجغرافية",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      status: "التسجيل مفتوح",
    },
    {
      title: "مؤتمر الابتكار الجيومكاني 2025",
      date: "20-22 أبريل 2025",
      time: "9:00 صباحاً",
      location: "مركز الملك عبدالله المالي - الرياض",
      category: "مؤتمر",
      attendees: "500",
      description: "المؤتمر السنوي الأكبر للابتكار في القطاع الجيومكاني",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      status: "قريباً",
    },
    {
      title: "يوم العرض للشركات الناشئة",
      date: "10 مايو 2025",
      time: "3:00 مساءً",
      location: "مقر المعمل - الرياض",
      category: "عرض",
      attendees: "100",
      description: "فرصة للشركات الناشئة لعرض منتجاتها أمام المستثمرين",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      status: "التسجيل مفتوح",
    },
  ];

  const pastEvents = [
    {
      title: "هاكاثون الاستدامة 2024",
      date: "نوفمبر 2024",
      participants: "120",
      projects: "25",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    },
    {
      title: "ورشة عمل الاستشعار عن بعد",
      date: "أكتوبر 2024",
      participants: "60",
      projects: "-",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    },
    {
      title: "مؤتمر الابتكار الجيومكاني 2024",
      date: "سبتمبر 2024",
      participants: "450",
      projects: "-",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
    },
  ];

  const categories = ["الكل", "هاكاثون", "ورشة عمل", "مؤتمر", "عرض", "تدريب"];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-10"></div>
          <img
            src="/images/hackathon-event.png"
            alt="Events"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">الفعاليات</span> والأنشطة
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            انضم إلى فعالياتنا المتنوعة من هاكاثونات، ورش عمل، ومؤتمرات
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-accent hover:bg-accent/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              الفعاليات <span className="text-accent">القادمة</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              سجل الآن في الفعاليات القادمة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{event.attendees} مشارك</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-accent">
                      {event.status}
                    </span>
                    <Button
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={event.status === "قريباً"}
                    >
                      {event.status === "قريباً" ? "قريباً" : "سجل الآن"}
                      <ArrowRight className="mr-2" />
                    </Button>
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
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              فعاليات <span className="text-accent">سابقة</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              نظرة على فعالياتنا الناجحة
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
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-accent text-sm mb-4">{event.date}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {event.participants}
                      </p>
                      <p className="text-xs text-muted-foreground">مشارك</p>
                    </div>
                    {event.projects !== "-" && (
                      <div>
                        <p className="text-2xl font-bold text-secondary">
                          {event.projects}
                        </p>
                        <p className="text-xs text-muted-foreground">مشروع</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geo-grid opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            لا تفوت <span className="text-accent">أي فعالية</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            اشترك في نشرتنا البريدية لتصلك آخر الأخبار والفعاليات
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
