import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus, Search } from "lucide-react";
import { getAllNotes, deleteNote } from "../services/noteService";
import NoteCard from "../components/NoteCard";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "../components/ErrorMessage";

// Home page: fetches every note from GET /api/notes and renders it as a grid
// of NoteCard components. This is the "list" screen of the CRUD app.
function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // Pulled out into its own function so both the initial load
  // and the "Try again" button can reuse it.
  const fetchNotes = () => {
    setLoading(true);
    setError("");
    getAllNotes()
      .then((response) => setNotes(response.data))
      .catch(() =>
        setError("Could not load notes. Is the backend running on port 8080?")
      )
      .finally(() => setLoading(false));
  };

  // useEffect with an empty dependency array runs once,
  // right after the component first mounts - a good place for a data fetch.
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;

    deleteNote(id)
      .then(() => setNotes((prev) => prev.filter((note) => note.id !== id)))
      .catch(() => setError("Could not delete the note. Please try again."));
  };

  // Client-side filtering - no extra API call needed since we already
  // have the full list in memory. useMemo avoids re-filtering on every
  // unrelated re-render, only when notes or the query actually change.
  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-800">
            Your Notes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {notes.length} note{notes.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full sm:w-56 rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <Link
            to="/notes/new"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Note
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} onRetry={fetchNotes} />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : notes.length === 0 && !error ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <FileText className="mx-auto text-slate-300" size={40} strokeWidth={1.5} />
          <p className="mt-3 text-slate-500">You don't have any notes yet.</p>
          <Link
            to="/notes/new"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <Plus size={16} /> Create your first note
          </Link>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Search className="mx-auto text-slate-300" size={36} strokeWidth={1.5} />
          <p className="mt-3 text-slate-500">
            No notes match &ldquo;{query}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
