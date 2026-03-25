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
  ChevronDown,
  MoreHorizontal,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Sparkles,
  Clock,
  HelpCircle,
  Moon,
  X,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Tag,
  FileText,
  User,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ── Mock data ─────────────────────────────────────────── */

type Stage = "new_lead" | "contacted" | "qualified" | "converted" | "lost";
type Channel = "phone" | "web" | "whatsapp" | "email";
type Sentiment = "positive" | "neutral" | "negative";

interface Contact {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  company: string;
  source_channel: Channel;
  current_stage: Stage;
  tags: string[];
  total_conversations: number;
  last_contact_at: string | null;
  last_conversation_summary: string | null;
  last_conversation_sentiment: Sentiment | null;
  activity_score: number;
  created_at: string;
  preferred_contact: "email" | "phone" | "whatsapp";
  priority: "low" | "medium" | "high";
  best_time_to_call: string;
  language: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
  notes: string;
}

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Maria Garcia",
    firstName: "Maria",
    lastName: "Garcia",
    phone: "+1 (555) 234-5678",
    email: "maria.g@email.com",
    company: "Garcia Imports LLC",
    source_channel: "phone",
    current_stage: "qualified",
    tags: ["VIP", "Returning"],
    total_conversations: 8,
    last_contact_at: "2026-03-24T10:30:00Z",
    last_conversation_summary: "Asked about pricing for the premium cleaning package and scheduled a demo",
    last_conversation_sentiment: "positive",
    activity_score: 85,
    created_at: "2025-12-28",
    preferred_contact: "phone",
    priority: "high",
    best_time_to_call: "Morning",
    language: "English",
    address: { street: "456 Oak Ave", city: "Miami", state: "FL", postal: "33101", country: "United States" },
    notes: "Key account — interested in annual contract",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    firstName: "Carlos",
    lastName: "Mendez",
    phone: "+1 (555) 876-5432",
    email: null,
    company: "",
    source_channel: "whatsapp",
    current_stage: "new_lead",
    tags: [],
    total_conversations: 1,
    last_contact_at: "2026-03-23T15:20:00Z",
    last_conversation_summary: "Inquired about appointment availability for next week",
    last_conversation_sentiment: "neutral",
    activity_score: 12,
    created_at: "2026-03-23",
    preferred_contact: "whatsapp",
    priority: "medium",
    best_time_to_call: "Afternoon",
    language: "Spanish",
    address: { street: "", city: "San Francisco", state: "CA", postal: "", country: "United States" },
    notes: "",
  },
  {
    id: 3,
    name: "Abigail Anderson",
    firstName: "Abigail",
    lastName: "Anderson",
    phone: "+1 (602) 555-0122",
    email: "abigail.a@example.com",
    company: "Anderson Design Co",
    source_channel: "web",
    current_stage: "contacted",
    tags: ["Returning"],
    total_conversations: 4,
    last_contact_at: "2026-03-22T09:15:00Z",
    last_conversation_summary: "Followed up on previous order status and asked about return policy",
    last_conversation_sentiment: "neutral",
    activity_score: 55,
    created_at: "2025-12-28",
    preferred_contact: "email",
    priority: "medium",
    best_time_to_call: "Morning",
    language: "English",
    address: { street: "789 Pine St", city: "Phoenix", state: "AZ", postal: "85001", country: "United States" },
    notes: "",
  },
  {
    id: 4,
    name: "Aiden Wilson",
    firstName: "Aiden",
    lastName: "Wilson",
    phone: "+1 (313) 555-0147",
    email: "aiden.wilson@email.com",
    company: "Wilson & Sons",
    source_channel: "phone",
    current_stage: "converted",
    tags: ["VIP", "Active"],
    total_conversations: 15,
    last_contact_at: "2026-03-24T08:45:00Z",
    last_conversation_summary: "Confirmed recurring weekly order and updated delivery address",
    last_conversation_sentiment: "positive",
    activity_score: 95,
    created_at: "2025-12-28",
    preferred_contact: "phone",
    priority: "high",
    best_time_to_call: "Morning",
    language: "English",
    address: { street: "123 Main St", city: "Detroit", state: "MI", postal: "48201", country: "United States" },
    notes: "Recurring customer — weekly orders every Monday",
  },
  {
    id: 5,
    name: "Ava Nguyen",
    firstName: "Ava",
    lastName: "Nguyen",
    phone: "+1 (603) 555-0174",
    email: "ava.nguyen@example.net",
    company: "",
    source_channel: "web",
    current_stage: "new_lead",
    tags: [],
    total_conversations: 2,
    last_contact_at: "2026-03-20T14:00:00Z",
    last_conversation_summary: "Browsed product catalog and asked about shipping to international addresses",
    last_conversation_sentiment: "neutral",
    activity_score: 20,
    created_at: "2026-03-20",
    preferred_contact: "email",
    priority: "low",
    best_time_to_call: "Evening",
    language: "English",
    address: { street: "", city: "Hanover", state: "NH", postal: "", country: "United States" },
    notes: "",
  },
  {
    id: 6,
    name: "Benjamin Carter",
    firstName: "Benjamin",
    lastName: "Carter",
    phone: "+1 (302) 555-0162",
    email: "ben.carter@email.com",
    company: "Carter Consulting",
    source_channel: "phone",
    current_stage: "qualified",
    tags: ["Active"],
    total_conversations: 6,
    last_contact_at: "2026-03-21T11:30:00Z",
    last_conversation_summary: "Discussed custom order requirements and requested a formal quote",
    last_conversation_sentiment: "positive",
    activity_score: 70,
    created_at: "2025-12-28",
    preferred_contact: "email",
    priority: "high",
    best_time_to_call: "Afternoon",
    language: "English",
    address: { street: "321 Elm Blvd", city: "Wilmington", state: "DE", postal: "19801", country: "United States" },
    notes: "Wants a quote by end of week",
  },
  {
    id: 7,
    name: "Charlotte Moore",
    firstName: "Charlotte",
    lastName: "Moore",
    phone: "+1 (412) 555-0133",
    email: "charlotte.m@example.net",
    company: "",
    source_channel: "email",
    current_stage: "lost",
    tags: [],
    total_conversations: 3,
    last_contact_at: "2026-02-15T16:00:00Z",
    last_conversation_summary: "Decided to go with a different provider due to pricing concerns",
    last_conversation_sentiment: "negative",
    activity_score: 5,
    created_at: "2025-12-28",
    preferred_contact: "email",
    priority: "low",
    best_time_to_call: "",
    language: "English",
    address: { street: "", city: "Pittsburgh", state: "PA", postal: "", country: "United States" },
    notes: "Lost due to pricing — follow up if we run a promotion",
  },
  {
    id: 8,
    name: "Daniel Kim",
    firstName: "Daniel",
    lastName: "Kim",
    phone: null,
    email: "daniel.kim@business.co",
    company: "Kim Enterprises",
    source_channel: "web",
    current_stage: "contacted",
    tags: [],
    total_conversations: 0,
    last_contact_at: null,
    last_conversation_summary: null,
    last_conversation_sentiment: null,
    activity_score: 0,
    created_at: "2026-03-24",
    preferred_contact: "email",
    priority: "medium",
    best_time_to_call: "",
    language: "English",
    address: { street: "", city: "", state: "", postal: "", country: "" },
    notes: "",
  },
  {
    id: 9,
    name: "Elena Rodriguez",
    firstName: "Elena",
    lastName: "Rodriguez",
    phone: "+1 (786) 555-0198",
    email: "elena.r@gmail.com",
    company: "Rodriguez Real Estate",
    source_channel: "whatsapp",
    current_stage: "qualified",
    tags: ["VIP"],
    total_conversations: 11,
    last_contact_at: "2026-03-24T12:00:00Z",
    last_conversation_summary: "Booked a premium appointment and asked about loyalty program benefits",
    last_conversation_sentiment: "positive",
    activity_score: 90,
    created_at: "2026-01-15",
    preferred_contact: "whatsapp",
    priority: "high",
    best_time_to_call: "Morning",
    language: "Spanish",
    address: { street: "900 Brickell Ave", city: "Miami", state: "FL", postal: "33131", country: "United States" },
    notes: "Premium client — always gets priority scheduling",
  },
  {
    id: 10,
    name: "Amelia Garcia",
    firstName: "Amelia",
    lastName: "Garcia",
    phone: "+1 (512) 555-0104",
    email: "amelia.g@email.net",
    company: "",
    source_channel: "phone",
    current_stage: "contacted",
    tags: [],
    total_conversations: 2,
    last_contact_at: "2026-03-18T10:00:00Z",
    last_conversation_summary: "Called to check product availability and was transferred to sales team",
    last_conversation_sentiment: "neutral",
    activity_score: 25,
    created_at: "2025-12-28",
    preferred_contact: "email",
    priority: "medium",
    best_time_to_call: "Afternoon",
    language: "English",
    address: { street: "", city: "Austin", state: "TX", postal: "", country: "United States" },
    notes: "",
  },
];

