import axios from "axios";

// Base URL of the Spring Boot backend.
// The backend exposes all note endpoints under /api (see NoteController.java).
const BASE_URL = "http://localhost:8080/api";

// A single Axios instance shared by every API call in this app.
// Centralizing it here means if the backend URL ever changes,
// we only update it in one place.
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- Note API calls ----
// Each function maps 1:1 to an endpoint in NoteController.java

// GET /api/notes -> paginated + sorted + optionally filtered notes.
// `params` can include: page, size, sortBy, sortDir, query, category
// (all optional - the backend has sensible defaults for each).
// The response body is a Spring Data `Page` object: { content, totalPages, totalElements, number, ... }
export const getAllNotes = (params = {}) => api.get("/notes", { params });

// GET /api/notes/{id} -> returns a single note
export const getNoteById = (id) => api.get(`/notes/${id}`);

// POST /api/notes -> creates a new note. Body: { title, content, category }
export const createNote = (note) => api.post("/notes", note);

// PUT /api/notes/{id} -> updates an existing note (full replace).
// Body: { title, content, category, pinned }
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);

// PUT /api/notes/{id}/pin -> flips the pinned flag on the backend
// without needing to resend the rest of the note's fields.
export const togglePinNote = (id) => api.put(`/notes/${id}/pin`);

// DELETE /api/notes/{id} -> deletes a note
export const deleteNote = (id) => api.delete(`/notes/${id}`);

export default api;
