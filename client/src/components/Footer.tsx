/**
 * Design Philosophy: Geospatial Futuristic
 * - Layered footer design with geometric grid
 * - Cyan and golden accents
 * - Clean organization with clear hierarchy
 */

import { MapPin, Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 geo-grid opacity-10"></div>
      
      <div className="container relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">معمل الابتكار الجيومكاني</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              منصة رائدة لتمكين الابتكار في القطاع الجيومكاني من خلال حاضنات الأعمال، المسرعات، الهاكاثونات والمعسكرات التدريبية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">روابط سريعة</h4>
            <ul className="space-y-3">
              {["عن المعمل", "مبادراتنا", "الفعاليات", "الشركاء", "المدونة"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">مبادراتنا</h4>
            <ul className="space-y-3">
              {[
                "حاضنات الأعمال",
                "مسرعات الأعمال",
                "الهاكاثونات الجيومكانية",
                "المعسكرات التدريبية",
                "ورش العمل",
              ].map((initiative) => (
                <li key={initiative}>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 text-sm"
                  >
                    {initiative}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@geolab.sa"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  info@geolab.sa
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+966123456789"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  +966 12 345 6789
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:glow-cyan"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 معمل الابتكار الجيومكاني. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
              >
                سياسة الخصوصية
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
              >
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
