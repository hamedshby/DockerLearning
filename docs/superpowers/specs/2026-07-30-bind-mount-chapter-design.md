# Bind Mount Chapter Design

## Goal

Add the missing Bind Mount chapter under Part 4 (Storage) with the same teaching structure, bilingual behavior, and visual conventions as the existing Docker Volume chapter.

## Scope

- Create `chapters/ch7-1.html`; the existing table-of-contents entry already targets this file.
- Keep every translatable heading, paragraph, list item, table cell, and quiz answer aligned through `data-fa` and `data-en`.
- Cover the concept, `-v` and `--mount` syntax, host-path behavior, read-only mounts, comparison with Docker Volume, development use cases, Docker Compose, security and portability guidance, a hands-on Nginx lab, and five quiz questions.
- Reuse existing CSS classes only: `info-box`, `diagram-box`, `comparison-table`, `lab-section`, `lab-result`, `review-section`, `chapter-quiz`, `review-questions`, `quiz-question`, `quiz-options`, and `quiz-answer`.
- Do not change global navigation or styling unless validation reveals an integration defect.

## Content Structure

1. Definition and host-to-Container diagram
2. Common use cases
3. Bind Mount path anatomy
4. `-v` and `--mount` examples and their missing-source difference
5. Read-only mounts
6. Live source-code development example
7. Bind Mount versus Docker Volume
8. Docker Compose syntax
9. Host path and cross-platform notes
10. Security risks and best practices
11. Nginx lab
12. Five-question quiz

## Validation

- Confirm the chapter file exists and is reachable through target `ch7-1`.
- Confirm all required instructional sections and command examples are present.
- Parse the HTML fragment and ensure required structural classes exist.
- Confirm every element that has `data-fa` also has `data-en`, and vice versa.
- Load the chapter through the site's existing chapter loader and check both Persian and English modes.

