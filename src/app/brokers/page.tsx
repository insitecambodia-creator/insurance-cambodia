import type { Metadata } from "next";
import { brokers, categories } from "@/lib/data";
import BrokerDirectory from "@/components/BrokerDirectory";

export const metadata: Metadata = {
  title: "Browse Insurance Brokers | Insurance Cambodia",
  description: "Browse insurance brokers in Cambodia by insurance type.",
};

export default function BrokersPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Insurance brokers</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Browse our directory of insurance brokers in Cambodia, or{" "}
        <a href="/request" className="text-blue-600 hover:underline">
          submit one request
        </a>{" "}
        and let us forward it for you.
      </p>
      <div className="mt-8">
        <BrokerDirectory brokers={brokers} categories={categories} />
      </div>
    </div>
  );
}
