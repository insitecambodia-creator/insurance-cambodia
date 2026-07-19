"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Broker, Category } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestForm({
  categories,
  brokers,
}: {
  categories: Category[];
  brokers: Broker[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? categories[0]?.slug ?? "";
  const initialBrokerId = searchParams.get("broker");

  const [category, setCategory] = useState(initialCategory);
  const [sendToAll, setSendToAll] = useState(!initialBrokerId);
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<string[]>(
    initialBrokerId ? [initialBrokerId] : [],
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const brokersForCategory = brokers.filter((b) => b.categories.includes(category));

  function toggleBroker(id: string) {
    setSelectedBrokerIds((current) =>
      current.includes(id) ? current.filter((b) => b !== id) : [...current, id],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      category,
      message: String(formData.get("message") ?? ""),
      brokerIds: sendToAll ? [] : selectedBrokerIds,
    };

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
        <h2 className="font-semibold">Request received</h2>
        <p className="mt-2 text-sm">
          Thanks &mdash; we&apos;ve forwarded your request to the matching
          brokers. They&apos;ll contact you directly using the details you
          provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+855 ..."
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email (optional if phone is provided)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Insurance type
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setSelectedBrokerIds([]);
          }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Tell us what you need
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="E.g. health insurance for a family of 4, or car insurance for a 2019 sedan..."
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <input
            id="sendToAll"
            type="checkbox"
            checked={sendToAll}
            onChange={(event) => setSendToAll(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="sendToAll" className="text-sm font-medium text-slate-700">
            Send to all brokers who cover this type of insurance
          </label>
        </div>

        {!sendToAll && (
          <div className="mt-3 space-y-2 rounded-md border border-slate-200 p-3">
            {brokersForCategory.length === 0 && (
              <p className="text-sm text-slate-500">
                No brokers listed for this category yet.
              </p>
            )}
            {brokersForCategory.map((broker) => (
              <label key={broker.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrokerIds.includes(broker.id)}
                  onChange={() => toggleBroker(broker.id)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                {broker.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
