/* ======================================================
   TOFO MARKET - SEARCH PAGE LOGIC
   Version: 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("searchForm");

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const query = document.getElementById("searchInput").value.trim();
            if (query) {
                window.location.href = "search.html?q=" + encodeURIComponent(query);
            }
        });
    }

    loadSearchResults();

});


function getSearchQueryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
}


function loadSearchResults() {

    const targetId = "product-grid";
    const query = getSearchQueryFromUrl();

    const titleEl = document.getElementById("searchTitle");
    const searchInputEl = document.getElementById("searchInput");

    if (titleEl) titleEl.textContent = query ? `Results for "${query}"` : "Search Results";
    if (searchInputEl) searchInputEl.value = query;

    try {

        if (window.ToFoLoading) {
            ToFoLoading.show(targetId, "Searching...");
        }

        setTimeout(function () {

            const products = window.ToFoProducts || [];

            const results = products.filter(function (p) {
                const q = query.toLowerCase();
                return p.name.toLowerCase().includes(q) ||
                       p.category.toLowerCase().includes(q);
            });

            if (!results.length) {
                if (window.ToFoError) {
                    ToFoError.show(targetId, `"${query}" ke liye koi product nahi mila.`);
                }
                const count = document.getElementById("product-count");
                if (count) count.textContent = "0 Products";
                return;
            }

            renderSearchResults(results);

        }, 400);

    } catch (error) {

        console.error("Search error:", error);
        if (window.ToFoError) {
            ToFoError.show(targetId, error.message);
        }

    }

}


function renderSearchResults(products) {

    const grid = document.getElementById("product-grid");
    const count = document.getElementById("product-count");

    if (count) count.textContent = `${products.length} Products`;

    grid.innerHTML = "";

    products.forEach(function (product) {

        const card = `
        <div class="tf-product-card">

            <a href="product.html?id=${product.id}" class="tf-product-card__link">
                <img 
                src="${product.image}"
                alt="${product.name}"
                class="tf-product-card__image"
                >

                <div class="tf-product-card__body">

                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <strong class="tf-price">
                        ${product.price.toLocaleString()} ${product.currency}
                    </strong>

                    <span class="tf-location">
                        📍 ${product.location}
                    </span>

                    <div class="tf-seller">
                        ${product.seller.verified ? "✅" : ""}
                        ${product.seller.name}
                        <small>(${product.seller.rating}% Seller)</small>
                    </div>

                </div>
            </a>

            <a href="product.html?id=${product.id}" class="tf-btn tf-btn--primary tf-product-card__cta">
                View Product
            </a>

        </div>
        `;

        grid.innerHTML += card;

    });

    }
