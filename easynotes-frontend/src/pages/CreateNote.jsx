import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createNote } from "../services/noteService";
import NoteForm from "../components/NoteForm";
import ErrorMessage from "../components/ErrorMessage";

// Create page: renders NoteForm and, on submit, sends a POST request
// to /api/notes. On success it redirects back to the Home list.
function CreateNote() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = (note) => {
    setSubmitting(true);
    setError("");
    createNote(note)
      .then(() => navigate("/"))
      .catch(() => {
        setError("Could not create the note. Please check the backend and try again.");
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
        Create a New Note
      </h1>

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <NoteForm onSubmit={handleCreate} submitLabel="Create Note" submitting={submitting} />
      </div>
    </div>
  );
}

export default CreateNote;
