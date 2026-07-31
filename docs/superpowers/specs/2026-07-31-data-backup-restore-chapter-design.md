# Data Backup and Restore Chapter Design

## Goal

Add the missing Data Backup and Restore chapter under Part 4 (Storage), following the bilingual teaching structure and visual conventions of the existing storage chapters.

## Scope

- Create `chapters/ch7-3.html`; the existing table-of-contents entry already targets it.
- Explain why filesystem copies alone may be inconsistent while an application is writing data.
- Cover backup and restore of a named Volume with a temporary Alpine Container and `tar`.
- Cover Bind Mount backup, SQL Server native logical backup, integrity checks, retention, encryption, and restore drills.
- Include a practical named-Volume lab and exactly five quiz questions.
- Reuse existing CSS classes without changing navigation, global JavaScript, or global styling.
- Pair every translatable element with matching `data-fa` and `data-en` attributes.

## Content Structure

1. Backup purpose, scope, and consistency
2. Named Volume backup with a read-only source mount
3. Named Volume restore into a separate destination
4. Bind Mount backup guidance
5. Application-aware SQL Server backup
6. Backup verification and restore testing
7. Retention, security, automation, and operational checklist
8. Practical named-Volume backup/restore lab
9. Five-question quiz

## Validation

- Confirm the `ch7-3` table-of-contents target and chapter file.
- Confirm required `tar`, read-only mount, SQL Server, verification, retention, and restore concepts.
- Confirm the lab, comparison table, and five-question quiz exist.
- Confirm balanced bilingual attributes and balanced structural HTML tags.

