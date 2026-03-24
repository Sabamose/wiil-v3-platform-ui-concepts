"use client";

import { Sidebar } from "@/components/sidebar";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <Dashboard />
      </main>
    </div>
  );
}
