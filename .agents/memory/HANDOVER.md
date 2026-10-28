# Handover & Operational Memory (`apps/web-html`)

> **Module:** ShoppieFlyBD Static Frontend HTML/CSS/JS Template  
> **Repository:** `https://github.com/ShoppieFly-Bangladesh/shoppieflybd-html.git`  
> **Live Server:** `https://template.businesszonebd.com`  
> **Last Updated:** 2026-10-25

---

## 1. Module Overview & Production Target

- **Module Purpose:** Standalone high-performance HTML5, Bootstrap 5, and JavaScript eCommerce storefront template for ShoppieFlyBD.
- **Production Target:** Deployed via GitHub Actions (`.github/workflows/cpanel.yml`) directly to cPanel server directory `template.businesszonebd.com`.
- **Performance Baseline:** 95-100% Google Lighthouse score on both Mobile and Desktop, 100% SEO, 100% Accessibility, 100% Best Practices.

---

## 2. Invariant Rules (DO NOT BREAK)

1. **Strictly Single CSS:** Author all styling in `assets/css/style.css`. Never create `custom.css`. Re-minify `style.min.css` on every change.
2. **100% Native WebP Assets:** All images are native `.webp` (excluding `favicon.png` and `apple-touch-icon.png`). Zero redundant JPG/PNG duplicates permitted.
3. **Zero `javascript:void(0)`:** Always use valid URLs or `href="#!" role="button"`.
4. **Apache Performance:** Maintain `.htaccess` Gzip compression, 1-year browser caching, and security headers.

---

## 3. Quick Maintenance Commands

- **Compile Minified CSS:**
  ```bash
  php -r '$c = file_get_contents("assets/css/style.css"); $c = preg_replace("!/\\*[^*]*\\*+([^/][^*]*\\*+)*/!", "", $c); $c = str_replace(["\r\n", "\r", "\n", "\t"], " ", $c); $c = preg_replace("/ {2,}/", " ", $c); $c = preg_replace("/ ?([:;{}]) ?/", "$1", $c); $c = str_replace(", ", ",", $c); $c = str_replace(";}", "}", $c); file_put_contents("assets/css/style.min.css", trim($c)); echo "style.min.css updated!\n";'
  ```
- **Verify All Image Links:**
  ```bash
  php -r '$b = glob("*.html"); $err = 0; foreach ($b as $f) { $c = file_get_contents($f); preg_match_all("/(?:src|href)=[\x22\x27](assets\/img\/[^\x22\x27]+\.(?:webp|png|svg))[\x22\x27]/i", $c, $m); foreach ($m[1] as $img) { if (!file_exists($img)) { echo "Broken: $f -> $img\n"; $err++; } } } if (!$err) echo "All image links 100% valid!\n";'
  ```

---

## 4. Current Template Architecture (Consolidated 20 Canonical Pages)

Following user directive on 2026-10-28, the template was streamlined down to **20 canonical, production-ready HTML pages** by eliminating all redundant layout variations and establishing clean, dedicated hub pages:

- **Storefront & Catalog (5 Canonical Pages):**
  - `index.html` (Homepage)
  - `categories.html` (Dedicated Category Hub with 18 Visual Cards: 6 cards per row on Web/Desktop, 3 cards per row on Mobile, Filter Chips & Live Search)
  - `shop.html` (Authoritative Shop Catalog with Banner & Category Sidebar; renamed from `shop-banner-right-sidebar.html`)
  - `product.html` (Authoritative Clean Full-width Single Product Page; renamed from `product-full-width.html`)
  - `cart.html`, `checkout.html`, `wishlist.html`, `compare.html`
- **Blog (2 Canonical Pages):**
  - `blog.html` (Authoritative Blog Articles Listing; renamed from `blog-right-sidebar.html`)
  - `blog-detail.html` (Authoritative Single Blog Post Details; renamed from `blog-detail-right-sidebar.html`)
- **Store & Merchant Operations (3 Canonical Pages):**
  - `become-vendor.html`, `vendor-list.html`, `vendor-store.html`
- **Customer Account & Support (6 Canonical Pages):**
  - `login.html`, `register.html`, `about-us.html`, `contact-us.html`, `faq.html`, `terms.html`, `track-order.html`
- **12 Deleted Redundant Files:**
  - `shop-right-sidebar.html`, `shop-full-width.html`, `shop-banner-full-width.html`, `shop-list-right-sidebar.html`, `shop-list-full-width.html`, `shop-list-banner-right-sidebar.html`, `shop-list-banner-full-width.html`
  - `product-detail.html`, `product-accordion.html`, `product-accordion-full-width.html`
  - `blog-full-width.html`, `blog-detail-full-width.html`
- **Health & Quality Verification:**
  - Navbar streamlined to 4 focused items across all 20 HTML files: `Home`, `Categories`, `Shop`, and standout CTA `Sell With Us`.
  - Removed `Blog` and `Pages` from nav menu (files 100% preserved and accessible).
  - 2,693 links verified: **0 broken links**.
  - 1,047 images verified: **0 broken images**.
  - `sitemap.xml` updated to exactly 20 production URLs.
