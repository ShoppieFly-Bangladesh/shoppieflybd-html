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

---

## 5. Comprehensive Template-Wide Performance & Hygiene Sprint (2026-10-29)

- **Universal Script Deferral & Elimination of Render-Blocking Scripts:**
  - Upgraded all `<script>` tags across all 20 HTML files with `defer` attributes.
  - Eliminated dead vendor scripts: purged `nouislider.js` from 18 non-shop pages, purged `slick.min.js` and `jquery.zoom.min.js` from 18 non-product pages, purged `countdownTimer.js` and `infiniteslidev2.js` from unused pages.
  - Completely purged dead `animate.min.css` (71.7 KB) across all 19 interior templates.
  - Reduced per-page vendor payload by ~250 KB on interior pages.
- **Unified Non-Blocking Google Fonts & Icon CSS Architecture:**
  - Added non-blocking Google Fonts stylesheet link (`Poppins` & `Quicksand` with `media="print" onload="this.media='all'"`) and `<noscript>` fallbacks across all 20 templates.
  - Made `remixicon.min.css` non-blocking with `media="print" onload="this.media='all'"` and preloaded `remixicon.woff2`, `bootstrap.min.css`, and `style.min.css`.
  - Zero FOUT / FOIT and 100% unified typography across all pages.
- **Zero Cumulative Layout Shift (CLS = 0.000) & Image Optimization:**
  - Injected exact `width` and `height` attributes into all 777 previously un-dimensioned images across the 19 interior templates using natural image metadata (0 images missing dimensions across all 20 pages).
  - Added native `loading="lazy"` to 723 below-the-fold images while keeping above-the-fold heroes and logos eager.
  - Added native `decoding="async"` across 799 images for non-blocking main-thread decoding.
- **Zero `javascript:void(0)` SEO Compliance:**
  - Eliminated all 84 instances of `javascript:void(0)` / `javascript:void(0);` across all templates, replacing with accessible `href="#!" role="button"`.
- **JavaScript Engine Fix (`assets/js/main.js`):**
  - Resolved duplicate `Ctrl+K` keydown listener (removed duplicate trigger in lines 276-286) so search drawer opens exactly once per keystroke.
  - Unified escape key handling for category and search drawers.
- **Verification Results:** Full automated audit verified **0 blocking scripts, 0 missing image dimensions, 0 broken links, 0 broken images, 0 dead CSS, and 0 `javascript:void(0)`**.
- **Modern Instagram-Inspired Top Category Grid Architecture (Approach 1 - Refined 2026-10-29):**
  - Completely redesigned Homepage Category Section (`index.html`) from obsolete bulky cards (`.mn-cat-card` in Owl Carousel) to pure, borderless Instagram-style thumb showcases (`.sf-home-cat-item`).
  - **Zero Outer White Card & Zero Blue Border:** Eliminated all card wrappers, outer borders, and blue hover outlines per user directive. The clean rounded image sits directly on the page background with title underneath.
  - Section Header: Sleek `Top Categories` title paired with a pill-shaped `View All` button linking directly to `categories.html`.
  - **Desktop View (Full-Width Edge-to-Edge with Tight Gap):** Configured `.sf-section-header` and `.sf-cat-grid-wrapper` to 100% full screen width (`width: 100% !important; max-width: 100% !important; margin: 0 !important;`) aligning seamlessly with Hero Slider above and New Arrivals below. Arranged 18 categories in 9 columns × 2 rows with a tight, uniform 14px horizontal gap (`gap: 18px 14px`) and zero container boxing or artificial indentation.
  - **Mobile 4-Column Consistency & Grid Track Collision Fix (Resolved 2026-10-29):**
    - **Root Cause Identified:** The base stylesheet had `grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));`. Because CSS Grid gives explicit track definitions priority over `grid-auto-columns`, the first 3 columns were rendered as explicit tracks at `115px` (large), while columns 4 onwards were generated as implicit tracks using `grid-auto-columns: calc((100% - 24px) / 4)` (smaller ~78-85px). This created the visual mismatch where items 1-3 were large and items 4+ were smaller.
    - **Fix Applied:** Overrode `grid-template-columns: none !important;` in mobile media queries. All columns across the entire 18 items are now generated solely by `grid-auto-columns: calc((100% - 24px) / 4) !important;` with `gap: 12px 8px`.
    - **100% Uniform Smaller Size:** Verified via headless DOM telemetry that every item across all 18 categories now has the exact identical compact width, with exactly 4 columns visible on initial load and 4 columns per view during swipe.
    - Set `min-height: 28px` on category names to keep both rows horizontally level regardless of single-line or two-line category titles.
    - Added subtle tap feedback (`scale(0.95)` on touch active) while disabling sticky hover shadows on mobile screens.
  - Purged deprecated Owl Carousel binding for `.mn-cat` in `assets/js/main.js` and re-compiled canonical `assets/css/style.min.css`.
- **Unified Section Header & Divider Line Invariant (Implemented 2026-10-29 via /learn):**
  - **Full-Width Divider Line:** Integrated `.sf-section-header.mn-title` with `border-bottom: 1px solid #e5e5e5; padding-bottom: 10px; margin-bottom: 24px; width: 100%;` matching `New Arrivals` exactly.
  - **Zero Clinging for Action Controls:** Ensured 24px vertical clearance between the header and category items so `View All` never sits on top of cards.
  - **Desktop Item Sizing & Gap Elimination (Resolved 2026-10-29):** Eliminated artificial empty spacing between items by removing restrictive `max-width: 115px; margin: 0 auto;` inside the 9-column 1fr grid. Items now cleanly occupy `width: 100%` of their respective tracks, governed by a tight, uniform `gap: 18px 14px` on desktop (and `gap: 16px 10px` on tablets). Zero 100px white voids remain.
  - **Permanent Invariant Established:** Codified ADR-016 and updated `apps/web-html/.agents/rules/01-html-bootstrap-standards.md` and root `AGENTS.md` (Section 2.3) so all future sections across the monorepo follow this identical header standard.
- **Dedicated Category Hub Card Modernization (`categories.html` - 2026-10-29):**
  - Completely aligned all 18 category cards on `categories.html` with `index.html`'s modern Instagram-inspired design (`.sf-home-cat-item`, `.sf-home-cat-img`, `.sf-home-cat-name`).
  - Purged bulky white card boxes (`.sf-cat-card`), gray borders, and item-count badges, establishing 100% storefront design consistency.
  - Fully preserved instant live search (`#catSearchInput`) and interactive group filtering chips (`.sf-cat-filter-btn`) via programmatic `data-group` and `data-name` attributes.
  - Purged dead `.sf-cat-card` CSS rules from `assets/css/style.css` and re-compiled `assets/css/style.min.css`.
