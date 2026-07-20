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

const cartButton = document.querySelector(".cart-button");

cartButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty! 🛍️");

        return;

    }

    let cartMessage = "Your Cart:\n\n";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartMessage +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";

    });

    cartMessage += "\nTotal: ₹" + total;

    alert(cartMessage);

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