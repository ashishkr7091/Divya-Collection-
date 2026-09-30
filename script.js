// =====================================================
// DIVYA COLLECTION - MAIN JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // SCROLL ANIMATION
    // =================================================

    const animatedElements = document.querySelectorAll(
        ".category-card, .product-card, .feature, .contact-box"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });



    // =================================================
    // PRODUCT ELEMENTS
    // =================================================

    const products = document.querySelectorAll(".product-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const searchInput =
        document.getElementById("productSearch");

    const productCount =
        document.getElementById("productCount");



    // =================================================
    // PRODUCT FILTER
    // =================================================

    let currentFilter = "all";
    let currentSearch = "";


    function updateProducts() {

        let visibleProducts = 0;


        products.forEach((product) => {

            const category =
                product.dataset.category || "";

            const text =
                product.innerText.toLowerCase();


            const categoryMatch =
                currentFilter === "all" ||
                category === currentFilter;


            const searchMatch =
                text.includes(currentSearch);


            if (categoryMatch && searchMatch) {

                product.classList.remove("hide");

                product.classList.remove(
                    "show-filter"
                );

                void product.offsetWidth;

                product.classList.add(
                    "show-filter"
                );

                visibleProducts++;

            } else {

                product.classList.add("hide");

                product.classList.remove(
                    "show-filter"
                );

            }

        });


        // Product count

        if (!productCount) {
            return;
        }


        if (
            currentFilter === "all" &&
            currentSearch === ""
        ) {

            productCount.textContent =
                "Showing all products";

        } else {

            productCount.textContent =
                visibleProducts +
                (
                    visibleProducts === 1
                        ? " product found"
                        : " products found"
                );

        }

    }



    // =================================================
    // FILTER BUTTON CLICK
    // =================================================

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            currentFilter =
                button.dataset.filter;


            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            updateProducts();

        });

    });



    // =================================================
    // PRODUCT SEARCH
    // =================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                currentSearch =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                updateProducts();

            }
        );

    }



    // =================================================
    // IMAGE POPUP
    // =================================================

    const popup =
        document.getElementById("imagePopup");

    const popupImage =
        document.getElementById("popupImage");

    const popupClose =
        document.getElementById("popupClose");


    const productImages =
        document.querySelectorAll(
            ".product-card img"
        );


    if (
        popup &&
        popupImage &&
        popupClose
    ) {


        // Open popup

        productImages.forEach((image) => {

            image.addEventListener(
                "click",
                () => {

                    popupImage.src =
                        image.src;

                    popupImage.alt =
                        image.alt;

                    popup.classList.add(
                        "active"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });



        // Close button

        popupClose.addEventListener(
            "click",
            closePopup
        );



        // Click outside image

        popup.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === popup
                ) {

                    closePopup();

                }

            }
        );



        // ESC button

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    closePopup();

                }

            }
        );


    }



    function closePopup() {

        if (!popup) {
            return;
        }


        popup.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }



    // =================================================
    // MOBILE MENU / NAVIGATION
    // =================================================

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                // Smooth scrolling is handled
                // by CSS.

            }
        );

    });



    // =================================================
    // WHATSAPP BUTTON
    // =================================================

    const whatsappButtons =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                // WhatsApp link opens normally.

            }
        );

    });



    // =================================================
    // INITIAL PRODUCT STATE
    // =================================================

    updateProducts();


});