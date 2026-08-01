import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { getNoteById, deleteNote } from "../services/noteService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Detail page: fetches a single note via GET /api/notes/:id.
// This is the simplest example of a "read one" screen backed by the API.
function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getNoteById(id)
      .then((response) => setNote(response.data))
      .catch(() => setError("This note could not be found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    deleteNote(id)
      .then(() => navigate("/"))
      .catch(() => setError("Could not delete the note. Please try again."));
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft size={15} /> Back to notes
      </Link>

      {loading ? (
        <Loader message="Loading note..." />
      ) : error ? (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-slate-800 break-words">
            {note.title}
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Created {formatDate(note.createdAt)} &middot; Updated{" "}
            {formatDate(note.updatedAt)}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {note.content}
          </p>

          <div className="mt-6 flex gap-2">
            <Link
              to={`/notes/${note.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              <Pencil size={15} /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetail;
