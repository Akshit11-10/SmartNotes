import { NotebookPen } from "lucide-react";

// Simple footer shown at the bottom of every page. Rendered once in App.jsx,
// outside <Routes>, the same way Navbar is - so it's consistent across the app.
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <NotebookPen size={13} strokeWidth={2.25} />
          </span>
          <span className="font-display font-semibold text-slate-700 dark:text-slate-300">
            EasyNotes
          </span>
        </div>

        <p>
          &copy; {year} EasyNotes &middot; Built with React &amp; Spring Boot
        </p>
      </div>
    </footer>
  );
}

export default Footer;
