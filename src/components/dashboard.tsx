"use client";

import {
  Users,
  HelpCircle,
  Moon,
  Globe,
  MessageSquare,
  ShoppingBag,
  Calendar,
  UserCheck,
  Phone,
  ChevronRight,
  Package,
  ClipboardList,
  BarChart3,
  Clock,
} from "lucide-react";

/* ── Mock data matching screenshots ────────────────────── */

const ASSISTANTS = [
  {
    id: 1,
    name: "Juan",
    role: "Customer Support",
    type: "phone" as const,
    languages: ["EN", "ES"],
    online: true,
    conversationsToday: 12,
    satisfactionRate: 4.8,
  },
  {
    id: 2,
    name: "Consular De Colombia San Francisco",
    role: "Info Assistant",
    type: "web" as const,
    languages: ["EN", "ES"],
    online: true,
    conversationsToday: 5,
    satisfactionRate: 4.6,
  },
  {
    id: 3,
    name: "Juan",
    role: "Booking Agent",
    type: "web" as const,
    languages: ["EN"],
    online: false,
    conversationsToday: 0,
    satisfactionRate: null,
  },
];

const PENDING_ORDERS = [
  {
    id: "#71ed6c",
    type: "product" as const,
    amount: 438.9,
    time: "11:44 AM",
    status: "pending" as const,
    customer: "Maria Garcia",
  },
  {
    id: "#82af3b",
    type: "menu" as const,
    amount: 52.0,
    time: "12:15 PM",
    status: "pending" as const,
    customer: "Carlos Mendez",
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: "order",
    text: "New product order received",
    detail: "Order #71ed6c — $438.90",
    time: "11:44 AM",
  },
  {
    id: 2,
    icon: "conversation",
    text: "Juan handled a support call",
    detail: "Duration: 4m 32s",
    time: "11:20 AM",
  },
  {
    id: 3,
    icon: "contact",
    text: "New contact added",
    detail: "Maria Garcia — via phone",
    time: "11:18 AM",
  },
  {
    id: 4,
    icon: "booking",
    text: "Appointment confirmed",
    detail: "Carlos Mendez — Mar 25, 2:00 PM",
    time: "10:45 AM",
  },
];

/* ── Helpers ───────────────────────────────────────────── */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getPulseText(): string {
  const pendingCount = PENDING_ORDERS.length;
  const onlineCount = ASSISTANTS.filter((a) => a.online).length;
  const parts: string[] = [];
  if (pendingCount > 0)
    parts.push(
      `${pendingCount} pending order${pendingCount > 1 ? "s" : ""}`
    );
  if (onlineCount > 0)
    parts.push(
      `${onlineCount} assistant${onlineCount > 1 ? "s" : ""} online`
    );
  return parts.join("  ·  ");
}

/* ── Component ─────────────────────────────────────────── */

