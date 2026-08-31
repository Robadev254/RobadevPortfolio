# Design System & Aesthetic Documentation — Anthony Mwongela Portfolio

<!-- impeccable:design-schema 1 -->

Anthony Mwongela's engineering portfolio, redesigned for peak professional craft, technical credibility, and high-conversion client appeal.

## Design Vision & Identity ("Luminous Obsidian & Cyber-Craft")

The redesign is built on a clear premise: **The portfolio is the primary frontend work sample.** For clients and engineering leaders, every pixel, layout constraint, focus ring, and typography choice demonstrates the developer's mastery of modern web software.

### 1. Palette & Surface Tokens
- **Canvas / Wall**: Deep Obsidian (`#090c10`) with radial ambient illumination meshes (`rgba(16, 185, 129, 0.12)`, `rgba(6, 182, 212, 0.06)`, `rgba(245, 158, 11, 0.05)`).
- **Cards & Surfaces**: Elevated glassmorphic surfaces (`#0e131b` with subtle `1px solid rgba(255, 255, 255, 0.1)`). On hover, elevations lift with emerald edge illumination (`#34d399` at 35% opacity).
- **Primary Accent**: Electric Emerald (`#10b981` / `#34d399` / `#6ee7b7`) signaling performance, execution, and active availability.
- **Secondary Accent**: Warm Amber (`#f59e0b` / `#fbbf24`) highlighting academic honors, distinctions, and verified credentials.
- **Tertiary Accent**: Cyan / Electric Blue (`#06b6d4`) for system administration and DevOps domains.

### 2. Typography & Hierarchy
- **Primary Font**: Self-hosted `Archivo` variable font across custom weight (100–900) and stretch (62%–125%) axes.
- **Headings**: Tight tracking (`-0.03em`), bold weights, responsive font clamps (`clamp(2.25rem, 5vw + 1rem, 3.75rem)`).
- **Body & Captions**: Crisp readable line-height (`1.65` to `1.7`), high contrast against dark canvas (WCAG AA compliant).
- **Tags & Code**: Monospace-accented pills for tech stacks and architectural specifications.

### 3. Key Components & Features
1. **Glassmorphic Navigation Bar (`.site-header`)**:
   - Sticky frosted header with blur backdrop.
   - Active route indicator with emerald pill styling.
   - Accessible mobile menu drawer with ARIA attributes and focus trap.
2. **High-Impact Hero Section**:
   - Live availability badge with pulsating radar indicator.
   - Dual-CTA cluster (Featured Works, Hire Me / Consult, Résumé PDF Download).
   - High-resolution framed portrait with glowing gradient backdrop.
3. **Services Bento Grid (`.card`)**:
   - 6 client-tailored solutions: Full-Stack Web Apps, Frontend Architecture, Backend APIs, Linux Systems & DevOps, Custom Business Desktop GUIs, Technical Consultation.
4. **Case Study Cards (`.project-card`)**:
   - Two-column responsive layout alternating visual preview and architecture overview.
   - Real-world challenges solved, bulleted engineering highlights, and direct GitHub links.
5. **Interactive Project Inquiry Composer (`#inquiryForm`)**:
   - Dynamic topic pills that auto-populate message templates based on client need.
   - Frictionless Gmail and default mail client handoff with fallback triggers.
6. **One-Click Clipboard Actions**:
   - Direct copy buttons for email and phone with instant animated confirmation.

### 4. Accessibility & Performance
- Zero external runtime framework overhead (vanilla CSS + vanilla JS).
- Full keyboard navigation with high-visibility focus rings.
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
- Strict `prefers-reduced-motion` compliance removing non-essential transitions for motion-sensitive users.
- Universal responsive support from 320px mobile screens to 4K widescreen displays.
