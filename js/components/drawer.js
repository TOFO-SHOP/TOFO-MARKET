/* ======================================================
   TOFO MARKET - DRAWER / HAMBURGER MENU
   Version: 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const drawer = document.getElementById("sideDrawer");
    const overlay = document.getElementById("drawerOverlay");
    const closeBtn = document.getElementById("drawerClose");
    const deliverBar = document.getElementById("deliverBar");
    const cityDisplay = document.getElementById("city-display");
    const cityLinks = document.querySelectorAll(".tf-city-link");

    function openDrawer() {
        drawer.classList.add("is-open");
        overlay.classList.add("is-visible");
    }

    function closeDrawer() {
        drawer.classList.remove("is-open");
        overlay.classList.remove("is-visible");
    }

    if (menuToggle) menuToggle.addEventListener("click", openDrawer);
    if (deliverBar) deliverBar.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    cityLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const city = link.dataset.city;

            if (cityDisplay) cityDisplay.textContent = city;

            // Agar home.js mein filterByCity function bana, use call karo
            if (typeof filterByCity === "function") {
                filterByCity(city);
            }

            closeDrawer();
        });
    });

});
