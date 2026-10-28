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
  - Navbar streamlined to 3 focused items across all 20 HTML files: `Home`, `Categories`, and `Shop`.
  - Moved `Sell With Us` button to mini topbar (`.sf-topbar-seller-btn`) with continuous 360° running gradient border animation (`#ff5722 -> #f59e0b -> #10b981 -> #00d2ff -> #3a4ee5 -> #ff5722`), store icon, and orange `FREE` badge.
  - Upgraded search to modern interactive pill button:
    - Dynamic typewriter animation cycling through popular keywords (`Search your product...`, `Search "Smart Watch"...`, `Search "Cotton T-Shirt"...`, `Search "Fresh Fruits"...`, etc.) with blinking cursor.
    - Continuous 360° running gradient border animation (`conic-gradient` with Royal Blue, Cyan, Emerald, Coral Orange, Pink, Purple) at 2.8s/cycle and 1.8px inner pill mask. Fixed CSS cascade `!important` rule conflict on `transform` to ensure uninterrupted hardware-accelerated continuous flow.
    - Mobile header optimization: user, wishlist, and cart icons hidden on mobile screen; full web-style search pill (with running gradient border, icon, and animated typewriter text) cleanly preserved alongside the mobile hamburger toggle.
    - Zero layout shift (CLS = 0) with fixed min-width container.
    - Preserves side search drawer trigger (`.mn-search-toggle`) and global `Ctrl+K` shortcut.
  - Added sleek Independent Top Utility Bar (`.sf-topbar-wrap`) sitting directly on page background (`#f1f4f7`) separated from `<header>` across all 20 HTML files:
    - Black background removed: fully transparent, blending naturally with the page body background.
    - Left side: Click-to-call Hotline (`+880 9612-000222` with coral icon), Support Email (`support@shoppiefly.com`), and Flash Promo badge (`Free delivery on orders over ৳1,500!`).
    - Right side: First item `Sell With Us` (`sf-topbar-seller-btn` with running gradient border), followed by `Track Order` (`track-order.html`), `Help & FAQs` (`faq.html`), and `Contact Us` (`contact-us.html`).
    - Completely separate from main navbar (`<header>`), which retains its pure standalone card styling and sticky scroll behavior.
    - Updated main navbar (`.mn-header`) with full `border-radius: 15px` across all 4 corners (top corners identically rounded matching bottom corners) and full perimeter border for a standalone floating island aesthetic.
  - Removed `Blog` and `Pages` from nav menu (files 100% preserved and accessible).
  - 2,712 links verified: **0 broken links**.
  - 1,047 images verified: **0 broken images**.
  - `sitemap.xml` updated to exactly 20 production URLs.
