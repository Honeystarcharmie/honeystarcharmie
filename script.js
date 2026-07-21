// =========================
// VARIABLES
// =========================

let cart = [];

let selectedProductName = "";
let selectedProductPrice = 0;


// =========================
// ELEMENTS
// =========================

const addToCartButtons =
    document.querySelectorAll(".add-to-cart-button");

const buyNowButtons =
    document.querySelectorAll(".buy-now-button");

const cartButton =
    document.querySelector(".cart-button");

const cartModal =
    document.querySelector("#cart-modal");

const closeCart =
    document.querySelector("#close-cart");

const cartItems =
    document.querySelector("#cart-items");

const cartTotal =
    document.querySelector("#cart-total");

const cartCheckoutButton =
    document.querySelector("#cart-checkout-button");

const orderFormContainer =
    document.querySelector("#order-form-container");

const orderForm =
    document.querySelector("#order-form");

const selectedProduct =
    document.querySelector("#selected-product");

const closeOrderForm =
    document.querySelector("#close-order-form");

const paymentSection =
    document.querySelector("#payment-section");

const paymentAmount =
    document.querySelector("#payment-amount");


// =========================
// ADD TO CART
// =========================

addToCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productName =
            this.dataset.name;

        const productPrice =
            Number(this.dataset.price);


        const existingProduct =
            cart.find(item =>
                item.name === productName
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


        alert(
            productName +
            " added to your cart! 🛍️"
        );

    });

});


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount =
        document.querySelector(".cart-count");


    let totalItems = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

    });


    cartCount.textContent =
        totalItems;

}


// =========================
// OPEN CART
// =========================

cartButton.addEventListener("click", function () {

    renderCart();

    cartModal.classList.add("active");

});


// =========================
// RENDER CART
// =========================

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

                <strong>
                    ${item.name}
                </strong>

                <p>
                    ₹${item.price}
                    ×
                    ${item.quantity}
                    =
                    ₹${itemTotal}
                </p>

                <button
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    cartTotal.textContent =
        "Total: ₹" + total;

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();

    renderCart();

}


// =========================
// CLOSE CART
// =========================

closeCart.addEventListener("click", function () {

    cartModal.classList.remove("active");

});


// =========================
// CART → CHECKOUT
// =========================

cartCheckoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! 🛍️"
        );

        return;

    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

    });


    const productNames =
        cart.map(item => {

            return (
                item.name +
                " × " +
                item.quantity
            );

        }).join(", ");


    selectedProductName =
        productNames;


    selectedProductPrice =
        total;


    selectedProduct.textContent =
        productNames +
        " — Total: ₹" +
        total;


    document.querySelector(
        "#customer-quantity"
    ).value = 1;


    cartModal.classList.remove("active");


    orderFormContainer.classList.add("active");

});


// =========================
// BUY NOW
// =========================

buyNowButtons.forEach(button => {

    button.addEventListener("click", function () {

        selectedProductName =
            this.dataset.name;


        selectedProductPrice =
            Number(
                this.dataset.price
            );


        selectedProduct.textContent =
            selectedProductName +
            " — ₹" +
            selectedProductPrice;


        document.querySelector(
            "#customer-quantity"
        ).value = 1;


        orderFormContainer.classList.add("active");

    });

});


// =========================
// CLOSE ORDER FORM
// =========================

closeOrderForm.addEventListener("click", function () {

    orderFormContainer.classList.remove("active");

});


// =========================
// SUBMIT ORDER → PAYMENT
// =========================

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const quantity =
        Number(
            document.querySelector(
                "#customer-quantity"
            ).value
        );


    const total =
        selectedProductPrice *
        quantity;


    paymentAmount.textContent =
        "Please pay ₹" +
        total;


    paymentSection.classList.add("active");

});