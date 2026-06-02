import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Zap,
  Cpu,
  Building2,
  Package,
} from "lucide-react";

import heroBoxes from "../assets/hero-boxes.jpg";
import process1 from "../assets/process-1.jpg";
import process2 from "../assets/process-2.jpg";
import process3 from "../assets/process-3.jpg";
import process4 from "../assets/process-4.jpg";
import p3ply from "../assets/product-3ply.jpg";
import p5ply from "../assets/product-5ply.jpg";
import p7ply from "../assets/product-7ply.jpg";
import pDiecut from "../assets/product-diecut.jpg";
import pSheets from "../assets/product-sheets.jpg";
import pPallet from "../assets/product-pallet.jpg";
import pWoodbox from "../assets/product-woodbox.jpg";
import pEdge from "../assets/product-edge.jpg";
import aboutFactory from "../assets/about-factory.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

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
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[color:var(--primary)] text-white">
            <Package className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-[color:var(--foreground)]">
              Mohit Packaging
            </div>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--kraft)]">
              Industries
            </div>
          </div>
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
            Request Quote <ArrowRight className="h-3.5 w-3.5" />
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
              Request Quote
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
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 kraft-texture"
    >
      {/* animated background layers */}
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
            Reliable Corrugated{" "}
            <span className="text-[color:var(--primary)]">Packaging Solutions</span>{" "}
            Since 2008
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--muted-foreground)]">
            Engineered for Strength. Built for Scale. Manufacturing 3-ply, 5-ply
            and 7-ply corrugated packaging for industrial supply chains across
            India.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton href="#contact">Get a Quote</PrimaryButton>
            <GhostButton href="#products">View Products</GhostButton>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[color:var(--border)] pt-6">
            <Stat value="Since" label="2008" />
            <Stat value="ISO" label="9001:2008 Certified" />
            <Stat value="26–50" label="Employees" />
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative">
          <div className="absolute -inset-3 -z-10 rounded-sm bg-[color:var(--kraft)]/15" />
          <div className="relative overflow-hidden rounded-sm border border-[color:var(--border)] shadow-2xl">
            <img
              src={heroBoxes}
              alt="Stack of corrugated boxes in factory warehouse"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-5">
              <div className="text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  Output Capacity
                </div>
                <div className="font-display text-2xl font-bold">
                  50,000+ units / month
                </div>
              </div>
              <div className="hidden h-12 w-px bg-white/30 sm:block" />
              <div className="hidden text-right text-white sm:block">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  Lead Time
                </div>
                <div className="font-display text-2xl font-bold">7–10 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-[color:var(--foreground)] sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs leading-snug text-[color:var(--muted-foreground)]">
        {label}
      </div>
    </div>
  );
}

/* ---------------- Process ---------------- */

const PROCESS = [
  {
    n: "01",
    title: "Raw Kraft Paper",
    desc: "Premium grade kraft paper rolls sourced from certified mills, tested for GSM and burst strength.",
    img: process1,
  },
  {
    n: "02",
    title: "Corrugated Layer Formation",
    desc: "Heated flute rollers form precision waves and bond liners to deliver consistent edge crush resistance.",
    img: process2,
  },
  {
    n: "03",
    title: "Cutting & Folding",
    desc: "Computerised die-cutting, scoring and creasing for repeatable, dimensionally accurate boxes.",
    img: process3,
  },
  {
    n: "04",
    title: "Final Corrugated Box",
    desc: "Stitched or glued, batch-inspected and stacked for dispatch — built to ship without failure.",
    img: process4,
  },
];

