"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Logo } from "./Logo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type NavItem = (typeof site.nav)[number];

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = site.nav.find((item) => isActive(item.href))?.href ?? null;
  const highlighted = hovered ?? activeHref;
  const transparent = pathname === "/" && !scrolled;

  const leftNav = site.nav.slice(0, 2);
  const rightNav = site.nav.slice(2);

  const renderLink = (item: NavItem) => {
    const active = highlighted === item.href;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onMouseEnter={() => setHovered(item.href)}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={`relative block rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
            active ? "text-ink" : "text-ink/60 hover:text-ink"
          }`}
        >
          {active && (
            <motion.span
              layoutId="nav-highlight"
              className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 34 }
              }
            />
          )}
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4">
      <div className="container-x px-0">
        <nav
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className={`relative mx-auto flex h-[72px] items-center justify-center gap-2 rounded-full border px-3 transition-all duration-300 ${
            transparent
              ? "border-transparent bg-transparent shadow-none"
              : "border-white/50 bg-paper/55 shadow-lift backdrop-blur-2xl"
          }`}
        >
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="absolute left-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-ink transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>

          <div className="hidden flex-1 justify-end md:flex">
            <ul className="flex items-center gap-1 text-sm">
              {leftNav.map(renderLink)}
            </ul>
          </div>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} — home`}
            className="shrink-0 px-2"
          >
            <Logo layout="stacked" />
          </Link>

          <div className="hidden flex-1 justify-start md:flex">
            <ul className="flex items-center gap-1 text-sm">
              {rightNav.map(renderLink)}
            </ul>
          </div>

          <Link
            href="/contact"
            className="absolute right-3 hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand sm:inline-flex"
          >
            {site.cta.primary}
            <span aria-hidden>→</span>
          </Link>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="mx-auto mt-2 origin-top overflow-hidden rounded-3xl border border-line bg-paper/95 p-2 shadow-lift backdrop-blur-md md:hidden"
            >
              <ul className="flex flex-col">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-ink/[0.06] text-ink"
                          : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl bg-ink px-4 py-3 text-base font-medium text-paper transition-colors hover:bg-brand"
              >
                {site.cta.primary}
                <span aria-hidden>→</span>
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
