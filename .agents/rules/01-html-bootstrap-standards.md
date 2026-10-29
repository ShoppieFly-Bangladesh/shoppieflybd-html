# HTML, Bootstrap & Semantic Standards (`apps/web-html`)

> **ECC Frontend Standard for Semantic HTML5, Bootstrap 5 & A11y**

---

## 1. Semantic Hierarchy & Document Structure

1. **Exact 1 `<h1>` Per Page:**
   - Every HTML page must have exactly ONE `<h1>` element representing the primary topic of that page (e.g. `<h1 class="mn-single-title">` on product pages, `<h1 class="page-title">` on interior pages).
   - Never skip heading levels (e.g. `<h1>` followed by `<h4>`).
2. **Semantic Elements Over `<div>` Soup:**
   - Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
   - Never use `<div>` for clickable interactive elements. Use `<button type="button">` or valid anchor `<a>`.
3. **No Trailing Slashes on Void Elements:**
   - Write clean HTML5: `<input type="text">`, `<img src="..." alt="...">`, `<br>`, `<meta ...>`.

---

## 2. Form & Control Accessibility (A11y)

1. **Mandatory Label Connections:**
   - Every form input must have a programmatic connection: `<label for="field_id">` paired with `<input id="field_id" name="field_name">`.
2. **Icon-Only Buttons & Links:**
   - Any button or anchor containing only an icon (e.g. `<i class="ri-search-line"></i>`, cart icon, wishlist icon, close button) MUST have an explicit `aria-label` attribute (e.g. `aria-label="Search products"`, `aria-label="Close sidebar"`).
3. **Form Submissions:**
   - All search, cart, and filter forms must have valid `action` and `method` attributes with semantic `<button type="submit">`.

---

## 3. Bootstrap 5 Conventions

1. **Fluid Grid Hierarchy:** Use standard Bootstrap container-row-col structure: `.container` > `.row` > `.col-*`.
2. **Spacing Utilities:** Use standard Bootstrap spacing (`mb-3`, `py-4`, `g-4`) rather than ad-hoc inline styles.
3. **Modals & Carousels:** Ensure modals trigger carousel refresh on show: `$('#quickview_modal').on('shown.bs.modal', function () { $('.owl-carousel').trigger('refresh.owl.carousel'); });`.

---

## 4. Unified Section Header & Divider Standard (STRICT INVARIANT)

All storefront content sections (`.mn-category`, `.mn-new-product`, `.mn-deal`, `.mn-blog`, etc.) across all templates must strictly follow the uniform header architecture:

1. **Full-Width Divider (<hr> / border-bottom):** Every section header must have a continuous `1px solid #e5e5e5` bottom border spanning 100% full width under the heading and action controls (`.sf-section-header.mn-title` or `.mn-title`).
2. **Aligned Action Controls:** The right side must house the corresponding action—either a pill-shaped `View All` link (`.sf-cat-view-all`) or slider navigation controls (`.owl-dots` / `.owl-nav`).
3. **Guaranteed Clearance (No Clinging):** Headers must maintain `padding-bottom: 10px` above the divider line and `margin-bottom: 24px` (mobile: `16px`) below it, preventing controls from clinging to items underneath.

