import { useState, useEffect, useRef, type FormEvent } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Menu, X, ChevronDown, ArrowRight, Globe, Building2, Star, Layers, Mic2, Hotel, LockKeyhole } from "lucide-react";

import logoTransparent from "@/imports/logo-transparent.png";
import visual2 from "@/imports/visual2.png";
import visual3 from "@/imports/visual3.png";
import visual4 from "@/imports/visual4.png";
import visual5 from "@/imports/visual5.png";
import visual6 from "@/imports/visual6.png";
import visual7 from "@/imports/visual7.png";
import heroVideo from "@/imports/hero-vision.mp4";

// ─── Utility ─────────────────────────────────────────────────────────────────

function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent opacity-40 ${className}`}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase text-[#c8a84b] font-medium mb-3 sm:mb-4"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight text-balance ${className}`}
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      {children}
    </h2>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Vision", href: "#vision" },
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Paragon Village", href: "#paragon-village" },
    { label: "Performance Center", href: "#performance-center" },
  ];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05090f]/95 backdrop-blur-md border-b border-[#c8a84b]/15 shadow-[0_4px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo("#hero")}
          className="group flex h-[52px] w-[150px] flex-shrink-0 items-center justify-start sm:h-[64px] sm:w-[184px] lg:h-[70px] lg:w-[202px]"
          aria-label="Paragon 360 home"
        >
          <ImageWithFallback
            src={logoTransparent}
            alt="Paragon 360 — Building a Better Tomorrow"
            className="h-full w-full origin-left object-contain object-left drop-shadow-[0_10px_28px_rgba(200,168,75,0.18)] transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#8fa8c0] hover:text-[#c8a84b] text-xs tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("#inquiries")}
          className="hidden lg:flex items-center gap-2 border border-[#c8a84b]/50 text-[#c8a84b] hover:bg-[#c8a84b]/10 px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-200"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Private Inquiry
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#dde4ed] p-3 -mr-3"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#05090f]/98 backdrop-blur-lg border-t border-[#c8a84b]/15 px-4 sm:px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-[#8fa8c0] hover:text-[#c8a84b] text-xs tracking-[0.2em] uppercase transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#inquiries")}
            className="mt-2 border border-[#c8a84b]/50 text-[#c8a84b] px-5 py-3 text-xs tracking-[0.2em] uppercase text-center"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Private Inquiry
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="hero-section relative flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        aria-hidden="true"
        autoPlay
        disablePictureInPicture
        muted
        loop
        playsInline
        preload="auto"
        className="hero-video absolute inset-0"
        controlsList="nodownload noplaybackrate noremoteplayback"
        style={{ filter: "brightness(0.45) saturate(0.7)" }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05090f]/70 via-transparent to-[#05090f]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05090f]/50 via-transparent to-[#05090f]/20" />

      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,9,15,0.7) 100%)" }} />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <ChevronDown size={20} className="text-[#c8a84b]" />
      </div>
    </section>
  );
}

// ─── Credibility Band ─────────────────────────────────────────────────────────

