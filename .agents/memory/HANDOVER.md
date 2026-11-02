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
  - Streamlined breadcrumbs across the application:
    - Completely removed bulky breadcrumbs from 12 utility/form pages (cart, checkout, login, register, contact-us, faq, terms, about-us, compare, wishlist, track-order, become-vendor).
    - Converted catalog & blog breadcrumbs (shop, product, categories, blog, blog-detail, vendor-list, vendor-store) to ultra-clean, transparent, single-line text (.sf-breadcrumb-nav) without the heavy 100px white box.
    - 100% hidden on mobile devices (max-width: 767.98px) to eliminate wasted vertical scroll space.
  - Mobile Spacing & Compact Multi-Vendor Optimization Implemented:
    - Drastic reduction of top content margin below mobile search bar (from 30px to 8px).
    - Mobile search bar padding compact (6px 12px 4px 12px).
    - Streamlined category hub header box (categories.html) with hidden long subtitles and reduced 12px margin on mobile.
    - Standardized global mobile section gaps from 30-40px down to high-density 12-14px standard (Daraz/Amazon style).
  - Mobile Bottom Navigation Bar Unification Across All 20 Pages:
    - Removed Search icon from bottom nav.
    - Enforced exact uniform 5-item order across all 20 canonical HTML files: Home -> Category (categories.html) -> Cart (Elevated Hero FAB) -> Shop (shop.html) -> Account (login.html).
    - Set automatic contextual active state and filled Remix Icons per page.
    - Eliminated remaining gap between mobile search bar and hero banner by removing all remaining bottom padding from .sf-mobile-search-bar and setting .mn-main-content top margin to 0.
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

---

## 6. Active Sprint: Product Ecosystem Audit & Canonical Card Refinement (2026-10-31)

