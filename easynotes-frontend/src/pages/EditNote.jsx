import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getNoteById, updateNote } from "../services/noteService";
import NoteForm from "../components/NoteForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

// Edit page: first fetches the existing note (GET /api/notes/:id) so the
// form can be pre-filled, then sends a PUT request with the updated values.
function EditNote() {
  const { id } = useParams(); // reads the :id segment from the route
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getNoteById(id)
      .then((response) => setNote(response.data))
      .catch(() => setError("Note not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (updatedValues) => {
    setSubmitting(true);
    setError("");
    // NoteForm only knows about title/content/category - `pinned` isn't part
    // of this form's UI, so we carry over the note's existing pinned value
    // to avoid silently un-pinning it on every edit.
    updateNote(id, { ...updatedValues, pinned: note.pinned })
      .then(() => navigate(`/notes/${id}`))
      .catch(() => {
        setError("Could not update the note. Please try again.");
        setSubmitting(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
      >
        <ArrowLeft size={15} /> Back to notes
      </Link>

      <h1 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100 mt-3 mb-6">
        Edit Note
      </h1>

      {loading ? (
        <Loader message="Loading note..." />
      ) : error && !note ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          {error && (
            <div className="mb-5">
              <ErrorMessage message={error} />
            </div>
          )}
          <NoteForm
            initialValues={{ title: note.title, content: note.content, category: note.category }}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
            submitting={submitting}
          />
        </div>
      )}
    </div>
  );
}

export default EditNote;
