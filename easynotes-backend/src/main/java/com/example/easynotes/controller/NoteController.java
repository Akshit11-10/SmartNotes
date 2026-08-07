package com.example.easynotes.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.easynotes.exception.ResourceNotFoundException;
import com.example.easynotes.model.Note;
import com.example.easynotes.repository.NoteRepository;


@RestController
@RequestMapping("/api")
public class NoteController {

    @Autowired
    NoteRepository noteRepository;

    // GET /api/notes?page=0&size=10&sortBy=updatedAt&sortDir=desc&query=...&category=...
    //
    // Only ever returns non-deleted notes (deleted = false) - anything in the
    // trash is excluded here and only shows up via GET /api/notes/trash.
    // Pinned notes always sort first, then whatever secondary sort was asked for.
    @GetMapping("/notes")
    public Page<Note> getAllNotes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category) {

        Sort.Order secondary = sortDir.equalsIgnoreCase("asc")
                ? Sort.Order.asc(sortBy)
                : Sort.Order.desc(sortBy);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("pinned"), secondary));

        if (query != null && !query.isBlank()) {
            return noteRepository.searchActive(query, pageable);
        }

        if (category != null && !category.isBlank()) {
            return noteRepository.findByDeletedFalseAndCategoryIgnoreCase(category, pageable);
        }

        return noteRepository.findByDeletedFalse(pageable);
    }

    // GET /api/notes/trash?page=0&size=10 - notes the user has "deleted" but
    // that are still recoverable. Kept separate from the main endpoint so the
    // Trash page and the normal notes list stay independent of each other.
    @GetMapping("/notes/trash")
    public Page<Note> getTrash(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return noteRepository.findByDeletedTrue(pageable);
    }

    @PostMapping("/notes")
    public Note createNote(@Valid @RequestBody Note note) {
        return noteRepository.save(note);
    }

    @GetMapping("/notes/{id}")
    public Note getNoteById(@PathVariable(value = "id") Long noteId) {
        return noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
    }

    @PutMapping("/notes/{id}")
    public Note updateNote(@PathVariable(value = "id") Long noteId,
                                           @Valid @RequestBody Note noteDetails) {

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));

        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setCategory(noteDetails.getCategory());
        note.setPinned(noteDetails.isPinned());

        Note updatedNote = noteRepository.save(note);
        return updatedNote;
    }

    // A focused, single-purpose endpoint for the one common partial update we need
    // (toggle pin) rather than requiring the client to re-send the whole note
    // through PUT just to flip one flag.
    @PutMapping("/notes/{id}/pin")
    public Note togglePin(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));

        note.setPinned(!note.isPinned());

        return noteRepository.save(note);
    }

    // PUT /api/notes/{id}/restore - brings a note back out of the trash.
    @PutMapping("/notes/{id}/restore")
    public Note restoreNote(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));

        note.setDeleted(false);
        return noteRepository.save(note);
    }

    // DELETE /api/notes/{id} - SOFT delete. The row stays in the database with
    // deleted = true, so it disappears from the main list but can still be
    // restored from the Trash instead of being lost immediately.
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));

        note.setDeleted(true);
        noteRepository.save(note);

        return ResponseEntity.ok().build();
    }

    // DELETE /api/notes/{id}/permanent - the ONLY endpoint that actually removes
    // a row from the database. Only reachable from the Trash page.
    @DeleteMapping("/notes/{id}/permanent")
    public ResponseEntity<?> permanentlyDeleteNote(@PathVariable(value = "id") Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));

        noteRepository.delete(note);

        return ResponseEntity.ok().build();
    }
}