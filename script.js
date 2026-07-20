// =========================
// SHOPPING CART
// =========================

let cart = [];


// ADD TO CART BUTTONS

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

addToCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productName = this.dataset.name;
        const productPrice = Number(this.dataset.price);

        const existingProduct = cart.find(
            item => item.name === productName
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        updateCartCount();

        alert(productName + " added to your cart! 🛍️");

    });

});


// UPDATE CART NUMBER

function updateCartCount() {

    const cartCount = document.querySelector(".cart-count");

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;

}


// CART BUTTON

// =========================
// CART POPUP
// =========================

const cartButton = document.querySelector(".cart-button");
const cartModal = document.querySelector("#cart-modal");
const closeCart = document.querySelector("#close-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

cartButton.addEventListener("click", function () {

    renderCart();

    cartModal.classList.add("active");

});


function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty! 🛍️</p>";

        cartTotal.textContent = "";

        return;

    }

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <strong>${item.name}</strong>

                <p>
                    ₹${item.price} × ${item.quantity}
                    = ₹${itemTotal}
                </p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    cartTotal.textContent =
        "Total: ₹" + total;

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();

    renderCart();

}


closeCart.addEventListener("click", function () {

    cartModal.classList.remove("active");

});


// =========================
// BUY NOW - QR PAYMENT
// =========================

// =========================
// BUY NOW - QR PAYMENT
// =========================

const buyNowButtons = document.querySelectorAll(".buy-now-button");

buyNowButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productName = this.dataset.name;
        const productPrice = this.dataset.price;

        const paymentWindow = window.open("", "_blank");

        if (!paymentWindow) {
            alert("Please allow pop-ups for this website to open the payment QR code.");
            return;
        }

        paymentWindow.document.write(`
            <html>
            <head>
                <title>Pay for ${productName}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>

            <body style="
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 25px;
                background: #fffdf9;
            ">

                <h2>${productName}</h2>

                <h3>Amount: ₹${productPrice}</h3>

                <p>Scan the QR code below to pay using PhonePe or any UPI app.</p>

                <img
                    src="payment-qr.jpg"
                    alt="Payment QR Code"
                    style="
                        width: 280px;
                        max-width: 90%;
                        border-radius: 12px;
                    "
                >

                <p>After payment, please keep your payment confirmation.</p>

            </body>
            </html>
        `);

        paymentWindow.document.close();

    });

});
// =========================
// ORDER FORM
// =========================

const orderFormContainer =
    document.querySelector("#order-form-container");

const orderForm =
    document.querySelector("#order-form");

const selectedProduct =
    document.querySelector("#selected-product");

const closeOrderForm =
    document.querySelector("#close-order-form");

let selectedProductName = "";
let selectedProductPrice = 0;


// BUY NOW BUTTONS

document.querySelectorAll(".buy-now-button").forEach(button => {

    button.addEventListener("click", function () {

        selectedProductName = this.dataset.name;
        selectedProductPrice = Number(this.dataset.price);

        selectedProduct.textContent =
            selectedProductName +
            " — ₹" +
            selectedProductPrice;

        orderFormContainer.classList.add("active");

    });

});


// CLOSE FORM

closeOrderForm.addEventListener("click", function () {

    orderFormContainer.classList.remove("active");

});


// SUBMIT FORM

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const quantity =
        document.querySelector("#customer-quantity").value;

    const total =
        selectedProductPrice * quantity;

    document.querySelector("#payment-amount").textContent =
        "Please pay ₹" + total;

    document.querySelector("#payment-section")
        .classList.add("active");

});