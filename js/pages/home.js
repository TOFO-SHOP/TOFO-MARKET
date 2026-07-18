/* ======================================================
   TOFO MARKET - HOME PAGE LOGIC
   Version: 1.5 (search bar ab search.html pe le jati hai)
====================================================== */

let currentCity = "All";

document.addEventListener("DOMContentLoaded", function () {

    loadProducts();

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

});


function loadProducts() {

    const productGrid = "product-grid";

    try {

        if (window.ToFoLoading) {
            ToFoLoading.show(productGrid, "Loading products...");
        }

        setTimeout(function () {

            const products = window.ToFoProducts || [];

            if (!products.length) {
                if (window.ToFoError) {
                    ToFoError.show(productGrid, "No products available.");
                }
                return;
            }

            renderProducts(applyCityFilter(products));

        }, 500);

    } catch (error) {

        console.error("Product loading error:", error);

        if (window.ToFoError) {
            ToFoError.show(productGrid, error.message);
        }

    }

}


function applyCityFilter(products) {

    if (currentCity === "All") {
        return products;
    }

    return products.filter(function (product) {
        return product.location === currentCity;
    });

}


function filterByCity(city) {

    currentCity = city;

    const products = window.ToFoProducts || [];
    const filtered = applyCityFilter(products);

    if (!filtered.length) {
        if (window.ToFoError) {
            ToFoError.show("product-grid", `${city} mein abhi koi product nahi hai.`);
        }
        const count = document.getElementById("product-count");
        if (count) count.innerHTML = "0 Products";
        return;
    }

    renderProducts(filtered);

}


function renderProducts(products) {

    const grid = document.getElementById("product-grid");
    const count = document.getElementById("product-count");

    if (!grid) {
        return;
    }

    if (count) {
        count.innerHTML = `${products.length} Products`;
    }

    grid.innerHTML = "";

    products.forEach(function (product) {

const card = `
<a href="product.html?id=${product.id}" class="tf-product-card">

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
`;        

        grid.innerHTML += card;

    });

                                    }
