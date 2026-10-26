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

    /*== Cart sidebar JS ==*/
    $(".mn-cart-toggle").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-cart-overlay").fadeIn();
        $(".mn-side-cart").addClass("mn-open-cart");
    });
    $(".mn-side-cart-overlay, .mn-cart-close").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-cart-overlay").fadeOut();
        $(".mn-side-cart").removeClass("mn-open-cart");
    });
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
        $(".mn-cart-notify").remove();
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

    /*== Add to cart button notify js ==*/
    $(document).on("click", ".mn-add-cart", function (e) {
        e.preventDefault();
        $(".mn-wish-notify").remove();
        $(".mn-compare-notify").remove();
        $(".mn-cart-notify").remove();
        var iscartlist = $(this).hasClass("active");
        if (iscartlist) {
            $(this).removeClass("active");
            $("footer").after(
                '<div class="mn-cart-notify"><p class="cart-note remove">Removed product from <a href="cart.html">Cart</a> successfully!</p></div>',
            );
        } else {
            $(this).addClass("active");
            $("footer").after(
                '<div class="mn-cart-notify"><p class="cart-note add">Added product to <a href="cart.html">Cart</a> successfully!</p></div>',
            );
        }
        setTimeout(function () {
            $(".mn-cart-notify").fadeOut();
        }, 2000);
    });

    /*== Compare notify js ==*/
    $(document).on("click", ".mn-compare", function (e) {
        e.preventDefault();
        $(".mn-wish-notify").remove();
        $(".mn-compare-notify").remove();
        $(".mn-cart-notify").remove();
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
        if (e.key === "Escape" && $(".mn-sidebar").hasClass("mn-open-category")) {
            $(".mn-sidebar-overlay").fadeOut();
            $(".mn-sidebar").removeClass("mn-open-category");
        }
    });

    /*== Search sidebar JS ==*/
    $(".mn-search-toggle").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-search-overlay").fadeIn();
        $(".mn-side-search").addClass("mn-open-search");
        setTimeout(function () {
            $(".mn-side-search input[name='q']").trigger("focus");
        }, 300);
    });
    $(".mn-side-search-overlay, .mn-search-close").on("click", function (e) {
        e.preventDefault();
        $(".mn-side-search-overlay").fadeOut();
        $(".mn-side-search").removeClass("mn-open-search");
    });
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $(".mn-side-search").hasClass("mn-open-search")) {
            $(".mn-side-search-overlay").fadeOut();
            $(".mn-side-search").removeClass("mn-open-search");
        }
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

    /*== Product Image Zoom ==*/
    if ($.fn.zoom && $(".zoom-image-hover").length) {
        $(".zoom-image-hover").zoom();
    }

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
    }

    /*== Add More Product slider section (Single Product Page) ==*/
    $(".mn-add-more-slider").owlCarousel({
        margin: 24,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 1500,
        autoplay: false,
        items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                margin: 12,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            },
            1400: {
                items: 3,
            },
        },
    });

    /*== Price Range slider ( Shop page ) == */
    const slider = document.getElementById("mn-sliderPrice");
    if (slider) {
        const rangeMin = parseInt(slider.dataset.min);
        const rangeMax = parseInt(slider.dataset.max);
        const step = parseInt(slider.dataset.step);
        const filterInputs = document.querySelectorAll("input.filter__input");

        noUiSlider.create(slider, {
            start: [rangeMin, rangeMax],
            connect: true,
            step: step,
            range: {
                min: rangeMin,
                max: rangeMax,
            },

            // make numbers whole
            format: {
                to: (value) => value,
                from: (value) => value,
            },
        });

        // bind inputs with noUiSlider
        slider.noUiSlider.on("update", (values, handle) => {
            filterInputs[handle].value = values[handle];
        });

        filterInputs.forEach((input, indexInput) => {
            input.addEventListener("change", () => {
                slider.noUiSlider.setHandle(indexInput, input.value);
            });
        });
    }

    /*== Category section ==*/
    $(".mn-cat").owlCarousel({
        margin: 24,
        loop: true,
        dots: false,
        nav: false,
        smartSpeed: 500,
        autoplayTimeout: 3000,
        items: 3,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            421: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 4,
            },
            1600: {
                items: 5,
            },
        },
    });

    /*== Product section ==*/
    $(".mn-product").owlCarousel({
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
                items: 2,
                margin: 12,
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
                items: 4,
            },
            1400: {
                items: 4,
            },
            1500: {
                items: 5,
            },
        },
    });

    /*== Product section ==*/
    $(".mn-related").owlCarousel({
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
                items: 2,
                margin: 12,
                dots: false,
            },
            461: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            },
            1400: {
                items: 3,
            },
            1600: {
                items: 4,
            },
        },
    });

    /*== Quick view ==*/
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

    /*== Tooltips ==*/
    $(".mn-modern-banner").owlCarousel({
        loop: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        smartSpeed: 2000,
        autoplay: false,
        autoplayTimeout: 10000,
        margin: 24,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
                scroll: 1,
            },
        },
    });

    /*== Blog section ==*/
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

    /*== Testimonial Slider ==*/
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

    /*== Team (About Page) ==*/
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
        $(".insta-auto, .cat-auto").infiniteslide({
            direction: "left",
            speed: 50,
            clone: 10,
        });

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

    /*== Color Hover To Image Change ==*/
    var $mnproduct = $(".mn-product-card").find(".mn-opt-swatch");

    function initChangeImg($opt) {
        $opt.each(function () {
            var $this = $(this),
                ecChangeImg = $this.hasClass("mn-change-img");

            $this.on("mouseenter", "li", function () {
                changeProductImg($(this));
            });

            $this.on("click", "li", function () {
                changeProductImg($(this));
            });

            function changeProductImg(thisObj) {
                var $this = thisObj;
                var $load = $this.find("a");

                var $proimg = $this.closest(".mn-product-card").find(".mn-product-img");

                if (!$load.hasClass("loaded")) {
                    $proimg.addClass("pro-loading");
                }

                var $loaded = $this.find("a").addClass("loaded");

                $this.addClass("active").siblings().removeClass("active");
                if (ecChangeImg) {
                    hoverAddImg($this);
                }
                setTimeout(function () {
                    $proimg.removeClass("pro-loading");
                }, 1000);
                return false;
            }
        });
    }

    function hoverAddImg($this) {
        var $optData = $this.find(".mn-opt-clr-img"),
            $opImg = $optData.attr("data-src"),
            $opImgHover = $optData.attr("data-src-hover") || false,
            $optImgWrapper = $this.closest(".mn-product-card").find(".mn-product-img"),
            $optImgMain = $optImgWrapper.find(".image img.main-img"),
            $optImgMainHover = $optImgWrapper.find(".image img.hover-img");
        if ($opImg.length) {
            $optImgMain.attr("src", $opImg);
        }
        if ($opImg.length) {
            var checkDisable = $optImgMainHover.closest("img.hover-img");
            $optImgMainHover.attr("src", $opImgHover);
            if (checkDisable.hasClass("disable")) {
                checkDisable.removeClass("disable");
            }
        }
        if ($opImgHover === false) {
            $optImgMainHover.closest("img.hover-img").addClass("disable");
        }
    }
    $(window).on("load", function () {
        initChangeImg($mnproduct);
    });
    $("document").ready(function () {
        initChangeImg($mnproduct);
    });

    /*----------------------------- List Grid View -------------------------------- */
    $(".mn-gl-btn").on("click", "button", function () {
        var $this = $(this);
        $this.addClass("active").siblings().removeClass("active");
    });

    // for 100% width list view
    function listView(e) {
        var $gridCont = $(".shop-pro-inner");
        var $listView = $(".pro-gl-content");
        e.preventDefault();
        $gridCont.addClass("list-view");
        $listView.addClass("width-100");
    }

    function gridView(e) {
        var $gridCont = $(".shop-pro-inner");
        var $gridView = $(".pro-gl-content");
        e.preventDefault();
        $gridCont.removeClass("list-view");
        $gridView.removeClass("width-100");
    }

    $(document).on("click", ".btn-grid", gridView);
    $(document).on("click", ".btn-list", listView);

    // for 50% width list view
    function listView50(e) {
        var $gridCont = $(".shop-pro-inner");
        var $listView = $(".pro-gl-content");
        e.preventDefault();
        $gridCont.addClass("list-view-50");
        $listView.addClass("width-50");
    }

    function gridView50(e) {
        var $gridCont = $(".shop-pro-inner");
        var $gridView = $(".pro-gl-content");
        e.preventDefault();
        $gridCont.removeClass("list-view-50");
        $gridView.removeClass("width-50");
    }

    $(document).on("click", ".btn-grid-50", gridView50);
    $(document).on("click", ".btn-list-50", listView50);

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
        if ($(".single-slide-quickview").hasClass("owl-carousel")) {
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
})(jQuery);
