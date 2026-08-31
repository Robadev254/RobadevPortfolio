## Platform

web

## Stack

Static HTML/CSS/JS, no build step, no framework — confirmed by the user in the redesign interview. Bootstrap 5 and Font Awesome currently arrive from CDNs; the user approved dropping Bootstrap in favor of purpose-built CSS with design tokens. Deploys as flat files.

## Users

Primary: technical recruiters, hiring managers, and engineering leads screening candidates for frontend and full-stack web roles. They arrive from a LinkedIn profile, a GitHub link, or a job application, usually skim for well under a minute, and are deciding one thing: is this person worth a first conversation.

Secondary: fellow engineers and collaborators evaluating the work, and the site owner himself, who links to it from applications.

## Product Purpose

A personal portfolio for Anthony Mwongela that converts a skimming recruiter into a contact. Success is a message, a call, or a LinkedIn/GitHub visit from someone hiring. It is not a general-interest site; every section exists to make a hiring decision easier.

## Positioning

A junior-to-mid full-stack engineer whose breadth is real and documented: formal software development degree, a completed intensive engineering program, and public repositories spanning Linux/DevOps, web, and Java desktop work. The portfolio itself is the frontend work sample — the site must hold up as evidence of the craft it claims.

## Operating Context

- Multi-page static site, seven routes, all confirmed to stay: `index.html`, `about.html`, `whatido.html`, `skills.html`, `projects.html`, `education.html`, `contact.html`. The user chose to keep all seven and redesign each rather than consolidate.
- `index.html` currently runs a full-viewport scroll-panel pattern with section dots, previewing each of the other six pages.
- Shared `nav` and `footer` are duplicated in every file by hand; there is no templating layer.
- `script.js` provides: active nav highlighting, in-page smooth scroll, a year stamp, deep-link buttons for phone/WhatsApp/LinkedIn/Twitter/Instagram, and a contact form that composes a prefilled Gmail compose URL with a visible fallback button. There is no server and no form backend; this Gmail handoff is the whole submit path and must keep working.
- `myResume.pdf` and `myResume.docx` sit at the repo root but are not linked from any page.

## Capabilities and Constraints

- No backend, no build step, no package manager. Any solution must work as static files opened over plain HTTP.
- The contact form must not claim to send mail; it opens Gmail. Copy must stay honest about that.
- Bootstrap's grid and components are currently load-bearing across all seven pages; removing it means every layout is rewritten.
- Font Awesome supplies every icon on the site.
- `.env` exists at the root and is gitignored; it is a leftover from a removed PHP contact handler and is not read by any current code.
- Image filenames on disk mix case and contain spaces (`MB City.png`, `ALX-Software Engineering Programme.png`) while the HTML references lowercased/encoded variants. This has already caused one image bug (commit `67d67cf`) and is a live hazard on case-sensitive hosts.

## Brand Commitments

- Name: Anthony Mwongela. Handle: Robadev254 / robahdev.
- Title used throughout: Software Engineer.
- Existing photo asset: `projectsimages/Boykid254.jpg`.
- Voice in the current copy is plain, first-person, and modest — no hype, no superlatives. The user did not ask to change it, so it is preserved.
- No visual, palette, or typographic commitment was pinned; the user delegated visual direction.

## Evidence on Hand

Real and verified:
- GitHub: `github.com/Robadev254` — public repos `alx-system_engineering-devops`, `RobadevPortfolio`, `USERINTERFACE-JAVA`.
- LinkedIn: `linkedin.com/in/anthony-robert-5a5290227/`. X: `x.com/roba_254`. Instagram: `robahdev`.
- Email `robahdev254@gmail.com`, phone/WhatsApp `+254798348149`.
- KCA University, BSc Software Development, Second Class Upper, full-time 4 years.
- ALX Africa Software Engineering, 80%; AI Career Essentials, 85%; 12-month program.
- Makueni Boys High School, secondary education.
- Three projects with live repo links and screenshot images.
- Resume at `myResume.pdf`.

Absent — must not be fabricated: employment history, job titles, dates, company names, client work, testimonials, metrics, user counts, live deployed URLs for the projects, and any certification not listed above. There are exactly three projects; do not invent a fourth to fill a grid.

## Product Principles

1. **The site is the work sample.** For a frontend candidate, sloppy craft on the portfolio outweighs anything the copy claims. Execution quality is the primary argument.
2. **Evidence over adjectives.** Every claim ties to a repo, a grade, a program, or a named technology. Skill lists without artifacts persuade nobody who hires for a living.
3. **Respect a 30-second skim.** Name, role, proof, and a way to make contact must land without scrolling or hunting. Depth lives below and on the inner pages.
4. **Honest scope.** Present a strong early-career engineer accurately. No invented seniority, no implied employment.
5. **Contact is never more than one action away.** From any page, reaching out is a single visible step.

## Accessibility & Inclusion

No externally mandated standard was established, but accessibility is an explicit claim in the site's own copy ("accessible web experiences", "built for clarity and accessibility"), which makes it a commitment the build must honor: real focus states, WCAG AA contrast, keyboard-operable navigation and controls, honest landmarks and heading order, labelled form fields, and reduced-motion support.
