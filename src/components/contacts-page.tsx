"use client";

import {
  Search,
  Users,
  UserPlus,
  Upload,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Sparkles,
  Clock,
  HelpCircle,
  Moon,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";

/* ── Mock data ─────────────────────────────────────────── */

type Stage = "new_lead" | "contacted" | "qualified" | "converted" | "lost";
type Channel = "phone" | "web" | "whatsapp" | "email";
type Sentiment = "positive" | "neutral" | "negative";

interface Contact {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  source_channel: Channel;
  current_stage: Stage;
  tags: string[];
  total_conversations: number;
  last_contact_at: string | null;
  last_conversation_summary: string | null;
  last_conversation_sentiment: Sentiment | null;
  activity_score: number;
  created_at: string;
}

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Maria Garcia",
    phone: "+1 (555) 234-5678",
    email: "maria.g@email.com",
    source_channel: "phone",
    current_stage: "qualified",
    tags: ["VIP", "Returning"],
    total_conversations: 8,
    last_contact_at: "2026-03-24T10:30:00Z",
    last_conversation_summary: "Asked about pricing for the premium cleaning package and scheduled a demo",
    last_conversation_sentiment: "positive",
    activity_score: 85,
    created_at: "2025-12-28",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    phone: "+1 (555) 876-5432",
    email: null,
    source_channel: "whatsapp",
    current_stage: "new_lead",
    tags: [],
    total_conversations: 1,
    last_contact_at: "2026-03-23T15:20:00Z",
    last_conversation_summary: "Inquired about appointment availability for next week",
    last_conversation_sentiment: "neutral",
    activity_score: 12,
    created_at: "2026-03-23",
  },
  {
    id: 3,
    name: "Abigail Anderson",
    phone: "+1 (602) 555-0122",
    email: "abigail.a@example.com",
    source_channel: "web",
    current_stage: "contacted",
    tags: ["Returning"],
    total_conversations: 4,
    last_contact_at: "2026-03-22T09:15:00Z",
    last_conversation_summary: "Followed up on previous order status and asked about return policy",
    last_conversation_sentiment: "neutral",
    activity_score: 55,
    created_at: "2025-12-28",
  },
  {
    id: 4,
    name: "Aiden Wilson",
    phone: "+1 (313) 555-0147",
    email: "aiden.wilson@email.com",
    source_channel: "phone",
    current_stage: "converted",
    tags: ["VIP", "Active"],
    total_conversations: 15,
    last_contact_at: "2026-03-24T08:45:00Z",
    last_conversation_summary: "Confirmed recurring weekly order and updated delivery address",
    last_conversation_sentiment: "positive",
    activity_score: 95,
    created_at: "2025-12-28",
  },
  {
    id: 5,
    name: "Ava Nguyen",
    phone: "+1 (603) 555-0174",
    email: "ava.nguyen@example.net",
    source_channel: "web",
    current_stage: "new_lead",
    tags: [],
    total_conversations: 2,
    last_contact_at: "2026-03-20T14:00:00Z",
    last_conversation_summary: "Browsed product catalog and asked about shipping to international addresses",
    last_conversation_sentiment: "neutral",
    activity_score: 20,
    created_at: "2026-03-20",
  },
  {
    id: 6,
    name: "Benjamin Carter",
    phone: "+1 (302) 555-0162",
    email: "ben.carter@email.com",
    source_channel: "phone",
    current_stage: "qualified",
    tags: ["Active"],
    total_conversations: 6,
    last_contact_at: "2026-03-21T11:30:00Z",
    last_conversation_summary: "Discussed custom order requirements and requested a formal quote",
    last_conversation_sentiment: "positive",
    activity_score: 70,
    created_at: "2025-12-28",
  },
  {
    id: 7,
    name: "Charlotte Moore",
    phone: "+1 (412) 555-0133",
    email: "charlotte.m@example.net",
    source_channel: "email",
    current_stage: "lost",
    tags: [],
    total_conversations: 3,
    last_contact_at: "2026-02-15T16:00:00Z",
    last_conversation_summary: "Decided to go with a different provider due to pricing concerns",
    last_conversation_sentiment: "negative",
    activity_score: 5,
    created_at: "2025-12-28",
  },
  {
    id: 8,
    name: "Daniel Kim",
    phone: null,
    email: "daniel.kim@business.co",
    source_channel: "web",
    current_stage: "contacted",
    tags: [],
    total_conversations: 0,
    last_contact_at: null,
    last_conversation_summary: null,
    last_conversation_sentiment: null,
    activity_score: 0,
    created_at: "2026-03-24",
  },
  {
    id: 9,
    name: "Elena Rodriguez",
    phone: "+1 (786) 555-0198",
    email: "elena.r@gmail.com",
    source_channel: "whatsapp",
    current_stage: "qualified",
    tags: ["VIP"],
    total_conversations: 11,
    last_contact_at: "2026-03-24T12:00:00Z",
    last_conversation_summary: "Booked a premium appointment and asked about loyalty program benefits",
    last_conversation_sentiment: "positive",
    activity_score: 90,
    created_at: "2026-01-15",
  },
  {
    id: 10,
    name: "Amelia Garcia",
    phone: "+1 (512) 555-0104",
    email: "amelia.g@email.net",
    source_channel: "phone",
    current_stage: "contacted",
    tags: [],
    total_conversations: 2,
    last_contact_at: "2026-03-18T10:00:00Z",
    last_conversation_summary: "Called to check product availability and was transferred to sales team",
    last_conversation_sentiment: "neutral",
    activity_score: 25,
    created_at: "2025-12-28",
  },
];

