# CSS Architecture & Micro-Polish Standards (`apps/web-html`)

> **ECC Architectural Directive: Single Unified CSS Pipeline & Micro-Feel Polish**

---

## 1. Single Canonical Pipeline (STRICT: NO `custom.css`)

1. **Single Source of Truth:**
   - All styling, new features, overrides, and responsive rules MUST be authored directly in `assets/css/style.css`.
   - **NEVER create or link an auxiliary `custom.css` file.**
2. **Minification Synchronization:**
   - Every modification to `assets/css/style.css` must immediately be compiled into `assets/css/style.min.css`.
   - All HTML templates must load `style.min.css` (`<link href="assets/css/style.min.css" id="mainCss" rel="stylesheet">`) to preserve 95-100% PageSpeed performance.

---

## 2. Micro-Feel & Interface Polish (ECC Principles)

1. **Concentric Border Radius:**
   - For nested elements (e.g., product image inside a product card):
     $$\text{Outer Radius} = \text{Inner Radius} + \text{Padding}$$
2. **Optical Text Wrapping:**
   - Headings, hero banners, and titles: Apply `text-wrap: balance;` so headings break evenly without orphaned words.
   - Paragraphs and card descriptions: Apply `text-wrap: pretty;`.
3. **Tabular Numerals for Dynamic Content:**
   - For all prices (`৳XX.XX`), counters, timers, and quantity inputs: apply `font-variant-numeric: tabular-nums;` to avoid layout jitter during updates.

---

## 3. GPU-Accelerated Compositor Motion

1. **Animate Compositor Properties Only:**
   - Animate `transform` and `opacity` only.
   - **NEVER animate layout-bound properties:** Do NOT animate `width`, `height`, `top`, `left`, `margin`, `padding`, or `border` (prevents browser reflow and jank).
2. **Smooth Transitions:**
   - Standard UI transitions should use `transition: all 0.25s ease;` or cubic-bezier easing.
