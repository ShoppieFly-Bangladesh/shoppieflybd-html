# Performance, Assets & Core Web Vitals (`apps/web-html`)

> **ECC Performance Standard: 95-100% PageSpeed Target**

---

## 1. Core Web Vitals Targets

| Metric | Target | Focus Area |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 2.5s` | Preload hero banner, fast non-blocking loader |
| **CLS (Cumulative Layout Shift)** | `< 0.05` | Mandatory `width` and `height` on all images |
| **TBT (Total Blocking Time)** | `< 200ms` | Deferred scripts, non-blocking execution |
| **FCP (First Contentful Paint)** | `< 1.5s` | Gzip compression & minified CSS |

---

## 2. Image Asset Invariants

1. **100% Native WebP:**
   - Every content, product, category, banner, hero, avatar, and background image must be `.webp`.
   - Never reference or create redundant uncompressed `.jpg` or `.png` files.
   - **Allowed PNG Exceptions:** `assets/img/favicon/favicon.png` and `apple-touch-icon.png` (browser tab and Apple iOS standards).
2. **Explicit Dimensions:**
   - Every `<img>` tag must have explicit integer `width` and `height` attributes matching its natural aspect ratio.
3. **Loading Strategy:**
   - Above-the-fold Hero banner ONLY: `loading="eager" fetchpriority="high"`.
   - All other images: `loading="lazy" decoding="async"`.

---

## 3. Preloader Behavior

1. **Non-Blocking Dismissal:**
   - The `#mn-overlay` preloader must dismiss on `DOMContentLoaded` within 200ms and have a maximum fallback timeout of 800ms.
   - Upon fading out, the loader element is removed from the DOM.
