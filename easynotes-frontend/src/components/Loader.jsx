// A simple, reusable loading spinner with an optional message.
// Used any time we're waiting on a request to the Spring Boot API.
function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500 dark:text-slate-400">
      <div className="h-8 w-8 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-brand-600 animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Loader;