export function Dashboard() {
  return (
    <div className="mx-auto max-w-[1360px] px-6 py-6">
      {/* ── Header bar ──────────────────────────────── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-wiil-text">
            {getGreeting()}, Saba
          </h1>
          <p className="mt-0.5 text-sm text-wiil-muted">{getPulseText()}</p>
        </div>
        <div className="flex items-center gap-2">
          <HeaderButton icon={Users} />
          <HeaderButton icon={HelpCircle} />
          <div className="flex items-center gap-1.5 rounded-lg border border-wiil-border px-2.5 py-1.5 text-sm text-wiil-text-secondary">
            <span className="text-base">🇺🇸</span>
            English
          </div>
          <HeaderButton icon={Moon} />
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────── */}
      <div className="animate-fade-up mb-6 grid grid-cols-4 gap-4">
        <StatCard
          icon={<MessageSquare className="h-4 w-4" />}
          label="Conversations"
          value="17"
          sub="today"
          accent
        />
        <StatCard
          icon={<ShoppingBag className="h-4 w-4" />}
          label="Pending Orders"
          value="2"
          sub="needs attention"
          warning
        />
        <StatCard
          icon={<Calendar className="h-4 w-4" />}
          label="Bookings"
          value="3"
          sub="today"
        />
        <StatCard
          icon={<UserCheck className="h-4 w-4" />}
          label="Contacts"
          value="48"
          sub="total"
        />
      </div>

      {/* ── Your Assistants (hero section) ──────────── */}
      <div className="animate-fade-up-delay-1 mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Your Assistants
          </h2>
          <span className="rounded-full bg-wiil-accent-light px-2 py-0.5 text-xs font-medium text-wiil-accent">
            {ASSISTANTS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {ASSISTANTS.map((assistant) => (
            <AssistantCard key={assistant.id} assistant={assistant} />
          ))}
        </div>
      </div>

      {/* ── Two-column: Activity + Quick Access ─────── */}
      <div className="animate-fade-up-delay-2 grid grid-cols-5 gap-4">
        {/* Left — Activity feed (3 cols) */}
        <div className="col-span-3 space-y-4">
          {/* Pending orders */}
          <div className="rounded-2xl border border-wiil-border bg-wiil-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-wiil-text">
                  Pending Orders
                </h3>
              </div>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-wiil-accent px-1.5 text-[11px] font-bold text-white">
                {PENDING_ORDERS.length}
              </span>
            </div>
            <div className="space-y-2">
              {PENDING_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="group flex items-center justify-between rounded-xl border border-wiil-border bg-background px-4 py-3 transition-all hover:border-wiil-accent/30 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent"
                    >
                      {order.type === "product" ? (
                        <Package className="h-4 w-4" />
                      ) : (
                        <ShoppingBag className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-wiil-text">
                        Order {order.id}
                        <span className="ml-2 text-wiil-muted">·</span>
                        <span className="ml-2 text-wiil-text-secondary">
                          {order.customer}
                        </span>
                      </p>
                      <p className="text-xs text-wiil-muted">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {order.time} · ${order.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-wiil-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-wiil-accent">
                      pending
                    </span>
                    <ChevronRight className="h-4 w-4 text-wiil-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-sm font-medium text-wiil-accent transition-colors hover:bg-wiil-accent-light">
              View all orders
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-wiil-border bg-wiil-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-wiil-text">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-1">
              {RECENT_ACTIVITY.map((item, i) => (
                <div
                  key={item.id}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-background"
                >
                  <div className="mt-0.5">
                    <ActivityIcon type={item.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-wiil-text">{item.text}</p>
                    <p className="text-xs text-wiil-muted">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-wiil-muted">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Quick access (2 cols) */}
        <div className="col-span-2 space-y-4">
          {/* Your Business */}
          <div className="rounded-2xl border border-wiil-border bg-wiil-card p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-wiil-muted">
              Your Business
            </h3>
            <div className="space-y-1">
              <QuickLink
                icon={<ShoppingBag className="h-4 w-4" />}
                label="Product Orders"
                badge="2"
              />
              <QuickLink
                icon={<Calendar className="h-4 w-4" />}
                label="Bookings & Activity"
                badge="3"
              />
              <QuickLink
                icon={<Users className="h-4 w-4" />}
                label="Contacts"
              />
              <QuickLink
                icon={<BarChart3 className="h-4 w-4" />}
                label="Reports"
              />
            </div>
          </div>

          {/* AI Containment — simple text card */}
          <div className="rounded-2xl border border-wiil-border bg-wiil-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">AI Containment</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-wiil-text">87.3%</p>
            <p className="mt-1 text-sm text-wiil-muted">conversations resolved without handoff</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function HeaderButton({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-wiil-border text-wiil-muted transition-colors hover:bg-wiil-accent-light hover:text-wiil-accent">
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-wiil-border bg-wiil-card px-5 py-4 transition-all hover:shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent">
          {icon}
        </div>
        <span className="text-xs font-medium text-wiil-muted">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-wiil-text">{value}</span>
        <span className="text-xs text-wiil-muted">{sub}</span>
      </div>
    </div>
  );
}

function AssistantCard({
  assistant,
}: {
  assistant: (typeof ASSISTANTS)[0];
}) {
  const isLongName = assistant.name.length > 20;
  return (
    <div className="group cursor-pointer rounded-2xl border border-wiil-border bg-wiil-card p-5 transition-all hover:border-wiil-accent/30 hover:shadow-sm">
      {/* Top: status + type */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              assistant.online
                ? "bg-wiil-accent animate-pulse-dot"
                : "bg-gray-300"
            }`}
          />
          <span
            className={`text-[11px] font-medium ${
              assistant.online ? "text-wiil-accent" : "text-wiil-muted"
            }`}
          >
            {assistant.online ? "Online" : "Offline"}
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-wiil-accent-light px-2 py-0.5 text-[11px] font-medium text-wiil-accent">
          {assistant.type === "phone" ? (
            <Phone className="h-3 w-3" />
          ) : (
            <Globe className="h-3 w-3" />
          )}
          {assistant.type === "phone" ? "Phone" : "Web"}
        </span>
      </div>

      {/* Name + role */}
      <h3
        className={`font-semibold text-wiil-text ${
          isLongName ? "text-sm leading-tight" : "text-base"
        }`}
        title={assistant.name}
      >
        {isLongName ? assistant.name.slice(0, 28) + "..." : assistant.name}
      </h3>
      <p className="mt-0.5 text-xs text-wiil-muted">{assistant.role}</p>

      {/* Languages */}
      <div className="mt-3 flex items-center gap-1">
        {assistant.languages.map((lang) => (
          <span
            key={lang}
            className="rounded bg-wiil-accent/5 px-1.5 py-0.5 text-[10px] font-medium text-wiil-text-secondary"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Conversations today */}
      <div className="mt-4 border-t border-wiil-border pt-3">
        <p className="text-sm text-wiil-text">
          <span className="font-semibold">{assistant.conversationsToday}</span>
          <span className="text-wiil-muted"> conversations today</span>
        </p>
      </div>
    </div>
  );
}

function QuickLink({
  icon,
  label,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-wiil-accent-light/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent">
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium text-wiil-text-secondary group-hover:text-wiil-text">
        {label}
      </span>
      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-wiil-accent px-1.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 text-wiil-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const base = "flex h-7 w-7 items-center justify-center rounded-lg bg-wiil-accent-light text-wiil-accent";
  const icons: Record<string, React.ReactNode> = {
    order: <ShoppingBag className="h-3.5 w-3.5" />,
    conversation: <MessageSquare className="h-3.5 w-3.5" />,
    contact: <UserCheck className="h-3.5 w-3.5" />,
    booking: <Calendar className="h-3.5 w-3.5" />,
  };
  return <div className={base}>{icons[type] || <BarChart3 className="h-3.5 w-3.5" />}</div>;
}
