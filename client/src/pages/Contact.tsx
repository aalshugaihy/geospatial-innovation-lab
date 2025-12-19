/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Contact page with form and location information
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "العنوان",
      details: ["مقر الهيئة العامة للمساحة والمعلومات الجيومكانية", "الرياض، المملكة العربية السعودية"],
    },
    {
      icon: Phone,
      title: "الهاتف",
      details: ["+966 11 234 5678", "+966 11 234 5679"],
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["info@geoinnovationlab.sa", "support@geoinnovationlab.sa"],
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 4:00 م", "الجمعة - السبت: مغلق"],
    },
  ];

  const departments = [
    {
      name: "حاضنات الأعمال",
      email: "incubator@geoinnovationlab.sa",
      description: "للاستفسارات عن برنامج حاضنات الأعمال",
    },
    {
      name: "مسرعات الأعمال",
      email: "accelerator@geoinnovationlab.sa",
      description: "للاستفسارات عن برنامج مسرعات الأعمال",
    },
    {
      name: "الهاكاثونات",
      email: "hackathons@geoinnovationlab.sa",
      description: "للاستفسارات عن الهاكاثونات والفعاليات",
    },
    {
      name: "المعسكرات التدريبية",
      email: "bootcamps@geoinnovationlab.sa",
      description: "للاستفسارات عن البرامج التدريبية",
    },
    {
      name: "GeoSandbox",
      email: "geosandbox@geoinnovationlab.sa",
      description: "للاستفسارات عن البيئة التنظيمية",
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
            src="/images/innovation-hub.png"
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 geo-grid z-10 opacity-20"></div>

        <div className="container relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-accent">تواصل</span> معنا
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            نحن هنا للإجابة على استفساراتك ومساعدتك في رحلتك الريادية
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-border hover:border-accent transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-bold mb-3">{info.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {info.details.map((detail, dIndex) => (
                      <p key={dIndex}>{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Departments */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  أرسل لنا <span className="text-accent">رسالة</span>
                </h2>
                <p className="text-muted-foreground">
                  املأ النموذج وسنتواصل معك في أقرب وقت ممكن
                </p>
              </div>

              <Card className="border-border">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        رقم الجوال
                      </label>
                      <input
                        type="tel"
                        placeholder="+966 XX XXX XXXX"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        الموضوع
                      </label>
                      <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                        <option>اختر الموضوع</option>
                        <option>حاضنات الأعمال</option>
                        <option>مسرعات الأعمال</option>
                        <option>الهاكاثونات</option>
                        <option>المعسكرات التدريبية</option>
                        <option>GeoSandbox</option>
                        <option>استفسار عام</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        الرسالة
                      </label>
                      <textarea
                        rows={5}
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                    >
                      إرسال الرسالة
                      <Send className="mr-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Departments */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-accent">الأقسام</span> المتخصصة
                </h2>
                <p className="text-muted-foreground">
                  تواصل مباشرة مع القسم المختص
                </p>
              </div>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card
                    key={index}
                    className="border-border hover:border-accent transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {dept.description}
                          </p>
                          <a
                            href={`mailto:${dept.email}`}
                            className="text-sm text-accent hover:underline"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card className="border-accent/50 bg-accent/5 mt-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">تابعنا</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    تابع آخر أخبارنا وفعالياتنا على وسائل التواصل الاجتماعي
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full"
                    >
                      <span className="text-xl">𝕏</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full"
                    >
                      <span className="text-xl">in</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full"
                    >
                      <span className="text-xl">📷</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full"
                    >
                      <span className="text-xl">▶</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-accent">موقعنا</span>
            </h2>
            <p className="text-muted-foreground">
              مقر معمل الابتكار الجيومكاني في الرياض
            </p>
          </div>

          <Card className="overflow-hidden border-border">
            <div className="h-96 bg-muted/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  الخريطة التفاعلية - يمكن دمج خريطة Google Maps هنا
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                الأسئلة <span className="text-accent">الشائعة</span>
              </h2>
              <p className="text-muted-foreground">
                إجابات سريعة على الأسئلة الأكثر شيوعاً
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "كيف يمكنني التقديم على برنامج حاضنة الأعمال؟",
                  a: "يمكنك التقديم من خلال صفحة حاضنات الأعمال وملء نموذج التقديم الإلكتروني. سيتم مراجعة طلبك خلال 2-3 أسابيع.",
                },
                {
                  q: "هل البرامج مجانية؟",
                  a: "نعم، جميع برامجنا مجانية بالكامل وتشمل الدعم الفني والإرشاد والبنية التحتية.",
                },
                {
                  q: "ما هي متطلبات الانضمام؟",
                  a: "تختلف المتطلبات حسب البرنامج، لكن بشكل عام نبحث عن أفكار مبتكرة في القطاع الجيومكاني وفريق ملتزم.",
                },
                {
                  q: "كم تستغرق مدة البرامج؟",
                  a: "تتراوح المدة من 4 أسابيع للمعسكرات التدريبية إلى 12 شهر لحاضنة الأعمال.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="border-border hover:border-accent transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">لم تجد إجابة لسؤالك؟</p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                تواصل معنا مباشرة
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
