# EasyNotes Frontend

A React (Vite + JavaScript) frontend for the existing **EasyNotes Spring Boot + MySQL** backend.

## Tech stack
- React 19 + Vite
- React Router (client-side routing)
- Axios (HTTP calls to the backend)
- Tailwind CSS v4 (styling)

## Prerequisites
- The Spring Boot backend already running on `http://localhost:8080`
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
 ├── components/   # Reusable UI pieces (Navbar, NoteCard, NoteForm, Loader, ErrorMessage)
 ├── pages/         # One component per route (Home, CreateNote, EditNote, NoteDetail, NotFound)
 ├── services/      # Axios instance + API functions (noteService.js)
 ├── App.jsx        # Route table
 └── main.jsx       # Entry point, wraps App in BrowserRouter
```
