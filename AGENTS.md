# AGENTS.md - `apps/web-html` AI Agent Directive

> **Static Frontend Architecture, CSS Pipeline & Performance Guardrails**  
> Repository: `ShoppieFlyBD / apps/web-html`  
> Last Updated: 2026-10-25

---

## 1. Core Operating Directive

This module is the standalone static HTML/CSS/JS frontend template for **ShoppieFlyBD** (deployed to `template.businesszonebd.com`). All AI agents working in this directory must strictly comply with the following architectural rules:

### A. Single Canonical CSS Architecture (STRICT: NO `custom.css`)
- **Single Source of Truth:** `assets/css/style.css` is the **ONLY** authoring file for all custom styles, modifications, and overrides.
- **NEVER create or link an auxiliary `custom.css`:** All new styling must be consolidated directly into `assets/css/style.css`.
- **Minification Pipeline:** 
  - After any edit to `assets/css/style.css`, **always re-minify** and synchronize `assets/css/style.min.css`.
  - All HTML templates must strictly load `assets/css/style.min.css` (`<link href="assets/css/style.min.css" id="mainCss" rel="stylesheet">`) to preserve 95-100% PageSpeed performance.

### B. Pure WebP Image Standard (Zero Redundant Duplicates)
- **100% Native WebP:** All content, banners, heroes, categories, products, avatars, and background images are native `.webp`.
- **Zero Redundant JPG/PNG:** Do not create or leave behind duplicate `.jpg` / `.png` files when `.webp` exists.
- **Mandatory PNG Exceptions:** Only `assets/img/favicon/favicon.png` and `apple-touch-icon.png` remain PNGs for browser tab and Apple iOS compatibility.

### C. 100% SEO & Accessibility Standards
- **Zero `javascript:void(0)`:** All navigation links must have crawlable URLs (e.g. `href="shop-full-width.html"`). Interactive toggle buttons that don't navigate must use `href="#!" role="button"`.
- **SEO Assets:** Ensure `robots.txt` and `sitemap.xml` remain valid and updated.
- **Structured Data:** Maintain Google-compliant Schema.org (`WebSite` + `Organization` with `EntryPoint`).

---

## 2. Fast CSS Minification Command

When updating `assets/css/style.css`, run this command to refresh `assets/css/style.min.css`:

```bash
php -r '$c = file_get_contents("assets/css/style.css"); $c = preg_replace("!/\\*[^*]*\\*+([^/][^*]*\\*+)*/!", "", $c); $c = str_replace(["\r\n", "\r", "\n", "\t"], " ", $c); $c = preg_replace("/ {2,}/", " ", $c); $c = preg_replace("/ ?([:;{}]) ?/", "$1", $c); $c = str_replace(", ", ",", $c); $c = str_replace(";}", "}", $c); file_put_contents("assets/css/style.min.css", trim($c)); echo "style.min.css updated!\n";'
```
