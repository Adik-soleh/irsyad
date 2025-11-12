export function Footer() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Adik Soleh — Fullstack Developer. Built with Next.js 16 & Tailwind.</p>
      <p className="text-white/40">Fokus pada shipping cepat, dokumentasi rapih, dan stack modern.</p>
    </footer>
  );
}
