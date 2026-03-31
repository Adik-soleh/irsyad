export function Footer() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-slate-200 dark:border-white/10 py-8 text-sm text-slate-500 dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Adik Soleh — Fullstack Developer. Built with Next.js 16 & Tailwind.</p>
      <p className="text-slate-400 dark:text-white/40">Fokus pada shipping cepat, dokumentasi rapih, dan stack modern.</p>
    </footer>
  );
}
