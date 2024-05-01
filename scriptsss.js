
// Show Navbar when small screen || Close Cart Items & Search Textbox
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

// Show Cart Items || Close Navbar & Search Textbox
let cartItem = document.querySelector('.cart');

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

// Show Search Textbox || Close Navbar & Cart Items
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

// Remove Active Icons on Scroll and Close it
window.onscroll = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

// Script for making icon as button
document.getElementById('paper-plane-icon').addEventListener('click', function() {
    // Add your desired action here, e.g. submit form, trigger AJAX request, etc.
    alert('Paper airplane clicked!');
});


//Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// FUNCTIONS FOR CART
function ready() {
    //Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // When quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

   // Buy Button Works
document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

// Function for "Buy Button Works"
function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    
    // Check if there are items in the cart
    if (cartBoxes.length > 0) {
        // Prompt user for payment method selection
        var paymentMethod = prompt("Please choose your payment method: Cash on Delivery (COD) or Online Payment (Credit/Debit Card, GCash, Paymaya)");

        if (paymentMethod) {
            if (paymentMethod.toLowerCase() === "cash on delivery") {
                // For Cash on Delivery, ask for name, address, and phone number
                var name = prompt("Please enter your name:");
                var address = prompt("Please enter your address:");
                var phoneNumber = prompt("Please enter your phone number:");

                alert("Thank you, " + name + "! Your order has been placed via Cash on Delivery, We will deliver your items to " + address + ". We will contact you at " + phoneNumber + " if needed.");
            } else if (paymentMethod.toLowerCase() === "online payment") {
                // For Online Payment, ask for payment type and additional details
                var paymentType = prompt("Please choose your online payment method: Credit/Debit Card, GCash, or Paymaya");

                if (paymentType) {
                    var name = prompt("Please enter your name:");
                    var phoneNumber = prompt("Please enter your phone number:");
                    var address = prompt("Please enter your address:");
                    
                    if (paymentType.toLowerCase() === "credit/debit card") {
                        var cardNumber = prompt("Please enter your credit/debit card number:");
                        alert("Thank you, " + name + "! Your order has been placed via Online Payment using Credit/Debit Card. We will deliver your items to " + address + ". We will contact you at " + phoneNumber + " if needed.");
                    } else {
                        var otp = prompt("Please enter the OTP (One-Time Password) sent to your " + paymentType + " account:");
                        alert("Thank you, " + name + "! Your order has been placed via Online Payment using " + paymentType + ". We will deliver your items to " + address + ". We will contact you at " + phoneNumber + " if needed.");
                    }
                } else {
                    alert("Invalid payment method. Please try again.");
                }
            } else {
                alert("Invalid payment method. Please try again.");
            }
        } else {
            alert("No payment method chosen. Please try again.");
        }
    } else {
        alert("You don't have any items in your cart. Please add items to your cart before placing an order.");
    }
}

 
    // Clear cart after sending data to server
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
 

// Function for "Remove Items from Cart"
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Function for "When quantity changes"
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already added this item to cart!")
            return;
        }
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" min="1" class="cart-quantity">
                    </div>
                    <!-- REMOVE BUTTON -->
                    <i class="fas fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener('change', quantityChanged);

}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;
        
        document.getElementsByClassName("total-price")[0].innerText = "₱" + total;
}
