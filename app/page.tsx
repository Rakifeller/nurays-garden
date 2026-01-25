"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Ultra-smooth parallax calculations with smaller multipliers
  const heroScale = Math.min(1 + scrollY * 0.0002, 1.2);
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroTextY = scrollY * 0.4;

  // Navigation background based on scroll
  const navBg = scrollY > 100 ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  // Navigation layout based on scroll
  const isScrolled = scrollY > 100;

  return (
    <main className="relative bg-white">
      {/* Navigation - centered logo transitioning to left */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 transition-all duration-700 ${navBg} ${isScrolled ? 'py-3' : 'py-8 md:py-10'}`}>
        <div className={`flex items-center transition-all duration-700 ${isScrolled ? 'justify-between' : 'justify-center'}`}>
          {/* Navigation Links - Left (hidden when not scrolled) */}
          <div className={`flex gap-8 text-xs tracking-widest uppercase font-medium transition-all duration-700 ${
            isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
          } ${scrollY > 100 ? 'text-gray-800' : 'text-white'}`}>
            <a
              href="#story"
              className="hover:text-primary transition-all duration-500"
            >
              Hakkımızda
            </a>
            <a
              href="#products"
              className="hover:text-primary transition-all duration-500"
            >
              Ürünler
            </a>
          </div>

          {/* Logo - Centered, moves to middle-left on scroll */}
          <a href="/" className={`flex items-center transition-all duration-700 ${isScrolled ? '' : 'absolute left-1/2 -translate-x-1/2'}`}>
            <Image
              src="/images/logo.png"
              alt="Nuray's Garden Logo"
              width={500}
              height={180}
              className={`w-auto object-contain transition-all duration-700 ${isScrolled ? 'h-20 md:h-24' : 'h-28 md:h-36'}`}
              priority
            />
          </a>

          {/* CTA Button - Right */}
          <div className={`flex items-center gap-6 transition-all duration-700 ${
            isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
          }`}>
            <a
              href="#footer-contact"
              className={`text-xs tracking-widest uppercase font-medium hover:text-primary transition-all duration-500 ${
                scrollY > 100 ? 'text-gray-800' : 'text-white'
              }`}
            >
              İletişim
            </a>
            <a
              href="#order-form"
              className="bg-primary text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-lg hover:scale-105"
            >
              Sipariş Ver
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Cinematic zoom with blur */}
      <section className="relative h-[120vh] overflow-hidden">
        {/* Background that zooms IN smoothly */}
        <div
          className="absolute inset-0 parallax-element"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Hero text with ultra-smooth movement */}
        <div
          className="relative h-full flex flex-col items-center justify-center text-center px-8 parallax-element"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTextY}px, 0)`,
          }}
        >
          <h1 className="hero-text text-white mb-8 drop-shadow-2xl">
            Pure Lavender
          </h1>
          <p className="text-white text-xl md:text-3xl tracking-wide font-light opacity-90 mb-12">
            Organik lavanta bahçemizden
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <a
              href="#order-form"
              className="bg-primary text-white px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              Sipariş Ver
            </a>
            <a
              href="#products"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-gray-900 transition-all duration-500 hover:shadow-2xl"
            >
              Ürünleri Keşfet
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scroll-indicator transition-opacity duration-500"
          style={{ opacity: heroOpacity }}
        >
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </div>
        </div>
      </section>

      {/* FLOWING CONTENT - Infinite scroll feel */}
      <div className="relative bg-white">
        {/* ABOUT SECTION - Smooth slide in */}
        <AboutSection scrollY={scrollY} />

        {/* Elegant divider with better contrast */}
        <div className="relative py-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
          <div className="relative">
            <p
              className="text-4xl md:text-7xl font-serif font-bold text-gray-300 parallax-element select-none"
              style={{
                transform: `translate3d(${scrollY * 0.08}px, 0, 0)`,
              }}
            >
              Saf & Organik
            </p>
            {/* Decorative line */}
            <div className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>

        {/* PRODUCT SECTION - Smooth rotation and scale */}
        <ProductSection scrollY={scrollY} />

        {/* Smooth transition spacer */}
        <div className="h-[20vh] bg-gradient-to-b from-black/5 to-white" />

        {/* PROCESS SECTION - Ultra-smooth overlapping */}
        <ProcessSection scrollY={scrollY} />

        {/* PRODUCTS GRID - Smooth staggered entrance */}
        <ProductsGrid />

        {/* CONTACT SECTION - Smooth sway */}
        <ContactSection scrollY={scrollY} />
      </div>

      {/* ENHANCED FOOTER with Contact Info & Map */}
      <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {/* Logo & About */}
            <div className="space-y-6">
              <Image
                src="/images/logo.png"
                alt="Nuray's Garden Logo"
                width={400}
                height={140}
                className="h-28 w-auto object-contain"
              />
              <p className="text-gray-600 leading-relaxed">
                Özenle yetiştirilen organik lavantadan %100 saf lavanta esansiyel yağı üretimi
              </p>
            </div>

            {/* Contact Information */}
            <div id="footer-contact" className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                İletişim
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@nuraysgarden.com" className="text-gray-600 hover:text-primary transition-colors">
                    info@nuraysgarden.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+905519684117" className="text-gray-600 hover:text-primary transition-colors">
                    +90 (551) 968 41 17
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">
                    Lavanta Bahçesi<br />
                    Türkiye
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                Hızlı Bağlantılar
              </h3>
              <nav className="flex flex-col space-y-3">
                <a href="#story" className="text-gray-600 hover:text-primary transition-colors">
                  Hakkımızda
                </a>
                <a href="#products" className="text-gray-600 hover:text-primary transition-colors">
                  Ürünlerimiz
                </a>
                <a href="#footer-contact" className="text-gray-600 hover:text-primary transition-colors">
                  İletişim
                </a>
              </nav>
            </div>
          </div>


          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center">
              <p className="text-sm text-gray-500">
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
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="WhatsApp ile iletişime geç"
      >
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          WhatsApp ile yazın
        </span>
      </a>
    </main>
  );
}

