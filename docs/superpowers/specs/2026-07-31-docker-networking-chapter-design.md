# Docker Networking Chapter Design

## Goal

Add the missing Docker Networking chapter under Part 5 (Networking), following the bilingual teaching structure and visual conventions of the existing chapters.

## Scope

- Create `chapters/ch6.html`; the existing table-of-contents entry already targets it.
- Explain Container network isolation, endpoints, virtual networks, IP addresses, ports, and Docker's embedded DNS.
- Cover the `bridge`, `host`, `none`, `overlay`, `macvlan`, and `ipvlan` drivers at an appropriate introductory depth.
- Teach why user-defined Bridge networks are preferred over the default Bridge for local multi-Container applications.
- Cover network creation, inspection, connection, disconnection, DNS-based service discovery, port publishing, isolation, and troubleshooting.
- Include a practical two-Container lab and exactly five quiz questions.
- Reuse existing CSS classes without changing navigation, global JavaScript, or global styling.
- Pair every translatable element with matching `data-fa` and `data-en` attributes.

## Content Structure

1. Docker Networking model and traffic paths
2. Network drivers and selection guidance
3. Default Bridge versus user-defined Bridge
4. Network lifecycle commands and inspection
5. Container DNS and name-based communication
6. Container ports versus published host ports
7. Connecting a Container to multiple networks
8. Isolation, security, and troubleshooting
9. Practical application-to-database network lab
10. Five-question quiz

## Validation

- Confirm the `ch6` table-of-contents target and chapter file.
- Confirm required drivers, commands, DNS behavior, port publishing, security, and troubleshooting guidance.
- Confirm the lab, comparison tables, and five-question quiz exist.
- Confirm balanced bilingual attributes and balanced structural HTML tags.

