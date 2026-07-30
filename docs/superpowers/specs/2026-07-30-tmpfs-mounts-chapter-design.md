# tmpfs Mounts Chapter Design

## Goal

Add the missing tmpfs Mounts chapter under Part 4 (Storage), following the bilingual teaching structure and visual conventions of the Docker Volume chapter.

## Scope

- Create `chapters/ch7-2.html`; the existing table-of-contents entry already targets it.
- Explain memory-backed temporary storage, lifecycle, suitable and unsuitable use cases, Linux and Docker Desktop behavior, `--tmpfs`, `--mount type=tmpfs`, size and mode options, Docker Compose, inspection, security, and operational limits.
- Compare tmpfs with Docker Volume and Bind Mount.
- Include a practical lab and exactly five quiz questions.
- Reuse existing CSS classes without changing navigation, global JavaScript, or global styling.
- Pair all translatable elements with `data-fa` and `data-en`.

## Validation

- Confirm the TOC target and chapter file.
- Confirm required commands and concepts are present.
- Confirm the comparison table, lab, and five-question quiz exist.
- Confirm balanced bilingual attributes and balanced HTML tags.

