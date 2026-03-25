"use client";

import { Sidebar } from "@/components/sidebar";
import { ContactsPage } from "@/components/contacts-page";

export default function Contacts() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar activePath="/contacts" />
      <main className="flex-1 overflow-y-auto bg-background">
        <ContactsPage />
      </main>
    </div>
  );
}
