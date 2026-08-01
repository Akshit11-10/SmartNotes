import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

const THEME_KEY = "easynotes-theme";

// App.jsx is the root layout + route table for the whole frontend.
// Navbar is rendered once, outside <Routes>, so it stays visible on every page.
// <Routes> then swaps out just the page content based on the current URL.
//
// Dark mode state lives here (not inside Navbar) because it needs to affect
// every page, not just the nav bar itself - Navbar only renders the toggle button.
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/:id/edit" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
