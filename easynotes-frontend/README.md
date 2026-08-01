# EasyNotes Frontend

A React (Vite + JavaScript) frontend for the existing **EasyNotes Spring Boot + MySQL** backend.

## Tech stack
- React 19 + Vite
- React Router (client-side routing)
- Axios (HTTP calls to the backend)
- Tailwind CSS v4 (styling, incl. class-based dark mode)
- lucide-react (icons)

## Features
- Full CRUD for notes (create, view, edit, delete)
- Backend-driven search (debounced), category filter, and sort (newest / oldest / title)
- Server-side pagination
- Pin/unpin notes (pinned notes always sort first)
- Dark mode toggle (persisted in localStorage)
- Loading skeletons, empty states, and error handling with retry

## Prerequisites
- The Spring Boot backend already running on `http://localhost:8080`
  (with the updated `Note.java`, `NoteRepository.java`, `NoteController.java`, and `CorsConfig.java`)
- Node.js 18+ and npm

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend's `/api` endpoints
to be reachable at `http://localhost:8080/api` (configured in `src/services/noteService.js`).

## Project structure

```
src/
 ├── components/   # Navbar, NoteCard, NoteForm, Loader, ErrorMessage, SkeletonCard
 ├── pages/         # Home, CreateNote, EditNote, NoteDetail, NotFound
 ├── services/      # Axios instance + API functions (noteService.js)
 ├── App.jsx        # Route table + dark mode state
 └── main.jsx       # Entry point, wraps App in BrowserRouter
```
