let cart = [];

let selectedProductName = "";
let selectedProductPrice = 0;
let isCartCheckout = false;

// =========================
// ELEMENTS
// =========================

const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
const buyNowButtons = document.querySelectorAll(".buy-now-button");

const cartButton = document.querySelector(".cart-button");
const cartModal = document.querySelector("#cart-modal");
const closeCart = document.querySelector("#close-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartCheckoutButton = document.querySelector("#cart-checkout-button");

const orderFormContainer = document.querySelector("#order-form-container");
const orderForm = document.querySelector("#order-form");
const selectedProduct = document.querySelector("#selected-product");
const closeOrderForm = document.querySelector("#close-order-form");

const paymentSection = document.querySelector("#payment-section");
const paymentAmount = document.querySelector("#payment-amount");

const quantityInput = document.querySelector("#customer-quantity");

// =========================
// SHIPPING FUNCTION
// =========================

function getShipping(subtotal) {

```
if (subtotal < 400) {
    return 50;
}

return 0;
```

}

// =========================
// ADD TO CART
// =========================

addToCartButtons.forEach(function (button) {

```
button.addEventListener("click", function () {

    const productName = this.dataset.name;
    const productPrice = Number(this.dataset.price);

    const existingProduct = cart.find(function (item) {
        return item.name === productName;
    });

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
```

});

// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

```
const cartCount = document.querySelector(".cart-count");

let totalItems = 0;

cart.forEach(function (item) {

    totalItems += item.quantity;

});

cartCount.textContent = totalItems;
```

}

// =========================
// OPEN CART
// =========================

cartButton.addEventListener("click", function () {

```
renderCart();

cartModal.classList.add("active");
```

});

// =========================
// RENDER CART
// =========================

function renderCart() {

```
cartItems.innerHTML = "";

let subtotal = 0;

if (cart.length === 0) {

    cartItems.innerHTML =
        "<p>Your cart is empty! 🛍️</p>";

    cartTotal.textContent = "";

    return;

}

cart.forEach(function (item, index) {

    const itemTotal =
        item.price * item.quantity;

    subtotal += itemTotal;

    const cartItem =
        document.createElement("div");

    cartItem.classList.add("cart-item");

    const itemName =
        document.createElement("strong");

    itemName.textContent =
        item.name;

    const itemPrice =
        document.createElement("p");

    itemPrice.textContent =
        "₹" +
        item.price +
        " × " +
        item.quantity +
        " = ₹" +
        itemTotal;

    const removeButton =
        document.createElement("button");

    removeButton.textContent =
        "Remove";

    removeButton.addEventListener("click", function () {

        removeFromCart(index);

    });

    cartItem.appendChild(itemName);

    cartItem.appendChild(itemPrice);

    cartItem.appendChild(removeButton);

    cartItems.appendChild(cartItem);

});

const shipping =
    getShipping(subtotal);

const finalTotal =
    subtotal + shipping;

cartTotal.textContent =
    "Subtotal: ₹" +
    subtotal +
    " | Shipping: ₹" +
    shipping +
    " | Total: ₹" +
    finalTotal;
```

}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

```
cart.splice(index, 1);

updateCartCount();

renderCart();
```

}

// =========================
// CLOSE CART
// =========================

closeCart.addEventListener("click", function () {

```
cartModal.classList.remove("active");
```

});

// =========================
// CART CHECKOUT
// =========================

cartCheckoutButton.addEventListener("click", function () {

```
if (cart.length === 0) {

    alert("Your cart is empty! 🛍️");

    return;

}

let subtotal = 0;

cart.forEach(function (item) {

    subtotal +=
        item.price *
        item.quantity;

});

const shipping =
    getShipping(subtotal);

const finalTotal =
    subtotal + shipping;

const productNames =
    cart.map(function (item) {

        return item.name +
            " × " +
            item.quantity;

    }).join(", ");

selectedProductName =
    productNames;

selectedProductPrice =
    finalTotal;

isCartCheckout =
    true;

selectedProduct.textContent =
    productNames +
    " — Total: ₹" +
    finalTotal;

quantityInput.value = 1;

cartModal.classList.remove("active");

orderFormContainer.classList.add("active");
```

});

// =========================
// BUY NOW
// =========================

buyNowButtons.forEach(function (button) {

```
button.addEventListener("click", function () {

    selectedProductName =
        this.dataset.name;

    selectedProductPrice =
        Number(this.dataset.price);

    isCartCheckout =
        false;

    selectedProduct.textContent =
        selectedProductName +
        " — ₹" +
        selectedProductPrice;

    quantityInput.value = 1;

    orderFormContainer.classList.add("active");

});
```

});

// =========================
// CLOSE ORDER FORM
// =========================

closeOrderForm.addEventListener("click", function () {

```
orderFormContainer.classList.remove("active");
```

});

// =========================
// SUBMIT ORDER
// =========================

orderForm.addEventListener("submit", function (event) {

```
event.preventDefault();

const quantity =
    Number(quantityInput.value);

let subtotal = 0;

if (isCartCheckout) {

    subtotal =
        selectedProductPrice;

} else {

    subtotal =
        selectedProductPrice *
        quantity;

}

const shipping =
    getShipping(subtotal);

const finalTotal =
    subtotal + shipping;

paymentAmount.textContent =
    "Subtotal: ₹" +
    subtotal +
    " | Shipping: ₹" +
    shipping +
    " | Please pay ₹" +
    finalTotal;

paymentSection.classList.add("active");
```

});
