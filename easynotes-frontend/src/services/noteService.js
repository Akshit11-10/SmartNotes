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

// GET /api/notes -> returns an array of all notes
export const getAllNotes = () => api.get("/notes");

// GET /api/notes/{id} -> returns a single note
export const getNoteById = (id) => api.get(`/notes/${id}`);

// POST /api/notes -> creates a new note. Body: { title, content }
export const createNote = (note) => api.post("/notes", note);

// PUT /api/notes/{id} -> updates an existing note. Body: { title, content }
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);

// DELETE /api/notes/{id} -> deletes a note
export const deleteNote = (id) => api.delete(`/notes/${id}`);

export default api;
