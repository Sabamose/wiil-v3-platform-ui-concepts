"use client";

import {
  Home,
  LayoutGrid,
  Users,
  MessageSquare,
  Calendar,
  Package,
  Wrench,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Agents", href: "/agents" },
  { icon: Users, label: "Contacts", href: "/contacts" },
  { icon: MessageSquare, label: "Inbox", href: "/inbox" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Wrench, label: "Services", href: "/services" },
  { icon: FileText, label: "Documents", href: "/documents" },
];

const BOTTOM_ITEMS = [
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar({ activePath = "/" }: { activePath?: string }) {
  return (
    <aside className="flex w-[52px] flex-col items-center border-r border-wiil-border bg-wiil-sidebar py-4">
      {/* Logo */}
      <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-lg bg-wiil-accent">
        <span className="text-sm font-bold text-white">W</span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href;
          return (
            <a
              key={item.label}
              href={item.href}
              title={item.label}
              className={`group relative flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "bg-wiil-accent text-white shadow-sm"
                  : "text-wiil-muted hover:bg-wiil-accent-light hover:text-wiil-accent"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-wiil-text px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col items-center gap-1">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              title={item.label}
              className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-wiil-muted transition-all hover:bg-wiil-accent-light hover:text-wiil-accent"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-wiil-text px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-wiil-accent text-xs font-semibold text-white">
          SM
        </div>
      </div>
    </aside>
  );
}
