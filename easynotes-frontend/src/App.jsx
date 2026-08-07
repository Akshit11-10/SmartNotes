import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

const THEME_KEY = "easynotes-theme";

// App.jsx is the root layout + route table for the whole frontend.
// Navbar and Footer are rendered once, outside <Routes>, so they stay visible
// on every page. <Routes> then swaps out just the page content in between.
//
// The outer div uses flex-col + main flex-1 (a "sticky footer" layout) so the
// footer sits at the bottom of the viewport even on short pages like NotFound,
// instead of floating right under a small amount of content.
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((d) => !d)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/:id/edit" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
