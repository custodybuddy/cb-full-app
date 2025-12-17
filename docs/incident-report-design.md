# Incident Report Output Design System

This design system governs every incident report surface (modal, inline views, exports/PDF). It focuses on legal-grade readability, scannability, and accessibility.

## Core Goals
- **Professional tone:** Read clean like a legal memo, not chat.
- **Scannability:** Clear hierarchy, generous spacing, concise headings.
- **Accessibility:** WCAG AA+ contrast, legible type, adequate line height.
- **Responsive:** Mobile-first; desktop enhances spacing and layout.

## Typographic Hierarchy
- Heading font: same as app heading (Prata, semi-bold).
- Body font: same as global body (Raleway, regular).
- Modal title (H1): 20–22px, bold.
- Section headings (H2): 16–18px, bold, consistent sizing.
- Subheadings/labels (H3 or inline labels): 14–15px, medium weight, uppercase or smallcaps.
- Body: 14–15px, line-height 1.6–1.8 for readability; max-width ~60–70ch to avoid wide text.
- Lists: Indented, with roomy spacing; prefer bullets/short paragraphs to avoid text walls.

## Links & References
- All links: high-contrast, underline on hover, focus-visible outlines; `target="_blank"`, `rel="noopener noreferrer"`.
- Auto-link plain URLs; wrap long URLs to avoid overflow.
- Legal references/sources: list items with label + full URL (inline or beneath), clear tap targets.

## Markdown & Rich Text
- All report content is rendered from markdown.
- Map markdown headings to visual H2/H3 styles (section titles, subsections).
- Bullet/numbered lists should be clearly indented with comfortable spacing.
- Inline emphasis (bold/italic) is allowed; avoid non-standard colors.
- Long URLs/references must wrap gracefully and remain clickable.

## Section Order (always)
1) Professional Summary  
2) Observed Impact  
3) Legal References & Sources (statutes, case law, and additional links)  
4) Disclaimer Box

## Spacing & Rhythm
- Section blocks separated by generous vertical space and subtle dividers.
- Consistent padding around the report container.

## Print/PDF Styling
- Light background, dark text; print-safe fonts.
- Preserve heading hierarchy and spacing.
- Show link labels and full URLs for copyability.

## Accessibility
- Maintain contrast on all text and links.
- Focus styles on interactive elements.
- Break long URLs/strings to prevent overflow.
