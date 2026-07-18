/* ======================================================
   TOFO MARKET - CART LOGIC (Shared across all pages)
   Version: 1.0
   Uses localStorage taake cart page-reload/navigate
   karne par bhi yaad rahe.
====================================================== */

const ToFoCart = {

    STORAGE_KEY: "tofo_cart",

    getItems: function () {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    saveItems: function (items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateCartBadge();
    },

    addItem: function (product, qty) {
        const items = this.getItems();
        const existing = items.find(function (i) { return i.id === product.id; });

        if (existing) {
            existing.qty += qty;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.image,
                location: product.location,
                qty: qty
            });
        }

        this.saveItems(items);
    },

    removeItem: function (id) {
        const items = this.getItems().filter(function (i) { return i.id !== id; });
        this.saveItems(items);
    },

    updateQty: function (id, qty) {
        const items = this.getItems();
        const item = items.find(function (i) { return i.id === id; });
        if (item) {
            item.qty = qty;
            if (item.qty < 1) item.qty = 1;
        }
        this.saveItems(items);
    },

    getTotalCount: function () {
        return this.getItems().reduce(function (sum, i) { return sum + i.qty; }, 0);
    },

    getTotalPrice: function () {
        return this.getItems().reduce(function (sum, i) { return sum + (i.price * i.qty); }, 0);
    },

    updateCartBadge: function () {
        const badges = document.querySelectorAll(".tf-cart-count");
        badges.forEach(function (badge) {
            badge.textContent = ToFoCart.getTotalCount();
        });
    }

};

document.addEventListener("DOMContentLoaded", function () {
    ToFoCart.updateCartBadge();
});

window.ToFoCart = ToFoCart;
