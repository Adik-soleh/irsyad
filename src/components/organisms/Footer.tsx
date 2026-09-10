export function Footer() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-slate-200 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Irsyad Rafly Wahyudi — Digital Marketing Specialist.</p>
      <p className="text-slate-400">
        Social media management · Paid advertising · Content strategy
      </p>
    </footer>
  );
}
