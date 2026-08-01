import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

// Catch-all page for any route that doesn't match (see the "*" Route in App.jsx).
function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 text-center">
      <Compass className="mx-auto text-slate-300" size={40} strokeWidth={1.5} />
      <h1 className="font-display mt-4 text-3xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-500">This page doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft size={15} /> Back to notes
      </Link>
    </div>
  );
}

export default NotFound;
