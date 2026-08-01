// Reusable error banner. Shown whenever an API call fails
// (backend down, note not found, validation error, etc).
function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 font-medium text-rose-700 dark:text-rose-400 underline underline-offset-2 hover:text-rose-800"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