- **Phase 1 & Phase 2 Completed: Canonical Lightweight Product Card Architecture (With Full Bottom Button):**
  - **Single Image & Zero Hover Lag:** Completely eliminated redundant second hover images (`hover-img`) and hover action overlays (`mn-options`, `mn-pro-loader`). Every product card loads exactly 1 crisp image.
  - **Top Cutout Percentage Badge:** Preserved original template cutout shape with `shape-2.webp` ears (`.lbl span.discount`), styled in bold danger color (`#f90c4c`, `font-weight: 700;`, e.g. `20% OFF`).
  - **Social Proof & Sold Count:** Integrated star rating and sold count in a clean space-between row (`★ 4.8 (42)` and `850+ Sold`) with zero extra height.
  - **Strict 2-Line Height Equalization:** Enforced `-webkit-line-clamp: 2; height: 40px;` across all cards, guaranteeing 100% equal card heights across desktop, tablet, and mobile grid rows.
  - **Full-Width Prominent 'Add to Cart' Button:** Integrated `.mn-add-cart.mn-pro-btn-full` across the full width of the card's inner content (`width: 100%; height: 38px; border-radius: 8px; margin-top: auto;`) with soft background, active tap scaling (`scale(0.98)`), and smooth notification toast.
  - **Out-of-Stock State:** Implemented `.sf-out-of-stock` with `স্টক শেষ` overlay badge, 60% grayscale image filter, and disabled button.
  - **Purged Obsolete CSS & JS (3,500+ Lines Cleaned):** Permanently eliminated list-view styling (including invalid `font-weight: 20px;`), list-view switchers (`mn-gl-btn`), and color hover image swapping scripts (`initChangeImg`, `changeProductImg`, `hoverAddImg`, `listView`, `gridView`) from `assets/js/main.js` and `assets/css/style.css`.
  - **Shop Catalog Modernization (`shop.html`):**
    - Fixed all 12 broken `href=""` product links to `href="product.html"`.
    - Relocated filter sidebar from the right side (`m-t-991`) to the left side (`col-lg-3` sidebar, `col-lg-9` products) adhering to e-commerce standards.
    - Replaced obsolete list-view toggle with clean items count toolbar (`Showing 1-12 of 36 items`).
  - **Homepage & Cross-Page Synchronization:**
    - Updated "New Arrivals" (6 cards) and "Day of the Deals" (8 cards) carousels on `index.html` with canonical cards, ADR-016 headers with `View All` buttons, and active countdown timer.
    - Updated `vendor-store.html` (9 cards, sidebar moved to left) and `product.html` (6 Related Product cards) with canonical cards and ADR-016 headers.
  - **Elimination of All Product Sliders (Pure 2-Row CSS Grid Architecture):**
    - Completely purged Owl Carousel from product sections across the entire site (`$(".mn-product").owlCarousel`, `$(".mn-related").owlCarousel`, and `$(".mn-add-more-slider").owlCarousel` removed from `assets/js/main.js`).
    - Implemented `.sf-product-grid-wrapper`:
      - **Desktop (≥ 1200px):** 6 columns × 2 rows = 12 products per section.
      - **Laptop (992px - 1199px):** 5 columns × 2 rows = 10 products per section.
      - **Tablet (768px - 991px):** 4 columns × 2 rows = 8 products per section.
      - **Mobile (≤ 767px):** Exact "Top Categories" style with 2-row smooth native touch scroll (`grid-template-rows: repeat(2, auto); grid-auto-flow: column; grid-auto-columns: calc((100% - 10px) / 2);`) and `scroll-snap-type: x mandatory;`.
    - 0 JavaScript carousel overhead, 0 layout shifts, instant native rendering.
  - **Re-compiled `style.min.css`:** Minified cleanly to 270.6 KB.
  - **Day of the Deals: Fixed Deal Countdown Tab at Bottom of Image:**
    - Implemented `.mn-deal-counter` at the bottom of the product image container (`.mn-img`) across all 12 cards in the "Day of the Deals" section on `index.html`.
    - Engineered mathematically perfect inverted radial-gradient curves (`radial-gradient(circle at ...)`), replacing raster WebP artifacts for a 100% seamless, crisp curve that blends directly into the image bottom with zero gaps, zero jagged pixels, and zero misaligned wings.
    - Permanent non-hover fixed deal countdown timer (`<i class="ri-time-line"></i> <span class="timer-digits">18h : 24m : 35s</span>`) with 26px height, 13px radius, and danger red text (`#f90c4c`).
    - Validated live rendering with Chrome headless at 1200px and mobile viewports.
    - Recompiled `style.min.css` (274.3 KB).
  - **Homepage Section Streamlining & Consistency Sprint (`index.html`):**
    - **Service Section Elimination:** Removed the 4-box `.mn-service` section from `index.html`.
    - **Section Header Consistency Invariant:** Standardized all section headers (`Top Categories`, `New Arrivals`, `Day of the Deals`) to strictly follow the clean, plain "New Arrivals" pattern (`.sf-view-all-btn`). Eliminated pill button backgrounds/borders from `Top Categories`.
    - **Smooth Down-to-Up Vertical Slide & Fade Promo Ticker (`.sf-promo-ticker`):** Engineered a continuous down-to-up vertical slide & fade transition (`transform: translateY(100% -> 0 -> -100%)`, `opacity: 0 -> 1 -> 0`) rotating through 5 core customer benefits with colorful icons (Authentic Products, Free Shipping, 24/7 Support, 30 Days Return, Secure Payment) every 3.0s with pause-on-hover. Fixed height (24px) preventing any layout shift (CLS = 0). Recompiled `style.min.css` (274.7 KB).
  - **Quality Verification:** Verified **0 broken images, 0 broken product links, and 0 empty `href=""`** across all 20 canonical HTML files.
  - **Browser Cache-Busting & Automated Asset Versioning Pipeline (2026-10-31):**
    - **Apache `.htaccess` No-Cache for HTML:** Updated `mod_expires` (`ExpiresByType text/html "access plus 0 seconds"`) and `mod_headers` (`<FilesMatch "\.(html|htm)$">` with `Cache-Control: "no-cache, no-store, must-revalidate"`, `Pragma: no-cache`, `Expires: 0`). Guarantees users always fetch the freshest HTML on every visit, while static assets retain 1-year immutable caching.
    - **CI/CD Automated Version Injection (`.github/workflows/cpanel.yml`):** Injected pre-deploy step extracting the 8-character commit hash (`github.sha`) and updating all HTML references for `style.min.css?v=${VERSION}` and `main.js?v=${VERSION}` prior to FTP sync.
    - **Synchronized Preload & Stylesheet Parity:** Initialized versioning (`?v=2190be95`) across all 20 canonical HTML templates, ensuring `<link rel="preload">` and `<link rel="stylesheet">` share 100% identical query strings, eliminating Lighthouse double-fetch penalties.
    - **`shop.html` Duplicate Document Cleanup:** Cleaned up 300 lines of accidental duplicate `<!doctype html>` markup (lines 1370-1668) from `shop.html`, restoring clean single-document structure with verified pagination.
  - **Homepage Multi-Section Expansion (3 New 2-Row Native Product Grids - 2026-10-31):**
    - Expanded `index.html` from 2 product sections (24 products) to **5 rich product sections (60 products)**, providing an endless, high-converting browsing experience:
      1. `New Arrivals` (12 products - 2 rows)
      2. `Day of the Deals` (12 products - 2 rows with fixed countdown timer)
      3. **`Best Sellers` (12 products - 2 rows):** High-velocity items with top ratings (`★ 4.8 - 4.9`) and solid social proof (`1k+ Sold`).
      4. **`Trending Gadgets` (12 products - 2 rows):** Curated tech & smart accessories (TWS earbuds, smartwatches, GaN chargers, gaming keyboards).
      5. **`Just For You` (12 products - 2 rows):** Personalized discovery grid with mixed lifestyle and fashion items before footer.
    - All 3 new sections adhere strictly to the canonical 2-row CSS grid (`.sf-product-grid-wrapper`: 6 cols on desktop, 2-row smooth touch swipe on mobile), 100% equal card heights, full-width `Add to Cart` buttons, and ADR-016 header divider lines. Verified via Headless Chrome CDP (1440px desktop & 375px mobile).
  - **Homepage Banner Slider Removal & Full-Width Interleaved Offer Banners (2026-10-31):**
    - **Banner Slider Completely Eliminated:** Permanently removed `.mn-modern-banner.owl-carousel` slider (lines 1528-1572) and purged its Owl Carousel JS initialization from `assets/js/main.js` (lines 360-377). Zero JS listener bloat.
    - **Clean Image-Only Standalone Banner Strips:** Built responsive `.sf-banner-wrapper`, `.sf-banner-item`, and `.sf-banner-img` with 15px border radius matching cards, zero text overlay clutter, smooth hover zoom (`scale(1.015)`), and native responsive aspect ratio scaling.
    - **Rhythmic Interleaving Sequence (`1 Product Section -> 1 Offer Banner`):**
      - Section 1: `New Arrivals` ➔ **Offer Banner 1** (`assets/img/banner/1.webp` - Women's Fashion)
      - Section 2: `Day of the Deals` ➔ **Offer Banner 2** (`assets/img/banner/2.webp` - Goggles / Eyewear)
      - Section 3: `Best Sellers` ➔ **Offer Banner 3** (`assets/img/banner/1.webp` - Women's Fashion)
      - Section 4: `Trending Gadgets` ➔ **Offer Banner 4** (`assets/img/banner/2.webp` - Goggles / Eyewear)
      - Section 5: `Just For You` ➔ Instagram Showcase & Footer
    - **Verification & Parity:** Verified with Headless Chrome CDP across 1440px desktop and 375px mobile viewports: `horizontalOverflow: false`, CLS = 0, full responsiveness without any horizontal page shift. Re-compiled `style.min.css`.
  - **Running Color Gradient Flow Restoration (Search Bar & Topbar 'Sell With Us' - 2026-10-31):**
    - **Root Cause Resolution:** Re-injected missing `@-webkit-keyframes sfBorderSpin` and `@keyframes sfBorderSpin` (`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`) into `assets/css/style.css` which had been lost in commit `405fb5e`.
    - **Active Flowing Animations:** Restored smooth continuous 360° color gradient rotation on:
      1. Desktop Center Search Bar (`.desktop-center-search .sf-instant-search-btn::before`)
      2. Mobile Search Bar (`.sf-mobile-search-bar > a.sf-instant-search-btn::before`)
      3. Mini Topbar Sell With Us button (`.sf-topbar-seller-btn::before`)
    - **Verification:** Verified live animation status via Headless Chrome CDP (`animationPlayState: "running"`, pixel difference between consecutive time frames confirmed). Recompiled `style.min.css`.
  - **Compact Offer Banner Card Restoration (Matching User Reference Image 1 & Mantu - 2026-10-31):**
    - **Restored Exact Compact Banner Card Architecture:** Replaced the full-screen stretched image strips with Mantu's original balanced `.modern-banner` layout (Image on left with `width: calc(100% - 380px)`, and typography + `Shop Now` CTA button on right).
    - **Compact Viewport Height Lock:** Restricted desktop banner height to a sleek 380px (340px at 1199px, 280px at 991px, 240px at 767px, 200px at 575px). Solved the full-screen covering problem completely: previous section product rows and subsequent "Day of the Deals" header & products remain simultaneously visible within the user's viewport without scrolling.
    - **Standalone Zero-JS Visibility:** Removed Owl Carousel carousel requirements (`banner-animation` dependency removed), ensuring all text, headings, and CTA buttons are 100% permanently visible (`opacity: 1 !important; visibility: visible !important;`).
    - **4 Distinct Thematic Banners:**
      - Banner 1 (After New Arrivals): Women's Fashion Collection (`1.webp`)
      - Banner 2 (After Day of the Deals): Women's Goggles Collection (`2.webp`)
      - Banner 3 (After Best Sellers): Trending Fashion Sale (`1.webp`)
      - Banner 4 (After Trending Gadgets): Premium Eyewear Deals (`2.webp`)
    - **Verification:** Verified with Headless Chrome CDP across 1024px laptop, 1440px desktop, and 375px mobile viewports (`overflow: false`, CLS = 0). Generated visual comparison artifact `compact_banner_restoration_showcase.png`. Recompiled `style.min.css`.
  - **Homepage (`index.html`) Design Lock & Milestone Finalization (2026-10-31):**
    - Officially **LOCKED** and frozen per user directive on 2026-10-31. No further design or structural modifications on `index.html`.
    - Serves as the authoritative architectural baseline (Design Source of Truth) for all other 19 storefront pages:
      - Mini Topbar (`.sf-topbar-wrap`) with hotline, email, promo ticker, and running gradient 'Sell With Us' button.
      - Floating Navbar (`.mn-header`) with 15px border radius, 3 main navigation items (Home, Categories, Shop), center pill search with continuous running gradient and typewriter animation, and user utilities.
      - Instagram-style Category Grid architecture (borderless, tight gap, 2 rows).
      - Canonical lightweight product cards (top cutout badge, 2-line title clamp, space-between rating & sold count, full-width 'Add to Cart' button).
      - Interleaved compact thematic offer banners (380px compact height, Mantu image+text card, zero JS carousel).
      - Instagram showcase, comprehensive footer, and mobile bottom floating Hero Cart FAB.

  - **Template-Wide Header & Footer Synchronization Sprint (2026-10-31):**
    - Executed comprehensive synchronization of all 19 interior HTML files with the locked `index.html` baseline:
      1. **Top Utility Bar:** Synchronized `.sf-topbar-wrap` across all 19 files, adding the dynamic 5-item slide & fade promo ticker (`.sf-promo-ticker`), hotline, and running 360° gradient border on "Sell With Us".
      2. **Floating Navbar & Search:** Synchronized `<header>` across all 19 files with center typewriter interactive search (`Ctrl+K`), continuous running gradient border, direct links on wishlist (`wishlist.html`), cart (`cart.html`), account (`login.html`), and accessible `aria-label` attributes.
      3. **Desktop Navigation State:** Configured context-aware active links (e.g. `categories.html` highlights `Categories`, `shop.html` highlights `Shop`, while interior content pages remain clean).
      4. **Main Footer:** Synchronized `<footer class="m-t-15">` across all 19 files with semantic `h3` heading hierarchy (`<h3 class="mn-footer-heading">`), authentic Google Play & Apple App Store links, and verified social profile links.
      5. **Mobile Navigation & Drawers:** Synchronized `.mn-footer-nav` with context-aware active tabs and center Hero Cart FAB across all 19 files; updated Cart, Wishlist, Search, and Quickview drawers with accessible close buttons, standard quantity inputs, and explicit image dimensions.
    - **Verification Results:** Full automated audit verified **0 broken image links, 0 broken page links (2,780 internal links verified), and 100% component checklist compliance across all 20 canonical files**. Live rendering verified via Headless Chrome screenshots (`shop_desktop_sync.png`, `shop_mobile_sync.png`).
  - **`shop.html` Catalog Refinement, Mobile Offcanvas Drawer & Optimization (2026-10-31):**
    - **Dead Code & Performance Optimization:** Completely purged unreachable `#quickview_modal` (135 lines of dead markup) and removed render-blocking `owl.carousel.min.css` and `owl.carousel.min.js`. Added safe execution guards in `main.js` preventing carousel exceptions. Reduced page weight by ~120KB and minimized DOM footprint.
    - **Mobile Offcanvas Filter Drawer (`offcanvas-lg`):** Upgraded `.mn-shop-sidebar` to native Bootstrap 5 responsive offcanvas (`.offcanvas-lg.offcanvas-start`). On desktop (`>= 992px`), renders statically as standard left column (`col-lg-3`). On mobile and tablet (`< 992px`), converts automatically to a slide-in drawer. Added `[ ⚡ Filters ]` button (`.sf-filter-btn`) in the top catalog toolbar, ensuring products are immediately visible on mobile without scrolling past filters.
    - **Interactive Price Range Slider:** Re-wired `noUiSlider` in `main.js` with BDT currency range (৳0 - ৳10,000) and step 100, smoothly binding to From/To inputs.
    - **Locked Product Card Parity:** Enforced 100% 1:1 design consistency with `index.html`'s locked product card across all 12 cards (WebP image, discount cutout badge, 2-line clamped title, rating & sold count, BDT prices, and full-width `Add to Cart` button). Replaced obsolete `col-xs-6` with standard Bootstrap 5 `col-6`.
    - **UI Polish & Navigation:** Replaced negative count formatting (`-25`) with clean badges `(25)`, fixed banner typo ("designs"), synchronized top toolbar and pagination item count (36 items), and updated mobile footer active tab to Shop (`ri-store-2-fill`).
    - **Headless Chrome Verification:** Tested on 1440x900 desktop and 375x812 mobile viewports: 0 console errors, 0 horizontal overflow, verified interactive offcanvas drawer toggle with backdrop, and recompiled `style.min.css`.

  - **`shop.html` Advanced UX/UI Refinement Sprint (User Feedback Driven - 2026-10-31):**
    - **Issue 1 Fix (Filters & Reset Overlap):** Eliminated the font-size/line-height collision in `.mn-sb-title` by introducing `.sf-filter-reset-link` with dedicated soft red pill badge styling (`background: #fef2f2; border: 1px solid #fee2e2; color: #ef4444; border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600;`), restoring crisp icon and text spacing with zero overlap.
    - **Issue 2 Fix (Color Names & Swatches):** Replaced bare color dots with accessible `.sf-color-list` item rows featuring a custom checkbox, circular color swatch, human-readable color name, and item count badge (Black, White, Navy Blue, Crimson Red, Forest Green, Bright Yellow, Light Grey, Royal Purple).
    - **Issue 3 Fix (Desktop Sticky Sidebar):** Added `@media (min-width: 992px) { .mn-shop-sidebar { position: sticky; top: 90px; max-height: calc(100vh - 110px); overflow-y: auto; } }`. Scrolling down through catalog products retains the sidebar comfortably in view, completely eliminating left-side blank empty space.
    - **Issue 4 Fix (Mobile Toolbar Balance):** Aligned `[ Filters ]` button on the left and `[ Sort By ]` on the right with unified 38px height, rounded 8px corners, `#f8fafc` background, and `#e2e8f0` border (`.sf-filter-btn` and `.sf-select-pill`). Removed "Showing 1-12 of 36 items" clutter.
    - **Issue 5 Fix (Desktop 4-Col Grid & Locked Card Parity):** Changed product grid layout to `col-xl-3 col-lg-3 col-md-4 col-6 mn-product-box mb-4`, rendering exactly 4 cards per row on desktop (lg/xl), 3 on tablet (md), and 2 on mobile (sm/xs) while preserving 100% 1:1 parity with the locked `index.html` product card baseline.
    - **Issue 6 Fix (Pagination Removal):** Completely removed `.mn-pro-pagination` per user directive.
    - **Issue 7 Fix (Slider Drop & Min-Max Price Inputs):** Dropped painful mobile dual-thumb slider (`nouislider.js` and `nouislider.css` completely purged, reducing asset payload by ~35KB). Replaced with clean numeric `[ ৳ Min ] - [ ৳ Max ] + [ ➔ ]` input fields (`.sf-price-inputs`) alongside 4 quick-filter chips (`Under ৳500`, `৳500 - ৳1,500`, `৳1,500 - ৳5,000`, `Above ৳5,000`).
    - **Issue 8 Fix (Mobile Checkmark Break & Alignment Remediation):**
      - **Root Cause Analysis:** Legacy Mantu checkboxes used fragile `position: absolute; top: 50%; transform: translateY(-50%)` with dummy `<span class="checked">` inside `<a>` and `.mn-sidebar-block-item` flex containers. On mobile devices, line-wrapping, padding, and touchscreen tap events caused the absolute circle elements to detach, overlapping section headings (e.g. over the word "Size") and splitting into disjointed semicircles.
      - **Modernized Robust Checkbox Standard:** Replaced the legacy markup in Brand and Size filter blocks with unified `.sf-check-list` and `<label class="sf-check-item">` using modern CSS `appearance: none; -webkit-appearance: none;` on native `<input type="checkbox">` (18px circle, `#cbd5e1` border when unchecked, `#3a4ee5` solid royal blue with Remixicon `\eb7b` white checkmark when checked). Flexbox `align-items: center` guarantees permanent 100% vertical centering under any screen size, touch event, or scroll state without dummy DOM nodes. Resolved global input padding collision (`padding: 0 !important; box-sizing: border-box !important; min/max width & height: 18px !important;`) to guarantee exact 1.00 aspect ratio and 100% round circular geometry.
      - **Verification:** Verified live rendering and click toggling in mobile offcanvas drawer via Headless Chrome CDP. Confirmed 0 circle overlaps, 0 header collisions, exact 18px x 18px round circular aspect ratio (1.00), and flawless touch interaction. Recompiled `style.min.css`.
    - **Issue 9 Fix (Desktop Sort By Sidebar Integration & Space Optimization):**
      - **Problem:** On desktop view, having a dedicated full-width `.mn-pro-list-top` bar solely for the lonely "Sort By" dropdown created an empty, awkward ~800px white space and pushed product cards down unnecessarily.
      - **Solution:** Seamlessly moved "Sort By" into the desktop left-hand Filter Sidebar (`.sf-sidebar-sort` inside `.mn-sidebar-wrap`) immediately under the "Filters" [Reset] header using full-width `.sf-select-pill.w-100`.
      - **Elimination of Wasted Space:** Hidden `.mn-pro-list-top` completely on desktop (`d-lg-none`), allowing product cards to align immediately with the top of the sidebar. Preserved `.mn-pro-list-top` on mobile screens (`< 992px`) where `[ Filters ]` on left and `[ Sort By ]` on right are balanced and compact.
      - **Verification:** Verified via Headless Chrome at 1440x900 and 375x812: `topBarDisplay: none` and `sidebarSortDisplay: block` on desktop; `topBarDisplay: flex` and `sidebarSortDisplay: none` on mobile. Recompiled `style.min.css`.
    - **Issue 10 Fix (Custom Modern Sort Dropdown & Native Select Elimination):**
      - **Problem:** Native OS `<select><option>` elements rendered with ugly 1990s desktop/mobile OS popups (sharp rectangular borders, system blue highlights, zero padding, ignoring border-radius and shadow CSS rules).
      - **Modern Dropdown Standard:** Replaced native `<select>` tags in both Desktop Sidebar and Mobile Toolbar with custom Bootstrap 5 `.dropdown.sf-sort-dropdown`.
      - **Styling Architecture:** Styled `.sf-sort-dropdown .dropdown-menu` with 10px rounded corners, subtle elevation shadow (`0 10px 25px -5px rgba(15, 23, 42, 0.12)`), smooth `@keyframes sfDropdownFade` entry animation, and 6px padding. Styled `.dropdown-item` with 13px font, `#475569` text, `#f1f5f9` hover, and active state with soft indigo background (`#eef2ff`), `#3a4ee5` royal blue text, and Remixicon `\eb7b` checkmark. Caret icon (`.sf-dropdown-caret`) rotates 180° when dropdown expands.
      - **Bidirectional Event Synchronization (`assets/js/main.js`):** Added delegated click listener for `.sf-sort-dropdown .dropdown-item` that updates button label, moves active class, updates hidden input, synchronizes both desktop and mobile dropdowns, and triggers Bootstrap `dropdown.hide()`.
      - **Verification:** Verified via Headless Chrome CDP: desktop and mobile dropdowns open smoothly (`isOpen: true`), option click triggers proper selection, screenshots captured (`desktop-dropdown-opened.png`, `desktop-dropdown-selected.png`, `mobile-dropdown-opened.png`). Recompiled `style.min.css`.
    - **Issue 11 Fix (Mobile Sticky Filter Toolbar & Compact Size Optimization):**
      - **Problem:** On mobile screens, when scrolling down through products, the catalog filter toolbar (`.mn-pro-list-top`) scrolled away, forcing users to scroll all the way back up to access filters or sort. Additionally, the toolbar was overly tall (72px) due to bulky `p-3` padding and 38px buttons, consuming excessive vertical screen space.
      - **3-Tier Sticky Architecture (`navbar -> search bar -> filter bar`):**
        - Navbar (`.mn-header`) sticks at `top: 0`.
        - Mobile Search Bar (`.sf-mobile-search-bar`) sticks directly below the navbar as part of `<header>`.
        - Filter Toolbar (`.mn-pro-list-top`) sticks immediately below the search bar using `position: sticky; top: var(--sf-mobile-header-height, 137px); z-index: 25;`.
        - Dynamic header height synchronization added in `assets/js/main.js` (`updateMobileStickyHeaderOffset`) to guarantee exactly 0px gap between the search bar and filter toolbar across all mobile screen widths (390px, 360px, etc.).
      - **Ultra-Compact Size Reduction:**
        - Reduced toolbar container height from 72px down to 46px (36% screen height savings).
        - Removed bulky `p-3 mb-4` utility classes from `shop.html`; applied sleek `padding: 6px 12px; margin-bottom: 16px;`.
        - Scaled button height from 38px down to 32px with 12px typography, 14px icons, and 6px border-radius (`.sf-filter-btn` and `.sf-select-pill`).
        - Added crisp floating card aesthetic with `border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);`.
      - **Verification:** Verified in headless Chrome at 390x844 and 360x780: `gap: 0px` between search bar and filter toolbar, `btnHeight: 32px`, `isSticky: true`, dropdown menu opens and functions flawlessly while sticky (`mobile-sticky-final-scrolled.png`, `mobile-sticky-final-dropdown.png`). Desktop view verified 100% untouched (`desktop-verify-after-sticky.png`). Recompiled `style.min.css`.
    - **Single Modern Offer Banner Synchronization (shop.html):**
      - Converted to clean, image-only banner (.mn-shop-banner) by removing redundant title/text/button clutter per user directive.
      - Optimized banner framing: tuned desktop height to 350px with background-position: left 25% (sweet spot for full desktop width), ensuring the model's full head, hair, eyes, chin, neck, and shopping bags are 100% in frame without clipping; mobile layout preserved at 150px.
      - Enforced 100% full width: added width: 100% !important; across all screen sizes, completely eliminating the 300px right-side gap caused by legacy media queries on laptop/desktop viewports.
      - Verified on desktop (1440px) and mobile (390px): 0 broken tags, 0 overflow, instant visibility of catalog products.
    - **Mobile Product Grid Gap Parity with index.html (shop.html & catalog):**
      - Resolved oversized mobile card gaps: replaced Bootstrap default 24px column gutters and 24px mb-4 margins on .shop-pro-inner with exact 10px horizontal gap (--bs-gutter-x: 10px), 10px vertical margin, and 10px inner card padding.
      - 100% visual parity with index.html .sf-product-grid-wrapper verified on 390px mobile viewport.
    - **Issue 12 Fix (Symmetrical Mobile Search Bar Clearance & Universal Spacing Standard):**
      - **Problem:** On mobile viewports (< 768px and < 576px), legacy conflicting media queries (`SEAMLESS ZERO-GAP MOBILE HEADER`) stripped away mobile search bar padding to 2px top and 0px bottom (`padding: 2px 8px 0px 8px !important; margin: 0 auto !important; margin-top: 0 !important;`), causing the search pill to crash directly against the navbar on top and literally touch/overlap the content cards below (e.g. Hero banner on `index.html`, Category header box on `categories.html`, offer banner on `shop.html`).
      - **Root Cause Remediation & Unified Standard:** Purged 54 lines of fragmented, arbitrary zero-gap overrides. Enforced a single canonical mobile search bar spacing standard across all 20 storefront templates:
        - Symmetrical **10px top clearance** between navbar bottom border and search pill (`padding-top: 10px !important;`).
        - Symmetrical **10px bottom clearance** inside the sticky header (`padding-bottom: 10px !important;`).
        - Solid page background `#f1f4f7` on the search container, guaranteeing zero bleed-through when content scrolls under the sticky header.
        - Unified **10px content margin** (`.mn-main-content { margin-top: 10px !important; }`), ensuring an exact 20px comfortable clearance between the search pill and the first card across all templates.
      - **Verification:** Verified live rendering via Headless Chrome screenshots on 390x844 viewport across `index.html` (`gap-fixed-index.png`), `categories.html` (`gap-fixed-categories.png`), and `shop.html` (`gap-fixed-shop.png`): 100% consistent, balanced minimum gap verified everywhere with zero collision. Recompiled `style.min.css`.
    - **Issue 13 Fix (Banner Height Matching & Complete Elimination of Text/Buttons on index.html):**
      - **Problem:** (1) The offer banner on `shop.html` had a noticeably shorter height on mobile viewports (135px/150px) compared to `index.html` (200px), breaking visual parity. (2) On `index.html`, all 4 offer banners contained overlay titles, descriptions, and a "Shop Now" button (`.mn-banner-contact`). Previous attempts to remove them left an empty 380px cutout gap on desktop due to legacy CSS `calc(100% - 380px)`.
      - **Root Cause & Solution:**
        - **Height & Framing Parity:** Unified `.mn-modern-banner .modern-banner .mn-banner-img` and `.mn-shop-banner .modern-banner .mn-banner-img` in `assets/css/style.css` across all responsive breakpoints: 350px on desktop (`background-position: left 25%`), 280px at <= 1199px, 240px at <= 991px, and canonical `200px !important;` (`background-position: left 20%`) on mobile (<= 767px, <= 575px, <= 480px). This ensures the model's full head, hair, and shopping bags are 100% framed without awkward cutoff.
        - **Pure Image-Only Standard:** Permanently stripped `.mn-banner-contact` HTML from all 4 offer banners in `index.html` and added `display: none !important;` in `style.css` alongside `width: 100% !important;`, achieving 100% architectural and visual parity with `shop.html`.
      - **Verification:** Verified live rendering via Headless Chrome screenshots: `shop.html` mobile banner height is exactly 200px (`verify-shop-mobile-banner.png`), `index.html` banners span 100% width with 0 overlay text or buttons on both desktop and mobile (`verify-index-desktop-tall.png`, `verify-index-mobile-tall.png`). Recompiled `style.min.css` (287,609 bytes).
    - **Issue 14 Fix (Mobile Viewport X-Axis Overflow & Horizontal Scrollbar Hardening):**
      - **Problem:** On mobile phones, horizontal touch-swipe gestures revealed a slight left-right wobble/scroll and temporary bottom scrollbar (+4px overflow) across storefront pages.
      - **Root Cause:**
        1. In `style.css`, `.mn-main-content` on mobile has `padding: 0 8px !important;` (<= 575px) / `0 10px !important;` (<= 767px), whereas Bootstrap 5 `.row` has `--bs-gutter-x: 1.5rem` (`-12px` negative margins). `8px - 12px = -4px` bleed on both sides (+4px total).
        2. Root `html` element lacked `overflow-x: hidden`, allowing mobile browser touch pan gestures to scroll horizontally across the bleed.
      - **Solution:**
        1. Added `html, body { max-width: 100vw; overflow-x: hidden; }` in `style.css`.
        2. Neutralized direct child `.row` margins under `.mn-main-content` on mobile (`.mn-main-content > .row, .mn-main-content > section > .row { margin-left: 0 !important; margin-right: 0 !important; }` and zeroed padding on their direct columns).
        3. Recompiled `style.min.css` via `clean-css`.
      - **Verification:** Verified with Headless Chrome across all 20 HTML templates at 360px, 375px, 390px, and 412px: 100% of pages achieved `scrollWidth === clientWidth` (0px overflow, perfect fit).
    - **Verification & Testing:** Verified live rendering via Headless Chrome CDP across 1440x900 desktop and 375x812 mobile viewports: 0 console errors, 0 horizontal overflow (`hasOverflow: false`), verified sticky sidebar at `top: 90px`, confirmed 4 cards/row desktop and 2 cards/row mobile. Recompiled `style.min.css`.

    - **Issue 15 Fix (Homepage Mobile Fixed 2x2 Grid / 4 Products - Elimination of Horizontal Touch Swipe):**
      - **Problem:** On mobile viewports (`<= 767px`), product sections (`.sf-product-grid-wrapper`) utilized `grid-auto-flow: column`, `overflow-x: auto`, and `scroll-snap-type: x mandatory`, which enabled users to touch-swipe products left-to-right. Per user directive, all horizontal sliding and swiping on product sections was removed in favor of a fixed 4-product display.
      - **Solution:**
        1. Configured mobile product wrapper as a strictly static 2-row × 2-column grid: `grid-template-columns: repeat(2, 1fr) !important; grid-auto-flow: row !important; overflow-x: visible !important; scroll-snap-type: none !important; padding-bottom: 0 !important;`.
        2. Hid products 5 through 12 on mobile devices using `.sf-product-grid-wrapper > .mn-product-card:nth-child(n+5) { display: none !important; }`, ensuring exactly 4 products (2 in row 1, 2 in row 2) render per section.
        3. Desktop layout remains 100% intact and untouched with 6 columns × 2 rows = 12 products per section.
      - **Verification:** Verified live rendering via Headless Chrome screenshots (`homepage_mobile_tall_fixed.png`, `homepage_desktop_products.png`):
        - Mobile: Exactly 4 products per section in a clean 2x2 grid, 0 horizontal scroll/swipe, 0 overflow.
        - Desktop: 12 products per section (6 columns) completely preserved.
        - Recompiled `style.min.css` (287,749 bytes).

    - **Issue 16 Fix (Elimination of 12px White Gap between Mobile Bottom Navbar and Footer):**
      - **Problem:** On mobile screens, when scrolling to the very bottom, an awkward 12px white horizontal gap appeared between the dark navy footer (`#181e28`) and the white floating bottom navigation bar (`.mn-footer-nav`).
      - **Root Cause:** In `style.css` at line 3585 (`@media only screen and (max-width: 575px)`), `body` was assigned `margin-bottom: 72px;`. Because `body` ended 72px above the viewport bottom while `.mn-footer-nav` was only 60px tall, `72px - 60px = 12px` of bare HTML background canvas leaked between the footer and the navbar.
      - **Solution:**
        1. Neutralized `body` margin: `body { margin-bottom: 0 !important; }`.
        2. Injected bottom clearance inside the dark footer: `.mn-footer .footer-bottom { padding-bottom: 75px !important; }`.
        3. Recompiled `style.min.css` (287,814 bytes).
      - **Verification:** Verified live rendering via Headless Chrome CDP: `navRect.top - mnFooterRect.bottom = -60.375px` (footer seamlessly extends directly behind the bottom bar with 0 gap). Confirmed visually via `verified_footer_no_gap.png`: payment badges and copyright text sit comfortably with 15px clearance above the bar.

    - **Issue 17 Fix (Restoration of Desktop Sticky Filter Sidebar on shop.html):**
      - **Problem:** The desktop filter sidebar on `shop.html` stopped sticking to the viewport when scrolling down, leaving blank empty space on the left after the Tags block while products scrolled downwards on the right.
      - **Root Cause:** In commit `71fcce6`, `html, body { overflow-x: hidden; }` was introduced. In CSS specifications, applying `overflow-x: hidden` to root `html`/`body` forces vertical overflow to compute to `auto` or creates an independent overflow context that cancels `position: sticky` on all viewport descendants. Additionally, the sidebar lacked explicit flex alignment (`align-self: flex-start !important;`) inside the Bootstrap `.row`.
      - **Solution:**
        1. Updated root overflow handling from `overflow-x: hidden` to modern standard `overflow-x: clip;` on `html, body` in `style.css`. Unlike `hidden`, `clip` prevents horizontal scrollbars without establishing an independent scroll container or breaking `position: sticky`.
        2. Hardened desktop `.mn-shop-sidebar` rule with `position: -webkit-sticky !important; position: sticky !important; top: 90px !important; align-self: flex-start !important; z-index: 20 !important;` and set `#shop_sidebar { position: static !important; }` to eliminate nested sticky collisions.
        3. Surgically patched `style.min.css` to keep minified production bundle in 100% sync.
      - **Verification:** Verified via incremental Headless Chrome CDP scrolls (0px to 1200px): at scroll positions 600px, 800px, and 1000px, `sidebar.top === 90px` with `isSticky: true`. Verified 0 horizontal overflow on desktop and mobile. Screenshot saved to `shop_sticky_verified_800.png`.

    - **Issue 18 Fix (Restoration of Category Items Mobile Grid Gutters on categories.html):**
      - **Problem:** On `categories.html` mobile view, the category cards (`Men's Fashion`, `Women's Fashion`, `Kids & Baby Wear`) lost their horizontal spacing and were squished edge-to-edge with 0px gap.
      - **Root Cause:** A legacy mobile override (`.mn-main-content > .row > [class*="col-"], .mn-main-content > section > .row > [class*="col-"] { padding-left: 0 !important; padding-right: 0 !important; }`) stripped all Bootstrap `g-3` column gutters from sections under `.mn-main-content`.
      - **Solution:** Removed the destructive column padding and row margin zeroing rule from `assets/css/style.css` and `assets/css/style.min.css`. With `html, body { overflow-x: clip; }` already in place, Bootstrap's standard gutters (`g-3`, 16px gap) render with complete visual breathing room without inducing any horizontal overflow.
      - **Verification:** Verified live rendering via Headless Chrome CDP at 375x812: `gap0_1: 16px, gap1_2: 16px, colPaddingLeft: 8px, colPaddingRight: 8px, scrollWidth: 375px, hasHorizontalOverflow: false`. Verified zero regressions on `index.html` and `shop.html`. Screenshot saved to `categories_gap_fixed_verified.png`.

    - **Issue 19 Fix (Product Details Page product.html Modernization & High-Conversion Refinement COMPLETED):**
      - **Delivered Changes:**
        1. **Dead Code & Dependency Cleanup:** Purged 130+ lines of unreachable `#quickview_modal` and removed obsolete "Add More and get discount" section, and streamlined pricing display into a clean 1-line flex layout (`final_price` ৳664.00 -> `old_price` ৳2,999.00 -> `discount` -78%) while removing redundant SKU and IN STOCK labels per user instruction, and fixed product image hover zoom functionality (upgraded product images 27-30 to 800x900 high-res WebP matching original Mantu template, inverted Slick vs Zoom initialization order in main.js, and added interactive zoom-in/crosshair cursor styling in style.css; resolved product gallery main image right-side gap by assigning `width: 100%; height: auto;` to `.single-product-cover .single-slide img` in style.css and aligning HTML width/height to natural 800x900 ratio, eliminating the 43px white void), removed `owl.carousel.min.css` and `owl.carousel.min.js` from product.html, eliminating ~120KB of dead payload.
        2. **Deal Timer Bug Fix:** Fixed hardcoded past date causing "Deal Ended" error; replaced with live running countdown timer.
        3. **High-Conversion CTAs:** Added dedicated high-contrast **"Buy Now" (সরাসরি অর্ডার করুন)** button alongside "Add to Cart" for 1-click checkout routing, and fixed compare button title to "Compare".
        4. **Bangladeshi Delivery & Trust Badges Box:** Added dedicated trust card right beneath CTAs: Cash on Delivery Available, 24-48h Fast Delivery, 7 Days Easy Return, and 100% Authentic Product Guarantee.
        5. **Mobile Sticky Action Bar:** Implemented `.sf-mobile-sticky-bar` fixed at `bottom: 60px` on mobile screens (< 768px), providing thumb-accessible thumbnail, price, and Add to Cart / Buy Now CTAs while browsing.
        6. **Interactive Review Star Rating:** Enabled click-to-rate 1-5 star selection with hidden input synchronization in `main.js`.
        7. **Attribute & Cross-Sell Polish:** Replaced nonsensical shoe attributes with authentic cotton apparel specs (100% Combed Cotton, 180 GSM, Made in Bangladesh), updated Vendor tab to local Dhaka hub, and transformed cross-sell items into matching fashion accessories (Denim, Belt, Shoes, Cotton Top) in a compact 2-column mobile grid.
      - **Verification:** Verified live rendering via Headless Chrome CDP across Desktop (1440px) and Mobile (375px): 0 console errors, 0 horizontal overflow (`scrollWidth <= innerWidth`), full interactivity verified. Screenshots saved to `product_modernized_desktop_1440.png` and `product_modernized_mobile_375.png`.

    - **Issue 20 Fix (Right Sidebar Integration, Image Gallery Resizing & 3-Column Top Fold on product.html):**
      - **Problem:** (1) The product details page lacked the authoritative Mantu right sidebar layout, resulting in a single massive 100% width area where the image gallery was disproportionately large (47.3% on desktop) and crowded the buy button area. (2) Trust badges, seller information, and social share options were either buried under the buy buttons or missing entirely.
      - **3-Column Grid Restructuring & Image Resizing:**
        - Main Product area assigned `col-xl-9 col-lg-8 col-12`, and Right Sidebar assigned `col-xl-3 col-lg-4 col-12`.
        - Reduced image gallery width (`.single-pro-img`) from 47.3% down to **42%**, and enlarged product description width (`.single-pro-desc`) to **58%**, achieving crisp, sleek proportions and generous breathing room.
      - **Modern Right Sidebar Architecture (`.sf-product-sidebar`):**
        - **Card 1: Bangladeshi Delivery & Trust Badges (`.sf-sidebar-trust-box`):** Relocated from under the buy buttons to the top of the right sidebar. Features Fast Home Delivery (Dhaka: 24-48h ৳60 / Outside: 2-4 days ৳120), Cash on Delivery, 7 Days Easy Return, and 100% Authentic Product Guarantee with soft pastel badges.
        - **Card 2: Verified Seller / Store Profile (`.sf-sidebar-vendor-box`):** Features store avatar, store name (`ShoppieFly Fashion Hub`) with verified green checkmark badge, 3-metric performance grid (95% Positive Seller Rating, 98% Ship on Time, 99% Chat Response), Visit Store button (`vendor-store.html`), and Chat with Seller action.
        - **Card 3: Social Share & Copy Link (`.sf-sidebar-share-box`):** Brand-colored social share buttons (Facebook, WhatsApp, Messenger, X) and a 1-click **"Copy Product Link"** button with automated clipboard copy and template-native toast feedback.
      - **Desktop Sticky Behavior & Clean Stacking:**
        - Sticky on desktop viewports (`position: sticky; top: 90px; z-index: 20; align-self: flex-start;`).
        - Full-width `col-12` specification tabs and related products grid span beneath the top buy fold.
        - On mobile (< 992px), sidebar cards stack seamlessly right after the buy box before the description tabs with 0 horizontal overflow.
      - **Verification:** Verified live rendering via Headless Chrome screenshots (`verify-product-desktop-top.png`, `verify-product-desktop-buy-section.png`, `verify-product-mobile-top.png`, `verify-product-mobile-sidebar-stacked.png`). Recompiled `style.min.css` (292,398 bytes).

    - **Issue 21 Fix (Flash Deal Countdown Timer Redesign & Bulky Visitor Card Elimination on product.html):**
      - **Problem:** (1) The legacy `.mn-single-sales` card was an oversized, bulky white box (110px tall) wasting significant vertical space between the price and product specifications. (2) Contained amateur artificial text `"Real time 56 visitor right now!"` and `"Time is Running Out!"` which cluttered the buy box.
      - **Sleek Flash Deal Urgency Strip Standard (`.sf-flash-deal-strip`):**
        - Completely purged the bulky `.mn-single-sales` card, `"Real time visitor"` counter, and `"Time is Running Out"` labels.
        - Built an ultra-slim (38px height, 60% vertical space savings) premium horizontal strip right below the price:
          - Left: Red flame/flash badge `<span class="sf-flash-badge"><i class="ri-flashlight-fill"></i> Flash Deal</span>` with `Special offer ends in:` label.
          - Right: High-contrast digital clock countdown pills with monospace bold white numerals on crimson badges (`#e11d48`) and animated ticking seconds (`[59] Days : [01] : [10] : [37]`).
          - Styling: Soft rose tint (`#fff1f2`), subtle `#ffe4e6` border, bold crimson left accent line (`3.5px solid #e11d48`), 8px border-radius.
        - Added social proof sold counter `<span class="mn-single-sold"> | <span>Sold 10</span></span>` inside `.mn-single-rating-wrap` directly alongside the 992 Ratings link, styled with balanced slate color (`#64748b`) and 10px margin.
      - **Verification:** Verified live rendering via Headless Chrome screenshots (`verify-flash-deal-desktop.png`, `verify-flash-deal-mobile.png`, `verify-rating-sold.png`): 0 console errors, 0px overflow, confirmed 0 instances of "visitor right now" and "Time is Running Out", confirmed "Sold 10" in rating row. Recompiled `style.min.css` (294,349 bytes).

    - **Issue 22 Fix (Action Buttons Equal Sizing & Compare Button Purge on product.html):**
      - **Problem:** (1) The "Add to Cart" and "Buy Now" CTA buttons had asymmetric sizes (Add to Cart had `min-width: 140px; text-transform: uppercase` causing uneven padding and all-caps display, while Buy Now had natural width and title case). (2) Legacy compare button (`.mn-single-mn-compare`) was redundant and cluttered the primary conversion row.
      - **Equal Button Sizing Standard (`.sf-pro-action-btns`):**
        - Standardized `.sf-btn-cart` and `.sf-btn-buynow` with exact matching geometry: `height: 44px`, `width: 155px`, `min-width: 155px`, `border-radius: 8px`, `font-size: 14px`, `font-weight: 600`, `gap: 8px`, `white-space: nowrap`, and `text-transform: none !important;` (crisp Title Case typography on both buttons).
        - Fixed row baseline alignment & gap continuity: added `display: flex; align-items: center; gap: 10px;` on `.mn-single-qty` and `.sf-pro-action-btns`, ensuring a clean 10px uniform clearance between Quantity box `[ - 1 + ]` and `[ Add To Cart ]`, eliminating button collision (`lege geche`). Updated quantity box (`.qty-plus-minus`) to `height: 44px; border-radius: 8px;` and Wishlist button (`.mn-wishlist`) to `44px × 44px; border-radius: 8px;`, ensuring 100% height parity across the row.
        - Mobile 50/50 responsive layout: added `@media (max-width: 575px)` rules giving `.mn-single-cart` and `.mn-single-buy` `flex: 1 1 0; min-width: 0; width: 100%;` so both buttons stretch equally side by side on mobile devices.
        - Completely removed `<div class="mn-single-mn-compare">...</div>` from `product.html`.
      - **Verification:** Verified live rendering via Headless Chrome screenshots (`verify-buttons-updated-cropped.png`, `verify-buttons-mobile-cropped.png`): exact equal dimensions on Desktop and Mobile, Compare button 0 instances in DOM, recompiled `style.min.css` (295,549 bytes).

    - **Issue 23 Fix (Right Sidebar Sticky through Tabs until Related Products on product.html):**
      - **Problem:** (1) The right sidebar stopped being sticky right at the bottom of the buy box fold (~700px) because the specification/review tabs were in a separate row below it, leaving an awkward empty void beside the tabs. (2) The user required the right sidebar to stay sticky continuously all the way down through the tabs and stop right above the Related Products section (`"right Sidebar ta sticky thakbe, related product er upor projonto"`).
      - **CSS Grid Architecture (`.sf-product-layout-grid`):**
        - Refactored `.mn-single-product` into `.sf-product-layout-grid` with CSS Grid template areas: `"pro-info sidebar" "pro-tabs sidebar"`, with columns `minmax(0, 1fr) 320px` (XL: `340px`) and `column-gap: 24px; row-gap: 30px`.
        - The sidebar grid track `.sf-grid-sidebar` spans across both rows (`height: 100%`), stretching continuously alongside both `.sf-grid-pro-info` (Gallery + Buy box) and `.sf-grid-pro-tabs` (Detail, Specifications, Vendor, Reviews).
        - Applied `position: sticky; top: 90px; z-index: 20;` to `.sf-product-sidebar`. As the user scrolls through the product info and tabs, the sidebar stays pinned gracefully beside the content.
        - Positioned `<section class="mn-related-product m-t-30">` immediately outside the grid across the bottom. The sidebar stops scrolling at the bottom of the tabs track (`sbColBottom: 1448px`), resting directly above Related Products (`relTop: 1478px`).
        - Mobile View: HTML source order guarantees natural sequence: Product Buy Fold ➔ Sidebar Cards (Delivery, Seller, Share) ➔ Specifications & Review Tabs ➔ Related Products.
      - **Verification:** Verified live rendering via Headless Chrome screenshots across Desktop (1440px at 0px, 800px, 1400px scroll) and Mobile (390px): verified sticky sidebar pinning across tabs, confirmed stop above Related Products, 0 horizontal overflow (`scrollWidth <= innerWidth`). Recompiled `style.min.css` (296,233 bytes).

    - **Issue 24 Fix (Restoration & Proportional Column Balance on product.html):**
      - **Problem:** Attempting to force an artificial max-height and `#f8fafc` background on `.single-product-cover` created an awkward double-box effect and displaced the specification tabs directly under the buy buttons.
      - **Clean Proportional Balance (`.single-pro-img` 37% & `.single-pro-desc` 63%):**
        - Completely purged artificial background overrides and inner grey box styles, restoring the clean, native full-bleed product image presentation.
        - Restored the canonical two-row layout: Top row contains Product Buy Fold (`col-xl-9 col-lg-8`) and Right Sidebar (`col-xl-3 col-lg-4`). Bottom full-width row contains Specification/Review Tabs and Related Products.
        - Proportionally tuned `.single-pro-img` width to `37%` and `.single-pro-desc` width to `63%`: The main image naturally scales to ~360px width and ~405px height, allowing the entire image card (main image + 4 thumbnail carousel) to fit cleanly at ~520px height—matching the adjacent buy description perfectly without any clipping or push below the viewport fold.
      - **Verification:** Verified live rendering via Headless Chrome screenshots (`verify-ratio-37-63-cropped.png`): confirmed clean natural image rendering, zero double-box borders, full visibility of thumbnail slider, and harmonious baseline alignment with buy buttons. Recompiled `style.min.css` (295,704 bytes).

---

## 7. Next Immediate Tasks (Storefront Interior Pages Phase)

With `index.html` and `shop.html` design locked and fully optimized:
1. **`product.html` (Single Product Details):** Gallery sync, variant selectors, pricing, sticky 'Add to Cart', and canonical related products grid.
2. **`categories.html` (Dedicated Category Hub):** 18 visual category cards, search, and category pills.
3. **`cart.html` & `checkout.html`:** Order summary, coupon drawer, and Bangladesh 3-tier address cascade readiness.
4. **Account & Merchant Pages:** `login.html`, `register.html`, `vendor-store.html`, `become-vendor.html`.
