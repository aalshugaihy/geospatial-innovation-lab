/**
 * Design Philosophy: GEOSA-Inspired Geospatial Design
 * - Contact page with form validation and auto-reply email
 * - Forest green, fresh green, turquoise cyan, golden accents
 */

import { useState } from "react";
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
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitContactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    },
    onError: (error: unknown) => {
      toast.error("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      console.error("Contact form error:", error);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم الكامل مطلوب";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الجوال مطلوب";
    } else if (!/^(\+966|0)?5\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "رقم الجوال غير صحيح (مثال: 0501234567)";
    }

    if (!formData.subject) {
      newErrors.subject = "يرجى اختيار الموضوع";
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("يرجى تصحيح الأخطاء في النموذج");
      return;
    }

    submitContactMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-green-600">
                        تم إرسال رسالتك بنجاح!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        تم إرسال رسالة تأكيد إلى بريدك الإلكتروني
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك الكامل"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                            errors.name ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          البريد الإلكتروني <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                            errors.email ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          رقم الجوال <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+966 5X XXX XXXX"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                            errors.phone ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          الموضوع <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                            errors.subject ? "border-red-500" : "border-border"
                          }`}
                        >
                          <option value="">اختر الموضوع</option>
                          <option value="incubator">حاضنات الأعمال</option>
                          <option value="accelerator">مسرعات الأعمال</option>
                          <option value="hackathon">الهاكاثونات</option>
                          <option value="bootcamp">المعسكرات التدريبية</option>
                          <option value="geosandbox">GeoSandbox</option>
                          <option value="general">استفسار عام</option>
                        </select>
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          الرسالة <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="اكتب رسالتك هنا..."
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                            errors.message ? "border-red-500" : "border-border"
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitContactMutation.isPending}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan"
                      >
                        {submitContactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            جاري الإرسال...
                          </>
                        ) : (
                          <>
                            إرسال الرسالة
                            <Send className="mr-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