function ProcessSection() {
  return (
    <section id="process" className="relative bg-[color:var(--beige-dark)] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            From kraft sheet to shipped box.
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
              alt="Mohit Packaging Industries manufacturing facility"
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
            Mohit Packaging Industries is based in Dharuhera, Haryana, and
            manufactures 3-ply, 5-ply and 7-ply corrugated boxes, die cut
            boxes, corrugated sheets, wooden pallets, wooden boxes and edge
            protectors. The unit is ISO 9001:2008 certified and runs an
            integrated line covering ply formation, die-cutting, stitching
            and dispatch.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Fact icon={<Factory className="h-5 w-5" />} label="Established 2008" />
            <Fact icon={<ShieldCheck className="h-5 w-5" />} label="ISO 9001:2008 Certified" />
            <Fact icon={<Boxes className="h-5 w-5" />} label="26–50 Employees" />
            <Fact icon={<Wrench className="h-5 w-5" />} label="₹5–25 Crore Turnover" />
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

const PRODUCTS = [
  {
    name: "3 Ply Corrugated Boxes",
    img: p3ply,
    spec: "Single wall • Lightweight goods up to 5 kg • Custom GSM",
  },
  {
    name: "5 Ply Corrugated Boxes",
    img: p5ply,
    spec: "Double wall • Medium duty • Up to 25 kg load",
  },
  {
    name: "7 Ply Corrugated Boxes",
    img: p7ply,
    spec: "Triple wall • Heavy duty industrial • Up to 100 kg",
  },
  {
    name: "Die Cut Boxes",
    img: pDiecut,
    spec: "Custom shapes • Precision creasing • Brand-ready",
  },
  {
    name: "Corrugated Sheets",
    img: pSheets,
    spec: "Flat sheets in 3/5/7 ply • Cut to size • Bulk supply",
  },
  {
    name: "Wooden Pallets",
    img: pPallet,
    spec: "Pine / hardwood • Custom sizes • Export-grade options",
  },
  {
    name: "Wooden Boxes",
    img: pWoodbox,
    spec: "Heavy machinery packaging • Nailed & screwed assembly",
  },
  {
    name: "Edge Protectors",
    img: pEdge,
    spec: "L-angle boards • Pallet & corner protection • High GSM",
  },
];

function ProductsSection() {
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
            requirements. MOQ flexible for bulk orders.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
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
        <h3 className="font-display text-base font-bold leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
          {product.spec}
        </p>
        <a
          href="#contact"
          className="mt-4 inline-flex items-center justify-between border-t border-[color:var(--border)] pt-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--foreground)] transition group-hover:text-[color:var(--primary)]"
        >
          Request Quote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

/* ---------------- Why Choose Us ---------------- */

const WHY = [
  { icon: Clock, title: "Since 2008", desc: "Manufacturer & supplier of corrugated and industrial packaging with consistent delivery." },
  { icon: ShieldCheck, title: "Quality Control Process", desc: "Batch-level inspection on GSM, burst and edge strength." },
  { icon: Factory, title: "Bulk Manufacturing", desc: "Integrated line built for high-volume production runs." },
  { icon: Truck, title: "Timely Delivery", desc: "Planned dispatch windows across NCR and pan-India." },
  { icon: Wrench, title: "Custom Solutions", desc: "Bespoke sizing, ply, GSM and print on every order." },
  { icon: CheckCircle2, title: "ISO 9001:2008 Certified", desc: "Quality management system certified manufacturing unit." },
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
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Boxes, label: "FMCG" },
  { icon: Truck, label: "Logistics" },
  { icon: Cpu, label: "Electronics" },
  { icon: Building2, label: "Industrial Supply Chain" },
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
            logistics, electronics and industrial supply chains across India.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center justify-center gap-4 rounded-sm border border-white/10 bg-white/[0.03] p-8 text-center transition hover:border-[color:var(--primary)] hover:bg-white/[0.06]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-[color:var(--primary)]/15 text-[color:var(--primary)] transition group-hover:bg-[color:var(--primary)] group-hover:text-white">
                <Icon className="h-7 w-7" />
              </div>
              <div className="text-sm font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Request a quote for your packaging requirement.
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
              lines={["+91 98111 56482", "+91 99921 96665"]}
            />
            <ContactRow
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              lines={["sales@mohitpackaging.in"]}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919811156482"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1FAE54]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <a
              href="tel:+919811156482"
              className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--foreground)]/20 px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--foreground)]"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>

          {/* Map placeholder */}
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
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — your inquiry will be wired up to backend soon.");
          }}
          className="rounded-sm border border-[color:var(--border)] bg-[color:var(--card)] p-6 sm:p-8"
        >
          <h3 className="font-display text-xl font-bold">Inquiry Form</h3>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Tell us about your packaging requirement.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" name="name" placeholder="Your name" required />
            <Field label="Company" name="company" placeholder="Company name" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
            <Field label="Phone" name="phone" placeholder="+91 ..." required />
          </div>

          <div className="mt-4">
            <Field
              label="Product Required"
              name="product"
              placeholder="e.g. 5 Ply boxes, 18×12×10 in"
            />
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
              Specifications / Quantity
            </label>
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-sm border border-[color:var(--border)] bg-[color:var(--beige)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
              placeholder="GSM, ply, dimensions, quantity per month, location..."
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[color:var(--primary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#A84714]"
          >
            Submit Inquiry <ArrowRight className="h-4 w-4" />
          </button>
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
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)]">
        {label}
      </label>
      <input
        {...rest}
        className="mt-2 w-full rounded-sm border border-[color:var(--border)] bg-[color:var(--beige)] px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)]"
      />
    </div>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="kraft-texture-dark border-t border-white/10 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[color:var(--primary)] text-white">
              <Package className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-white">
                Mohit Packaging
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Industries
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Manufacturer of corrugated and industrial packaging since 2008.
            ISO 9001:2008 certified.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
            <Zap className="h-3.5 w-3.5 text-[color:var(--primary)]" />
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
            Address
          </div>
          <div className="mt-4 text-sm leading-relaxed text-white/70">
            Vill. Akera, Narayan Vihar,
            <br />
            Dharuhera, Dist. Rewari,
            <br />
            Haryana – 123106, India
          </div>
          <div className="mt-4 text-sm text-white/70">
            <div>+91 98111 56482</div>
            <div>+91 99921 96665</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Compliance
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>
              <span className="text-white/50">GSTIN:</span> 06ABCDE1234F1Z5
            </div>
            <div>
              <span className="text-white/50">Certification:</span> ISO
              9001:2008
            </div>
          </div>

          <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Connect
          </div>
          <div className="mt-3 flex gap-2">
            {["LinkedIn", "IndiaMART", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-sm border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[color:var(--primary)] hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row lg:px-8">
          <div>
            © {new Date().getFullYear()} Mohit Packaging Industries. All rights
            reserved.
          </div>
          <div>Made for industrial buyers across India.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

function Index() {
  return (
    <div className="min-h-screen bg-[color:var(--beige)] text-[color:var(--foreground)]">
      <Navbar />
      <main>
        <Hero />
        <div className="rule" />
        <ProcessSection />
        <AboutSection />
        <ProductsSection />
        <WhySection />
        <IndustriesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
