import type { Metadata } from "next";
import { Suspense } from "react";
import { categories, brokers } from "@/lib/data";
import RequestForm from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Submit an Insurance Request | Insurance Cambodia",
  description:
    "Submit your insurance request once and we'll forward it to matching brokers in Cambodia.",
};

export default function RequestPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Submit a request</h1>
      <p className="mt-2 text-slate-600">
        Tell us what kind of insurance you&apos;re looking for. We&apos;ll
        forward your details to the brokers you choose (or all matching
        brokers) so they can send you a quote.
      </p>
      <div className="mt-8">
        <Suspense fallback={null}>
          <RequestForm categories={categories} brokers={brokers} />
        </Suspense>
      </div>
    </div>
  );
}
