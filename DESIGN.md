# Design — The Catalogue Wall

<!-- impeccable:design-schema 1 -->

Anthony Mwongela's portfolio, rebuilt as a catalogue. Seed key `cd9f9a1d`,
assigned direction index 6. Mode: **Persuade** — the visitor is a recruiter
deciding whether to open a conversation.

## Thesis

A portfolio is a collection, so it is presented the way an institution presents
objects: every project, credential and capability is an accessioned object with
a rigorous label. It refuses the developer-portfolio arrangement of
equal-weight glowing tiles where nothing is ever named, dated, or accounted
for.

Absence is drawn rather than omitted. Where there is no employment history, no
live deployment, no testimonial, the site prints a ruled `not recorded` entry.
That is the argument: this candidate tells you what is missing before you ask.

## The world

- **Wall.** Deep gallery green, `#12251e`, with a lit variant and a deeper
  poché for recessed areas. The site is a room, not a document.
- **Label stock.** True white `#fbfaf7` cards with hairline `#e4e0d4` edges,
  set on the wall and carrying near-black ink. Every claim lives on stock.
- **Vitrines.** Images are mounted in black-steel frames whose glass carries a
  screen-blended sheen; the sheen angle is computed from the lamp.
- **Brass.** `#c8942f` / `#ebc87e` / `#8f6412` is the only saturated accent on
  the entire site. It marks the surname, the current room, the primary action,
  and the lamp. Nothing else is allowed to be colourful.
- **Type.** Archivo variable, self-hosted, subset into latin and latin-ext
  ranges. Both axes are used for real: `font-weight: 100 900` and
  `font-stretch: 62% 125%`. Display headings run expanded and tight-tracked;
  register keys run condensed small-caps at wide letter-spacing. Numerals are
  tabular everywhere, because this is a record.

## Tokens

All in `:root` in [style.css](style.css). Wall / stock / ink / on-wall / rule /
brass families, a 4px-based spacing scale `--s1`…`--s10`, `--gutter` as a
clamp, `--measure: 68ch`, `--frame: min(1320px, 100%)`, and one shared easing
`--ease: cubic-bezier(0.16, 1, 0.3, 1)`. Browser chrome is themed from the same
tokens: selection, caret, scrollbar track and thumb, focus ring.

## The signature interaction — the lamp

One warm band of light lies across the wall. It is a single fixed element
(`.lamp`) whose `--lamp-y` is written by [script.js](script.js) from pointer
position, falling back to a slow drift from a third to two thirds down the wall
as the document scrolls. Everything that reacts reads that one light source:

- Label stock gains `.lit` when the band crosses its box.
- Vitrine glass tilts its `--sheen` toward wherever the band is.

No card lights itself, and there is no per-element hover glow. The point is
that it reads as one lamp being walked past. Under
`prefers-reduced-motion: reduce` the lamp is not driven at all and the sheen is
removed.

The only other motion is a single entrance: `.rise` elements translate 18px and
fade in once, staggered 70ms by position, via `IntersectionObserver`. Removed
entirely under reduced motion — removed, not shortened.

## Structure

Seven routes, all kept and each redesigned.

| Route | Room | Contents |
|---|---|---|
| `index.html` | 00 Wall | Opening, statement, practice ledger, two works, holdings, record, contact |
| `about.html` | 01 About | Subject and method labels, standing ledger |
| `whatido.html` | 02 Practice | Six practice labels in a label grid, marked core / working / foundation |
| `skills.html` | 03 Holdings | Eight holding groups, including a `not recorded` group |
| `projects.html` | 04 Works | Exactly three objects, each vitrine + label + repository |
| `education.html` | 05 Record | Four records with marks as awarded |
| `contact.html` | 06 Contact | Reach rows, availability ledger, Gmail dispatch form |

Recurring components: `.directory` (sticky header, rooms numbered 00–06, a
disclosure drawer below 900px), `.opening`, `.object` (vitrine + label stack,
`.reverse` alternates the side), `.label` (accession rail + record, a two-column
register entry rather than an icon-heading-text tile), `.ledger`,
`.holdings`, `.reach`, `.dispatch`, and `.register` — the dense agate footer
that ends every page with the full account, including what is not recorded.

Icons are an authored inline SVG `<symbol>` sprite, `viewBox="0 0 24 24"`, one
stroke weight of 1.7 throughout. No icon font, no brand marks — social links
are tracked-caps text with a stroked external-link glyph, which keeps a single
stroke language and avoids hand-recalled brand path data.

## Honesty constraints the design enforces

- The contact form does not claim to send mail. There is no server. It composes
  the message and opens Gmail, the copy says exactly that, and a fallback
  button appears if the popup is blocked.
- There are three works. The grid is built for three and does not invite a
  fourth.
- Employment history, client work, live deployment URLs and testimonials are
  printed as `not recorded`. They are never implied.
- Practice areas carry a depth marker: core, working, or foundation.

## Accessibility

The copy claims accessibility, so the build honours it: skip link, visible
`:focus-visible` rings in brass (switching to `--brass-deep` on light stock),
one `<h1>` per page with honest heading order, real `<label>` on every field,
`aria-current="page"` on the active room, `aria-expanded` on the rooms drawer
with Escape to close, `role="status"` `aria-live="polite"` form status, AA
contrast on wall and stock, and a reduced-motion path that removes motion.

## Stack

Static HTML, CSS and JS. No framework, no bundler, no package manager, no
backend — the site is exactly the files in this directory served over HTTP.

`.impeccable/build-pages.cjs` is a one-off authoring convenience that assembles
the six inner pages from `index.html`'s shared shell plus the partials in
`.impeccable/partials/`. It is not part of the site and does not run at build
or request time. **If you edit the nav or footer, edit `index.html` and re-run
it; if you edit an inner page directly, edit the partial too or the next run
will overwrite you.**

## Assets

Filenames were normalised to lowercase-hyphenated (they previously mixed case
and contained spaces, which had already caused one production image bug):
`projectsimages/portrait.jpg`, `alx-devops.png`, `portfolio-site.jpg`,
`restaurant-gui.jpg`, `images/kca-university.jpg`, `images/makueni-boys.png`,
`resume-anthony-mwongela.pdf`. The résumé, previously orphaned at the repo
root, is now linked as evidence from the opening, holdings, record and footer.
