import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Factory,
  Truck,
  Boxes,
  Wrench,
  Clock,
  CheckCircle2,
  MessageCircle,
  Menu,
  X,
  ShoppingCart,
  Cpu,
  Building2,
  Package,
  Users,
  IndianRupee,
  Layers,
  Ruler,
  BadgeCheck,
} from "lucide-react";

import logoMohit from "../assets/logo-mohit.png";
import process1 from "../assets/process-1.jpg";
import process2 from "../assets/process-2.jpg";
import process3 from "../assets/process-3.jpg";
import process4 from "../assets/process-4.jpg";
import p3ply from "../assets/product-3ply.png";
import p5ply from "../assets/product-5ply.png";
import p7ply from "../assets/product-7ply.png";
import pPrinted from "../assets/product-printed.png";
import pBranded from "../assets/product-branded.png";
import pDiecut from "../assets/product-diecut.jpg";
import pSheets from "../assets/product-sheets.jpg";
import pPallet from "../assets/product-pallet.jpg";
import pWoodbox from "../assets/product-woodbox.jpg";
import pEdge from "../assets/product-edge.jpg";
import aboutFactory from "../assets/factory-floor.png";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ----- Placeholders for future integration ----- */
const WHATSAPP_NUMBER = "919887196665"; // E.164 without '+', update when finalised
const PHONE_PRIMARY = "+91 98111 56482";
const PHONE_SECONDARY = "+91 99921 96665";
const EMAIL_PRIMARY = "sales@mohitpackaging.in";
const INSTAGRAM_URL = "https://www.instagram.com/mohit.packaging/?utm_source=ig_web_button_share_sheet";

/* ---------------- Reusable bits ---------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[color:var(--primary)]">
      <span className="h-px w-8 bg-[color:var(--primary)]" />
      {children}
    </div>
  );
}

function PrimaryButton({
  href = "#contact",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-sm bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#A84714] hover:shadow-lg"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--foreground)]/20 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--foreground)] transition-all hover:border-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-white"
    >
      {children}
    </a>
  );
}

/* In-view reveal */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

/* ---------------- Nav ---------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#industries", label: "Industries" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--beige)]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img 
            src={logoMohit} 

            alt="Mohit Packaging Industries Logo" 
            className="h-12 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[color:var(--foreground)]/80 transition hover:text-[color:var(--primary)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--foreground)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[color:var(--primary)]"
          >
            Request Bulk Quote <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--beige)] lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-2 text-sm font-medium hover:bg-[color:var(--muted)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-[color:var(--primary)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Request Bulk Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24 bg-[#FFF5E9]"
    >
      <div className="pointer-events-none absolute inset-0 flute-animated opacity-60" />
      <div className="pointer-events-none absolute -right-20 top-32 hidden lg:block">
        <div className="paper-fold h-40 w-40 origin-bottom rounded-sm bg-[color:var(--kraft)]/15 shadow-inner" />
      </div>
      <div className="pointer-events-none absolute left-10 bottom-10 hidden lg:block">
        <div className="float-y h-24 w-24 rounded-sm border border-[color:var(--kraft)]/30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="reveal">
          <SectionLabel>EST. 2008 • Dharuhera, Haryana</SectionLabel>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Corrugated Box{" "}
            <span className="text-[color:var(--primary)]">Manufacturer & Supplier</span>{" "}
            Since 2008
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--muted-foreground)]">
            Custom Corrugated Boxes, Corrugated Sheets, Wooden Pallets and
            Industrial Packaging Solutions for bulk supply across India.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton href="#contact">Request Bulk Quote</PrimaryButton>
            <GhostButton href="#products">View Products</GhostButton>
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative">
          <div className="absolute -inset-3 -z-10 rounded-sm bg-[color:var(--kraft)]/15" />
          <div className="relative overflow-hidden rounded-sm border border-[color:var(--border)] bg-white p-8 shadow-2xl flex items-center justify-center aspect-[4/3]">
            <img
              src={logoMohit}

              alt="Mohit Packaging Industries Logo"
              width={1280}
              height={960}
              className="max-h-full w-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/5 to-transparent p-5">
              <div className="text-[color:var(--foreground)]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  Manufacturing Unit
                </div>
                <div className="font-display text-2xl font-bold">
                  Dharuhera, Haryana
                </div>
              </div>
              <div className="hidden h-12 w-px bg-[color:var(--border)] sm:block" />
              <div className="hidden text-right text-[color:var(--foreground)] sm:block">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  Certification
                </div>
                <div className="font-display text-2xl font-bold">ISO 9001:2008</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust Strip ---------------- */

