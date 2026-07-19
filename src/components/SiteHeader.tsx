import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/brokers", label: "Brokers" },
  { href: "/request", label: "Submit a Request" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo, no optimization needed */}
          <img src="/logo.svg" alt="Insurance Cambodia" className="h-8 w-8" />
          <span>Insurance Cambodia</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
