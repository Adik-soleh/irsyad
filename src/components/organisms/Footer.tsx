export function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-line py-8 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Irsyad Rafly Wahyudi — Digital Marketing Specialist.</p>
      <p className="text-ash">
        Social media management · Paid advertising · Content strategy
      </p>
    </footer>
  );
}
