import Link from "next/link";
import { categories, brokers } from "@/lib/data";

const steps = [
  {
    title: "Tell us what you need",
    description:
      "Fill in one short form with the type of insurance and your contact details.",
  },
  {
    title: "We forward your request",
    description:
      "Your request goes out to matching brokers in our directory — no need to contact each one yourself.",
  },
  {
    title: "Brokers reach out with quotes",
    description:
      "Compare offers directly from the brokers who respond and choose what fits you best.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            One request. Multiple insurance brokers in Cambodia.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Submit your insurance request once and we&apos;ll forward it to
            trusted brokers across Cambodia, so you can compare quotes
            without the runaround.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/request"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit a request
            </Link>
            <Link
              href="/brokers"
              className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Browse brokers
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">
            Browse by insurance type
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/request?category=${category.slug}`}
                className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <span className="text-2xl">{category.icon}</span>
                <h3 className="mt-3 font-semibold text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Featured brokers
          </h2>
          <Link href="/brokers" className="text-sm font-medium text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brokers.slice(0, 3).map((broker) => (
            <div
              key={broker.id}
              className="rounded-lg border border-slate-200 p-5"
            >
              <h3 className="font-semibold text-slate-900">{broker.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{broker.tagline}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
                {broker.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
