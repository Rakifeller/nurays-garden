"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Smooth scroll tracking with requestAnimationFrame
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', checkMobile);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Parallax sadece desktop'ta aktif
  const heroScale = isMobile ? 1 : Math.min(1 + scrollY * 0.0002, 1.2);
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroTextY = isMobile ? 0 : scrollY * 0.4;

  // Navigation background based on scroll
  const navBg = scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  // Navigation layout based on scroll
  const isScrolled = scrollY > 50;

  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* MOBİL UYUMLU Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 transition-all duration-500 ${navBg} py-3 md:py-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Her zaman solda mobilde */}
          <a href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Nuray's Garden Logo"
              width={300}
              height={108}
              className="h-14 md:h-20 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#story"
              className={`text-xs tracking-widest uppercase font-medium hover:text-primary transition-all duration-500 ${
                scrollY > 50 ? 'text-gray-800' : 'text-white'
              }`}
            >
              Hakkımızda
            </a>
            <a
              href="#products"
              className={`text-xs tracking-widest uppercase font-medium hover:text-primary transition-all duration-500 ${
                scrollY > 50 ? 'text-gray-800' : 'text-white'
              }`}
            >
              Ürünler
            </a>
            <a
              href="#footer-contact"
              className={`text-xs tracking-widest uppercase font-medium hover:text-primary transition-all duration-500 ${
                scrollY > 50 ? 'text-gray-800' : 'text-white'
              }`}
            >
              İletişim
            </a>
            <a
              href="#order-form"
              className="bg-primary text-white px-4 lg:px-6 py-2 lg:py-3 text-xs font-semibold tracking-wider uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-lg"
            >
              Sipariş Ver
            </a>
          </div>

          {/* Mobile Menu Button */}
          <a
            href="#order-form"
            className="md:hidden bg-primary text-white px-4 py-2 text-xs font-semibold tracking-wider uppercase"
          >
            Sipariş
          </a>
        </div>
      </nav>

      {/* HERO SECTION - Mobil optimize */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${heroScale})`,
            transformOrigin: "center center",
          }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Lavender field"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Hero text */}
        <div
          className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTextY}px, 0)`,
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-8 drop-shadow-2xl leading-tight">
            Pure Lavender
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-white tracking-wide font-light opacity-90 mb-8 md:mb-12 max-w-2xl">
            Organik lavanta bahçemizden
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md px-4">
            <a
              href="#order-form"
              className="bg-primary text-white px-8 md:px-10 py-4 md:py-5 text-sm font-bold tracking-widest uppercase hover:bg-purple-700 transition-all duration-500 text-center"
            >
              Sipariş Ver
            </a>
            <a
              href="#products"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 px-8 md:px-10 py-4 md:py-5 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-gray-900 transition-all duration-500 text-center"
            >
              Ürünleri Keşfet
            </a>
          </div>
        </div>

        {/* Scroll indicator - sadece desktop */}
        <div
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: heroOpacity }}
        >
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="relative bg-white">
        {/* ABOUT SECTION */}
        <AboutSection scrollY={scrollY} isMobile={isMobile} />

        {/* Divider */}
        <div className="relative py-12 md:py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
          <div className="relative px-4">
            <p className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-300 text-center select-none">
              Saf & Organik
            </p>
            <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <ProductSection scrollY={scrollY} isMobile={isMobile} />

        {/* PROCESS SECTION */}
        <ProcessSection scrollY={scrollY} isMobile={isMobile} />

        {/* PRODUCTS GRID */}
        <ProductsGrid />

        {/* CONTACT SECTION */}
        <ContactSection scrollY={scrollY} isMobile={isMobile} />
      </div>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Logo & About */}
            <div className="space-y-4 md:space-y-6">
              <Image
                src="/images/logo.png"
                alt="Nuray's Garden Logo"
                width={300}
                height={105}
                className="h-20 md:h-28 w-auto object-contain"
              />
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Özenle yetiştirilen organik lavantadan %100 saf lavanta esansiyel yağı üretimi
              </p>
            </div>

            {/* Contact Information */}
            <div id="footer-contact" className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">
                İletişim
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@nuraysgarden.com" className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors break-all">
                    info@nuraysgarden.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+905519684117" className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors">
                    +90 (551) 968 41 17
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm md:text-base text-gray-600">
                    Lavanta Bahçesi<br />
                    Türkiye
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">
                Hızlı Bağlantılar
              </h3>
              <nav className="flex flex-col space-y-3">
                <a href="#story" className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors">
                  Hakkımızda
                </a>
                <a href="#products" className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors">
                  Ürünlerimiz
                </a>
                <a href="#footer-contact" className="text-sm md:text-base text-gray-600 hover:text-primary transition-colors">
                  İletişim
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 md:pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center">
              <p className="text-xs md:text-sm text-gray-500 text-center">
                © 2024 Nuray's Garden. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905519684117?text=Merhaba,%20Nuray's%20Garden%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="WhatsApp ile iletişime geç"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:block absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          WhatsApp ile yazın
        </span>
      </a>
    </main>
  );
}

