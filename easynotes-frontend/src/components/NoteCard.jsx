import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

// Formats the ISO date string coming from the backend (createdAt/updatedAt)
// into something readable, e.g. "1 Aug 2026, 14:32".
function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// A small rotating palette used as a colored left-edge "tab" on each card -
// like the colored index tabs on a physical notebook. Purely cosmetic:
// the color is derived from the note's id, so it stays consistent across
// re-renders without needing a "category" field on the backend.
const TAB_COLORS = [
  "border-l-brand-500",
  "border-l-accent-500",
  "border-l-emerald-400",
  "border-l-rose-400",
  "border-l-sky-400",
];

function getTabColor(id) {
  const index = Number(id) % TAB_COLORS.length;
  return TAB_COLORS[index] ?? TAB_COLORS[0];
}

// Displays a single note as a card. Used in the Home page's notes grid.
// Receives the note object and a delete handler from its parent (Home.jsx) -
// this is a "presentational" component, it doesn't call the API itself.
function NoteCard({ note, onDelete }) {
  return (
    <div
      className={`group flex flex-col justify-between rounded-xl border border-slate-200 border-l-4 ${getTabColor(
        note.id
      )} bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-800 line-clamp-1">
          {note.title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-3 whitespace-pre-line">
          {note.content}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-400">
          Updated {formatDate(note.updatedAt || note.createdAt)}
        </p>

        <div className="mt-3 flex items-center gap-1 text-sm font-medium">
          <Link
            to={`/notes/${note.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-slate-600 transition-colors hover:bg-slate-100"
          >
            <Eye size={15} /> View
          </Link>
          <Link
            to={`/notes/${note.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-brand-600 transition-colors hover:bg-brand-50"
          >
            <Pencil size={15} /> Edit
          </Link>
          <button
            onClick={() => onDelete(note.id)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-rose-600 transition-colors hover:bg-rose-50"
          >
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
