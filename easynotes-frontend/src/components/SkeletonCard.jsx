// Skeleton placeholder shown in place of a NoteCard while data is loading.
// This is a common UX pattern (used by apps like LinkedIn, YouTube, etc.) -
// it gives the user an idea of the layout before real content arrives,
// which feels faster than a blank page or a single spinner.
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 border-l-4 border-l-slate-200">
      <div className="h-4 w-2/3 rounded bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
        <div className="h-3 w-3/4 rounded bg-slate-100" />
      </div>
      <div className="mt-5 h-3 w-1/3 rounded bg-slate-100" />
      <div className="mt-3 h-7 w-2/3 rounded bg-slate-100" />
    </div>
  );
}

export default SkeletonCard;