// ABOUT SECTION - Mobil optimize
function AboutSection({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-16 md:py-32 lg:py-48 px-4 md:px-8 lg:px-16 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:block relative">
          {/* Image */}
          <div
            className={`relative w-full md:w-[55%] h-[300px] md:h-[500px] lg:h-[700px] mb-8 md:mb-0 rounded-sm shadow-xl md:shadow-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Image
              src="/images/about.jpg"
              alt="Lavender garden"
              fill
              className="object-cover rounded-sm"
            />
          </div>

          {/* Text */}
          <div
            className={`relative md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[50%] bg-white md:pl-12 lg:pl-16 py-8 md:py-16 space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900">
              Doğal
              <br />
              Üretim
            </h2>
            <div className="space-y-4">
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Modern tarım teknikleriyle geleneksel yöntemleri birleştiriyoruz.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Her lavanta bitkisine özel özen gösteriyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// PRODUCT SECTION - Mobil optimize
function ProductSection({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[500px] md:min-h-screen flex items-center py-16 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2400"
          alt="Lavender oil"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 md:mb-12 leading-tight">
            %100
            <br />
            Saf Yağ
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-white/95 font-light leading-relaxed mb-12 md:mb-16">
            Özenle hasat edilen lavantalardan modern damıtma teknikleriyle
            üretilen saf lavanta esansiyel yağı.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-16">
            <StatCounter
              value={100}
              suffix="%"
              label="Organik"
              isVisible={isVisible}
            />
            <StatCounter value={0} label="Kimyasal" isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated counter
function StatCounter({
  value,
  suffix = "",
  label,
  isVisible,
}: {
  value: number;
  suffix?: string;
  label: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
      <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif">
        {count}
        {suffix}
      </p>
      <p className="text-white/80 text-xs md:text-sm tracking-widest uppercase mt-2 md:mt-3">
        {label}
      </p>
    </div>
  );
}

// PROCESS SECTION - Mobil optimize
function ProcessSection({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "80px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 lg:py-48 px-4 md:px-8 lg:px-16 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
          {/* Text */}
          <div className={`md:w-[45%] space-y-6 md:space-y-12 order-2 md:order-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900">
              Elle
              <br />
              Hasat
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Her lavanta sapı özenle, en uygun zamanda elle hasat edilir.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Kalite bizim için her şeyden önemli.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Geleneksel yöntemlerle modern teknolojinin mükemmel uyumu.
            </p>
          </div>

          {/* Image */}
          <div
            className={`md:w-[55%] relative h-[300px] md:h-[500px] lg:h-[600px] order-1 md:order-2 rounded-sm shadow-xl md:shadow-2xl overflow-hidden transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Image
              src="/images/process.jpg"
              alt="Lavender picking"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// PRODUCTS GRID - Mobil optimize
function ProductsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      title: "Essential Oil",
      subtitle: "10-50ml",
      image: "/images/product-1.jpg",
    },
    {
      title: "Dried Bundles",
      subtitle: "Handpicked",
      image: "/images/product-2.jpg",
    },
    {
      title: "Bulk Orders",
      subtitle: "Commercial",
      image: "/images/product-3.jpg",
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-16 md:py-32 lg:py-48 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Koleksiyon
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 max-w-2xl mx-auto">
            %100 organik, elle hasat edilmiş lavanta ürünlerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] mb-6 md:mb-8 overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-500">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 md:mb-3 text-gray-900">
                {product.title}
              </h3>
              <p className="text-gray-500 tracking-widest uppercase text-xs md:text-sm">
                {product.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-20">
          <a
            href="#order-form"
            className="inline-block bg-primary text-white px-8 md:px-12 py-4 md:py-5 text-sm font-bold tracking-widest uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-2xl"
          >
            Sipariş Vermek İçin Tıklayın
          </a>
        </div>
      </div>
    </section>
  );
}

// CONTACT SECTION - Mobil optimize
function ContactSection({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="order-form"
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-32 lg:py-48 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Contact info */}
          <div
            className={`space-y-8 md:space-y-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900">
              Sipariş
              <br />
              Verin
            </h2>

            <div className="space-y-6 md:space-y-10">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-3">
                  Email
                </p>
                <a
                  href="mailto:info@nuraysgarden.com"
                  className="text-xl md:text-2xl lg:text-3xl hover:text-primary transition-colors duration-500 break-all"
                >
                  info@nuraysgarden.com
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-3">
                  Phone
                </p>
                <a
                  href="tel:+905519684117"
                  className="text-xl md:text-2xl lg:text-3xl hover:text-primary transition-colors duration-500"
                >
                  +90 (551) 968 41 17
                </a>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-3">
                  Address
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-900">
                  Söğüt, Çavdır/Antalya, Türkiye
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <form
              action="https://formsubmit.co/info@nuraysgarden.com"
              method="POST"
              className="space-y-6 md:space-y-10"
            >
              <input type="hidden" name="_subject" value="Yeni Sipariş Talebi - Nuray's Garden" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href + '?success=true' : ''} />

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ad Soyad *"
                  required
                  className="w-full px-0 py-3 md:py-4 border-0 border-b-2 border-gray-300 bg-transparent text-base md:text-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  className="w-full px-0 py-3 md:py-4 border-0 border-b-2 border-gray-300 bg-transparent text-base md:text-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  className="w-full px-0 py-3 md:py-4 border-0 border-b-2 border-gray-300 bg-transparent text-base md:text-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <select
                  name="product"
                  required
                  className="w-full px-0 py-3 md:py-4 border-0 border-b-2 border-gray-300 bg-transparent text-base md:text-lg focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Ürün Seçin *</option>
                  <option value="Essential Oil 10ml">Essential Oil - 10ml</option>
                  <option value="Essential Oil 30ml">Essential Oil - 30ml</option>
                  <option value="Essential Oil 50ml">Essential Oil - 50ml</option>
                  <option value="Dried Bundles">Dried Bundles</option>
                  <option value="Bulk Order">Toplu Sipariş</option>
                </select>
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Sipariş Detayları ve Notlar"
                  rows={5}
                  className="w-full px-0 py-3 md:py-4 border-0 border-b-2 border-gray-300 bg-transparent text-base md:text-lg focus:border-primary focus:outline-none resize-vertical transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-primary text-white px-8 md:px-12 py-4 md:py-5 text-sm font-bold tracking-widest uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Sipariş Gönder'}
              </button>

              <p className="text-xs md:text-sm text-gray-500 mt-4">
                * Zorunlu alanlar. Siparişiniz email olarak tarafımıza iletilecektir.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
