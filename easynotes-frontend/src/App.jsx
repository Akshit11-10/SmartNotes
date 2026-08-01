import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

// App.jsx is the root layout + route table for the whole frontend.
// Navbar is rendered once, outside <Routes>, so it stays visible on every page.
// <Routes> then swaps out just the page content based on the current URL.
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
