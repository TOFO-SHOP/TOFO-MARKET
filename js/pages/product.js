/* ======================================================
   TOFO MARKET - PRODUCT DETAIL PAGE LOGIC
   Version: 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
    loadProductDetail();
});


function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}


function loadProductDetail() {

    const targetId = "product-detail";

    try {

        if (window.ToFoLoading) {
            ToFoLoading.show(targetId, "Loading product...");
        }

        setTimeout(function () {

            const products = window.ToFoProducts || [];
            const productId = getProductIdFromUrl();

            const product = products.find(function (p) {
                return p.id === productId;
            });

            if (!product) {
                if (window.ToFoError) {
                    ToFoError.show(targetId, "Ye product nahi mila.");
                }
                return;
            }

            renderProductDetail(product);

        }, 400);

    } catch (error) {

        console.error("Product detail error:", error);

        if (window.ToFoError) {
            ToFoError.show(targetId, error.message);
        }

    }

}


function renderProductDetail(product) {

    const container = document.getElementById("product-detail");
    if (!container) return;

    container.innerHTML = `

        <div class="tf-pd__image-wrap">
            <img src="${product.image}" alt="${product.name}" class="tf-pd__image">
        </div>

        <div class="tf-container tf-pd__body">

            <h1 class="tf-pd__title">${product.name}</h1>

            <div class="tf-pd__rating">
                ⭐ ${product.productRating.stars}
                <span>(${product.productRating.reviews} reviews)</span>
            </div>

            <div class="tf-pd__price">
                ${product.price.toLocaleString()} ${product.currency}
            </div>

            <div class="tf-pd__location">📍 Delivers from ${product.location}</div>

            <div class="tf-pd__seller">
                <div>
                    ${product.seller.verified ? "✅" : ""}
                    <strong>${product.seller.name}</strong>
                </div>
                <div class="tf-pd__seller-rating">${product.seller.rating}% Positive Seller Rating</div>
            </div>

            <div class="tf-pd__stock ${product.stock ? "in-stock" : "out-stock"}">
                ${product.stock ? "✅ In Stock" : "❌ Out of Stock"}
            </div>

            <div class="tf-pd__qty">
                <span>Quantity:</span>
                <div class="tf-pd__qty-control">
                    <button id="qtyMinus" aria-label="Decrease quantity">−</button>
                    <span id="qtyValue">1</span>
                    <button id="qtyPlus" aria-label="Increase quantity">+</button>
                </div>
            </div>

            <div class="tf-pd__actions">
                <button class="tf-btn tf-btn--cart" id="addToCartBtn" ${!product.stock ? "disabled" : ""}>
                    🛒 Add to Cart
                </button>
                <button class="tf-btn tf-btn--buynow" ${!product.stock ? "disabled" : ""}>
                    Buy Now
                </button>
            </div>

            <div class="tf-pd__section">
                <h2>Product Details</h2>
                <p>Category: ${product.category}</p>
                <p>Ye ek dummy description hai — real product description backend se aayegi.</p>
            </div>

            <div class="tf-pd__section">
                <h2>Delivery Info</h2>
                <p>📦 ${product.location} branch se pickup available — open karke verify kar sakte hain.</p>
                <p>🚚 Home delivery bhi available hai (no-claim policy applies).</p>
            </div>

        </div>
    `;

    // Quantity buttons
    let qty = 1;
    const qtyValueEl = document.getElementById("qtyValue");
    document.getElementById("qtyMinus").addEventListener("click", function () {
        if (qty > 1) qty--;
        qtyValueEl.textContent = qty;
    });
    document.getElementById("qtyPlus").addEventListener("click", function () {
        qty++;
        qtyValueEl.textContent = qty;
    });

    const cartBtn = document.getElementById("addToCartBtn");
    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            alert(`${qty} x ${product.name} cart mein add ho gaya (abhi demo hai).`);
        });
    }

                                       }