function CredibilityBand() {
  const items = [
    "Global Platform",
    "Future-Ready Communities",
    "Strategic Development",
    "Media & Entertainment",
    "Hospitality & Lifestyle",
  ];

  return (
    <div className="bg-[#080e1a] border-y border-[#c8a84b]/12 overflow-hidden py-4 sm:py-5">
      <div className="flex items-center overflow-x-auto no-scrollbar overscroll-x-contain">
        <div className="flex items-center gap-0 min-w-max px-4 sm:px-6 mx-auto">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.35em] uppercase text-[#7a8fa8] whitespace-nowrap px-4 sm:px-6 md:px-10"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="text-[#c8a84b]/30 text-xs">◆</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Brand Introduction ───────────────────────────────────────────────────────

function BrandIntro() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] gap-10 sm:gap-16 lg:gap-14 xl:gap-20 items-center">
        <div>
          <SectionLabel>The Foundation</SectionLabel>
          <SectionHeading className="mb-6 sm:mb-8">
            The Umbrella for<br />a Larger Vision
          </SectionHeading>
          <GoldLine className="mb-6 sm:mb-8 w-20 sm:w-24 bg-gradient-to-r from-[#c8a84b] to-transparent opacity-60" />
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-[#8fa8c0] leading-relaxed font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
            <p>
              Paragon 360 is the parent platform behind a network of connected development concepts — each designed to elevate the standard of how people live, work, create, gather, and experience the world.
            </p>
            <p>
              Across living, working, entertainment, hospitality, media, wellness, and community experiences, Paragon 360 defines the framework that makes each venture possible, scalable, and exceptional.
            </p>
            <p>
              This is not a single project. It is a platform — a system for developing environments that perform at the highest level across every dimension.
            </p>
          </div>
        </div>

        <div className="relative lg:-mr-8 xl:-mr-16 group overflow-hidden">
          {/* Subtle hover glow back panel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#c8a84b]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Frame Borders */}
          <div className="absolute inset-0 border border-[#c8a84b]/12 group-hover:border-[#c8a84b]/20 transition-colors duration-500 pointer-events-none" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={visual2}
            aria-label="Paragon 360 global development network visualization"
            className="w-full aspect-video object-cover mix-blend-screen opacity-95"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
            }}
          >
            <source src="/assets/paragon-umbrella-loop.webm" type="video/webm" />
            <source src="/assets/paragon-umbrella-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

// ─── Meaning Section ──────────────────────────────────────────────────────────

function MeaningSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#080e1a] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel>The Name</SectionLabel>
          <SectionHeading>Paragon and 360</SectionHeading>
        </div>

        <GoldLine className="mb-10 sm:mb-16" />

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              number: "01",
              word: "Paragon",
              definition: "The highest standard.",
              body: "An exemplar of excellence in every form — the best of everything, the model against which all else is measured. Not a goal, but a commitment.",
            },
            {
              number: "02",
              word: "360",
              definition: "Excellence in every direction.",
              body: "All phases, all dimensions, all ways. A complete view — from conception to community, from structure to soul. Nothing is an afterthought.",
            },
          ].map((card) => (
            <div
              key={card.number}
              className="relative p-6 sm:p-8 md:p-10 border border-[#c8a84b]/15 bg-[#0b1628] backdrop-blur-sm group hover-3d-card"
              style={{ boxShadow: "inset 0 1px 0 rgba(200,168,75,0.06)" }}
            >
              <div
                className="text-[#c8a84b]/20 text-5xl sm:text-7xl font-semibold absolute top-5 sm:top-6 right-5 sm:right-8 select-none"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {card.number}
              </div>
              <p
                className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] text-[#c8a84b]/70 uppercase mb-3 font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {card.number}
              </p>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {card.word}
              </h3>
              <p className="text-[#c8a84b] text-sm sm:text-base mb-4 font-medium italic" style={{ fontFamily: "'Raleway', sans-serif" }}>
                {card.definition}
              </p>
              <p className="text-sm sm:text-base text-[#7a8fa8] leading-relaxed font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
                {card.body}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a84b]/20 to-transparent group-hover:via-[#c8a84b]/40 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Vision Section ───────────────────────────────────────────────────────────

function VisionSection() {
  const pillars = [
    { num: "01", label: "Live", desc: "Elevated residences and integrated community living designed for long-term belonging." },
    { num: "02", label: "Work", desc: "Productive environments that support enterprise, innovation, and collaborative endeavor." },
    { num: "03", label: "Create", desc: "Media, broadcast, and production infrastructure for the world's most ambitious storytellers." },
    { num: "04", label: "Gather", desc: "Event spaces, public squares, and destinations that bring people together with purpose." },
    { num: "05", label: "Perform", desc: "Flexible performance centers engineered for world-class entertainment and live events." },
    { num: "06", label: "Connect", desc: "Digital and physical networks that bind communities across local and global scales." },
  ];

  return (
    <section id="vision" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div className="max-w-3xl mb-10 sm:mb-16 lg:mb-20">
        <SectionLabel>The Framework</SectionLabel>
        <SectionHeading>
          Future-Ready Communities<br />and Global-Scale Possibilities
        </SectionHeading>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c8a84b]/10">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="bg-[#05090f] p-6 sm:p-8 lg:p-10 group hover:bg-[#0b1628] hover-3d-card relative overflow-hidden"
          >
            <div
              className="text-[#c8a84b]/10 text-6xl sm:text-8xl font-semibold absolute -bottom-2 -right-2 select-none group-hover:text-[#c8a84b]/18 transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {p.num}
            </div>
            <p
              className="text-[#c8a84b]/60 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {p.num}
            </p>
            <h3
              className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {p.label}
            </h3>
            <p className="text-[#7a8fa8] text-sm leading-relaxed font-light relative z-10" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {p.desc}
            </p>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#c8a84b]/20 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Ecosystem Section ────────────────────────────────────────────────────────

function EcosystemSection() {
  const ventures = [
    { icon: Building2, label: "Paragon Villages" },
    { icon: Star, label: "Performance Centers" },
    { icon: Mic2, label: "Entertainment & Venues" },
    { icon: Globe, label: "Media & Broadcast" },
    { icon: Hotel, label: "Hospitality & Lifestyle" },
    { icon: Layers, label: "Future Developments" },
  ];

  return (
    <section id="ecosystem" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-36 bg-[#080e1a] px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.9fr)] gap-10 sm:gap-16 lg:gap-14 xl:gap-20 items-center">
          <div className="order-2 lg:order-1 relative lg:-ml-8 xl:-ml-16 group overflow-hidden">
            {/* Subtle hover glow back panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#c8a84b]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Frame Borders */}
            <div className="absolute inset-0 border border-[#c8a84b]/12 group-hover:border-[#c8a84b]/20 transition-colors duration-500 pointer-events-none" />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={visual7}
              aria-label="Paragon 360 ecosystem — interconnected venture categories"
              className="w-full aspect-video object-cover mix-blend-screen opacity-95"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
              }}
            >
              <source src="/assets/paragon-ecosystem-loop.webm" type="video/webm" />
              <source src="/assets/paragon-ecosystem-loop.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="order-1 lg:order-2">
            <SectionLabel>The Ventures</SectionLabel>
            <SectionHeading className="mb-6 sm:mb-10">The Paragon 360 Ecosystem</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ventures.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-3 sm:gap-4 p-4 border border-[#c8a84b]/12 bg-[#0b1628]/50 hover-3d-card group"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#c8a84b]/70 group-hover:text-[#c8a84b] transition-colors" />
                  </div>
                  <div>
                    <p
                      className="text-[#c8a84b]/50 text-[10px] tracking-[0.16em] sm:tracking-[0.25em] uppercase mb-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      0{i + 1}
                    </p>
                    <p className="text-[#dde4ed] text-sm font-medium" style={{ fontFamily: "'Raleway', sans-serif" }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Paragon Village ──────────────────────────────────────────────────────────

function ParagonVillage() {
  const features = ["Residences", "Hospitality", "Wellness", "Dining", "Retail", "Entertainment", "Workspace", "Green Areas", "Essential Services"];

  return (
    <section id="paragon-village" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div className="grid lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-3 relative group">
          <div className="absolute -inset-px border border-[#c8a84b]/15" />
          <ImageWithFallback
            src={visual3}
            alt="Paragon Village — aerial rendering of integrated walkable community at dusk"
            className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover"
          />
          {/* Overlay label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#05090f]/85 to-transparent p-4 sm:p-6 pt-14 sm:pt-16">
            <p
              className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.35em] uppercase text-[#c8a84b]/70 font-medium leading-relaxed"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Architectural Rendering — Paragon Village Concept
            </p>
          </div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c8a84b]/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c8a84b]/40" />
        </div>

        <div className="lg:col-span-2">
          <SectionLabel>Paragon Village</SectionLabel>
          <SectionHeading className="mb-5 sm:mb-6">
            A Walkable Integrated Community
          </SectionHeading>
          <GoldLine className="mb-6 sm:mb-8 w-20 bg-gradient-to-r from-[#c8a84b] to-transparent opacity-60" />
          <p className="text-sm sm:text-base text-[#8fa8c0] leading-relaxed mb-8 sm:mb-10 font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Paragon Village combines everything a thriving community needs into one cohesive, walkable environment — designed to the highest standard in every category.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {features.map((f) => (
              <div
                key={f}
                className="last:col-span-2 sm:last:col-span-1 border border-[#c8a84b]/15 px-2 sm:px-3 py-2 text-center min-h-10 flex items-center justify-center hover-3d-badge"
              >
                <p
                  className="text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.15em] uppercase text-[#7a8fa8] leading-snug"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {f}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Performance Center ───────────────────────────────────────────────────────

function PerformanceCenter() {
  const uses = [
    "Entertainment", "Production", "Broadcast", "Rehearsals",
    "Conventions", "Education", "Immersive Experiences", "Public & Private Events",
  ];

  return (
    <section id="performance-center" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-36 bg-[#080e1a] px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-16 max-w-2xl">
          <SectionLabel>Performance Center</SectionLabel>
          <SectionHeading>
            A Flexible Anchor for World-Class Events
          </SectionHeading>
        </div>

        {/* Main rendering */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-px border border-[#c8a84b]/15" />
          <ImageWithFallback
            src={visual4}
            alt="Paragon Performance Center — exterior architectural rendering at dusk"
            className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05090f]/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080e1a]/80 to-transparent p-4 sm:p-8 pt-14 sm:pt-20">
            <p
              className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.35em] uppercase text-[#c8a84b]/60 font-medium leading-relaxed"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Exterior Rendering — Performance Center Concept
            </p>
          </div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#c8a84b]/30" />
        </div>

        {/* Floor plan + uses */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute -inset-px border border-[#c8a84b]/15" />
            <ImageWithFallback
              src={visual5}
              alt="Performance Center floor plan — flexible event hall layout"
              className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080e1a]/85 to-transparent p-4 pt-12">
              <p
                className="text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#c8a84b]/60 leading-relaxed"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Floor Plan Preview — Main Performance / Flexible Event Hall
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 border border-[#c8a84b]/12 bg-[#0b1628]/40">
            <p
              className="text-xs sm:text-sm tracking-[0.18em] sm:tracking-[0.3em] uppercase text-[#c8a84b]/70 mb-5 sm:mb-7"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Programmatic Capabilities
            </p>
            <p className="text-[#8fa8c0] text-sm sm:text-base leading-relaxed mb-10 font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Engineered for maximum flexibility — from intimate rehearsal sessions to full broadcast productions and large-scale public events.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {uses.map((use, i) => (
                <div key={use} className="flex items-start gap-4">
                  <span
                    className="text-[#c8a84b]/40 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 flex-shrink-0"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#9ab0c8] text-base sm:text-lg" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    {use}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Global Adaptability ──────────────────────────────────────────────────────

function GlobalAdaptability() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] gap-10 sm:gap-16 lg:gap-14 xl:gap-20 items-center">
        <div>
          <SectionLabel>Global Scale</SectionLabel>
          <SectionHeading className="mb-6 sm:mb-8">
            Scalable Across<br />Future Markets
          </SectionHeading>
          <GoldLine className="mb-6 sm:mb-8 w-20 sm:w-24 opacity-60" />
          <p className="text-sm sm:text-base text-[#8fa8c0] leading-relaxed mb-5 sm:mb-6 font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Paragon 360 is architected to adapt. The platform's development frameworks are designed for strategic deployment across diverse markets, cultural contexts, and economic environments.
          </p>
          <p className="text-sm sm:text-base text-[#8fa8c0] leading-relaxed font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Each new environment enriches the network — adding depth, relevance, and resonance to a platform built not for one market, but for the world.
          </p>
        </div>

        <div className="relative lg:-mr-8 xl:-mr-16 group overflow-hidden">
          {/* Subtle hover glow back panel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#c8a84b]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Frame Borders */}
          <div className="absolute inset-0 border border-[#c8a84b]/12 group-hover:border-[#c8a84b]/20 transition-colors duration-500 pointer-events-none" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#c8a84b]/30 group-hover:border-[#c8a84b]/50 transition-colors duration-500 pointer-events-none" />

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={visual6}
            aria-label="Global opportunity map — Paragon 360 worldwide adaptability"
            className="w-full aspect-video object-cover mix-blend-screen opacity-95"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.86) 76%, transparent 100%)",
            }}
          >
            <source src="/assets/paragon-global-adaptability-loop.webm" type="video/webm" />
            <source src="/assets/paragon-global-adaptability-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────

function InquiryForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", organization: "", inquiryType: "", message: "",
    hp: "" // honeypot field
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.hp) {
      // Silently discard bot submission
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      name: "", email: "", phone: "", organization: "", inquiryType: "", message: "", hp: ""
    });
    setSubmitted(false);
  };

  return (
    <section id="inquiries" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 lg:py-36 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24">
          <div>
            <SectionLabel>Private Inquiry</SectionLabel>
            <SectionHeading className="mb-6 sm:mb-8">
              Strategic Inquiries Welcome
            </SectionHeading>
            <GoldLine className="mb-6 sm:mb-8 w-20 sm:w-24 opacity-60" />
            <p className="text-sm sm:text-base text-[#7a8fa8] leading-relaxed font-light mb-5 sm:mb-6" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Paragon 360 engages selectively with qualified partners, investors, and development collaborators who share our commitment to excellence and long-term vision.
            </p>
            <p className="text-sm sm:text-base text-[#7a8fa8] leading-relaxed font-light" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Use the form to introduce your interest. All inquiries are reviewed with the discretion appropriate to this platform.
            </p>
          </div>

          <div className="border border-[#c8a84b]/15 bg-[#0b1628]/60 p-5 sm:p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c8a84b]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c8a84b]/30" />

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border border-[#c8a84b]/40 flex items-center justify-center mx-auto mb-6">
                  <ArrowRight size={20} className="text-[#c8a84b]" />
                </div>
                <h3
                  className="text-xl font-medium text-white mb-4"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Inquiry Received
                </h3>
                <p className="text-[#7a8fa8] font-light mb-8" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Thank you. Your inquiry has been received and will be reviewed by the Paragon 360 team.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-[#c8a84b]/40 text-[#c8a84b] hover:bg-[#c8a84b]/10 px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden visually and from screen readers) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="inquiry-hp">Leave this field empty</label>
                  <input
                    id="inquiry-hp"
                    type="text"
                    name="hp"
                    value={form.hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="inquiry-name"
                      required
                      name="name"
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#dde4ed] px-4 py-3 text-sm focus:border-[#c8a84b]/50 focus:outline-none transition-colors"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Email *
                    </label>
                    <input
                      id="inquiry-email"
                      required
                      type="email"
                      name="email"
                      maxLength={150}
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#dde4ed] px-4 py-3 text-sm focus:border-[#c8a84b]/50 focus:outline-none transition-colors"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Phone
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={15}
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#dde4ed] px-4 py-3 text-sm focus:border-[#c8a84b]/50 focus:outline-none transition-colors"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                      placeholder="0000000000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-organization"
                      className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Organization
                    </label>
                    <input
                      id="inquiry-organization"
                      name="organization"
                      maxLength={100}
                      value={form.organization}
                      onChange={handleChange}
                      className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#dde4ed] px-4 py-3 text-sm focus:border-[#c8a84b]/50 focus:outline-none transition-colors"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                      placeholder="Company / Fund / Group"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Inquiry Type *
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-type"
                      required
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#dde4ed] px-4 py-3 pr-10 text-sm focus:border-[#c8a84b]/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      <option value="" disabled>Select inquiry type</option>
                      <option value="investment">Investment & Capital</option>
                      <option value="partnership">Development Partnership</option>
                      <option value="media">Media & Press</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c8a84b]/60 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-[10px] tracking-[0.14em] sm:tracking-[0.3em] uppercase text-[#7a8fa8] mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    name="message"
                    maxLength={2000}
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#05090f] border border-[#c8a84b]/20 text-[#b8c4d2] placeholder:text-[#7a8fa8]/70 px-4 py-3 text-sm font-normal leading-6 tracking-normal focus:border-[#c8a84b]/50 focus:outline-none transition-colors resize-none"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
                    placeholder="Describe your interest or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c8a84b] text-[#05090f] py-4 px-4 text-[11px] sm:text-xs tracking-[0.16em] sm:tracking-[0.3em] uppercase font-semibold hover:bg-[#d4b460] transition-all duration-200 shadow-[0_0_24px_rgba(200,168,75,0.2)] hover:shadow-[0_0_36px_rgba(200,168,75,0.3)] cursor-pointer"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030710] border-t border-[#c8a84b]/12 px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5 flex h-[78px] w-[224px] items-center justify-start sm:h-[88px] sm:w-[252px]">
              <video
                aria-hidden="true"
                autoPlay
                disablePictureInPicture
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full origin-left object-cover object-center drop-shadow-[0_14px_36px_rgba(200,168,75,0.16)]"
                controlsList="nodownload noplaybackrate noremoteplayback"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
            <p
              className="text-[10px] tracking-[0.16em] sm:tracking-[0.35em] uppercase text-[#c8a84b]/50 font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Building a Better Tomorrow™
            </p>
          </div>

          <div>
            <p
              className="text-[10px] tracking-[0.16em] sm:tracking-[0.3em] uppercase text-[#c8a84b]/40 mb-5 font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Navigate
            </p>
            <div className="space-y-3">
              {[
                { label: "Vision", href: "#vision" },
                { label: "Ecosystem", href: "#ecosystem" },
                { label: "Paragon Village", href: "#paragon-village" },
                { label: "Performance Center", href: "#performance-center" },
                { label: "Private Inquiry", href: "#inquiries" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-xs text-[#7a8fa8] hover:text-[#c8a84b] transition-colors tracking-wide"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-[10px] tracking-[0.16em] sm:tracking-[0.3em] uppercase text-[#c8a84b]/40 mb-5 font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Contact
            </p>
            <div className="space-y-3">
              <p className="text-xs text-[#7a8fa8]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Private inquiries only.
              </p>
              <p className="text-xs text-[#7a8fa8]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                info@paragon360.com
              </p>
              <p className="text-xs text-[#7a8fa8]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Global Platform
              </p>
            </div>
          </div>
        </div>

        <GoldLine className="mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="text-[10px] tracking-[0.12em] sm:tracking-[0.25em] uppercase text-[#3a4d62] leading-relaxed"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            © 2026 Paragon 360. All Rights Reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[#3a4d62] leading-relaxed"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            A Private Global Platform
          </p>
        </div>
      </div>
    </footer>
  );
}

function VentureMarquee() {
  const items = [
    "Paragon Villages",
    "Paragon Gaming",
    "Paragon Performance Center",
    "Beatmondo Immersive",
  ];

  // Repeat items to fill screen width
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#080e1a] border-y border-[#c8a84b]/12 overflow-hidden py-4 sm:py-5 relative z-10">
      <div className="flex overflow-hidden select-none">
        <div className="flex items-center gap-12 sm:gap-20 min-w-full shrink-0 animate-marquee whitespace-nowrap">
          {doubledItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 sm:gap-20">
              <span
                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#c8a84b] font-medium"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item}
              </span>
              <span className="text-[#7a8fa8]/30 text-xs">◆</span>
            </div>
          ))}
        </div>
        {/* Secondary set for seamless loop */}
        <div className="flex items-center gap-12 sm:gap-20 min-w-full shrink-0 animate-marquee whitespace-nowrap" aria-hidden="true">
          {doubledItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-12 sm:gap-20">
              <span
                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#c8a84b] font-medium"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item}
              </span>
              <span className="text-[#7a8fa8]/30 text-xs">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "Preston's_Paragon360";
const AUTH_STORAGE_KEY = "paragon-360-authenticated";

function PasswordGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      onAuthenticated();
      return;
    }

    setError("Incorrect password. Please try again.");
    setPassword("");
  };

  return (
    <main
      className="min-h-screen bg-[#05090f] text-[#dde4ed] flex items-center justify-center px-4 sm:px-6 overflow-hidden relative"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,111,168,0.24),transparent_48%),radial-gradient(ellipse_at_bottom,rgba(200,168,75,0.18),transparent_44%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05090f]/40 via-[#05090f]/86 to-[#05090f]" />
      <div className="fixed inset-0 pointer-events-none border border-[#3d6fa8]/25 shadow-[inset_0_0_12px_rgba(61,111,168,0.12)] z-[9999]" />

      <section className="relative z-10 w-full max-w-[440px] border border-[#c8a84b]/20 bg-[#080e1a]/88 backdrop-blur-md px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="mb-8 flex flex-col items-center text-center">
          <ImageWithFallback
            src={logoTransparent}
            alt="Paragon 360"
            className="mb-6 h-20 w-56 object-contain drop-shadow-[0_10px_28px_rgba(200,168,75,0.18)]"
          />
          <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#c8a84b]/35 text-[#c8a84b]">
            <LockKeyhole size={20} aria-hidden="true" />
          </div>
          <p
            className="text-[10px] tracking-[0.28em] uppercase text-[#c8a84b]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Private Access
          </p>
          <h1
            className="mt-3 text-2xl sm:text-3xl font-semibold text-white leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Enter Password
          </h1>
        </div>

        <form onSubmit={submitPassword} className="space-y-4">
          <label htmlFor="site-password" className="sr-only">
            Password
          </label>
          <input
            id="site-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            autoComplete="current-password"
            autoFocus
            className="w-full border border-[#c8a84b]/25 bg-[#05090f]/80 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-[#3a4d62] focus:border-[#c8a84b]/70"
            placeholder="Password"
          />
          {error && (
            <p className="text-sm text-[#e5a5a5]" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full border border-[#c8a84b]/55 bg-[#c8a84b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#05090f] transition-all duration-200 hover:bg-[#d9bd67] focus:outline-none focus:ring-2 focus:ring-[#c8a84b]/60 focus:ring-offset-2 focus:ring-offset-[#080e1a]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Unlock
          </button>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_STORAGE_KEY) === "true"
  );

  useEffect(() => {
    document.title = "Paragon 360 | Building a Better Tomorrow™";
  }, []);

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      className="min-h-screen bg-[#05090f] text-[#dde4ed] overflow-x-hidden"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05090f; }
        ::-webkit-scrollbar-thumb { background: #c8a84b33; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #c8a84b66; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* Permanent Viewport Highlight Border */}
      <div className="fixed inset-0 pointer-events-none border border-[#3d6fa8]/25 shadow-[inset_0_0_12px_rgba(61,111,168,0.12)] z-[9999]" />

      <Header />
      <Hero />
      <CredibilityBand />
      <BrandIntro />
      <VentureMarquee />
      <VisionSection />
      <EcosystemSection />
      <ParagonVillage />
      <PerformanceCenter />
      <GlobalAdaptability />
      <InquiryForm />
      <Footer />
    </div>
  );
}
