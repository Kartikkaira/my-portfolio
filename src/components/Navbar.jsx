import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../assets/Logo.webp";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Track active section as user scrolls
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track scroll depth to shrink and deepen glassmorphic opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Close mobile dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3.5 sm:top-5 md:top-6 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none"
    >
      {/* Ambient gradient aura matching portfolio palette: #302b63 (indigo), #00bf8f (emerald), #1cd8d2 (cyan) */}
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl h-24 rounded-full pointer-events-none -z-10 blur-2xl transition-opacity duration-500 ${
          isScrolled ? "opacity-30" : "opacity-65"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(28, 216, 210, 0.22) 0%, rgba(0, 191, 143, 0.16) 40%, rgba(48, 43, 99, 0.25) 75%, transparent 95%)",
        }}
      />

      {/* Floating Pill Navbar */}
      <div
        className={`w-full max-w-5xl rounded-full flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-2xl border border-white/[0.18] shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.16)] py-2 px-3.5 sm:px-5 scale-[0.99]"
            : "bg-neutral-950/45 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.12)] py-2.5 px-4 sm:px-6"
        }`}
      >
        {/* Left: Brand Logo & Stylized Serif Italic Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center gap-2.5 group cursor-pointer select-none"
          aria-label="Kartik Kaira - Home"
        >
          <img
            src={Logo}
            alt="Kartik Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            width="44"
            height="32"
          />
          <span className="font-display-serif italic text-lg sm:text-xl font-normal tracking-wide text-white/95 group-hover:text-white transition-colors duration-200">
            Kartik
          </span>
        </a>

        {/* Center: Nav links in clean sans-serif with animated active pill */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative px-3.5 py-1.5 text-[13px] xl:text-[14px] font-sans font-medium transition-colors duration-200 rounded-full select-none ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Solid white pill CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Primary CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="inline-flex items-center justify-center bg-white text-neutral-950 font-sans font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_2px_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_22px_rgba(28,216,210,0.45)] hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] select-none"
          >
            Reach Out
          </a>

          {/* Mobile Hamburger toggle button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white transition-colors duration-200 focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX className="text-lg sm:text-xl" /> : <FiMenu className="text-lg sm:text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with matching frosted pill aesthetic */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-2.5 w-full max-w-sm rounded-3xl bg-neutral-950/90 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col gap-1.5 pointer-events-auto"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/15 text-white shadow-sm border border-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#1cd8d2] shadow-[0_0_8px_#1cd8d2]" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 mt-1 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="w-full flex items-center justify-center bg-white text-neutral-950 font-semibold text-sm py-3 rounded-full shadow-[0_2px_12px_rgba(255,255,255,0.2)] hover:bg-neutral-100 transition-colors"
              >
                Reach Out
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
