"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Table2,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";

//Types

type NavRole = "admin" | "kitchen";

interface NavbarProps {
  role: NavRole;
  restaurantName?: string;
  userName?: string;
  alertCount?: number;     // Notification bell count
}

// ─── Nav Items per Role ──────────────────────────────────────────────────────

const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Tables", href: "/admin/tables", icon: Table2 },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const kitchenNavItems = [
  { label: "Live Orders", href: "/kitchen", icon: UtensilsCrossed },
  { label: "Print Queue", href: "/kitchen?view=print", icon: LayoutDashboard },
  { label: "Search", href: "/kitchen?view=search", icon: BarChart3 },
];

// Component

const Navbar = ({
  role,
  restaurantName = "TableFlow",
  userName = "Admin",
  alertCount = 0,
}: NavbarProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = role === "admin" ? adminNavItems : kitchenNavItems;

  const isActive = (href: string) =>
    href === "/admin/dashboard" || href === "/kitchen"
      ? pathname === href
      : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16",
          "bg-brand-dark border-b border-border-dark",
          "flex items-center px-6 gap-4"
        )}
      >
        {/* Logo / brand */}
        <Link
          href={role === "admin" ? "/admin/dashboard" : "/kitchen"}
          className="flex items-center gap-2 shrink-0 mr-4"
        >
          <span className="font-heading font-extrabold text-[22px] text-white tracking-tight leading-none">
            Table<span className="text-accent">Flow</span>
          </span>
          {restaurantName !== "TableFlow" && (
            <span className="hidden md:block text-caption text-text-muted font-mono border-l border-border-dark pl-3 ml-1">
              {restaurantName}
            </span>
          )}
        </Link>

        {/* Role badge */}
        <Badge
          variant={role === "kitchen" ? "teal" : "accent"}
          className="hidden sm:inline-flex shrink-0 capitalize"
        >
          {role}
        </Badge>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "text-sm font-body font-medium transition-all duration-150",
                isActive(href)
                  ? "bg-accent/15 text-accent"
                  : "text-text-muted hover:text-white hover:bg-white/6"
              )}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/6 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {alertCount > 0 && (
              <span
                className={cn(
                  "absolute -top-0.5 -right-0.5",
                  "min-w-[18px] h-[18px] px-1",
                  "bg-accent text-white text-[10px] font-bold",
                  "rounded-full flex items-center justify-center",
                  "animate-badge-pop"
                )}
              >
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/6 transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <User size={14} className="text-accent" />
              </span>
              <span className="hidden sm:block text-sm font-medium text-white">{userName}</span>
              <ChevronDown
                size={14}
                className={cn(
                  "text-text-muted transition-transform duration-150",
                  userMenuOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div
                className={cn(
                  "absolute right-0 top-full mt-2 w-48",
                  "bg-surface-dark border border-border-dark rounded-card shadow-modal",
                  "animate-slide-up overflow-hidden z-50"
                )}
              >
                <div className="px-4 py-3 border-b border-border-dark">
                  <p className="text-sm font-semibold text-white">{userName}</p>
                  <p className="text-caption text-text-muted capitalize">{role}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-accent hover:bg-accent/5 transition-colors">
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/6 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" />
          <nav
            className="absolute top-16 left-0 right-0 bg-brand-dark border-b border-border-dark animate-slide-in-top"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 text-base font-medium",
                  "border-b border-border-dark/50 transition-colors",
                  isActive(href)
                    ? "text-accent bg-accent/10"
                    : "text-text-muted hover:text-white"
                )}
              >
                <Icon size={20} className="shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* ── Spacer to push content below fixed navbar ── */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;

/*
USAGE EXAMPLES:
───────────────────────────────────────────────────────────────────

import Navbar from "@/components/shared/Navbar";

// Kitchen layout
<Navbar
  role="kitchen"
  restaurantName="Spice Garden"
  userName="Chef Raj"
  alertCount={3}
/>

// Admin layout
<Navbar
  role="admin"
  restaurantName="Spice Garden"
  userName="Anil Sharma"
  alertCount={0}
/>

// Typically placed in a layout file:
// app/(kitchen)/layout.tsx  →  <Navbar role="kitchen" ... />
// app/(admin)/layout.tsx    →  <Navbar role="admin" ... />

───────────────────────────────────────────────────────────────────
*/