const DUPLICATE_SUGGESTIONS = [
  { contact1: "Maria Garcia", contact2: "Amelia Garcia", reason: "Similar name and phone area code", confidence: 0.72 },
  { contact1: "Juan (Assistant)", contact2: "Juan", reason: "Identical first name, same email domain", confidence: 0.65 },
];

/* ── Helpers ───────────────────────────────────────────── */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

const STAGE_CONFIG: Record<Stage, { label: string; bg: string; text: string }> = {
  new_lead: { label: "New Lead", bg: "bg-blue-50", text: "text-blue-600" },
  contacted: { label: "Contacted", bg: "bg-amber-50", text: "text-amber-600" },
  qualified: { label: "Qualified", bg: "bg-wiil-accent-light", text: "text-wiil-accent" },
  converted: { label: "Converted", bg: "bg-wiil-success-bg", text: "text-wiil-success" },
  lost: { label: "Lost", bg: "bg-gray-100", text: "text-gray-500" },
};

const CHANNEL_CONFIG: Record<Channel, { label: string; icon: React.ComponentType<{ className?: string }>; bg: string; text: string }> = {
  phone: { label: "Phone", icon: Phone, bg: "bg-blue-50", text: "text-blue-600" },
  web: { label: "Web", icon: Globe, bg: "bg-purple-50", text: "text-purple-600" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, bg: "bg-green-50", text: "text-green-600" },
  email: { label: "Email", icon: Mail, bg: "bg-orange-50", text: "text-orange-600" },
};

const TAG_COLORS: Record<string, string> = {
  VIP: "bg-amber-400",
  Returning: "bg-blue-400",
  Active: "bg-green-400",
};

/* ── Component ─────────────────────────────────────────── */

