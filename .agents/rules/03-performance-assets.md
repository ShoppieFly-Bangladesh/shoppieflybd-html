# Performance, Assets & Core Web Vitals (`apps/web-html`)

> **ECC Performance Standard: 95-100% PageSpeed Target**

---

## 1. Core Web Vitals Targets

| Metric | Target | Focus Area |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 2.5s` | Hero banner preload এবং HTML কন্টেন্ট সরাসরি দৃশ্যমান রাখা |
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

## 3. স্টোরফ্রন্টের Loading Behavior

1. পেজের HTML কন্টেন্ট সরাসরি দৃশ্যমান থাকবে। পেজ খোলার জন্য full-page loader ব্যবহার করা যাবে না।
2. ছবি আসার সময় নির্দিষ্ট মাপের স্থির placeholder ব্যবহার করা যাবে। প্রকৃত asynchronous data loading থাকলে সংশ্লিষ্ট অংশে skeleton দেখানো যাবে।
3. Mock delay শুধু demo-তে থাকবে। ফর্ম জমা দেওয়ার মতো action-এর loading feedback সংশ্লিষ্ট control-এ থাকবে।
