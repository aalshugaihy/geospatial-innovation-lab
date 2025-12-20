/**
 * Design: GEOSA Official Brand Identity
 * Colors: Dark Teal (#002937), Bright Green (#46C18F), Cyan (#14BEC3)
 * Font: Readex Pro
 * - Clean navigation with dropdown support
 * - Green accent highlights on hover
 * - Professional government-style design
 */

import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "عن المعمل", href: "/about" },
    { label: "لوحة المعلومات", href: "/dashboard" },
    { label: "مكتبة الموارد", href: "/resources" },
    { label: "متابعة المشاريع", href: "/projects" },
    { label: "التحليلات", href: "/analytics" },
    { label: "البحث", href: "/search" },
    { label: "الملف الشخصي", href: "/profile" },
    {
      label: "المبادرات",
      href: "#initiatives",
      submenu: [
        { label: "حاضنات الأعمال", href: "/initiatives/incubator" },
        { label: "مسرعات الأعمال", href: "/initiatives/accelerator" },
        { label: "الهاكاثونات", href: "/initiatives/hackathons" },
        { label: "المعسكرات التدريبية", href: "/initiatives/bootcamps" },
        { label: "GeoSandbox", href: "/initiatives/geosandbox" },
      ],
    },
    { label: "الفعاليات", href: "/events" },
    { label: "قصص النجاح", href: "/success-stories" },
    { label: "المدونة", href: "/blog" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center glow-cyan group-hover:glow-golden transition-all duration-300">
                <svg
                  className="w-7 h-7 text-primary"
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
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-foreground">
                  معمل الابتكار الجيومكاني
                </h1>
                <p className="text-xs text-muted-foreground">
                  Geospatial Innovation Lab
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() =>
                  item.submenu && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <button className="text-foreground hover:text-accent transition-colors duration-300 font-medium flex items-center gap-1 relative group">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <a className="block px-4 py-3 text-foreground hover:text-accent hover:bg-accent/5 transition-colors duration-200">
                              {subItem.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    className="text-foreground hover:text-accent transition-colors duration-300 font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </a>
                ) : (
                  <Link href={item.href}>
                    <a
                      className={`text-foreground hover:text-accent transition-colors duration-300 font-medium relative group ${
                        location === item.href ? "text-accent" : ""
                      }`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </Link>
                )}
              </div>
            ))}
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan">
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className="text-foreground hover:text-accent transition-colors duration-300 font-medium py-3 flex items-center justify-between w-full"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pr-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {item.submenu.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <a
                                onClick={() => setIsOpen(false)}
                                className="block text-muted-foreground hover:text-accent transition-colors duration-200 py-2"
                              >
                                {subItem.label}
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-accent transition-colors duration-300 font-medium py-3 block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href}>
                      <a
                        onClick={() => setIsOpen(false)}
                        className="text-foreground hover:text-accent transition-colors duration-300 font-medium py-3 block"
                      >
                        {item.label}
                      </a>
                    </Link>
                  )}
                </div>
              ))}
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full mt-2">
                ابدأ الآن
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
