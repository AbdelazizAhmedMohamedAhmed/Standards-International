import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { companyContact } from "@/lib/site-content";

const nav = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative py-2 text-sm font-medium text-navy transition-colors hover:text-primary"
              activeProps={{
                className:
                  "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary",
              }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy"
          >
            Trade Inquiry
          </Link>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="inline-flex size-11 items-center justify-center text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <div className="container-x flex flex-col py-4">
          {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-3 font-medium text-navy"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo inverse />
          <p className="mt-6 max-w-sm text-sm text-navy-foreground/70">
            International trading, global sourcing and trusted commercial partnerships, based in
            Egypt.
          </p>
        </div>
        <div>
          <p className="eyebrow !text-gold">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-navy-foreground/80 hover:text-navy-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-gold">Get in touch</p>
          <p className="mt-4 text-sm text-navy-foreground/80">{companyContact.location}</p>
          <a
            href={`mailto:${companyContact.generalEmail}`}
            className="mt-3 block break-words text-sm underline underline-offset-4"
          >
            {companyContact.generalEmail}
          </a>
          <a
            href={`mailto:${companyContact.salesEmail}`}
            className="mt-2 block break-words text-sm underline underline-offset-4"
          >
            {companyContact.salesEmail}
          </a>
          <Link
            to="/contact"
            search={{ type: "buyer" }}
            className="mt-4 block text-sm underline underline-offset-4"
          >
            Request product sourcing
          </Link>
          <Link
            to="/contact"
            search={{ type: "partner" }}
            className="mt-3 block text-sm underline underline-offset-4"
          >
            Become a trade partner
          </Link>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x py-6 text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} STANDARDS for International Trade ·{" "}
          <Link to="/credits" className="underline hover:text-navy-foreground">
            Photo & video credits
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="container-x py-20 md:py-28">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="fade-up mt-5 max-w-4xl text-4xl font-serif font-medium tracking-tight leading-[1.05] md:text-6xl">
          {title}
        </h1>
        <p className="fade-up mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container-x flex flex-col items-start justify-between gap-8 border-t border-gold/40 py-20 md:flex-row md:items-center">
        <h2 className="max-w-2xl font-serif text-3xl font-medium tracking-tight text-navy-foreground md:text-5xl">
          Have a product to source or a market to reach?
        </h2>
        <Link
          to="/contact"
          className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-background hover:text-navy"
        >
          Send a trade inquiry
        </Link>
      </div>
    </section>
  );
}