// ABOUT SECTION - Ultra-smooth slide in - MOBİL DÜZENLEME YAPILDI
function AboutSection({ scrollY }: { scrollY: number }) {
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
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobilde dikey, desktop'ta overlapping layout */}
        <div className="flex flex-col md:block relative">
          {/* Large image with smooth entrance */}
          <div
            className={`relative w-full md:w-[55%] h-[400px] md:h-[700px] mb-12 md:mb-0 animate-slide-left image-overlay-gradient ${
              isVisible ? "is-visible" : ""
            }`}
          >
            <Image
              src="/images/about.jpg"
              alt="Lavender garden"
              fill
              className="object-cover rounded-sm shadow-2xl"
            />
          </div>

          {/* Text overlaps with clean white background on desktop, flows below on mobile */}
          <div
            className={`relative md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[50%] bg-white md:pl-16 py-8 md:py-16 space-y-6 md:space-y-8 animate-fade ${
              isVisible ? "is-visible" : ""
            }`}
          >
            <h2 className="section-title leading-none">
              Doğal
              <br />
              Üretim
            </h2>
            <div className="space-y-4">
              <p className="body-text">
                Modern tarım teknikleriyle geleneksel yöntemleri birleştiriyoruz.
              </p>
              <p className="body-text">
                Her lavanta bitkisine özel özen gösteriyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// PRODUCT SECTION - Ultra-smooth rotation and scale
function ProductSection({ scrollY }: { scrollY: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setSectionTop(entry.boundingClientRect.top + window.scrollY);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smoother calculations
  const relativeScroll = scrollY - sectionTop + 800;
  const rotation = isVisible
    ? Math.max(-1.5, Math.min(1.5, (relativeScroll / 800) * 3 - 1.5))
    : 0;
  const scale = isVisible
    ? Math.max(1, Math.min(1.06, 1 + (relativeScroll / 1500) * 0.06))
    : 1;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      {/* Background with ultra-smooth rotation and scale */}
      <div
        className="absolute inset-0 parallax-element"
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: "center center",
          transition: "transform 0.5s ease-out",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2400"
          alt="Lavender oil"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content with smooth reveal */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 w-full">
        <div
          className={`max-w-3xl animate-in ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="section-title text-white mb-12">
            %100
            <br />
            Saf Yağ
          </h2>
          <p className="text-xl md:text-3xl text-white/95 font-light leading-relaxed mb-16">
            Özenle hasat edilen lavantalardan modern damıtma teknikleriyle
            üretilen saf lavanta esansiyel yağı.
          </p>

          {/* Animated stats with smooth counting */}
          <div className="flex flex-wrap gap-16">
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

// Smoother animated counter
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
    const duration = 2500; // Slower for smoothness
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
    <div className={`animate-scale ${isVisible ? "is-visible" : ""}`}>
      <p className="text-6xl md:text-7xl font-bold text-white font-serif">
        {count}
        {suffix}
      </p>
      <p className="text-white/80 text-sm tracking-widest uppercase mt-3">
        {label}
      </p>
    </div>
  );
}

// PROCESS SECTION - DÜZELTME YAPILDI - Mobilde üst üste binme sorunu çözüldü
function ProcessSection({ scrollY }: { scrollY: number }) {
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
      className="relative py-32 md:py-48 px-8 md:px-16 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobilde dikey, desktop'ta yatay düzen - Flex layout kullanarak üst üste binmeyi önledik */}
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          {/* Text with ultra-smooth staggered appearance */}
          <div className="md:w-[45%] space-y-8 md:space-y-12 order-2 md:order-1">
            <h2
              className={`section-title leading-none animate-in ${
                isVisible ? "is-visible" : ""
              }`}
            >
              Elle
              <br />
              Hasat
            </h2>

            <p
              className={`body-text animate-in stagger-1 ${
                isVisible ? "is-visible" : ""
              }`}
            >
              Her lavanta sapı özenle, en uygun zamanda elle hasat edilir.
            </p>

            <p
              className={`body-text animate-in stagger-2 ${
                isVisible ? "is-visible" : ""
              }`}
            >
              Kalite bizim için her şeyden önemli.
            </p>

            <p
              className={`body-text animate-in stagger-3 ${
                isVisible ? "is-visible" : ""
              }`}
            >
              Geleneksel yöntemlerle modern teknolojinin mükemmel uyumu.
            </p>
          </div>

          {/* Image with ultra-smooth slide and gradient overlay */}
          <div
            className={`md:w-[55%] relative h-[400px] md:h-[600px] order-1 md:order-2 animate-slide-right image-overlay-gradient ${
              isVisible ? "is-visible" : ""
            }`}
          >
            <Image
              src="/images/process.jpg"
              alt="Lavender picking"
              fill
              className="object-cover rounded-sm shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// PRODUCTS GRID - Ultra-smooth staggered entrance
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
      image:
        "/images/product-2.jpg",
    },
    {
      title: "Bulk Orders",
      subtitle: "Commercial",
      image:
        "/images/product-3.jpg",
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-32 md:py-48 px-8 md:px-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2
            className={`section-title animate-in ${
              isVisible ? "is-visible" : ""
            }`}
          >
            Koleksiyon
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            %100 organik, elle hasat edilmiş lavanta ürünlerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`product-card animate-in ${
                isVisible ? "is-visible" : ""
              } stagger-${index + 1}`}
            >
              <div className="relative h-[500px] md:h-[600px] mb-8 overflow-hidden rounded-sm image-overlay-gradient">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {product.title}
              </h3>
              <p className="text-gray-500 tracking-widest uppercase text-sm">
                {product.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* CTA after products */}
        <div className="text-center mt-20">
          <a
            href="#order-form"
            className="inline-block bg-primary text-white px-12 py-5 text-sm font-bold tracking-widest uppercase hover:bg-purple-700 transition-all duration-500 hover:shadow-2xl hover:scale-105"
          >
            Sipariş Vermek İçin Tıklayın
          </a>
        </div>
      </div>
    </section>
  );
}

// ORDER FORM SECTION - Ultra-smooth sway with functional form
function ContactSection({ scrollY }: { scrollY: number }) {
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

  // Subtle sway for elegant movement
  const swayLeft = Math.sin(scrollY * 0.0006) * 8;
  const swayRight = -Math.sin(scrollY * 0.0006) * 8;

  return (
    <section
      id="order-form"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48 px-8 md:px-16 overflow-hidden"
    >
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - Contact info with smooth sway */}
          <div
            className={`parallax-element space-y-12 animate-slide-left ${
              isVisible ? "is-visible" : ""
            }`}
            style={{
              transform: `translate3d(${swayLeft}px, 0, 0)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <h2 className="section-title">
              Sipariş
              <br />
              Verin
            </h2>

            <div className="space-y-10">
              <div className="animate-in stagger-1">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Email
                </p>
                <a
                  href="mailto:info@nuraysgarden.com"
                  className="text-2xl md:text-3xl hover:text-primary transition-colors duration-500"
                >
                  info@nuraysgarden.com
                </a>
              </div>

              <div className="animate-in stagger-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Phone
                </p>
                <a
                  href="tel:+905519684117"
                  className="text-2xl md:text-3xl hover:text-primary transition-colors duration-500"
                >
                  +90 (551) 968 41 17
                </a>
              </div>

              <div className="animate-in stagger-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Address
                </p>
                <p className="text-2xl md:text-3xl">Söğüt, Çavdır/Antalya, Türkiye</p>
              </div>
            </div>
          </div>

          {/* Right - Form with smooth sway */}
          <div
            className={`parallax-element animate-slide-right ${
              isVisible ? "is-visible" : ""
            }`}
            style={{
              transform: `translate3d(${swayRight}px, 0, 0)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Functional form using FormSubmit.co */}
            <form
              action="https://formsubmit.co/info@nuraysgarden.com"
              method="POST"
              className="space-y-10"
            >
              {/* FormSubmit Configuration */}
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
                  className="minimal-input text-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  className="minimal-input text-lg"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  className="minimal-input text-lg"
                />
              </div>

              <div>
                <select
                  name="product"
                  required
                  className="minimal-input text-lg"
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
                  rows={6}
                  className="minimal-textarea text-lg"
                />
              </div>

              <button
                type="submit"
                className="primary-button w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Sipariş Gönder'}
              </button>

              <p className="text-sm text-gray-500 mt-4">
                * Zorunlu alanlar. Siparişiniz email olarak tarafımıza iletilecektir.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
