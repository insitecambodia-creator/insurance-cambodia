export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-500">
        <p>
          Insurance Cambodia connects people looking for insurance with
          trusted local brokers. We forward your request &mdash; brokers
          contact you directly with quotes.
        </p>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} Insurance Cambodia. All broker
          listings are for demonstration purposes.
        </p>
      </div>
    </footer>
  );
}