const TRUST = [
  { icon: ShieldCheck, label: "ISO 9001:2008 Certified" },
  { icon: Clock, label: "15+ Years Experience" },
  { icon: Users, label: "26–50 Employees" },
  { icon: IndianRupee, label: "₹5–25 Cr Turnover" },
  { icon: Truck, label: "Pan India Supply" },
];

function TrustStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="border-y border-[color:var(--border)] bg-[color:var(--beige-dark)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-[color:var(--border)] px-0 md:grid-cols-5">
        {TRUST.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 bg-[color:var(--beige-dark)] px-4 py-5 text-center"
          >
            <Icon className="h-5 w-5 flex-shrink-0 text-[color:var(--primary)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--foreground)] sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

const PROCESS = [
  {
    n: "01",
    title: "Kraft Paper Sourcing",
    desc: "Premium grade kraft paper rolls from certified mills, tested for GSM and burst strength.",
    img: process1,
  },
  {
    n: "02",
    title: "Corrugation Process",
    desc: "Heated flute rollers form precision waves and bond liners for consistent edge crush resistance.",
    img: process2,
  },
  {
    n: "03",
    title: "Cutting & Die Forming",
    desc: "Computerised die-cutting, scoring and creasing for dimensionally accurate boxes.",
    img: process3,
  },
  {
    n: "04",
    title: "Final Packaging Box",
    desc: "Stitched or glued, batch-inspected and stacked for dispatch — built to ship without failure.",
    img: process4,
  },
];

function ProcessSection() {
  return (
    <section id="process" className="relative bg-[color:var(--beige)] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Manufacturing Process</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            From kraft paper to shipped box.
          </h2>
          <p className="mt-4 text-base text-[color:var(--muted-foreground)]">
            A four-stage manufacturing line built around consistency, strength
            and on-time delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <ProcessCard key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof PROCESS)[number];
  index: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 80}ms`,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        opacity: shown ? 1 : 0,
      }}
      className="group relative overflow-hidden rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] transition-all duration-700 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={step.img}
          alt={step.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-sm bg-[color:var(--foreground)]/85 px-2.5 py-1 font-display text-xs font-bold text-white">
          {step.n}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */

function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-2 -z-10 bg-[color:var(--primary)]/10" />
            <img
              src={aboutFactory}
              alt="Mohit Packaging Industries manufacturing facility in Dharuhera, Haryana"
              loading="lazy"
              width={1280}
              height={900}
              className="h-full w-full rounded-sm border border-[color:var(--border)] object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <SectionLabel>About the Company</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
            Manufacturer & Supplier of corrugated and industrial packaging.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--muted-foreground)]">
            Established in 2008, Mohit Packaging Industries operates an
            integrated corrugated packaging unit at Vill. Akera, Narayan Vihar,
            Dharuhera (Dist. Rewari), Haryana. The plant manufactures 3 ply, 5
            ply and 7 ply corrugated boxes, printed and industrial corrugated
            boxes, die cut boxes, corrugated sheets and rolls, wooden pallets,
            wooden boxes and edge protectors.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--muted-foreground)]">
            The unit is ISO 9001:2008 certified and GST registered, with a
            workforce of 26–50 employees and an annual turnover in the ₹5–25
            crore range. Production covers in-house corrugation, die-cutting,
            stitching, gluing and dispatch — supporting bulk orders and custom
            specifications for buyers across India.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Fact icon={<Factory className="h-5 w-5" />} label="Established 2008" />
            <Fact icon={<ShieldCheck className="h-5 w-5" />} label="ISO 9001:2008 Certified" />
            <Fact icon={<Users className="h-5 w-5" />} label="26–50 Employees" />
            <Fact icon={<IndianRupee className="h-5 w-5" />} label="₹5–25 Crore Turnover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
        {icon}
      </div>
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}

/* ---------------- Products ---------------- */

type Product = { name: string; img: string };

const PRODUCT_CATEGORIES: { label: string; items: Product[] }[] = [
  {
    label: "Corrugated Packaging",
    items: [
      { name: "3 Ply Corrugated Boxes", img: p3ply },
      { name: "5 Ply Corrugated Boxes", img: p5ply },
      { name: "7 Ply Corrugated Boxes", img: p7ply },
      { name: "Printed Corrugated Boxes", img: pPrinted },
      { name: "Industrial Corrugated Boxes", img: pBranded },
    ],
  },
  {
    label: "Die Cut Packaging",
    items: [
      { name: "Die Cut Folding Boxes", img: pDiecut },
      { name: "Plain Die Cut Boxes", img: pDiecut },
    ],
  },
  {
    label: "Industrial Packaging",
    items: [
      { name: "Corrugated Sheets", img: pSheets },
      { name: "Corrugated Rolls", img: pSheets },
      { name: "Wooden Pallets", img: pPallet },
      { name: "Wooden Boxes", img: pWoodbox },
      { name: "Edge Protectors", img: pEdge },
    ],
  },
];

function ProductsSection({
  onRequestQuote,
}: {
  onRequestQuote: (productName: string) => void;
}) {
  return (
    <section
      id="products"
      className="relative bg-[color:var(--beige-dark)] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Industrial-grade packaging, built to spec.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[color:var(--muted-foreground)]">
            All products available in custom dimensions, GSM and print
            requirements. MOQ flexible for bulk orders across India.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-end justify-between border-b border-[color:var(--border)] pb-3">
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  {cat.label}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  {cat.items.length} products
                </span>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((p) => (
                  <ProductCard
                    key={p.name}
                    product={p}
                    onRequestQuote={onRequestQuote}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onRequestQuote,
}: {
  product: Product;
  onRequestQuote: (productName: string) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-[color:var(--beige)]">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-base font-bold leading-snug">
          {product.name}
        </h4>
        <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--muted-foreground)]">
          <li className="flex items-center gap-2">
            <Ruler className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            Custom Sizes Available
          </li>
          <li className="flex items-center gap-2">
            <Boxes className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            Bulk Orders Supported
          </li>
          <li className="flex items-center gap-2">
            <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            Industrial Grade Materials
          </li>
        </ul>
        <button
          type="button"
          onClick={() => onRequestQuote(product.name)}
          className="mt-5 inline-flex items-center justify-between border-t border-[color:var(--border)] pt-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--foreground)] transition group-hover:text-[color:var(--primary)]"
        >
          Request Quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

/* ---------------- Business Facts ---------------- */

const BUSINESS_FACTS = [
  { icon: Factory, k: "Established", v: "2008" },
  { icon: Building2, k: "Business Type", v: "Manufacturer & Supplier" },
  { icon: Users, k: "Employees", v: "26–50" },
  { icon: IndianRupee, k: "Annual Turnover", v: "₹5–25 Cr" },
  { icon: ShieldCheck, k: "Certification", v: "ISO 9001:2008" },
  { icon: MapPin, k: "Location", v: "Dharuhera, Haryana" },
];

function BusinessFactsSection() {
  return (
    <section className="bg-[color:var(--beige)] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Company Facts</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Verified business details.
          </h2>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_FACTS.map(({ icon: Icon, k, v }) => (
            <div
              key={k}
              className="flex items-start gap-4 bg-[color:var(--card)] p-6"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  {k}
                </div>
                <div className="mt-1 font-display text-lg font-bold">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Choose Us ---------------- */

const WHY = [
  { icon: ShieldCheck, title: "Quality Control", desc: "Batch-level inspection on GSM, burst strength and edge crush." },
  { icon: Factory, title: "Bulk Manufacturing", desc: "Integrated line built for high-volume corrugated production runs." },
  { icon: Wrench, title: "Custom Packaging Solutions", desc: "Bespoke ply, dimensions, GSM and print on every order." },
  { icon: Truck, title: "Timely Delivery", desc: "Planned dispatch windows across NCR and pan-India logistics partners." },
  { icon: Layers, title: "Industrial Expertise", desc: "15+ years manufacturing corrugated and wooden packaging at scale." },
  { icon: CheckCircle2, title: "Long-Term Reliability", desc: "Repeat supply contracts with industrial, FMCG and logistics buyers." },
];

function WhySection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Manufacturing capability, quality control and on-time delivery.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-[color:var(--card)] p-7 transition hover:bg-[color:var(--primary)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[color:var(--primary)]/10 text-[color:var(--primary)] transition group-hover:bg-white/15 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold transition group-hover:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)] transition group-hover:text-white/90">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    label: "E-commerce Packaging",
    desc: "Double-wall shippers and printed mailers for D2C fulfilment and returns-safe transit.",
  },
  {
    icon: Boxes,
    label: "FMCG Packaging",
    desc: "Master cartons and shelf-ready trays for fast-moving consumer goods distribution.",
  },
  {
    icon: Cpu,
    label: "Electronics Packaging",
    desc: "Cushioned die cut inserts and 5/7 ply outers for safe component and appliance shipping.",
  },
  {
    icon: Truck,
    label: "Warehouse & Logistics",
    desc: "Pallets, edge protectors and bulk corrugated sheets for unitised long-haul movement.",
  },
  {
    icon: Building2,
    label: "Industrial Machinery",
    desc: "Wooden boxes and heavy-duty 7 ply crates for spares, tooling and capital equipment.",
  },
];

function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative kraft-texture-dark py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)]">
            <span className="h-px w-8 bg-[color:var(--primary)]" />
            Industries Served
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Packaging for manufacturing and logistics.
          </h2>
          <p className="mt-4 text-base text-white/70">
            Supplying corrugated and wooden packaging to e-commerce, FMCG,
            electronics, logistics and industrial machinery supply chains across
            India.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group flex flex-col gap-4 rounded-sm border border-white/10 bg-white/[0.03] p-7 transition hover:border-[color:var(--primary)] hover:bg-white/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[color:var(--primary)]/15 text-[color:var(--primary)] transition group-hover:bg-[color:var(--primary)] group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">{label}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact / Quote Form ---------------- */

type QuoteForm = {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
};

const EMPTY_FORM: QuoteForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  quantity: "",
  message: "",
};

function validateForm(f: QuoteForm): string | null {
  if (!f.name.trim() || f.name.length > 100) return "Please enter your full name.";
  if (f.company.length > 150) return "Company name is too long.";
  if (!/^[+0-9 \-()]{7,20}$/.test(f.phone.trim()))
    return "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) || f.email.length > 200)
    return "Please enter a valid email address.";
  if (!f.product.trim()) return "Please select a product.";
  if (f.quantity.length > 100) return "Quantity field is too long.";
  if (f.message.length > 1000) return "Message is too long (max 1000 chars).";
  return null;
}

const ALL_PRODUCT_NAMES = PRODUCT_CATEGORIES.flatMap((c) => c.items.map((i) => i.name));

function ContactSection({
  form,
  setForm,
  formRef,
}: {
  form: QuoteForm;
  setForm: (f: QuoteForm) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "ok" } | { kind: "err"; msg: string }
  >({ kind: "idle" });

  const waMessage = useMemo(() => {
    const parts = [
      "Hi Mohit Packaging Industries, I would like a bulk quote.",
      form.product && `Product: ${form.product}`,
      form.quantity && `Quantity: ${form.quantity}`,
      form.company && `Company: ${form.company}`,
      form.name && `Name: ${form.name}`,
    ].filter(Boolean);
    return encodeURIComponent(parts.join("\n"));
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateForm(form);
    if (err) {
      setStatus({ kind: "err", msg: err });
      return;
    }
    // Send submission straight to business WhatsApp as a prefilled chat.
    const lines = [
      "*New Bulk Quote Request*",
      "",
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.product && `Product: ${form.product}`,
      form.quantity && `Quantity: ${form.quantity}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus({ kind: "ok" });
    setForm(EMPTY_FORM);
  };

  const setField = <K extends keyof QuoteForm>(k: K, v: QuoteForm[K]) =>
    setForm({ ...form, [k]: v });

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionLabel>Bulk Quote Request</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Request a Bulk Packaging Quote
          </h2>
          <p className="mt-4 text-base text-[color:var(--muted-foreground)]">
            Share specifications and we will respond within one working day with
            sizing, pricing and lead time.
          </p>

          <div className="mt-8 space-y-4">
            <ContactRow
              icon={<MapPin className="h-5 w-5" />}
              title="Factory & Office"
              lines={[
                "Vill. Akera, Narayan Vihar,",
                "Dharuhera, Dist. Rewari,",
                "Haryana – 123106, India",
              ]}
            />
            <ContactRow
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              lines={[PHONE_PRIMARY, PHONE_SECONDARY]}
            />
            <ContactRow
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              lines={[EMAIL_PRIMARY]}
            />
            <ContactRow
              icon={<Clock className="h-5 w-5" />}
              title="Business Hours"
              lines={["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"]}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1FAE54]"
            >
              <MessageCircle className="h-4 w-4" /> Get Instant Quote on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_PRIMARY.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--foreground)]/20 px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--foreground)]"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-[color:var(--border)]">
            <iframe
              title="Mohit Packaging Industries location"
              src="https://www.google.com/maps?q=Dharuhera%20Haryana%20123106&output=embed"
              width="100%"
              height="220"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] p-6 sm:p-8"
          noValidate
        >
          <h3 className="font-display text-xl font-bold">Bulk Quote Form</h3>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Tell us about your packaging requirement — we reply within one
            working day.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              value={form.name}
              onChange={(v) => setField("name", v)}
              required
              maxLength={100}
              placeholder="Your name"
            />
            <Field
              label="Company Name"
              value={form.company}
              onChange={(v) => setField("company", v)}
              maxLength={150}
              placeholder="Company name"
            />
            <Field
              label="Phone Number"
              value={form.phone}
              onChange={(v) => setField("phone", v)}
              required
              maxLength={20}
              placeholder="+91 ..."
              type="tel"
            />
            <Field
              label="Email Address"
              value={form.email}
              onChange={(v) => setField("email", v)}
              required
              maxLength={200}
              placeholder="you@company.com"
              type="email"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
                Product Required
              </label>
              <select
                value={form.product}
                onChange={(e) => setField("product", e.target.value)}
                className="mt-2 w-full rounded-sm border border-[color:var(--border)] bg-[color:var(--beige)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
                required
              >
                <option value="">Select a product…</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <optgroup key={cat.label} label={cat.label}>
                    {cat.items.map((it) => (
                      <option key={it.name} value={it.name}>
                        {it.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <Field
              label="Quantity Required"
              value={form.quantity}
              onChange={(v) => setField("quantity", v)}
              maxLength={100}
              placeholder="e.g. 5,000 units / month"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              Message / Specifications
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              rows={4}
              maxLength={1000}
              className="mt-2 w-full rounded-sm border border-[color:var(--border)] bg-[color:var(--beige)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
              placeholder="GSM, ply, dimensions, print, delivery location..."
            />
          </div>

          {status.kind === "err" && (
            <div className="mt-4 rounded-sm border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {status.msg}
            </div>
          )}
          {status.kind === "ok" && (
            <div className="mt-4 rounded-sm border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800">
              Thanks — your quote request has been recorded. Our sales team will
              respond within one working day.
            </div>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[color:var(--primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#A84714]"
          >
            Submit Bulk Quote Request <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-3 text-[11px] leading-relaxed text-[color:var(--muted-foreground)]">
            Your information is used solely to respond to this quote request.
          </p>
        </form>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
          {title}
        </div>
        <div className="mt-1 text-sm leading-relaxed">
          {lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
        {label}
      </label>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-sm border border-[color:var(--border)] bg-[color:var(--beige)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
      />
    </div>
  );
}

/* ---------------- Floating WhatsApp ---------------- */

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi Mohit Packaging Industries, I would like a bulk quote.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get instant quote on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1FAE54] sm:px-5"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Quote on WhatsApp</span>
    </a>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-white/10 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img 
              src={logoMohit} 
              alt="Mohit Packaging Industries Logo" 
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="mt-4 text-sm text-white/60">
            Manufacturer & Supplier of Corrugated Packaging Solutions since
            2008. ISO 9001:2008 certified. GST registered business.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
            <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--primary)]" />
            Since 2008
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Quick Links
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Home", "#home"],
              ["Products", "#products"],
              ["About", "#about"],
              ["Industries", "#industries"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="text-white/70 transition hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </div>
          <div className="mt-4 text-sm leading-relaxed text-white/70">
            Vill. Akera, Narayan Vihar,
            <br />
            Dharuhera, Dist. Rewari,
            <br />
            Haryana – 123106, India
          </div>
          <div className="mt-4 space-y-1 text-sm text-white/70">
            <div>{PHONE_PRIMARY}</div>
            <div>{PHONE_SECONDARY}</div>
            <div>{EMAIL_PRIMARY}</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Business
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>
              <span className="text-white/50">Type:</span> Manufacturer &
              Supplier
            </div>
            <div>
              <span className="text-white/50">Certification:</span> ISO
              9001:2008
            </div>
            <div>
              <span className="text-white/50">Registration:</span> GST
              Registered
            </div>
          </div>

          <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Business Hours
          </div>
          <div className="mt-3 space-y-1 text-sm text-white/70">
            <div>Mon – Sat: 9:00 AM – 6:00 PM</div>
            <div>Sunday: Closed</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row lg:px-8">
          <div>
            © {new Date().getFullYear()} Mohit Packaging Industries. All rights
            reserved.
          </div>
          <div>Dharuhera, Rewari, Haryana — Manufacturer & Supplier.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

function Index() {
  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const formRef = useRef<HTMLFormElement | null>(null);

  const requestQuoteFor = (productName: string) => {
    setForm((f) => ({ ...f, product: productName }));
    // smooth scroll to form
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ensure product names from cards are always recognised by the select
  useEffect(() => {
    if (form.product && !ALL_PRODUCT_NAMES.includes(form.product)) {
      setForm((f) => ({ ...f, product: "" }));
    }
  }, [form.product]);

  return (
    <div className="min-h-screen bg-[color:var(--beige)] text-[color:var(--foreground)]">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProcessSection />
        <AboutSection />
        <ProductsSection onRequestQuote={requestQuoteFor} />
        <BusinessFactsSection />
        <WhySection />
        <IndustriesSection />
        <ContactSection form={form} setForm={setForm} formRef={formRef} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
