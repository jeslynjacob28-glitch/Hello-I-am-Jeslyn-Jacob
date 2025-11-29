# Jeslyn's Portfolio - AI Coding Agent Guidelines

## Architecture Overview

This is a **static single-page portfolio site** (HTML/CSS/JavaScript) with a data-driven design pattern. The key architectural principle:

- **HTML (`index.html`)**: Semantic structure with placeholder sections for Hero, About, and two project grids (Technical/Creative)
- **CSS (`styles.css`)**: Pastel retro theme with mint background, rounded hero, checkered separators, responsive grid layout
- **JavaScript (`script.js`)**: Single responsibility—dynamically load `data/projects.json` and render project cards into the DOM
- **Data (`data/projects.json`)**: Single source of truth for all projects; categorized by `technical` or `creative`

**Why this pattern**: Separates content (JSON) from presentation (HTML/CSS), allowing portfolio updates without touching code layout. New projects added to JSON automatically appear on the page.

## File Structure & Responsibilities

```
index.html/index.html         → Semantic HTML; provides grid containers with id="technical-grid" and id="creative-grid"
styles.css/styles.css         → All styling; responsive design (mobile-first), uses CSS Grid for cards
script.js/script.js           → Fetches projects.json, maps projects by category, creates DOM card elements
data/projects.json            → Project metadata array; each entry has: title, role, stack, description, category
```

## Data Format (projects.json)

```json
{
  "projects": [
    {
      "title": "Project Name",
      "role": "My Role",
      "stack": "Technology Stack",
      "description": "Brief description",
      "category": "technical"
    }
  ]
}
```

Categories: `"technical"` or `"creative"` (case-sensitive). Incorrect categories will be silently ignored during filtering.

## Critical Conventions

1. **Project Grid IDs** (non-negotiable for JS targeting):
   - `<div id="technical-grid">` in HTML
   - `<div id="creative-grid">` in HTML
   - JavaScript queries these exact IDs; changing them breaks rendering

2. **CSS Class Naming**: Use descriptive BEM-style or utility classes (e.g., `hero`, `project-card`, `checkered-divider`)

3. **Responsive Breakpoints**:
   - Mobile: default (single-column)
   - Tablet (768px): 2-column grid
   - Desktop (1024px+): 3-column grid or wider
   - Use CSS Grid, not floats

4. **Pastel Color Palette** (establish and document):
   - Background: mint (#E8F5F0 or similar)
   - Card background: soft cream/white with subtle shadow
   - Accents: pastels (lavender, peach, pale pink)
   - Text: dark gray or navy for contrast

5. **JavaScript Pattern**:
   - Fetch once on page load (`DOMContentLoaded` event)
   - Filter by category: `projects.filter(p => p.category === "technical")`
   - Create card elements dynamically; do NOT hand-code card HTML
   - Append to grid container with `.appendChild()` or `.insertAdjacentHTML()`

## Common Tasks & Workflows

### Adding a New Project
1. Edit `data/projects.json`: add entry to `projects` array
2. Set `category` to `"technical"` or `"creative"`
3. Reload page; JavaScript automatically renders the card

### Updating Styling
- Edit `styles.css` directly
- Use media queries for responsive breakpoints
- Maintain consistent spacing and typography scale

### Debugging Card Rendering
- Check browser console for fetch errors (JSON path correct?)
- Verify grid container IDs in HTML match script queries
- Inspect DOM to see if `project-card` elements are being created

## File Paths & Static Site Assumptions

- All files served from root (e.g., `data/projects.json` must exist in workspace root, not in subdirectories)
- No build step; runs directly in browser via `index.html`
- Assume CORS is not an issue (all files on same origin)

## Design Tokens & Accessibility

- **Font**: Clear sans-serif (e.g., system font stack or Poppins for retro feel)
- **Contrast**: Ensure text passes WCAG AA (4.5:1 ratio for normal text)
- **Interactive Elements**: Buttons and cards have `:hover` and `:focus` states
- **Images**: Use semantic `<img alt="">` tags; provide meaningful alt text

## Example: Adding a New Card Type

If Jeslyn needs to add a "Featured" section, follow the pattern:
1. Add `id="featured-grid"` to HTML
2. Filter projects: `projects.filter(p => p.featured === true)`
3. Create cards with consistent styling (reuse `.project-card` class)
4. Ensure responsive grid layout matches other sections

---

**Last Updated**: November 29, 2025  
**Project Status**: Active development (MVP with placeholder content)