export function ContactsPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showDuplicateBanner, setShowDuplicateBanner] = useState(true);

  const filtered = CONTACTS.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (stageFilter !== "all" && c.current_stage !== stageFilter) return false;
    if (channelFilter !== "all" && c.source_channel !== channelFilter) return false;
    return true;
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  // Insight computations
  const activeThisWeek = CONTACTS.filter((c) => {
    if (!c.last_contact_at) return false;
    const diff = Date.now() - new Date(c.last_contact_at).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const needsFollowUp = CONTACTS.filter((c) => {
    if (!c.last_contact_at || c.current_stage === "converted" || c.current_stage === "lost") return false;
    const diff = Date.now() - new Date(c.last_contact_at).getTime();
    return diff > 5 * 24 * 60 * 60 * 1000;
  }).length;

  const newThisWeek = CONTACTS.filter((c) => {
    const diff = Date.now() - new Date(c.created_at).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="mx-auto max-w-[1360px] px-6 py-6">
      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-wiil-text">
            Contacts
          </h1>
          <p className="mt-0.5 text-sm text-wiil-muted">
            {CONTACTS.length} contacts across {new Set(CONTACTS.map((c) => c.current_stage)).size} stages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <HeaderButton icon={Users} />
            <HeaderButton icon={HelpCircle} />
            <div className="flex items-center gap-1.5 rounded-lg border border-wiil-border px-2.5 py-1.5 text-sm text-wiil-text-secondary">
              <span className="text-base">🇺🇸</span>
              English
            </div>
            <HeaderButton icon={Moon} />
          </div>
          <div className="h-6 w-px bg-wiil-border" />
          <button className="flex items-center gap-2 rounded-xl border border-wiil-border px-4 py-2 text-sm font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-wiil-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-wiil-accent-hover">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* ── Insight strip ───────────────────────────── */}
      <div className="animate-fade-up mb-6 grid grid-cols-4 gap-4">
        <InsightCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Active This Week"
          value={activeThisWeek.toString()}
          color="accent"
        />
        {needsFollowUp > 0 ? (
          <InsightCard
            icon={<Clock className="h-4 w-4" />}
            label="Needs Follow-up"
            value={needsFollowUp.toString()}
            color="warning"
          />
        ) : (
          <InsightCard
            icon={<UserCheck className="h-4 w-4" />}
            label="All Followed Up"
            value="0 overdue"
            color="success"
          />
        )}
        {DUPLICATE_SUGGESTIONS.length > 0 ? (
          <InsightCard
            icon={<AlertTriangle className="h-4 w-4" />}
            label="Possible Duplicates"
            value={DUPLICATE_SUGGESTIONS.length.toString()}
            color="warning"
          />
        ) : (
          <InsightCard
            icon={<Sparkles className="h-4 w-4" />}
            label="No Duplicates"
            value="Clean"
            color="success"
          />
        )}
        <InsightCard
          icon={<UserPlus className="h-4 w-4" />}
          label="New This Week"
          value={newThisWeek.toString()}
          color={newThisWeek > 0 ? "accent" : "muted"}
        />
      </div>

      {/* ── Duplicate banner ────────────────────────── */}
      {showDuplicateBanner && DUPLICATE_SUGGESTIONS.length > 0 && (
        <div className="animate-fade-up-delay-1 mb-4 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-900">
                We found {DUPLICATE_SUGGESTIONS.length} possible duplicate contacts
              </p>
              <p className="text-xs text-amber-700">
                {DUPLICATE_SUGGESTIONS.map((d) => `${d.contact1} & ${d.contact2}`).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700">
              Review & Merge
            </button>
            <button
              onClick={() => setShowDuplicateBanner(false)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── Filter bar ──────────────────────────────── */}
      <div className="animate-fade-up-delay-1 mb-4 flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wiil-muted" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-wiil-border bg-wiil-card py-2.5 pl-10 pr-4 text-sm text-wiil-text outline-none placeholder:text-wiil-muted focus:border-wiil-accent"
          />
        </div>

        {/* Stage filter */}
        <div className="relative">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="appearance-none rounded-xl border border-wiil-border bg-wiil-card py-2.5 pl-3 pr-8 text-sm text-wiil-text-secondary outline-none focus:border-wiil-accent"
          >
            <option value="all">All Stages</option>
            <option value="new_lead">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wiil-muted" />
        </div>

        {/* Channel filter */}
        <div className="relative">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="appearance-none rounded-xl border border-wiil-border bg-wiil-card py-2.5 pl-3 pr-8 text-sm text-wiil-text-secondary outline-none focus:border-wiil-accent"
          >
            <option value="all">All Channels</option>
            <option value="phone">Phone</option>
            <option value="web">Web</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wiil-muted" />
        </div>

        <div className="flex-1" />

        <span className="text-sm text-wiil-muted">
          {filtered.length} contact{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Contact table ───────────────────────────── */}
      <div className="animate-fade-up-delay-2 rounded-2xl border border-wiil-border bg-wiil-card overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[40px_1fr_100px_100px_1fr_120px_60px] items-center gap-4 border-b border-wiil-border px-5 py-3">
          <div>
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-wiil-border text-wiil-accent accent-wiil-accent"
            />
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Contact
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Channel
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Stage
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Last Conversation
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">
            Activity
          </div>
          <div />
        </div>

        {/* Rows */}
        {filtered.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={selectedIds.has(contact.id)}
            onToggle={() => toggleSelect(contact.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16">
            <Users className="h-8 w-8 text-wiil-muted" />
            <p className="text-sm text-wiil-muted">No contacts match your filters</p>
          </div>
        )}
      </div>

      {/* ── Bulk actions bar ────────────────────────── */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-wiil-border bg-wiil-card px-5 py-3 shadow-xl">
          <span className="text-sm font-medium text-wiil-text">
            {selectedIds.size} selected
          </span>
          <div className="h-4 w-px bg-wiil-border" />
          <BulkButton label="Add Tags" />
          <BulkButton label="Change Stage" />
          <BulkButton label="Export" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50">
            Delete
          </button>
          <div className="h-4 w-px bg-wiil-border" />
          <button
            onClick={() => setSelectedIds(new Set())}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-wiil-muted transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
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

function InsightCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "accent" | "warning" | "success" | "muted";
}) {
  const colorMap = {
    accent: { bg: "bg-wiil-accent-light", text: "text-wiil-accent", valueTxt: "text-wiil-text" },
    warning: { bg: "bg-wiil-pending-bg", text: "text-wiil-pending", valueTxt: "text-wiil-pending" },
    success: { bg: "bg-wiil-success-bg", text: "text-wiil-success", valueTxt: "text-wiil-success" },
    muted: { bg: "bg-gray-50", text: "text-wiil-muted", valueTxt: "text-wiil-text" },
  };
  const c = colorMap[color];

  return (
    <div className="rounded-2xl border border-wiil-border bg-wiil-card px-5 py-4 transition-all hover:shadow-sm cursor-pointer">
      <div className="mb-2 flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-wiil-muted">{label}</span>
      </div>
      <p className={`text-2xl font-bold tracking-tight ${c.valueTxt}`}>{value}</p>
    </div>
  );
}

function ContactRow({
  contact,
  selected,
  onToggle,
}: {
  contact: Contact;
  selected: boolean;
  onToggle: () => void;
}) {
  const stage = STAGE_CONFIG[contact.current_stage];
  const channel = CHANNEL_CONFIG[contact.source_channel];
  const ChannelIcon = channel.icon;

  const isRecentlyActive = contact.last_contact_at
    ? Date.now() - new Date(contact.last_contact_at).getTime() < 48 * 60 * 60 * 1000
    : false;

  const activityWidth = Math.max(contact.activity_score, 4);

  return (
    <div
      className={`group grid grid-cols-[40px_1fr_100px_100px_1fr_120px_60px] items-center gap-4 border-b border-wiil-border px-5 py-3.5 transition-colors hover:bg-gray-50/50 ${
        selected ? "bg-wiil-accent-light/30" : ""
      }`}
    >
      {/* Checkbox */}
      <div>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="h-4 w-4 rounded border-wiil-border text-wiil-accent accent-wiil-accent"
        />
      </div>

      {/* Contact: avatar + name + contact method icons + tags */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-wiil-text-secondary">
            {getInitials(contact.name)}
          </div>
          {isRecentlyActive && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-wiil-success animate-pulse-dot" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-medium text-wiil-accent cursor-pointer hover:underline">
              {contact.name}
            </span>
            {/* Contact method icons */}
            {contact.phone && (
              <span title={contact.phone}>
                <Phone className="h-3 w-3 text-wiil-muted" />
              </span>
            )}
            {contact.email && (
              <span title={contact.email}>
                <Mail className="h-3 w-3 text-wiil-muted" />
              </span>
            )}
            {/* Tag dots */}
            {contact.tags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className={`h-1.5 w-1.5 rounded-full ${TAG_COLORS[tag] || "bg-gray-400"}`}
              />
            ))}
          </div>
          {/* Tags as labels on hover / when there are tags */}
          {contact.tags.length > 0 && (
            <div className="flex gap-1 mt-0.5">
              {contact.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium text-wiil-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Channel */}
      <div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${channel.bg} ${channel.text}`}
        >
          <ChannelIcon className="h-3 w-3" />
          {channel.label}
        </span>
      </div>

      {/* Stage */}
      <div>
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stage.bg} ${stage.text}`}
        >
          {stage.label}
        </span>
      </div>

      {/* Last conversation */}
      <div className="min-w-0">
        {contact.last_conversation_summary ? (
          <div>
            <div className="flex items-center gap-1.5">
              {contact.last_conversation_sentiment === "positive" && (
                <span className="shrink-0 text-green-500 text-xs">+</span>
              )}
              {contact.last_conversation_sentiment === "negative" && (
                <span className="shrink-0 text-red-500 text-xs">-</span>
              )}
              <p className="truncate text-sm text-wiil-text">
                {contact.last_conversation_summary}
              </p>
            </div>
            <p className="mt-0.5 text-xs text-wiil-muted">
              {timeAgo(contact.last_contact_at)}
            </p>
          </div>
        ) : (
          <p className="text-sm italic text-wiil-muted">Awaiting first interaction</p>
        )}
      </div>

      {/* Activity */}
      <div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full bg-gray-100">
            <div
              className="h-1.5 rounded-full bg-wiil-accent transition-all"
              style={{ width: `${activityWidth}%` }}
            />
          </div>
          <span className="text-xs font-medium text-wiil-text-secondary">
            {contact.total_conversations}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {contact.phone && (
          <button
            title="Call"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-wiil-muted transition-colors hover:bg-wiil-accent-light hover:text-wiil-accent"
          >
            <Phone className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          title="Message"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-wiil-muted transition-colors hover:bg-wiil-accent-light hover:text-wiil-accent"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </button>
        <button
          title="More"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-wiil-muted transition-colors hover:bg-gray-100"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function BulkButton({ label }: { label: string }) {
  return (
    <button className="rounded-lg border border-wiil-border px-3 py-1.5 text-xs font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
      {label}
    </button>
  );
}
