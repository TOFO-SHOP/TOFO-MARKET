/* ======================================================
   TOFO MARKET - CART PAGE LOGIC
   Version: 1.0
====================================================== */

document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});


function renderCart() {

    const container = document.getElementById("cart-content");
    const items = ToFoCart.getItems();

    if (!items.length) {
        container.innerHTML = `
            <div class="tf-cart__empty">
                <p>🛒 Aapka cart abhi khali hai.</p>
                <a href="index.html" class="tf-btn tf-btn--primary">Shopping Shuru Karein</a>
            </div>
        `;
        return;
    }

    let itemsHtml = "";

    items.forEach(function (item) {
        itemsHtml += `
        <div class="tf-cart-item">
            <img src="${item.image}" alt="${item.name}" class="tf-cart-item__image">
            <div class="tf-cart-item__body">
                <h3>${item.name}</h3>
                <span class="tf-location">📍 ${item.location}</span>
                <strong class="tf-price">${item.price.toLocaleString()} ${item.currency}</strong>

                <div class="tf-cart-item__row">
                    <div class="tf-pd__qty-control">
                        <button class="qty-minus" data-id="${item.id}">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="tf-cart-item__remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = `
        <div class="tf-cart-list">${itemsHtml}</div>
        <div class="tf-cart-summary">
            <div class="tf-cart-summary__row">
                <span>Total (${ToFoCart.getTotalCount()} items)</span>
                <strong>${ToFoCart.getTotalPrice().toLocaleString()} PKR</strong>
            </div>
            <button class="tf-btn tf-btn--primary tf-cart-summary__checkout">Proceed to Checkout</button>
        </div>
    `;

    attachCartEvents();

}


function attachCartEvents() {

    document.querySelectorAll(".qty-minus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.dataset.id);
            const item = ToFoCart.getItems().find(function (i) { return i.id === id; });
            if (item) {
                ToFoCart.updateQty(id, item.qty - 1);
                renderCart();
            }
        });
    });

    document.querySelectorAll(".qty-plus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.dataset.id);
            const item = ToFoCart.getItems().find(function (i) { return i.id === id; });
            if (item) {
                ToFoCart.updateQty(id, item.qty + 1);
                renderCart();
            }
        });
    });

    document.querySelectorAll(".tf-cart-item__remove").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = parseInt(btn.dataset.id);
            ToFoCart.removeItem(id);
            renderCart();
        });
    });

}
