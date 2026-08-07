import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router does NOT reset scroll position when you navigate - without
// this, going from a scrolled-down Home page to NoteDetail would land you
// halfway down the new page instead of at the top. This component renders
// nothing; it just watches the URL and scrolls to top whenever it changes.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
