// =========================
// SHOPPING CART
// =========================

let cart = [];


// =========================
// ADD TO CART
// =========================

const addToCartButtons =
    document.querySelectorAll(".add-to-cart-button");

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

    cartCount.textContent = totalItems;

}


// =========================
// CART POPUP
// =========================

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
// CHECKOUT FROM CART
// =========================

cartCheckoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty! 🛍️");

        return;

    }


    // Close cart popup

    cartModal.classList.remove("active");


    // Calculate total

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    // Create a combined product name

    const productNames = cart
        .map(item => `${item.name} × ${item.quantity}`)
        .join(", ");


    // Put cart details into order form

    selectedProductName = productNames;

    selectedProductPrice = total;


    selectedProduct.textContent =
        productNames + " — Total: ₹" + total;


    // Reset quantity to 1 because cart quantities
    // are already included in the total

    document.querySelector("#customer-quantity").value = 1;


    // Open order form

    orderFormContainer.classList.add("active");

});


// =========================
// BUY NOW
// =========================

const buyNowButtons =
    document.querySelectorAll(".buy-now-button");

buyNowButtons.forEach(button => {

    button.addEventListener("click", function () {

        selectedProductName =
            this.dataset.name;

        selectedProductPrice =
            Number(this.dataset.price);


        selectedProduct.textContent =
            selectedProductName +
            " — ₹" +
            selectedProductPrice;


        document.querySelector("#customer-quantity").value = 1;


        orderFormContainer.classList.add("active");

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

const paymentSection =
    document.querySelector("#payment-section");

const paymentAmount =
    document.querySelector("#payment-amount");


let selectedProductName = "";

let selectedProductPrice = 0;


// =========================
// CLOSE ORDER FORM
// =========================

closeOrderForm.addEventListener("click", function () {

    orderFormContainer.classList.remove("active");

});


// =========================
// SUBMIT ORDER FORM
// =========================

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const quantity =
        Number(
            document.querySelector("#customer-quantity").value
        );


    const total =
        selectedProductPrice * quantity;


    paymentAmount.textContent =
        "Please pay ₹" + total;


    paymentSection.classList.add("active");

});