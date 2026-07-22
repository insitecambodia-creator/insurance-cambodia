"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Broker, Category } from "@/lib/data";

export default function BrokerDirectory({
  brokers,
  categories,
}: {
  brokers: Broker[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredBrokers = useMemo(() => {
    if (!activeCategory) return brokers;
    return brokers.filter((broker) => broker.categories.includes(activeCategory));
  }, [brokers, activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            activeCategory === null
              ? "border-brand bg-brand text-white"
              : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              activeCategory === category.slug
                ? "border-brand bg-brand text-white"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrokers.map((broker) => (
          <div
            key={broker.id}
            className={`rounded-lg border border-slate-200 p-5 ${
              broker.closed ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{broker.name}</h3>
              {broker.closed ? (
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500">
                  closed
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-slate-400"
                    aria-hidden="true"
                  >
                    <circle cx="10" cy="10" r="10" />
                    <rect x="5.5" y="9.2" width="9" height="1.6" fill="white" />
                  </svg>
                </span>
              ) : (
                broker.verified && (
                  <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-brand">
                    verified
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-brand"
                      aria-hidden="true"
                    >
                      <circle cx="10" cy="10" r="10" />
                      <path
                        d="M8.6 13.2 5.9 10.5l1.1-1.1 1.6 1.6 4-4 1.1 1.1z"
                        fill="white"
                      />
                    </svg>
                  </span>
                )
              )}
            </div>
            {broker.tagline && (
              <p className="mt-1 text-sm text-slate-600">{broker.tagline}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {broker.categories.length >= categories.length ? (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                  General broker — specialties not yet confirmed
                </span>
              ) : (
                broker.categories.map((slug) => {
                  const category = categories.find((c) => c.slug === slug);
                  if (!category) return null;
                  return (
                    <span
                      key={slug}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                    >
                      {category.icon} {category.name}
                    </span>
                  );
                })
              )}
            </div>
            <dl className="mt-4 space-y-1 text-sm text-slate-600">
              {broker.location && (
                <div className="flex justify-between">
                  <dt className="text-slate-400">Location</dt>
                  <dd>{broker.location}</dd>
                </div>
              )}
              {broker.phone && (
                <div className="flex justify-between">
                  <dt className="text-slate-400">Phone</dt>
                  <dd>{broker.phone}</dd>
                </div>
              )}
              {broker.email ? (
                <div className="flex justify-between">
                  <dt className="text-slate-400">Email</dt>
                  <dd>{broker.email}</dd>
                </div>
              ) : (
                <div className="flex justify-between">
                  <dt className="text-slate-400">Email</dt>
                  <dd className="text-slate-400">Not listed yet</dd>
                </div>
              )}
            </dl>
            {broker.closed ? (
              <p className="mt-4 text-sm text-slate-400">
                No longer accepting new requests.
              </p>
            ) : (
              <Link
                href={`/request?broker=${broker.id}`}
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                Request a quote from this broker →
              </Link>
            )}
          </div>
        ))}
        {filteredBrokers.length === 0 && (
          <p className="text-sm text-slate-500">
            No brokers found for this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
