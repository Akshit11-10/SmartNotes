package com.example.easynotes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.easynotes.model.Note;


@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Plain "list everything that isn't in the trash" - used when there's no
    // search term or category filter active.
    Page<Note> findByDeletedFalse(Pageable pageable);

    // Notes currently in the trash (deleted = true) - used by the Trash page.
    Page<Note> findByDeletedTrue(Pageable pageable);

    Page<Note> findByDeletedFalseAndCategoryIgnoreCase(String category, Pageable pageable);

    // A derived method name for "search title OR content, but only among
    // non-deleted notes" would get unwieldy (Spring Data doesn't cleanly
    // support AND-of-OR from the method name alone), so this one uses a
    // manual JPQL query instead - a good contrast to show in an interview.
    @Query("SELECT n FROM Note n WHERE n.deleted = false AND "
            + "(LOWER(n.title) LIKE LOWER(CONCAT('%', :term, '%')) "
            + "OR LOWER(n.content) LIKE LOWER(CONCAT('%', :term, '%')))")
    Page<Note> searchActive(@Param("term") String term, Pageable pageable);
}
 
