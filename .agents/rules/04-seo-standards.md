# SEO & Crawlability Standards (`apps/web-html`)

> **ECC SEO Standard: 100/100 Lighthouse SEO Score**

---

## 1. Crawlable Anchors (STRICT)

1. **Zero `javascript:void(0)`:**
   - Anchor elements (`<a>`) must never use `href="javascript:void(0)"` or `href=""`.
   - Navigation links must link to valid destination URLs (e.g. `href="shop-full-width.html"`).
   - Interactive action buttons that do not navigate must use `href="#!" role="button"`.
   - The global click handler in `main.js` intercepts `a[href="#!"]` with `e.preventDefault()` to prevent URL hash jumping.

---

## 2. Structured Data & Social Metadata

1. **Schema.org JSON-LD:**
   - Every page must contain valid JSON-LD structured data.
   - Root page maintains `@graph` containing `Organization` and `WebSite` with a valid `SearchAction` using `EntryPoint` and `urlTemplate`.
2. **OpenGraph & Twitter Cards:**
   - Every template must specify `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
3. **Canonical Link:**
   - Every page must specify an absolute canonical link: `<link rel="canonical" href="https://template.businesszonebd.com/...">`.

---

## 3. SEO Files Maintenance

1. **`robots.txt`:** Must allow all user agents and specify `Sitemap: https://template.businesszonebd.com/sitemap.xml`.
2. **`sitemap.xml`:** Must list all 31 template URLs with valid `lastmod`, `priority`, and `changefreq`.
