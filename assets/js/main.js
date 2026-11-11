(function ($) {
    "use strict";

    /*== Fast Non-Blocking Loader ==*/
    function dismissLoader() {
        var $overlay = $("#mn-overlay");
        if ($overlay.length && $overlay.is(":visible")) {
            $overlay.fadeOut(200, function () {
                $(this).remove();
            });
        }
    }
    $(document).ready(function () {
        setTimeout(dismissLoader, 200);
    });
    $(window).on("load", dismissLoader);
    setTimeout(dismissLoader, 800);

    /*== Sticky Header (High Performance Passive rAF) ==*/
    var isSticky = false;
    function handleStickyHeader() {
        var shouldBeSticky = (window.pageYOffset || document.documentElement.scrollTop || 0) > 15;
        if (shouldBeSticky !== isSticky) {
            isSticky = shouldBeSticky;
            $("header").toggleClass("header-sticky", isSticky);
        }
    }
    window.addEventListener("scroll", function () {
        requestAnimationFrame(handleStickyHeader);
    }, { passive: true });
    window.addEventListener("DOMContentLoaded", handleStickyHeader);

    /*== Prevent hash jump on button anchors ==*/
    $(document).on("click", 'a[href="#!"]', function (e) {
        e.preventDefault();
    });

    $(".mn-drop-toggle").on("click", function (e) {
        if ($(this).siblings(".mn-sb-drop").length > 0) {
            e.preventDefault();
            if ($(this).hasClass("active-nav")) {
                $(this).removeClass("active-nav");
                $(this).siblings(".mn-sb-drop").slideUp();
            } else {
                $(".mn-drop-toggle").removeClass("active-nav");
                $(".mn-drop-toggle").siblings(".mn-sb-drop").slideUp();
                $(this).addClass("active-nav");
                $(this).siblings(".mn-sb-drop").slideDown();
            }
        }
    });

    /*  Mobile menu sidebar JS  */
    $(".mn-toggle-menu").on("click", function () {
        $(".mn-mobile-menu-overlay").fadeIn();
        $(".mn-mobile-menu").addClass("mn-menu-open");
    });

    $(".mn-mobile-menu-overlay, .mn-close-menu").on("click", function () {
        $(".mn-mobile-menu-overlay").fadeOut();
        $(".mn-mobile-menu").removeClass("mn-menu-open");
    });
    function ResponsiveMobilemsMenu() {
        var $msNav = $(".mn-menu-content, .overlay-menu"),
            $msNavSubMenu = $msNav.find(".sub-menu");
        $msNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

        $msNav.on("click", "li a, .menu-toggle", function (e) {
            var $this = $(this);
            if ($this.attr("href") === "#" || $this.attr("href") === "javascript:void(0)" || $this.hasClass("menu-toggle")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }

    ResponsiveMobilemsMenu();

    /*== Main Slider ==*/
    if (typeof $.fn.owlCarousel === "function" && $(".mn-hero-slider").length) {
        $(".mn-hero-slider").owlCarousel({
            margin: 0,
            loop: true,
            dots: true,
            nav: true,
            smartSpeed: 1500,
            autoplay: true,
            items: 1,
            responsiveClass: true,
        });
    }

    /*== Modern ShoppieFly Side Cart Drawer JS ==*/
    function sfUpdateSideCartTotals() {
        var totalCount = 0;
        var subtotal = 0;

        // Update each store package counter
        $(".sf-side-cart-package").each(function () {
            var $pkg = $(this);
            var pkgItems = $pkg.find(".sf-side-cart-item").length;
            $pkg.find(".sf-side-pkg-count").text("(" + pkgItems + ")");
            if (pkgItems === 0) {
                $pkg.remove();
            }
        });

        $(".sf-side-cart-item").each(function () {
            var $item = $(this);
            var price = parseFloat($item.data("price")) || 0;
            var qty = parseInt($item.find(".sf-side-qty-input").val(), 10) || 1;
            totalCount += qty;
            subtotal += price * qty;
        });

        var countText = "(" + $(".sf-side-cart-item").length + ")";
        $("#sfSideCartCount").text(countText);
        var formattedTotal = "৳ " + subtotal.toFixed(2);
        $("#sfSideSubtotal").text(formattedTotal);
        $("#sfSideTotal").text(formattedTotal);

        if ($(".sf-side-cart-item").length === 0) {
            $("#sfSideCartPackages, #sfSideCartItems").html(
                '<div class="sf-side-cart-empty">' +
                '  <i class="ri-shopping-cart-2-line sf-side-cart-empty-icon"></i>' +
                '  <h4 class="sf-side-cart-empty-title">Your Cart is Empty</h4>' +
                '  <p class="sf-side-cart-empty-desc">No items in your cart yet.</p>' +
                '  <a href="shop.html" class="sf-btn-side-checkout" style="height: 38px; font-size: 13.5px;">Start Shopping</a>' +
                '</div>'
            );
            $(".sf-side-cart-summary").slideUp(200);
            $(".sf-side-cart-actions").slideUp(200);
        }
    }

    $(".mn-cart-toggle").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-cart-overlay").fadeIn(200);
        $(".mn-side-cart").addClass("mn-open-cart");
    });

    $(".mn-side-cart-overlay, .mn-cart-close").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-cart-overlay").fadeOut(200);
        $(".mn-side-cart").removeClass("mn-open-cart");
    });

    // Side cart quantity stepper
    $(document).on("click", ".sf-side-qty-inc", function () {
        var $input = $(this).siblings(".sf-side-qty-input");
        var val = parseInt($input.val(), 10) || 1;
        $input.val(val + 1);
        sfUpdateSideCartTotals();
    });

    $(document).on("click", ".sf-side-qty-dec", function () {
        var $input = $(this).siblings(".sf-side-qty-input");
        var val = parseInt($input.val(), 10) || 1;
        if (val > 1) {
            $input.val(val - 1);
            sfUpdateSideCartTotals();
        }
    });

    // Side cart delete item
    $(document).on("click", ".sf-side-btn-del", function (e) {
        e.preventDefault();
        var $item = $(this).closest(".sf-side-cart-item");
        var $pkg = $item.closest(".sf-side-cart-package");
        $item.fadeOut(200, function () {
            $item.remove();
            if ($pkg.length && $pkg.find(".sf-side-cart-item").length === 0) {
                $pkg.fadeOut(150, function () {
                    $pkg.remove();
                    sfUpdateSideCartTotals();
                });
            } else {
                sfUpdateSideCartTotals();
            }
        });
    });

    // Legacy handler fallback
    $(document).on("click", ".cart-remove-item", function (e) {
        e.preventDefault();
        $(this).parents(".cart-sidebar-list").remove();
        var cart_product_count = $(".cart-sidebar-list").length;
        if (cart_product_count == 0) {
            $(".mn-cart-pro-items").html('<p class="mn-cart-msg">Your Cart is empty!</p>');
        }
    });

    /*== Remove Product (Cart page) ==*/
    $(document).on("click", ".mn-cart-pro-remove a", function () {
        $(this).parents(".mn-cart-product").remove();
        var cart_page_count = $(".mn-cart-product").length;
        if (cart_page_count == 0) {
            $(".cart_list").html('<p class="mn-cart-page-msg">Your Cart is empty!</p>');
        }
    });

    /*== Wishlist sidebar JS ==*/
    $(".mn-wishlist-toggle").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-wishlist-overlay").fadeIn();
        $(".mn-side-wishlist").addClass("mn-open-wishlist");
    });
    $(".mn-side-wishlist-overlay, .mn-wishlist-close").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-wishlist-overlay").fadeOut();
        $(".mn-side-wishlist").removeClass("mn-open-wishlist");
    });
    $(document).on("click", ".wishlist-remove-item", function (e) {
        e.preventDefault();
        $(this).parents(".wishlist-sidebar-list").remove();
        var wishlist_product_count = $(".wishlist-sidebar-list").length;
        if (wishlist_product_count == 0) {
            $(".mn-wishlist-pro-items").html('<p class="mn-wishlist-msg">Your Wishlist is empty!</p>');
        }
    });

    /*  Wishlist notify js  */
    $(document).on("click", ".mn-wishlist", function (e) {
        e.preventDefault();
        $(".mn-wish-notify").remove();
        $(".mn-compare-notify").remove();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("footer").after(
                '<div class="mn-wish-notify"><p class="wish-note remove">Removed product from <a href="wishlist.html">Wishlist</a> successfully!</p></div>',
            );
        } else {
            $(this).addClass("active");
            $("footer").after(
                '<div class="mn-wish-notify"><p class="wish-note add">Added product to <a href="wishlist.html">Wishlist</a> successfully!</p></div>',
            );
        }

        setTimeout(function () {
            $(".mn-wish-notify").fadeOut();
        }, 2000);
    });

    $(document).on("click", ".mn-remove-wish", function () {
        $(this).parents(".pro-gl-content").remove();

        var wishlist_page_count = $(".pro-gl-content").length;
        if (wishlist_page_count == 0) {
            $(".mn-vendor-card-table").html('<p class="mn-wishlist-msg">Your Wishlist is empty!</p>');
        }
    });

    /*== ShoppieFly Dynamic Cart Glow & Pulse Trigger ==*/
    function sfTriggerCartGlow() {
        var $cartBtns = $(".mn-main-cart, .sf-mob-cart-btn, .mn-nav-hero-btn, .mn-tool-cart > a");
        var $badges = $(".label.lbl-2, .sf-mob-cart-badge, .mn-hero-badge");

        // Clear existing animation states
        $cartBtns.removeClass("sf-cart-glow-pulse");
        $badges.removeClass("sf-cart-badge-pop");

        // Force browser reflow to allow consecutive re-triggering
        $cartBtns.each(function () {
            void this.offsetWidth;
        });
        $badges.each(function () {
            void this.offsetWidth;
        });

        // Apply animated pulse and glow
        $cartBtns.addClass("sf-cart-glow-pulse");
        $badges.addClass("sf-cart-badge-pop");

        if (window._sfCartGlowTimer) {
            clearTimeout(window._sfCartGlowTimer);
        }
        window._sfCartGlowTimer = setTimeout(function () {
            $cartBtns.removeClass("sf-cart-glow-pulse");
            $badges.removeClass("sf-cart-badge-pop");
        }, 1150);
    }
    window.sfTriggerCartGlow = sfTriggerCartGlow;

    /*== Add to cart button dynamic feedback ==*/
    $(document).on("click", ".mn-add-cart, .mn-quickview-cart .mn-btn-1", function (e) {
        e.preventDefault();

        var $this = $(this);
        var isDetailPageBtn =
            $this.hasClass("sf-btn-cart") ||
            $this.hasClass("sf-sticky-btn-cart") ||
            $this.closest(".mn-quickview-cart").length > 0;
        var iscartlist = $this.hasClass("active");

        var $badges = $(".label.lbl-2, .sf-mob-cart-badge, .mn-hero-badge");
        var curCount = parseInt($badges.first().text(), 10) || 0;

        if (!isDetailPageBtn && iscartlist) {
            $this.removeClass("active");
            if (curCount > 0) {
                $badges.text(curCount - 1);
            }
        } else {
            if (!isDetailPageBtn) {
                $this.addClass("active");
            }
            $badges.text(curCount + 1);
            sfTriggerCartGlow();
        }
    });

    /*== Compare notify js ==*/
    $(document).on("click", ".mn-compare", function (e) {
        e.preventDefault();
        $(".mn-wish-notify").remove();
        $(".mn-compare-notify").remove();
        var isCompare = $(this).hasClass("active");
        if (isCompare) {
            $(this).removeClass("active");
            $("footer").after(
                '<div class="mn-compare-notify"><p class="compare-note remove">Removed product from <a href="compare.html">Compare list</a> successfully!</p></div>',
            );
        } else {
            $(this).addClass("active");
            $("footer").after(
                '<div class="mn-compare-notify"><p class="compare-note add">Added product to <a href="compare.html">Compare list</a> successfully!</p></div>',
            );
        }

        setTimeout(function () {
            $(".mn-compare-notify").fadeOut();
        }, 2000);
    });

    /*== Remove Product (Compare page) ==*/
    $(document).on("click", ".remove-compare-product", function () {
        $(this).parents(".product-col").remove();
        var compare_page_count = $(".product-col").length;
        if (compare_page_count == 0) {
            $(".title-col").remove();
            $(".mn-compare-box").html('<p class="mn-compare-page-msg">Your Compare list is empty!</p>');
        }
    });

    /*== Category sidebar JS ==*/
    $(document).on("click", ".mn-category-toggle", function (e) {
        e.preventDefault();
        $(".mn-sidebar-overlay").fadeIn();
        $(".mn-sidebar").addClass("mn-open-category");
    });
    $(document).on("click", ".mn-sidebar-overlay, .side-close", function (e) {
        e.preventDefault();
        $(".mn-sidebar-overlay").fadeOut();
        $(".mn-sidebar").removeClass("mn-open-category");
    });
    $(document).on("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
            e.preventDefault();
            $(".mn-search-toggle").first().trigger("click");
            return;
        }
        if (e.key === "Escape") {
            if ($(".mn-sidebar").hasClass("mn-open-category")) {
                $(".mn-sidebar-overlay").fadeOut();
                $(".mn-sidebar").removeClass("mn-open-category");
            }
            if ($(".mn-side-search").hasClass("mn-open-search")) {
                $(".mn-side-search-overlay").fadeOut();
                $(".mn-side-search").removeClass("mn-open-search");
            }
        }
    });

    /*== Search sidebar JS (Event Delegation for all search toggles) ==*/
    $(document).on("click", ".mn-search-toggle", function (e) {
        e.preventDefault();
        $(".mn-side-search-overlay").fadeIn();
        $(".mn-side-search").addClass("mn-open-search");
        setTimeout(function () {
            $(".mn-side-search input[name='q']").trigger("focus");
        }, 300);
    });
    $(document).on("click", ".mn-side-search-overlay, .mn-search-close", function (e) {
        e.preventDefault();
        $(".mn-side-search-overlay").fadeOut();
        $(".mn-side-search").removeClass("mn-open-search");
    });
    $(document).on("click", ".search-remove-item", function (e) {
        e.preventDefault();
        $(this).parents(".search-sidebar-list").remove();
        var search_product_count = $(".search-sidebar-list").length;
        if (search_product_count == 0) {
            $(".mn-search-pro-items").html('<p class="mn-search-msg">Please try to search other products!</p>');
        }
    });

    $(".mn-side-search form").on("submit", function (e) {
        var query = $(this).find('input[name="q"]').val() || $(this).find("input").val();
        if (!query || !query.trim()) {
            e.preventDefault();
        }
    });

    /*== Filter Icon OnClick Open filter Sidebar on shop page ==*/
    $(".filter-toggle-icon").on("click", function () {
        $(".filter-sidebar-overlay").fadeIn();
        $(".mn-filter-sidebar").addClass("filter-sidebar-open");
    });

    $(".filter-close, .filter-sidebar-overlay").on("click", function () {
        $(".mn-filter-sidebar").removeClass("filter-sidebar-open");
        $(".filter-sidebar-overlay").fadeOut();
    });

    /*== single product Slider ==*/
    if ($.fn.slick && $(".single-product-cover").length) {
        $(".single-product-cover").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: ".single-nav-thumb",
            adaptiveHeight: true,
        });

        $(".single-nav-thumb").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".single-product-cover",
            dots: false,
            arrows: true,
            focusOnSelect: true,
        });

        $(window).on("load resize", function () {
            $(".single-product-cover").slick("setPosition");
        });

        $(".single-product-cover").on("afterChange", function () {
            if (typeof sfSyncImageBackground === "function") {
                sfSyncImageBackground();
            }
        });
    }

    /*== Product Image Zoom ==*/
    if ($.fn.zoom && $(".zoom-image-hover").length) {
        $(".zoom-image-hover").zoom();
    }

    /*== Product Gallery: Exact First-Screen Fit (Desktop & Laptop) ==*/
    /* Measures the natural (pre-sticky) page offset of the gallery card and
       pins its height so the whole card — hero image + thumbnails — always
       fits inside the visible device screen. Mobile/tablet is left untouched
       (the CSS fallback calc(100dvh - 214px) takes over when JS is disabled). */
    function sfSyncImageBackground() {
        var card = document.querySelector(
            ".sf-product-grid-container .sf-grid-buyfold .single-pro-img .single-product-scroll"
        );
        if (!card || window.innerWidth < 992) {
            return;
        }

        var activeImg = card.querySelector(
            ".single-product-cover .slick-current img:not(.zoomImg)"
        ) || card.querySelector(
            ".single-product-cover .single-slide img:not(.zoomImg)"
        );

        if (!activeImg) {
            return;
        }

        function extractColor() {
            try {
                if (!activeImg.naturalWidth || !activeImg.naturalHeight) {
                    return;
                }
                var canvas = document.createElement("canvas");
                canvas.width = 1;
                canvas.height = 1;
                var ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) {
                    return;
                }
                /* Sample 3px inset to avoid any border anti-aliasing */
                ctx.drawImage(activeImg, 3, 3, 1, 1, 0, 0, 1, 1);
                var p = ctx.getImageData(0, 0, 1, 1).data;
                if (p && p[3] > 10) {
                    card.style.setProperty(
                        "--sf-img-bg",
                        "rgb(" + p[0] + ", " + p[1] + ", " + p[2] + ")"
                    );
                } else {
                    card.style.setProperty("--sf-img-bg", "#ffffff");
                }
            } catch (e) {
                card.style.setProperty("--sf-img-bg", "#ffffff");
            }
        }

        if (activeImg.complete && activeImg.naturalWidth > 0) {
            extractColor();
        } else {
            activeImg.addEventListener("load", extractColor, { once: true });
        }
    }

    function sfFitProductGallery() {
        var card = document.querySelector(
            ".sf-product-grid-container .sf-grid-buyfold .single-pro-img .single-product-scroll"
        );
        if (!card) {
            return;
        }

        /* Mobile / tablet layout must stay 100% untouched */
        if (window.innerWidth < 992) {
            card.style.removeProperty("--sf-gallery-h");
            card.style.removeProperty("--sf-cover-h");
            card.style.removeProperty("--sf-img-bg");
            return;
        }

        /* Sum the layout offsets (immune to the sticky shift) */
        var offset = 0;
        var node = card.parentElement;
        while (node) {
            offset += node.offsetTop || 0;
            node = node.offsetParent;
        }

        var viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
        var available = viewportH - offset - 16; /* 16px bottom breathing room */

        if (!isFinite(available) || available < 360) {
            available = 360;
        }

        card.style.setProperty("--sf-gallery-h", Math.round(available) + "px");

        /* Hero image height = card height - 30px card padding - thumbnail strip */
        var thumbs = card.querySelector(".single-nav-thumb");
        var thumbH = thumbs ? thumbs.offsetHeight : 0;
        if (!isFinite(thumbH) || thumbH < 60 || thumbH > available * 0.45) {
            thumbH = 120;
        }

        var coverH = available - 30 - thumbH;
        if (coverH < 180) {
            coverH = 180;
        }

        card.style.setProperty("--sf-cover-h", Math.round(coverH) + "px");

        /* Keep image background seamlessly in sync */
        sfSyncImageBackground();
    }

    if ($(".sf-product-grid-container").length) {
        sfFitProductGallery();
        $(window).on("load", sfFitProductGallery);
        $(window).on("resize orientationchange", sfFitProductGallery);
    }

    /*== Add More Product slider purged for clean CSS grid ==*/

    /*== Category section (Deprecated Owl Carousel Removed) ==*/

    /*== Product sliders permanently purged for pure 2-row CSS Grid ==*/

    /*== Quick view ==*/
    if (typeof $.fn.owlCarousel === "function" && $(".single-slide-quickview").length) {
        $(".single-slide-quickview").owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            dots: false,
            nav: false,
            pagination: false,
            autoplay: true,
            items: 1,
            autoplaySpeed: 2000,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
        });
    }

    /*== Blog section ==*/
    if (typeof $.fn.owlCarousel === "function" && $(".mn-blog-carousel").length) {
        $(".mn-blog-carousel").owlCarousel({
            margin: 24,
            loop: true,
            dots: true,
            nav: false,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            items: 1,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    dots: false,
                },
                461: {
                    items: 2,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
                1400: {
                    items: 4,
                },
            },
        });
    }

    /*== Testimonial Slider ==*/
    if (typeof $.fn.owlCarousel === "function" && $(".mn-testimonial-slider").length) {
        $(".mn-testimonial-slider").owlCarousel({
            margin: 0,
            loop: true,
            dots: true,
            nav: false,
            animateOut: "fadeOut",
            smartSpeed: 1000,
            autoplay: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                1367: {
                    items: 1,
                },
            },
        });
    }

    /*== Team (About Page) ==*/
    if (typeof $.fn.owlCarousel === "function" && $(".mn-team").length) {
        $(".mn-team").owlCarousel({
            margin: 30,
            loop: true,
            dots: true,
            nav: false,
            smartSpeed: 1000,
            autoplay: true,
            responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: false,
            },
            461: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            },
            1400: {
                items: 5,
            },
        },
    });
    }

    /*== Cart page Apply Coupan Toggle ==*/
    $(document).ready(function () {
        $(".mn-cart-coupan").on("click", function () {
            $(".mn-cart-coupan-content").slideToggle("slow");
        });
        $(".mn-checkout-coupan").on("click", function () {
            $(".mn-checkout-coupan-content").slideToggle("slow");
        });
    });

    /*== Cart Page Qty Plus Minus Button ==*/
    $(".cart-qty-plus-minus").each(function () {
        if (!$(this).find(".mn_cart_qtybtn").length) {
            $(this).append(
                '<div class="mn_cart_qtybtn"><div class="inc mn_qtybtn">+</div><div class="dec mn_qtybtn">-</div></div>',
            );
        }
    });
    $(document).on("click", ".cart-qty-plus-minus .mn_cart_qtybtn .mn_qtybtn", function () {
        var $cartqtybutton = $(this);
        var $input = $cartqtybutton.closest(".cart-qty-plus-minus").find("input");
        var CartQtyoldValue = parseFloat($input.val()) || 1;
        if ($cartqtybutton.text().trim() === "+") {
            var CartQtynewVal = CartQtyoldValue + 1;
        } else {
            var CartQtynewVal = CartQtyoldValue > 1 ? CartQtyoldValue - 1 : 1;
        }
        $input.val(CartQtynewVal).trigger("change");
    });

    /*== Accordians toggle (faq page) ==*/
    $(".mn-accordion-header").on("click", function () {
        $(this).parent().siblings().children(".mn-accordion-body").slideUp();
        $(this).parent().find(".mn-accordion-body").slideToggle();
    });

    /*== Instagram slider & Category slider & Tooltips ==*/
    $(function () {
        if (typeof $.fn.infiniteslide === "function" && $(".insta-auto, .cat-auto").length) {
            $(".insta-auto, .cat-auto").infiniteslide({
                direction: "left",
                speed: 50,
                clone: 10,
            });
        }

        if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
            document.querySelectorAll('[data-bs-toggle="tooltip"], [data-toggle="tooltip"]').forEach(function (el) {
                new bootstrap.Tooltip(el);
            });
        }
    });

    /*== Tooltips ==*/
    $("[data-tooltip]").on("mouseenter", function () {
        const $el = $(this);
        const title = $el.attr("title");

        if (title) {
            // Remove native tooltip temporarily
            $el.data("tooltip-title", title).removeAttr("title");

            // Create tooltip and append
            const $tooltip = $('<span class="custom-tooltip"></span>').text(title);
            $el.append($tooltip);
            $tooltip.fadeIn(200);
        }
    });

    $("[data-tooltip]").on("mouseleave", function () {
        const $el = $(this);
        const title = $el.data("tooltip-title");

        // Restore title attribute
        if (title) $el.attr("title", title);

        // Remove tooltip
        $el.find(".custom-tooltip").remove();
    });
    $("[data-tooltip-bottom]").on("mouseenter", function () {
        const $el = $(this);
        const title = $el.attr("title");

        if (title) {
            // Remove native tooltip temporarily
            $el.data("tooltip-title", title).removeAttr("title");

            // Create tooltip and append
            const $tooltip = $('<span class="custom-tooltip-bottom"></span>').text(title);
            $el.append($tooltip);
            $tooltip.fadeIn(200);
        }
    });

    $("[data-tooltip-bottom]").on("mouseleave", function () {
        const $el = $(this);
        const title = $el.data("tooltip-title");

        // Restore title attribute
        if (title) $el.attr("title", title);

        // Remove tooltip
        $el.find(".custom-tooltip-bottom").remove();
    });

    /*== Unused color hover & list-view purged for clean grid ==*/

    /*== Product & shop page category Toggle == */
    $(document).ready(function () {
        $(".mn-sidebar-block.drop .mn-sb-block-content ul li ul").addClass("mn-cat-sub-dropdown");

        $(".mn-sidebar-block.drop .mn-sidebar-block-item").on("click", function () {
            var $this = $(this).closest(".mn-sb-block-content").find(".mn-cat-sub-dropdown");
            $this.slideToggle("slow");
            $(".mn-cat-sub-dropdown").not($this).slideUp("slow");
        });
    });

    /*== Remove filter selection == */
    $(".mn-select-cancel").on("click", function () {
        $(this).parent(".mn-select-btn").remove();
    });
    $(".mn-select-btn-clear").on("click", function () {
        $(this).parent(".mn-select-bar").remove();
    });

    /*== Custom Sort Dropdown Handler ==*/
    $(document).on("click", ".sf-sort-dropdown .dropdown-item", function (e) {
        e.preventDefault();
        var $this = $(this);
        var val = $this.attr("data-value");
        var text = $this.text().trim();

        // Synchronize all sort dropdowns on page
        $(".sf-sort-dropdown").each(function () {
            var $dd = $(this);
            $dd.find(".dropdown-item").removeClass("active");
            $dd.find('.dropdown-item[data-value="' + val + '"]').addClass("active");
            $dd.find(".sf-sort-selected-text").text(text);
            $dd.find("input[type='hidden']").val(val).trigger("change");
        });

        // Close dropdown via Bootstrap API if available
        var btn = $this.closest(".sf-sort-dropdown").find('[data-bs-toggle="dropdown"]')[0];
        if (btn && window.bootstrap && typeof bootstrap.Dropdown !== "undefined") {
            var bsDropdown = bootstrap.Dropdown.getInstance(btn);
            if (bsDropdown) {
                bsDropdown.hide();
            }
        }
    });

    /*== Mobile Sticky Header Offset for Catalog Filter Toolbar ==*/
    function updateMobileStickyHeaderOffset() {
        if (window.innerWidth < 992) {
            var header = document.querySelector("header");
            if (header) {
                var h = header.offsetHeight;
                document.documentElement.style.setProperty("--sf-mobile-header-height", h + "px");
            }
        }
    }
    updateMobileStickyHeaderOffset();
    $(window).on("resize orientationchange load", updateMobileStickyHeaderOffset);

    /*== Qty Plus Minus Button ==*/
    $(".qty-plus-minus").each(function () {
        if (!$(this).find(".mn-qtybtn").length) {
            $(this).prepend('<div class="dec mn-qtybtn">-</div>');
            $(this).append('<div class="inc mn-qtybtn">+</div>');
        }
    });

    $(document).on("click", ".mn-qtybtn", function () {
        var $qtybutton = $(this);
        var $input = $qtybutton.closest(".qty-plus-minus").find("input");
        var QtyoldValue = parseFloat($input.val()) || 1;
        if ($qtybutton.text().trim() === "+") {
            var QtynewVal = QtyoldValue + 1;
        } else {
            var QtynewVal = QtyoldValue > 1 ? QtyoldValue - 1 : 1;
        }
        $input.val(QtynewVal).trigger("change");
    });

    /*  Product Weight & Size select JS  */
    $(document).on("click", ".mn-pro-variation-inner.mn-pro-variation-size ul li", function (e) {
        $(this).closest("ul").find("li").removeClass("active");
        $(this).addClass("active");
        var val = $(this).text().trim();
        $("#selected_size").val(val).trigger("change");
    });

    $(document).on("click", ".mn-pro-variation-inner.mn-pro-variation-color ul li", function (e) {
        $(this).closest("ul").find("li").removeClass("active");
        $(this).addClass("active");
        var val = $(this).attr("data-color") || $(this).text().trim();
        $("#selected_color").val(val).trigger("change");
    });

    /* Quick view size select */
    $(document).on("click", ".mn-pro-variations ul li", function (e) {
        $(this).closest("ul").find("li").removeClass("active");
        $(this).addClass("active");
    });

    /* Re-calculate Quickview Carousel on Modal Open */
    $(document).on("shown.bs.modal", "#quickview_modal", function () {
        if (typeof $.fn.owlCarousel === "function" && $(".single-slide-quickview").hasClass("owl-carousel")) {
            $(".single-slide-quickview").trigger("refresh.owl.carousel");
        }
    });

    /*  Footer Toggle  */
    $(document).ready(function () {
        $(".mn-footer-links").addClass("mn-footer-dropdown");

        $(".mn-footer-heading").append("<div class='mn-heading-res'><i class='ri-add-line'></i></div>");

        $(".mn-footer-heading .mn-heading-res").on("click", function () {
            $(this).children("i").remove();
            var $this = $(this).closest(".footer-top .col-sm-12").find(".mn-footer-dropdown");
            if ($(this).hasClass("mn-active")) {
                $this.slideUp("slow");
                $(this).removeClass("mn-active");
                $(this).children("i").remove();
                $(this).append("<i class='ri-add-line'></i>");
            } else {
                $(".mn-heading-res").removeClass("mn-active");
                $(this).addClass("mn-active");
                $this.slideDown("slow");
                $(".mn-footer-dropdown").not($this).slideUp("slow");
                $(".mn-heading-res").children("i").remove();
                $(".mn-heading-res").append("<i class='ri-add-line'></i>");
                $(this).children("i.ri-add-line").remove();
                $(this).append("<i class='ri-subtract-line'></i>");
            }
        });
    });

    /*== Footer ==*/
    if ($("#copyright_year").length) {
        var date = new Date().getFullYear();
        document.getElementById("copyright_year").innerHTML = date;
    }

    /*== Accessible Owl Carousel Controls ==*/
    function updateOwlControlsAria() {
        $(".owl-dot").each(function (i) {
            if (!$(this).attr("aria-label")) {
                $(this).attr("aria-label", "Slide " + (i + 1));
            }
        });
        $(".owl-prev").removeAttr("role").attr("aria-label", "Previous slide");
        $(".owl-next").removeAttr("role").attr("aria-label", "Next slide");
    }
    updateOwlControlsAria();
    $(document).on("refreshed.owl.carousel initialized.owl.carousel", ".owl-carousel", function () {
        updateOwlControlsAria();
    });
    setTimeout(updateOwlControlsAria, 400);

    /*== Dynamic Search Input Typewriter Effect ==*/
    (function () {
        var words = [
            'Search your product...',
            'Search "Smart Watch"...',
            'Search "Cotton T-Shirt"...',
            'Search "Fresh Fruits"...',
            'Search "Wireless Earbuds"...',
            'Search "Organic Honey"...',
            'Search "Sneakers"...',
            'Search "Beauty Care"...'
        ];
        var wordIdx = 0;
        var charIdx = 0;
        var isDeleting = false;
        var typeSpeed = 90;
        var pauseEnd = 1600;
        var pauseStart = 450;
        var sfTypewriterRunning = true;

        function runTypewriter() {
            var targets = document.querySelectorAll('.sf-search-typewriter');
            if (!targets.length) return;

            var currentWord = words[wordIdx];

            if (isDeleting) {
                charIdx--;
            } else {
                charIdx++;
            }

            var text = currentWord.substring(0, charIdx);
            for (var i = 0; i < targets.length; i++) {
                targets[i].textContent = text;
            }

            var speed = isDeleting ? (typeSpeed / 2) : typeSpeed;

            if (!isDeleting && charIdx === currentWord.length) {
                speed = pauseEnd;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = pauseStart;
            }

            setTimeout(runTypewriter, speed);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runTypewriter);
        } else {
            runTypewriter();
        }
    })();

    /*== Topbar Promo Ticker Auto-Rotation ==*/
    (function initPromoTicker() {
        var $ticker = $(".sf-promo-ticker");
        if (!$ticker.length) return;

        var $items = $ticker.find(".sf-promo-item");
        if ($items.length <= 1) return;

        var currentIndex = 0;
        var intervalId = null;

        function showNext() {
            var $prev = $items.eq(currentIndex);
            currentIndex = (currentIndex + 1) % $items.length;
            var $next = $items.eq(currentIndex);

            $prev.removeClass("active").addClass("prev");
            $next.addClass("active");

            setTimeout(function () {
                $prev.removeClass("prev");
            }, 550);
        }

        function startRotation() {
            if (!intervalId) {
                intervalId = setInterval(showNext, 3000);
            }
        }

        function stopRotation() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        startRotation();

        $(".sf-topbar-promo").on("mouseenter", stopRotation).on("mouseleave", startRotation);
    })();

    /* Interactive Star Rating Selector in Review Form */
    $(document).on("click", "#reviewStarSelect i", function () {
        var rating = $(this).data("rating");
        $("#reviewRatingInput").val(rating);
        $("#reviewStarSelect i").each(function () {
            var star = $(this).data("rating");
            if (star <= rating) {
                $(this).removeClass("grey").addClass("active");
            } else {
                $(this).removeClass("active").addClass("grey");
            }
        });
    });

    /* Copy Product Link to Clipboard with Feedback */
    $(document).on("click", "#sfCopyProductLink", function (e) {
        e.preventDefault();
        var $btn = $(this);
        var url = window.location.href;

        function showSuccess() {
            var originalHtml = $btn.html();
            $btn.html('<i class="ri-check-line text-success me-1"></i> <span class="text-success">Link Copied!</span>');

            setTimeout(function () {
                $btn.html(originalHtml);
            }, 2500);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(showSuccess).catch(function () {
                fallbackCopy(url);
            });
        } else {
            fallbackCopy(url);
        }

        function fallbackCopy(text) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(text).select();
            document.execCommand("copy");
            $temp.remove();
            showSuccess();
        }
    });

    /* Mobile Bottom Sticky Bar Quantity Stepper (with Real-time Price Update) */
    function updateSfBottomPrice(qty) {
        var $price = $("#sfBottomPriceVal");
        if ($price.length) {
            var unit = parseFloat($price.data("unit-price")) || 664;
            $price.text("৳" + (unit * qty).toLocaleString("en-US"));
        }
    }

    $(document).on("click", "#sfBottomQtyDec", function (e) {
        e.preventDefault();
        var $input = $("#sfBottomQtyInput");
        var val = parseInt($input.val(), 10) || 1;
        if (val > 1) {
            val--;
            $input.val(val);
            $("input[name='ms_qtybtn']").val(val);
            updateSfBottomPrice(val);
        }
    });

    $(document).on("click", "#sfBottomQtyInc", function (e) {
        e.preventDefault();
        var $input = $("#sfBottomQtyInput");
        var val = parseInt($input.val(), 10) || 1;
        val++;
        $input.val(val);
        $("input[name='ms_qtybtn']").val(val);
        updateSfBottomPrice(val);
    });

    /* Mobile Modal Copy Product Link */
    $(document).on("click", "#sfMobileCopyBtn", function (e) {
        e.preventDefault();
        var $btn = $(this);
        var url = window.location.href;
        var originalHtml = $btn.html();

        function showCopied() {
            $btn.html('<i class="ri-check-line me-1"></i>Copied!');
            setTimeout(function () {
                $btn.html(originalHtml);
            }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(showCopied).catch(showCopied);
        } else {
            showCopied();
        }
    });


    /*==========================================================================
      ShoppieFly Modern Cart Ecosystem (Checkbox, Stepper & Package Handlers)
      ==========================================================================*/
    function sfInitModernCart() {
        if (!$("#sf-cart-container").length) return;

        function sfUpdateCartCounters() {
            var totalItems = $(".sf-cart-item").length;
            var selectedItems = $(".sf-item-checkbox:checked").length;

            $("#sf-total-items-badge").text(totalItems);
            $("#sf-summary-items-count").text(selectedItems);
            $("#sf-checkout-count").text(selectedItems);

            // Sync mobile sticky bottom bar counters
            $("#sfMobileSelectedCount").text(selectedItems);
            $("#sfMobileBtnCount").text(selectedItems);

            // Sync master select all checkbox state
            if (totalItems > 0 && selectedItems === totalItems) {
                $("#sf-select-all").prop("checked", true);
            } else {
                $("#sf-select-all").prop("checked", false);
            }

            // Sync each store package checkbox state and item counter
            $(".sf-cart-package").each(function () {
                var $pkg = $(this);
                var pkgId = $pkg.data("package");
                var pkgItems = $pkg.find(".sf-item-checkbox").length;
                var pkgSelected = $pkg.find(".sf-item-checkbox:checked").length;
                var $storeCb = $pkg.find('.sf-store-checkbox[data-package="' + pkgId + '"]');

                $pkg.find(".sf-package-item-count").text("(" + pkgItems + ")");

                if (pkgItems > 0 && pkgSelected === pkgItems) {
                    $storeCb.prop("checked", true);
                } else {
                    $storeCb.prop("checked", false);
                }
            });

            // Update Checkout CTA buttons (Desktop & Mobile)
            var $checkoutBtn = $("#sf-btn-checkout");
            var $mobileBtn = $("#sfMobileBtnCheckout");

            if (selectedItems === 0) {
                $checkoutBtn.addClass("disabled opacity-50").css("pointer-events", "none");
                $mobileBtn.addClass("disabled opacity-50").css("pointer-events", "none");
                $("#sfMobileTotalPrice").text("৳ 0.00");
            } else {
                $checkoutBtn.removeClass("disabled opacity-50").css("pointer-events", "auto");
                $mobileBtn.removeClass("disabled opacity-50").css("pointer-events", "auto");
                $("#sfMobileTotalPrice").text($("#sf-summary-total").text() || "৳ 734.00");
            }

            // If no items at all, show empty state & hide mobile bar
            if (totalItems === 0) {
                $("#sfMobileCartBar").slideUp(200);
                $("#sf-cart-container").html(
                    '<div class="sf-cart-empty-state">' +
                    '  <i class="ri-shopping-cart-2-line sf-cart-empty-icon"></i>' +
                    '  <h3 class="sf-cart-empty-title">Your Cart is Empty</h3>' +
                    '  <p class="sf-cart-empty-desc">Looks like you have not added any items to your cart yet.</p>' +
                    '  <a href="shop.html" class="sf-btn-checkout d-inline-flex" style="width: auto; padding: 0 28px;">Start Shopping</a>' +
                    '</div>'
                );
                $("#sf-summary-subtotal").text("৳ 0.00");
                $("#sf-summary-shipping").text("৳ 0.00");
                $("#sf-summary-total").text("৳ 0.00");
                $("#sf-summary-items-count").text("0");
                $("#sf-checkout-count").text("0");
                $("#sfMobileSelectedCount").text("0");
                $("#sfMobileBtnCount").text("0");
                $checkoutBtn.addClass("disabled opacity-50").css("pointer-events", "none");
                $mobileBtn.addClass("disabled opacity-50").css("pointer-events", "none");
            }
        }

        // 1. Master Select All Checkbox
        $(document).on("change", "#sf-select-all", function () {
            var isChecked = $(this).is(":checked");
            $(".sf-store-checkbox, .sf-item-checkbox").prop("checked", isChecked);
            sfUpdateCartCounters();
        });

        // 2. Store Package Checkbox
        $(document).on("change", ".sf-store-checkbox", function () {
            var pkgId = $(this).data("package");
            var isChecked = $(this).is(":checked");
            $('.sf-item-checkbox[data-package="' + pkgId + '"]').prop("checked", isChecked);
            sfUpdateCartCounters();
        });

        // 3. Individual Item Checkbox
        $(document).on("change", ".sf-item-checkbox", function () {
            sfUpdateCartCounters();
        });

        // 4. Horizontal Quantity Stepper (+ / -)
        $(document).on("click", ".sf-qty-inc", function () {
            var $input = $(this).siblings(".sf-qty-input");
            var currentVal = parseInt($input.val(), 10) || 1;
            $input.val(currentVal + 1);
        });

        $(document).on("click", ".sf-qty-dec", function () {
            var $input = $(this).siblings(".sf-qty-input");
            var currentVal = parseInt($input.val(), 10) || 1;
            if (currentVal > 1) {
                $input.val(currentVal - 1);
            }
        });

        // 5. Individual Item Remove
        $(document).on("click", ".sf-btn-del", function (e) {
            e.preventDefault();
            var $item = $(this).closest(".sf-cart-item");
            var $package = $item.closest(".sf-cart-package");

            $item.fadeOut(250, function () {
                $item.remove();
                // If package has no more items, clean up the package
                if ($package.find(".sf-cart-item").length === 0) {
                    $package.fadeOut(200, function () {
                        $package.remove();
                        sfUpdateCartCounters();
                    });
                } else {
                    sfUpdateCartCounters();
                }
            });
        });

        // 6. Bulk Delete Selected
        $(document).on("click", "#sf-delete-selected", function (e) {
            e.preventDefault();
            var $checkedItems = $(".sf-item-checkbox:checked").closest(".sf-cart-item");
            if (!$checkedItems.length) return;

            $checkedItems.fadeOut(250, function () {
                $checkedItems.remove();
                // Check all packages for empty status
                $(".sf-cart-package").each(function () {
                    var $pkg = $(this);
                    if ($pkg.find(".sf-cart-item").length === 0) {
                        $pkg.remove();
                    }
                });
                sfUpdateCartCounters();
            });
        });

        // 7. Wishlist Toggle
        $(document).on("click", ".sf-btn-wish", function (e) {
            e.preventDefault();
            var $btn = $(this);
            var $icon = $btn.find("i");
            if ($icon.hasClass("ri-heart-line")) {
                $icon.removeClass("ri-heart-line").addClass("ri-heart-fill text-danger");
            } else {
                $icon.removeClass("ri-heart-fill text-danger").addClass("ri-heart-line");
            }
        });

        // Initialize counters on page load
        sfUpdateCartCounters();
    }

    /* ==========================================================================
       ShoppieFly Independent Minimal 1-Page Express Checkout Engine
       ========================================================================== */
    function sfInitModernCheckout() {
        if (!$(".sf-checkout-page").length && !$("#sf-checkout-form").length) {
            return;
        }

        var subtotal = 734;
        var discount = 0;
        var currentShippingCost = 70;

        // Bangladesh Location Hierarchy for Dropdowns
        var BD_DISTRICTS = {
            "Dhaka": ["Dhaka City", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Tangail", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur"],
            "Chattogram": ["Chattogram City", "Bandarban", "Brahmanbaria", "Chandpur", "Cox's Bazar", "Cumilla", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
            "Sylhet": ["Sylhet City", "Habiganj", "Moulvibazar", "Sunamganj"],
            "Rajshahi": ["Rajshahi City", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"],
            "Khulna": ["Khulna City", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
            "Barishal": ["Barishal City", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
            "Rangpur": ["Rangpur City", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
            "Mymensingh": ["Mymensingh City", "Jamalpur", "Netrokona", "Sherpur"]
        };

        function updateCheckoutTotals() {
            var total = subtotal + currentShippingCost - discount;

            // Update UI elements
            $("#sf-checkout-shipping").text("৳ " + currentShippingCost);
            $("#sf-checkout-total").text("৳ " + total);
            $("#sfMobileTotalPayable").text("৳ " + total);
            $("#sf_hidden_shipping").val(currentShippingCost);

            if (discount > 0) {
                $("#sf-discount-row").removeClass("d-none");
                $("#sf-checkout-discount").text("-৳ " + discount);
            } else {
                $("#sf-discount-row").addClass("d-none");
            }
        }

        // Division change handler: populates District dropdown and recalculates shipping fee
        function handleDivisionChange(division) {
            var districts = BD_DISTRICTS[division] || [];
            var $distSelect = $("#sf_district");
            $distSelect.empty();

            districts.forEach(function (dist, index) {
                $distSelect.append(new Option(dist, dist, false, index === 0));
            });

            // If Division is Dhaka -> Inside Dhaka (৳70), else -> Outside Dhaka (৳130)
            if (division === "Dhaka") {
                currentShippingCost = 70;
                $("#sf_hidden_zone").val("inside_dhaka");
            } else {
                currentShippingCost = 130;
                $("#sf_hidden_zone").val("outside_dhaka");
            }

            $("#sf_hidden_division").val(division);
            $("#sf_hidden_district").val($distSelect.val());
            updateCheckoutTotals();
        }

        $(document).on("change", "#sf_division", function () {
            handleDivisionChange($(this).val());
        });

        $(document).on("change", "#sf_district", function () {
            $("#sf_hidden_district").val($(this).val());
        });

        // Payment Method selection
        $(document).on("click", ".sf-min-pay-row", function (e) {
            if (e.target.tagName !== "INPUT") {
                $(this).find('input[type="radio"]').prop("checked", true).trigger("change");
            }
        });

        $(document).on("change", 'input[name="payment_method"]', function () {
            $(".sf-min-pay-row").removeClass("active");
            $(this).closest(".sf-min-pay-row").addClass("active");
        });

        // Voucher apply
        $(document).on("click", "#sf-voucher-btn", function (e) {
            e.preventDefault();
            var code = ($("#sf-voucher-input").val() || "").trim().toUpperCase();
            var $msg = $("#sf-voucher-msg");

            if (!code) {
                $msg.removeClass("d-none text-success").addClass("text-danger").text("Please enter a coupon code.");
                return;
            }

            if (code === "SHOPPIE50" || code === "SAVE50" || code === "DISCOUNT50") {
                discount = 50;
                $msg.removeClass("d-none text-danger").addClass("text-success").text("Coupon applied! ৳ 50 discount added.");
                updateCheckoutTotals();
            } else if (code === "SHOPPIE100" || code === "SAVE100") {
                discount = 100;
                $msg.removeClass("d-none text-danger").addClass("text-success").text("Coupon applied! ৳ 100 discount added.");
                updateCheckoutTotals();
            } else {
                $msg.removeClass("d-none text-success").addClass("text-danger").text("Invalid coupon code. Try 'SHOPPIE50'");
            }
        });

        // Initialize state
        var initialDivision = $("#sf_division").val() || "Dhaka";
        handleDivisionChange(initialDivision);
    }

    /*==================================================
      Order Success Page Interactivity
    ==================================================*/
    function sfInitOrderSuccess() {
        var $btn = $("#sfBtnCopyOrder");
        if (!$btn.length) return;

        $btn.on("click", function () {
            var orderNum = $("#sfOrderNumber").text().trim();

            function showCopiedFeedback() {
                var $icon = $btn.find("i");
                var $text = $("#sfCopyText");
                $icon.removeClass("ri-file-copy-line").addClass("ri-check-line text-success");
                $text.text("Copied!");
                $btn.addClass("border-success");
                setTimeout(function () {
                    $icon.removeClass("ri-check-line text-success").addClass("ri-file-copy-line");
                    $text.text("Copy");
                    $btn.removeClass("border-success");
                }, 2000);
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(orderNum).then(showCopiedFeedback).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(orderNum).select();
                try {
                    document.execCommand("copy");
                    showCopiedFeedback();
                } catch (e) {
                    // fallback
                }
                $temp.remove();
            }
        });
    }

    /*==================================================
      Track Order Page Interactivity & Animations
    ==================================================*/
    function sfInitTrackOrder() {
        var $form = $("#sfTrackOrderForm");
        var $copyBtn = $("#sfBtnCopyTrack");
        var $displayTrackId = $("#sfDisplayTrackId");
        var $trackInput = $("#track_order_id");
        var $results = $("#sfTrackResultsContainer");

        if (!$form.length && !$copyBtn.length) return;

        // 1. Auto-fill from URL query param if present (?order=... or ?order_id=...)
        if (window.location.search) {
            try {
                var urlParams = new URLSearchParams(window.location.search);
                var orderParam = urlParams.get("order") || urlParams.get("order_id");
                if (orderParam) {
                    var cleanId = orderParam.replace(/^#/, "").trim();
                    if ($trackInput.length) $trackInput.val(cleanId);
                    if ($displayTrackId.length) $displayTrackId.text("#" + cleanId);
                }
            } catch (e) {
                // Ignore url parse errors
            }
        }

        // 2. One-click copy for Tracking ID
        if ($copyBtn.length) {
            $copyBtn.on("click", function () {
                var rawId = $displayTrackId.text().trim().replace(/^#/, "");
                var $tooltip = $copyBtn.find(".sf-copy-tooltip");

                function showCopySuccess() {
                    $copyBtn.find("i").removeClass("ri-file-copy-line").addClass("ri-check-line text-success");
                    $tooltip.text("Copied!");
                    setTimeout(function () {
                        $copyBtn.find("i").removeClass("ri-check-line text-success").addClass("ri-file-copy-line");
                        $tooltip.text("Copy");
                    }, 2000);
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(rawId).then(showCopySuccess).catch(fallbackTrackCopy);
                } else {
                    fallbackTrackCopy();
                }

                function fallbackTrackCopy() {
                    var $temp = $("<input>");
                    $("body").append($temp);
                    $temp.val(rawId).select();
                    try {
                        document.execCommand("copy");
                        showCopySuccess();
                    } catch (e) {
                        // ignore
                    }
                    $temp.remove();
                }
            });
        }

        // 3. Search form submission simulation with smooth loading transition
        if ($form.length) {
            $form.on("submit", function (e) {
                e.preventDefault();
                var inputVal = $trackInput.val().trim();
                if (!inputVal) {
                    $trackInput.focus();
                    return;
                }

                var cleanId = inputVal.replace(/^#/, "").trim();
                var $submitBtn = $("#sfBtnTrackSubmit");
                var origBtnHtml = $submitBtn.html();

                // Loading state
                $submitBtn.prop("disabled", true).html('<i class="ri-loader-4-line ri-spin me-1"></i> <span>Searching...</span>');
                $results.addClass("is-loading");

                setTimeout(function () {
                    if ($displayTrackId.length) {
                        $displayTrackId.text("#" + cleanId);
                    }
                    $results.removeClass("is-loading");
                    $submitBtn.prop("disabled", false).html(origBtnHtml);

                    // Smooth scroll down to results if on small mobile screen
                    if ($(window).width() < 768 && $results.length) {
                        $("html, body").animate({
                            scrollTop: $results.offset().top - 20
                        }, 400);
                    }
                }, 450);
            });
        }
    }

    /* ==========================================================================
       ShoppieFlyBD Seller Onboarding & Stepper Engine (Daraz & Govaly Standard)
       ========================================================================== */
    // Global Password Visibility Toggle (Delegated for Login & Register)
    $(document).on("click", ".sf-toggle-pwd-btn", function () {
        var $input = $(this).siblings("input");
        var $icon = $(this).find("i");
        if ($input.attr("type") === "password") {
            $input.attr("type", "text");
            $icon.removeClass("ri-eye-line").addClass("ri-eye-off-line");
        } else {
            $input.attr("type", "password");
            $icon.removeClass("ri-eye-off-line").addClass("ri-eye-line");
        }
    });

    function sfInitSellerOnboarding() {
        var $stepperCard = $(".sf-stepper-card");
        if (!$stepperCard.length) return;

        var currentStep = 1;
        var userPhone = "";
        var otpTimer = null;
        var countdownSeconds = 59;

        // Elements
        var $pane1 = $("#sfPaneStep1");
        var $pane2 = $("#sfPaneStep2");
        var $pane3 = $("#sfPaneStep3");
        var $pane4 = $("#sfPaneStep4");

        var $stepNode1 = $("#sfStepNode1");
        var $stepNode2 = $("#sfStepNode2");
        var $stepNode3 = $("#sfStepNode3");

        var $stepLine1 = $("#sfStepLine1");
        var $stepLine2 = $("#sfStepLine2");

        var $phoneInput = $("#sf_seller_phone");
        var $phoneError = $("#sfPhoneError");
        var $btnSendOtp = $("#sfBtnSendOtp");

        var $displayPhone = $("#sfDisplayPhone");
        var $btnEditPhone = $("#sfBtnEditPhone");
        var $otpBoxes = $(".sf-otp-box");
        var $otpError = $("#sfOtpError");
        var $btnVerifyOtp = $("#sfBtnVerifyOtp");
        var $btnBackStep1 = $("#sfBtnBackStep1");
        var $otpTimerWrap = $("#sfOtpTimerWrap");
        var $otpTimerVal = $("#sfOtpTimerVal");
        var $btnResendOtp = $("#sfBtnResendOtp");

        var $sellerNameInput = $("#sf_seller_name");
        var $storeNameInput = $("#sf_store_name");
        var $storeSlugPreview = $("#sfStoreSlugPreview");
        var $pwdInput = $("#sf_seller_password");
        var $confirmPwdInput = $("#sf_seller_confirm_pwd");
        var $agreeTerms = $("#sfAgreeTerms");
        var $step3Error = $("#sfStep3Error");
        var $btnCompleteRegister = $("#sfBtnCompleteRegister");

        var $successStoreName = $("#sfSuccessStoreName");
        var $successSellerPhone = $("#sfSuccessSellerPhone");

        // Helper: Normalize Phone Number (handles 10 or 11 digits, with/without 0 prefix)
        function normalizePhone(raw) {
            if (!raw) return "";
            var digits = raw.toString().replace(/\D/g, "");
            // If starts with 8801 and 13 digits: 88017... -> 017...
            if (digits.startsWith("8801") && digits.length === 13) {
                digits = digits.substring(2);
            }
            // If 10 digits starting with 1[3-9]: 17... -> 017...
            if (digits.length === 10 && /^1[3-9]/.test(digits)) {
                digits = "0" + digits;
            }
            return digits;
        }

        // Helper: Format Phone Number for display
        function formatPhone(raw) {
            var digits = normalizePhone(raw);
            if (digits.length === 11 && digits.startsWith("0")) {
                var national = digits.substring(1);
                return "+880 " + national.substring(0, 4) + "-" + national.substring(4);
            }
            return "+880 " + digits;
        }

        // Helper: Switch Step
        function goToStep(step) {
            currentStep = step;

            // Panes
            $pane1.addClass("d-none").removeClass("active");
            $pane2.addClass("d-none").removeClass("active");
            $pane3.addClass("d-none").removeClass("active");
            $pane4.addClass("d-none").removeClass("active");

            // Header nodes reset
            $stepNode1.removeClass("active completed");
            $stepNode2.removeClass("active completed");
            $stepNode3.removeClass("active completed");
            $stepLine1.removeClass("active completed");
            $stepLine2.removeClass("active completed");

            if (step === 1) {
                $pane1.removeClass("d-none").addClass("active");
                $stepNode1.addClass("active");
                if (userPhone) $phoneInput.val(userPhone);
                $phoneInput.focus();
            } else if (step === 2) {
                $pane2.removeClass("d-none").addClass("active");
                $stepNode1.addClass("completed");
                $stepLine1.addClass("completed");
                $stepNode2.addClass("active");
                $otpBoxes.first().focus();
                startOtpTimer();
            } else if (step === 3) {
                $pane3.removeClass("d-none").addClass("active");
                $stepNode1.addClass("completed");
                $stepLine1.addClass("completed");
                $stepNode2.addClass("completed");
                $stepLine2.addClass("completed");
                $stepNode3.addClass("active");
                $sellerNameInput.focus();
            } else if (step === 4) {
                $pane4.removeClass("d-none").addClass("active");
                $stepNode1.addClass("completed");
                $stepLine1.addClass("completed");
                $stepNode2.addClass("completed");
                $stepLine2.addClass("completed");
                $stepNode3.addClass("completed");
            }
        }

        // Helper: Slugify
        function slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
        }

        // Helper: OTP Timer
        function startOtpTimer() {
            if (otpTimer) clearInterval(otpTimer);
            countdownSeconds = 59;
            $otpTimerWrap.removeClass("d-none");
            $btnResendOtp.addClass("d-none");
            $otpTimerVal.text("00:59");

            otpTimer = setInterval(function () {
                countdownSeconds--;
                if (countdownSeconds <= 0) {
                    clearInterval(otpTimer);
                    $otpTimerWrap.addClass("d-none");
                    $btnResendOtp.removeClass("d-none");
                } else {
                    var secStr = countdownSeconds < 10 ? "0" + countdownSeconds : "" + countdownSeconds;
                    $otpTimerVal.text("00:" + secStr);
                }
            }, 1000);
        }

        // 1. Phone input digits only
        $phoneInput.on("input", function () {
            var val = $(this).val().replace(/\D/g, "");
            $(this).val(val);
            if (val.length > 0) {
                $phoneError.addClass("d-none");
            }
        });

        // 2. Step 1: Send OTP Click
        $btnSendOtp.on("click", function () {
            var raw = $phoneInput.val().trim();
            var normalized = normalizePhone(raw);
            var bdPhonePattern = /^01[3-9]\d{8}$/;
            if (!bdPhonePattern.test(normalized)) {
                $phoneError.removeClass("d-none");
                $phoneInput.focus();
                return;
            }

            userPhone = normalized;
            $phoneInput.val(normalized);
            $phoneError.addClass("d-none");

            // Loading state
            $btnSendOtp.prop("disabled", true);
            $btnSendOtp.find(".sf-btn-text").text("Sending OTP...");
            $btnSendOtp.find(".sf-btn-icon").addClass("d-none");
            $btnSendOtp.find(".spinner-border").removeClass("d-none");

            setTimeout(function () {
                $btnSendOtp.prop("disabled", false);
                $btnSendOtp.find(".sf-btn-text").text("Send Verification Code");
                $btnSendOtp.find(".sf-btn-icon").removeClass("d-none");
                $btnSendOtp.find(".spinner-border").addClass("d-none");

                $displayPhone.text(formatPhone(userPhone));
                goToStep(2);
            }, 450);
        });

        // Edit Phone from Step 2
        $btnEditPhone.on("click", function () {
            goToStep(1);
        });
        $btnBackStep1.on("click", function () {
            goToStep(1);
        });

        // 3. OTP Boxes Auto-advance & Backspace
        $otpBoxes.each(function (idx) {
            var $box = $(this);

            $box.on("input", function (e) {
                var val = $(this).val().replace(/\D/g, "");
                $(this).val(val);
                $otpError.addClass("d-none");

                if (val && idx < $otpBoxes.length - 1) {
                    $otpBoxes.eq(idx + 1).focus();
                }
            });

            $box.on("keydown", function (e) {
                if (e.key === "Backspace" && !$(this).val() && idx > 0) {
                    $otpBoxes.eq(idx - 1).focus();
                }
            });

            // Paste handling on any OTP box
            $box.on("paste", function (e) {
                var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                if (!clipboardData) return;
                var pasted = clipboardData.getData("text").replace(/\D/g, "");
                if (pasted.length >= 6) {
                    e.preventDefault();
                    for (var i = 0; i < 6; i++) {
                        $otpBoxes.eq(i).val(pasted[i]);
                    }
                    $otpBoxes.eq(5).focus();
                    $otpError.addClass("d-none");
                }
            });
        });

        // Resend OTP Click
        $btnResendOtp.on("click", function () {
            $otpBoxes.val("");
            $otpBoxes.first().focus();
            startOtpTimer();
            // Feedback
            var origText = $(this).html();
            $(this).html('<i class="ri-check-line me-1"></i> Sent!');
            var $btn = $(this);
            setTimeout(function () {
                $btn.html(origText);
            }, 1500);
        });

        // 4. Step 2: Verify OTP Click
        $btnVerifyOtp.on("click", function () {
            var code = "";
            $otpBoxes.each(function () {
                code += $(this).val().trim();
            });

            if (code.length < 6) {
                $otpError.removeClass("d-none").text("Please enter the complete 6-digit verification code.");
                return;
            }

            $otpError.addClass("d-none");

            // Loading state
            $btnVerifyOtp.prop("disabled", true);
            $btnVerifyOtp.find(".sf-btn-text").text("Verifying...");
            $btnVerifyOtp.find(".sf-btn-icon").addClass("d-none");
            $btnVerifyOtp.find(".spinner-border").removeClass("d-none");

            setTimeout(function () {
                $btnVerifyOtp.prop("disabled", false);
                $btnVerifyOtp.find(".sf-btn-text").text("Verify & Continue");
                $btnVerifyOtp.find(".sf-btn-icon").removeClass("d-none");
                $btnVerifyOtp.find(".spinner-border").addClass("d-none");

                goToStep(3);
            }, 400);
        });

        // 5. Step 3: Live Store Slug Preview
        $storeNameInput.on("input", function () {
            var raw = $(this).val();
            var slug = slugify(raw);
            $storeSlugPreview.text(slug || "your-store");
        });



        // 6. Step 3: Complete Registration Click
        $btnCompleteRegister.on("click", function () {
            var name = $sellerNameInput.val().trim();
            var store = $storeNameInput.val().trim();
            var pwd = $pwdInput.val();
            var confirmPwd = $confirmPwdInput.val();
            var agreed = $agreeTerms.is(":checked");

            if (!name) {
                $step3Error.removeClass("d-none").text("Please enter your full name.");
                $sellerNameInput.focus();
                return;
            }
            if (!store) {
                $step3Error.removeClass("d-none").text("Please enter your store or shop name.");
                $storeNameInput.focus();
                return;
            }
            if (!pwd || pwd.length < 8) {
                $step3Error.removeClass("d-none").text("Password must be at least 8 characters long.");
                $pwdInput.focus();
                return;
            }
            if (pwd !== confirmPwd) {
                $step3Error.removeClass("d-none").text("Passwords do not match. Please check again.");
                $confirmPwdInput.focus();
                return;
            }
            if (!agreed) {
                $step3Error.removeClass("d-none").text("You must agree to the Seller Agreement to continue.");
                return;
            }

            $step3Error.addClass("d-none");

            // Loading state
            $btnCompleteRegister.prop("disabled", true);
            $btnCompleteRegister.find(".sf-btn-text").text("Creating Account...");
            $btnCompleteRegister.find(".sf-btn-icon").addClass("d-none");
            $btnCompleteRegister.find(".spinner-border").removeClass("d-none");

            setTimeout(function () {
                $btnCompleteRegister.prop("disabled", false);
                $btnCompleteRegister.find(".sf-btn-text").text("Create Seller Account");
                $btnCompleteRegister.find(".sf-btn-icon").removeClass("d-none");
                $btnCompleteRegister.find(".spinner-border").addClass("d-none");

                // Populate success card
                $successStoreName.text(store);
                $successSellerPhone.text(formatPhone(userPhone));

                goToStep(4);
            }, 600);
        });
    }

    /*==================================================
      Seller Storefront Interactivity (store.html)
    ==================================================*/
    function sfInitStorefront() {
        // Follow Store Toggle
        $(document).on("click", "#sfBtnFollowStore", function (e) {
            e.preventDefault();
            var $btn = $(this);
            var isFollowing = $btn.hasClass("following");
            if (isFollowing) {
                $btn.removeClass("following");
                $btn.find("span").html('<i class="ri-user-follow-line me-1"></i> Follow (1.4k)');
            } else {
                $btn.addClass("following");
                $btn.find("span").html('<i class="ri-check-line me-1 text-success"></i> Following (1.4k)');
            }
        });

        // Store Voucher Collect Button
        $(document).on("click", ".sf-voucher-collect-btn", function (e) {
            e.preventDefault();
            var $btn = $(this);
            var code = $btn.data("code");
            if ($btn.hasClass("collected")) {
                return;
            }
            $btn.addClass("collected btn-success").removeClass("btn-outline-primary").text("Collected ✓");
            if (navigator.clipboard && navigator.clipboard.writeText && code) {
                navigator.clipboard.writeText(code).catch(function () {});
            }
        });

        // Share Store Button
        $(document).on("click", "#sfBtnShareStore", function (e) {
            e.preventDefault();
            var url = window.location.href;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    alert("Store link copied to clipboard!");
                }).catch(function () {
                    alert("Store link: " + url);
                });
            } else {
                alert("Store link: " + url);
            }
        });

        // Mobile Category Scroller Pills
        $(document).on("click", ".sf-store-cat-pill", function (e) {
            e.preventDefault();
            $(".sf-store-cat-pill").removeClass("active btn-primary").addClass("btn-light border");
            $(this).addClass("active btn-primary").removeClass("btn-light border");
        });

        // Story Highlights Click Handler
        $(document).on("click", ".sf-story-item", function (e) {
            e.preventDefault();
            var target = $(this).data("target");
            $(".sf-story-item").find(".sf-story-circle").css("filter", "none");
            $(this).find(".sf-story-circle").css("filter", "brightness(1.15)");
            if (target && $(target).length) {
                $("html, body").animate({ scrollTop: $(target).offset().top - 80 }, 500);
            }
        });

        // Live Flash Sale Countdown Timer
        function startFlashCountdown() {
            var $hours = $("#sfCountdownHours");
            var $mins = $("#sfCountdownMins");
            var $secs = $("#sfCountdownSecs");
            if (!$hours.length) return;

            // Target 18 hours 42 mins from now or stored target
            var now = new Date().getTime();
            var targetTime = now + (18 * 3600 + 42 * 60 + 15) * 1000;

            function updateClock() {
                var current = new Date().getTime();
                var diff = Math.max(0, targetTime - current);

                var h = Math.floor(diff / (1000 * 60 * 60));
                var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var s = Math.floor((diff % (1000 * 60)) / 1000);

                $hours.text(h < 10 ? "0" + h : h);
                $mins.text(m < 10 ? "0" + m : m);
                $secs.text(s < 10 ? "0" + s : s);

                if (diff <= 0) {
                    clearInterval(timer);
                }
            }

            updateClock();
            var timer = setInterval(updateClock, 1000);
        }

        startFlashCountdown();
    }

    $(document).ready(function () {
        sfInitModernCart();
        sfInitModernCheckout();
        sfInitOrderSuccess();
        sfInitTrackOrder();
        sfInitSellerOnboarding();
        sfInitStorefront();
    });

})(jQuery);
