/* ======================================================
   TOFO MARKET - CHECKOUT PAGE LOGIC
   Version: 1.0

   Delivery policy (as discussed):
   - Home Delivery  = No Claim
   - Branch Pickup  = Claim Available (open & verify)
====================================================== */

let selectedDeliveryMethod = "home";
let selectedCity = "Karachi";

document.addEventListener("DOMContentLoaded", function () {
    renderCheckout();
});


function renderCheckout() {

    const container = document.getElementById("checkout-content");
    const items = ToFoCart.getItems();

    if (!items.length) {
        container.innerHTML = `
            <div class="tf-cart__empty">
                <p>🛒 Cart khali hai — checkout se pehle kuch add karein.</p>
                <a href="index.html" class="tf-btn tf-btn--primary">Shopping Shuru Karein</a>
            </div>
        `;
        return;
    }

    let itemsHtml = "";
    items.forEach(function (item) {
        itemsHtml += `
        <div class="tf-checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="tf-checkout-item__body">
                <span>${item.name}</span>
                <span class="tf-checkout-item__qty">Qty: ${item.qty}</span>
            </div>
            <strong>${(item.price * item.qty).toLocaleString()} ${item.currency}</strong>
        </div>
        `;
    });

    container.innerHTML = `

        <!-- Delivery City -->
        <div class="tf-checkout-section">
            <h2>Delivery City</h2>
            <div class="tf-choice-group" id="cityChoice">
                <button class="tf-choice is-active" data-city="Karachi">Karachi</button>
                <button class="tf-choice" data-city="Lahore">Lahore</button>
            </div>
        </div>

        <!-- Delivery Method -->
        <div class="tf-checkout-section">
            <h2>Delivery Method</h2>

            <label class="tf-delivery-option is-active" id="optHome">
                <input type="radio" name="deliveryMethod" value="home" checked>
                <div>
                    <strong>🏠 Home Delivery</strong>
                    <p>Aapke address pe pahunchega. <span class="tf-tag tf-tag--warn">No Claim</span></p>
                </div>
            </label>

            <label class="tf-delivery-option" id="optBranch">
                <input type="radio" name="deliveryMethod" value="branch">
                <div>
                    <strong>🏢 Branch Pickup</strong>
                    <p>Branch pe khol kar verify karein. <span class="tf-tag tf-tag--success">Claim Available</span></p>
                </div>
            </label>
        </div>

        <!-- Order Summary -->
        <div class="tf-checkout-section">
            <h2>Order Summary</h2>
            <div class="tf-checkout-list">${itemsHtml}</div>

            <div class="tf-checkout-total">
                <span>Total (${ToFoCart.getTotalCount()} items)</span>
                <strong>${ToFoCart.getTotalPrice().toLocaleString()} PKR</strong>
            </div>
        </div>

        <button class="tf-btn tf-btn--primary tf-checkout-place" id="placeOrderBtn">
            Place Order (Cash on Delivery)
        </button>

    `;

    attachCheckoutEvents();

}


function attachCheckoutEvents() {

    // City selection
    document.querySelectorAll("#cityChoice .tf-choice").forEach(function (btn) {
        btn.addEventListener("click", function () {
            selectedCity = btn.dataset.city;
            document.querySelectorAll("#cityChoice .tf-choice").forEach(function (b) {
                b.classList.remove("is-active");
            });
            btn.classList.add("is-active");
        });
    });

    // Delivery method selection
    const homeOpt = document.getElementById("optHome");
    const branchOpt = document.getElementById("optBranch");

    function selectMethod(method) {
        selectedDeliveryMethod = method;
        homeOpt.classList.toggle("is-active", method === "home");
        branchOpt.classList.toggle("is-active", method === "branch");
    }

    homeOpt.addEventListener("click", function () { selectMethod("home"); });
    branchOpt.addEventListener("click", function () { selectMethod("branch"); });

    // Place order
    document.getElementById("placeOrderBtn").addEventListener("click", function () {

        const orderId = "TF" + Date.now().toString().slice(-8);

        alert(
            `✅ Order Placed!\n\nOrder ID: ${orderId}\nCity: ${selectedCity}\nDelivery: ${selectedDeliveryMethod === "home" ? "Home Delivery (No Claim)" : "Branch Pickup (Claim Available)"}\nTotal: ${ToFoCart.getTotalPrice().toLocaleString()} PKR`
        );

        ToFoCart.saveItems([]);
        window.location.href = "index.html";

    });

                                                                }