const DUPLICATE_SUGGESTIONS = [
  { contact1: "Maria Garcia", contact2: "Amelia Garcia", reason: "Similar name and phone area code", confidence: 0.72 },
  { contact1: "Juan (Assistant)", contact2: "Juan", reason: "Identical first name, same email domain", confidence: 0.65 },
];

/* ── Helpers ───────────────────────────────────────────── */

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
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

const STAGE_LABELS: Record<Stage, string> = {
  new_lead: "New Lead",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost",
};

const CHANNEL_ICONS: Record<Channel, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  phone: { label: "Phone", icon: Phone },
  web: { label: "Web", icon: Globe },
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
  email: { label: "Email", icon: Mail },
};

/* ── Main Component ────────────────────────────────────── */

export function ContactsPage() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showDuplicateBanner, setShowDuplicateBanner] = useState(true);
  const [detailContact, setDetailContact] = useState<Contact | null>(null);
  const [editContact, setEditContact] = useState<Contact | null>(null);

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
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((c) => c.id)));
  };

  const activeThisWeek = CONTACTS.filter((c) => {
    if (!c.last_contact_at) return false;
    return Date.now() - new Date(c.last_contact_at).getTime() < 7 * 86400000;
  }).length;

  const needsFollowUp = CONTACTS.filter((c) => {
    if (!c.last_contact_at || c.current_stage === "converted" || c.current_stage === "lost") return false;
    return Date.now() - new Date(c.last_contact_at).getTime() > 5 * 86400000;
  }).length;

  const newThisWeek = CONTACTS.filter((c) => {
    return Date.now() - new Date(c.created_at).getTime() < 7 * 86400000;
  }).length;

  return (
    <div className="px-8 py-6">
      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-wiil-text">Contacts</h1>
          <p className="mt-0.5 text-sm text-wiil-muted">
            {CONTACTS.length} contacts across {new Set(CONTACTS.map((c) => c.current_stage)).size} stages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <HeaderButton icon={Users} />
            <HeaderButton icon={HelpCircle} />
            <div className="flex items-center gap-1.5 rounded-lg border border-wiil-border px-2.5 py-1.5 text-sm text-wiil-text-secondary">
              <span className="text-base">🇺🇸</span>English
            </div>
            <HeaderButton icon={Moon} />
          </div>
          <div className="h-6 w-px bg-wiil-border" />
          <button className="flex items-center gap-2 rounded-xl border border-wiil-border px-4 py-2 text-sm font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
            <Upload className="h-4 w-4" />Import CSV
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-wiil-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-wiil-accent-hover">
            <UserPlus className="h-4 w-4" />Add Contact
          </button>
        </div>
      </div>

      {/* ── Insight strip ───────────────────────────── */}
      <div className="animate-fade-up mb-6 grid grid-cols-4 gap-4">
        <InsightCard icon={<TrendingUp className="h-4 w-4" />} label="Active This Week" value={activeThisWeek.toString()} />
        {needsFollowUp > 0 ? (
          <InsightCard icon={<Clock className="h-4 w-4" />} label="Needs Follow-up" value={needsFollowUp.toString()} muted />
        ) : (
          <InsightCard icon={<UserCheck className="h-4 w-4" />} label="All Followed Up" value="0 overdue" />
        )}
        {DUPLICATE_SUGGESTIONS.length > 0 ? (
          <InsightCard icon={<AlertTriangle className="h-4 w-4" />} label="Possible Duplicates" value={DUPLICATE_SUGGESTIONS.length.toString()} muted />
        ) : (
          <InsightCard icon={<Sparkles className="h-4 w-4" />} label="No Duplicates" value="Clean" />
        )}
        <InsightCard icon={<UserPlus className="h-4 w-4" />} label="New This Week" value={newThisWeek.toString()} />
      </div>

      {/* ── Duplicate banner ────────────────────────── */}
      {showDuplicateBanner && DUPLICATE_SUGGESTIONS.length > 0 && (
        <div className="animate-fade-up-delay-1 mb-4 flex items-center justify-between rounded-2xl border border-wiil-border bg-wiil-accent-light px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-wiil-accent/10 text-wiil-accent">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-wiil-text">We found {DUPLICATE_SUGGESTIONS.length} possible duplicate contacts</p>
              <p className="text-xs text-wiil-muted">{DUPLICATE_SUGGESTIONS.map((d) => `${d.contact1} & ${d.contact2}`).join(", ")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-wiil-accent px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-wiil-accent-dark">Review & Merge</button>
            <button onClick={() => setShowDuplicateBanner(false)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-wiil-muted transition-colors hover:bg-white">Dismiss</button>
          </div>
        </div>
      )}

      {/* ── Filter bar ──────────────────────────────── */}
      <div className="animate-fade-up-delay-1 mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-wiil-muted" />
          <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-wiil-border bg-wiil-card py-2.5 pl-10 pr-4 text-sm text-wiil-text outline-none placeholder:text-wiil-muted focus:border-wiil-accent" />
        </div>
        <FilterSelect value={stageFilter} onChange={setStageFilter} options={[
          { value: "all", label: "All Stages" }, { value: "new_lead", label: "New Lead" }, { value: "contacted", label: "Contacted" },
          { value: "qualified", label: "Qualified" }, { value: "converted", label: "Converted" }, { value: "lost", label: "Lost" },
        ]} />
        <FilterSelect value={channelFilter} onChange={setChannelFilter} options={[
          { value: "all", label: "All Channels" }, { value: "phone", label: "Phone" }, { value: "web", label: "Web" },
          { value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "Email" },
        ]} />
        <div className="flex-1" />
        <span className="text-sm text-wiil-muted">{filtered.length} contact{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* ── Contact table ───────────────────────────── */}
      <div className="animate-fade-up-delay-2 rounded-2xl border border-wiil-border bg-wiil-card overflow-hidden">
        <div className="grid grid-cols-[40px_minmax(200px,1.2fr)_100px_100px_minmax(200px,1.5fr)_140px_80px] items-center gap-4 border-b border-wiil-border px-6 py-3">
          <div>
            <input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll}
              className="h-4 w-4 rounded border-wiil-border text-wiil-accent accent-wiil-accent" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">Contact</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">Channel</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">Stage</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">Last Conversation</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wiil-muted">Conversations</div>
          <div />
        </div>

        {filtered.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={selectedIds.has(contact.id)}
            onToggle={() => toggleSelect(contact.id)}
            onViewDetails={() => setDetailContact(contact)}
            onEdit={() => setEditContact(contact)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16">
            <Users className="h-8 w-8 text-wiil-muted" />
            <p className="text-sm text-wiil-muted">No contacts match your filters</p>
          </div>
        )}
      </div>

      {/* ── Bulk actions ────────────────────────────── */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-wiil-border bg-wiil-card px-5 py-3 shadow-xl">
          <span className="text-sm font-medium text-wiil-text">{selectedIds.size} selected</span>
          <div className="h-4 w-px bg-wiil-border" />
          <BulkButton label="Add Tags" />
          <BulkButton label="Change Stage" />
          <BulkButton label="Export" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-wiil-muted transition-colors hover:bg-gray-100 hover:text-wiil-text">Delete</button>
          <div className="h-4 w-px bg-wiil-border" />
          <button onClick={() => setSelectedIds(new Set())} className="rounded-lg px-3 py-1.5 text-xs font-medium text-wiil-muted transition-colors hover:bg-gray-50">Cancel</button>
        </div>
      )}

      {/* ── Detail slide-over ───────────────────────── */}
      {detailContact && (
        <ContactDetailPanel
          contact={detailContact}
          onClose={() => setDetailContact(null)}
          onEdit={() => { setEditContact(detailContact); setDetailContact(null); }}
        />
      )}

      {/* ── Edit modal ──────────────────────────────── */}
      {editContact && (
        <EditContactModal
          contact={editContact}
          onClose={() => setEditContact(null)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Contact Detail Slide-Over Panel
   ══════════════════════════════════════════════════════════ */

function ContactDetailPanel({
  contact,
  onClose,
  onEdit,
}: {
  contact: Contact;
  onClose: () => void;
  onEdit: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-[420px] flex-col border-l border-wiil-border bg-wiil-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-wiil-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-wiil-accent">{contact.name}</h2>
            <p className="text-sm text-wiil-muted">View and manage contact details.</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-wiil-muted hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wiil-accent-light text-base font-semibold text-wiil-accent">
              {getInitials(contact.name)}
            </div>
            <div>
              <p className="font-semibold text-wiil-text">{contact.name}</p>
              {contact.company && <p className="text-sm text-wiil-muted">{contact.company}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-wiil-text">Contact Information</h3>
            <div className="space-y-2.5">
              {contact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-wiil-muted" />
                  <span className="text-sm text-wiil-accent">{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-wiil-muted" />
                  <span className="text-sm text-wiil-accent">{contact.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-wiil-muted" />
                <span className="text-sm text-wiil-text-secondary">Preferred: {contact.preferred_contact}</span>
              </div>
            </div>
          </div>

          {/* Stage & Priority */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-wiil-text">Status</h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-wiil-accent/15 px-3 py-1 text-xs font-semibold text-wiil-accent">
                {STAGE_LABELS[contact.current_stage]}
              </span>
              <span className="rounded-full bg-wiil-accent/10 px-3 py-1 text-xs font-medium text-wiil-accent">
                {contact.priority} priority
              </span>
              <span className="rounded-full bg-wiil-accent/10 px-3 py-1 text-xs font-medium text-wiil-accent">
                {contact.language}
              </span>
            </div>
          </div>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-wiil-text">Tags</h3>
              <div className="flex gap-1.5">
                {contact.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-wiil-accent/10 px-2.5 py-0.5 text-xs font-medium text-wiil-accent">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Last Conversation */}
          {contact.last_conversation_summary && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-wiil-text">Last Conversation</h3>
              <p className="text-sm text-wiil-text-secondary">{contact.last_conversation_summary}</p>
              <p className="mt-1 text-xs text-wiil-muted">{timeAgo(contact.last_contact_at)}</p>
            </div>
          )}

          {/* Address */}
          {contact.address.city && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-wiil-text">Address</h3>
              <p className="text-sm text-wiil-text-secondary">
                {[contact.address.street, contact.address.city, contact.address.state, contact.address.postal].filter(Boolean).join(", ")}
              </p>
              {contact.address.country && <p className="text-sm text-wiil-muted">{contact.address.country}</p>}
            </div>
          )}

          {/* Notes */}
          {contact.notes && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-wiil-text">Notes</h3>
              <p className="text-sm text-wiil-text-secondary">{contact.notes}</p>
            </div>
          )}
        </div>

        {/* Actions footer */}
        <div className="flex items-center gap-2 border-t border-wiil-border px-6 py-4">
          <button onClick={onEdit} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-wiil-border py-2.5 text-sm font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
            <Pencil className="h-4 w-4" />Edit
          </button>
          {contact.phone && (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-wiil-border py-2.5 text-sm font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
              <Phone className="h-4 w-4" />Call
            </button>
          )}
          {contact.email && (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-wiil-border py-2.5 text-sm font-medium text-wiil-text-secondary transition-colors hover:border-wiil-accent hover:text-wiil-accent">
              <Mail className="h-4 w-4" />Email
            </button>
          )}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   Edit Contact Modal (3 tabs: Basic Info, Contact, Additional)
   ══════════════════════════════════════════════════════════ */

function EditContactModal({ contact, onClose }: { contact: Contact; onClose: () => void }) {
  const [tab, setTab] = useState<"basic" | "contact" | "additional">("basic");
  const [form, setForm] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    company: contact.company,
    email: contact.email || "",
    phone: contact.phone || "",
    preferred_contact: contact.preferred_contact,
    priority: contact.priority,
    best_time_to_call: contact.best_time_to_call,
    language: contact.language,
    street: contact.address.street,
    city: contact.address.city,
    state: contact.address.state,
    postal: contact.address.postal,
    country: contact.address.country,
    tags: contact.tags.join(", "),
    notes: contact.notes,
  });

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const TABS = [
    { key: "basic" as const, label: "Basic Info", icon: User },
    { key: "contact" as const, label: "Contact", icon: Phone },
    { key: "additional" as const, label: "Additional", icon: Tag },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-wiil-card shadow-2xl border border-wiil-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-wiil-accent">Edit Contact</h2>
            <p className="text-sm text-wiil-muted">Update contact information and preferences.</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-wiil-muted hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-7 mb-6 flex rounded-xl bg-wiil-accent-light p-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  tab === t.key
                    ? "bg-wiil-card text-wiil-text shadow-sm"
                    : "text-wiil-muted hover:text-wiil-text"
                }`}
              >
                <Icon className="h-4 w-4" />{t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="px-7 pb-4 space-y-5">
          {tab === "basic" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="First Name" required>
                  <FormInput value={form.firstName} onChange={(v) => update({ firstName: v })} />
                </FormField>
                <FormField label="Last Name" required>
                  <FormInput value={form.lastName} onChange={(v) => update({ lastName: v })} />
                </FormField>
              </div>
              <FormField label="Company">
                <FormInput value={form.company} onChange={(v) => update({ company: v })} placeholder="Enter company name" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Email" required hint="Enter a valid email address">
                  <FormInput value={form.email} onChange={(v) => update({ email: v })} placeholder="name@example.com" />
                </FormField>
                <FormField label="Phone Number" required hint="Include country code (e.g., +1 for US)">
                  <FormInput value={form.phone} onChange={(v) => update({ phone: v })} placeholder="+1 (555) 123-4567" />
                </FormField>
              </div>
            </>
          )}

          {tab === "contact" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Preferred Contact" required>
                  <FormSelect value={form.preferred_contact} onChange={(v) => update({ preferred_contact: v as typeof form.preferred_contact })}
                    options={[{ value: "email", label: "Email" }, { value: "phone", label: "Phone" }, { value: "whatsapp", label: "WhatsApp" }]} />
                </FormField>
                <FormField label="Priority" required>
                  <FormSelect value={form.priority} onChange={(v) => update({ priority: v as typeof form.priority })}
                    options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]} />
                </FormField>
              </div>
              <FormField label="Best Time to Call">
                <FormSelect value={form.best_time_to_call} onChange={(v) => update({ best_time_to_call: v })}
                  options={[{ value: "", label: "Select best time" }, { value: "Morning", label: "Morning" }, { value: "Afternoon", label: "Afternoon" }, { value: "Evening", label: "Evening" }]} />
              </FormField>
              <FormField label="Preferred Language" required>
                <FormSelect value={form.language} onChange={(v) => update({ language: v })}
                  options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }, { value: "French", label: "French" }, { value: "Portuguese", label: "Portuguese" }]} />
              </FormField>
            </>
          )}

          {tab === "additional" && (
            <>
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-wiil-text">
                  <MapPin className="h-4 w-4" />Address
                </div>
                <div className="space-y-3">
                  <FormField label="Street Address">
                    <FormInput value={form.street} onChange={(v) => update({ street: v })} placeholder="123 Main St" />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="City">
                      <FormInput value={form.city} onChange={(v) => update({ city: v })} />
                    </FormField>
                    <FormField label="State/Province">
                      <FormInput value={form.state} onChange={(v) => update({ state: v })} />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Postal Code">
                      <FormInput value={form.postal} onChange={(v) => update({ postal: v })} />
                    </FormField>
                    <FormField label="Country">
                      <FormInput value={form.country} onChange={(v) => update({ country: v })} />
                    </FormField>
                  </div>
                </div>
              </div>

              <div className="border-t border-wiil-border pt-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-wiil-text">
                  <Tag className="h-4 w-4" />Tags
                </div>
                <div className="flex gap-2">
                  <FormInput value={form.tags} onChange={(v) => update({ tags: v })} placeholder="Enter a tag" />
                  <button className="shrink-0 rounded-xl bg-wiil-accent px-4 py-2 text-sm font-medium text-white hover:bg-wiil-accent-dark">Add Tag</button>
                </div>
              </div>

              <FormField label="Notes">
                <textarea
                  value={form.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  rows={3}
                  placeholder="Internal notes about this contact..."
                  className="w-full rounded-xl border border-wiil-border bg-background px-3.5 py-2.5 text-sm text-wiil-text outline-none placeholder:text-wiil-muted focus:border-wiil-accent resize-none"
                />
              </FormField>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-wiil-border px-7 py-4">
          <button onClick={onClose} className="rounded-xl border border-wiil-border px-5 py-2.5 text-sm font-medium text-wiil-text-secondary hover:bg-gray-50">
            Cancel
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-wiil-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-wiil-accent-dark">
            <User className="h-4 w-4" />Update Contact
          </button>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   Context Menu (three-dot dropdown)
   ══════════════════════════════════════════════════════════ */

function ContactContextMenu({
  contact,
  onViewDetails,
  onEdit,
}: {
  contact: Contact;
  onViewDetails: () => void;
  onEdit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const items = [
    { icon: Eye, label: "View details", action: () => { onViewDetails(); setOpen(false); } },
    { icon: Pencil, label: "Edit Contact", action: () => { onEdit(); setOpen(false); } },
    ...(contact.phone ? [{ icon: Phone, label: "Call Contact", action: () => setOpen(false) }] : []),
    ...(contact.email ? [{ icon: Mail, label: "Email Contact", action: () => setOpen(false) }] : []),
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-wiil-muted transition-colors hover:bg-gray-100"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-wiil-border bg-wiil-card py-1.5 shadow-lg">
          <p className="px-3 py-1.5 text-xs font-semibold text-wiil-text">Contact Actions</p>

          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-wiil-text-secondary transition-colors hover:bg-wiil-accent-light hover:text-wiil-accent"
              >
                <Icon className="h-4 w-4" />{item.label}
              </button>
            );
          })}

          <div className="mx-3 my-1 border-t border-wiil-border" />

          <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-wiil-muted transition-colors hover:bg-gray-50 hover:text-wiil-text">
            <Trash2 className="h-4 w-4" />Delete Contact
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Shared sub-components
   ══════════════════════════════════════════════════════════ */

function HeaderButton({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-wiil-border text-wiil-muted transition-colors hover:bg-wiil-accent-light hover:text-wiil-accent">
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-wiil-border bg-wiil-card py-2.5 pl-3 pr-8 text-sm text-wiil-text-secondary outline-none focus:border-wiil-accent">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wiil-muted" />
    </div>
  );
}

function InsightCard({ icon, label, value, muted }: { icon: React.ReactNode; label: string; value: string; muted?: boolean }) {
  return (
    <div className="rounded-2xl border border-wiil-border bg-wiil-card px-5 py-4 transition-all hover:shadow-sm cursor-pointer">
      <div className="mb-2 flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${muted ? "bg-gray-50 text-wiil-muted" : "bg-wiil-accent-light text-wiil-accent"}`}>{icon}</div>
        <span className="text-xs font-medium text-wiil-muted">{label}</span>
      </div>
      <p className="text-2xl font-bold tracking-tight text-wiil-text">{value}</p>
    </div>
  );
}

function ContactRow({ contact, selected, onToggle, onViewDetails, onEdit }: {
  contact: Contact; selected: boolean; onToggle: () => void; onViewDetails: () => void; onEdit: () => void;
}) {
  const channel = CHANNEL_ICONS[contact.source_channel];
  const ChannelIcon = channel.icon;
  const isRecentlyActive = contact.last_contact_at ? Date.now() - new Date(contact.last_contact_at).getTime() < 48 * 3600000 : false;
  const activityWidth = Math.max(contact.activity_score, 4);

  const stageOpacity: Record<Stage, string> = {
    new_lead: "bg-wiil-accent/10 text-wiil-accent",
    contacted: "bg-wiil-accent/15 text-wiil-accent",
    qualified: "bg-wiil-accent/20 text-wiil-accent-dark",
    converted: "bg-wiil-accent/30 text-wiil-accent-dark",
    lost: "bg-gray-100 text-wiil-muted",
  };

  return (
    <div className={`group grid grid-cols-[40px_minmax(200px,1.2fr)_100px_100px_minmax(200px,1.5fr)_140px_80px] items-center gap-4 border-b border-wiil-border px-6 py-3.5 transition-colors hover:bg-wiil-accent-light/30 ${selected ? "bg-wiil-accent-light/20" : ""}`}>
      <div>
        <input type="checkbox" checked={selected} onChange={onToggle} className="h-4 w-4 rounded border-wiil-border text-wiil-accent accent-wiil-accent" />
      </div>

      {/* Contact */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wiil-accent-light text-xs font-semibold text-wiil-accent">{getInitials(contact.name)}</div>
          {isRecentlyActive && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-wiil-accent animate-pulse-dot" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span onClick={onViewDetails} className="truncate text-sm font-medium text-wiil-accent cursor-pointer hover:underline">{contact.name}</span>
            {contact.phone && <span title={contact.phone}><Phone className="h-3 w-3 text-wiil-muted" /></span>}
            {contact.email && <span title={contact.email}><Mail className="h-3 w-3 text-wiil-muted" /></span>}
          </div>
          {contact.tags.length > 0 && (
            <div className="flex gap-1.5 mt-0.5">
              {contact.tags.map((tag) => <span key={tag} className="rounded-full bg-wiil-accent/10 px-1.5 py-px text-[10px] font-medium text-wiil-accent">{tag}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* Channel */}
      <div>
        <span className="inline-flex items-center gap-1 rounded-full bg-wiil-accent-light px-2 py-0.5 text-[11px] font-medium text-wiil-accent">
          <ChannelIcon className="h-3 w-3" />{channel.label}
        </span>
      </div>

      {/* Stage */}
      <div>
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${stageOpacity[contact.current_stage]}`}>{STAGE_LABELS[contact.current_stage]}</span>
      </div>

      {/* Last conversation */}
      <div className="min-w-0">
        {contact.last_conversation_summary ? (
          <div>
            <p className="truncate text-sm text-wiil-text">{contact.last_conversation_summary}</p>
            <p className="mt-0.5 text-xs text-wiil-muted">{timeAgo(contact.last_contact_at)}</p>
          </div>
        ) : (
          <p className="text-sm italic text-wiil-muted">Awaiting first interaction</p>
        )}
      </div>

      {/* Conversations */}
      <div>
        <p className="text-sm font-medium text-wiil-text tabular-nums">{contact.total_conversations}</p>
        {contact.last_contact_at ? (
          <p className="text-xs text-wiil-muted">{timeAgo(contact.last_contact_at)}</p>
        ) : (
          <p className="text-xs text-wiil-muted">—</p>
        )}
      </div>

      {/* Actions — context menu replaces inline buttons */}
      <div className="flex items-center justify-end">
        <ContactContextMenu contact={contact} onViewDetails={onViewDetails} onEdit={onEdit} />
      </div>
    </div>
  );
}

function FormField({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-wiil-text">
        {label}{required && <span className="ml-0.5 text-wiil-accent">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-wiil-muted">{hint}</p>}
    </div>
  );
}

function FormInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-wiil-border bg-background px-3.5 py-2.5 text-sm text-wiil-text outline-none placeholder:text-wiil-muted focus:border-wiil-accent"
    />
  );
}

function FormSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-wiil-border bg-background px-3.5 py-2.5 pr-8 text-sm text-wiil-text outline-none focus:border-wiil-accent">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-wiil-muted" />
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
