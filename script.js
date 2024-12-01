// Function to change image, description, and Buy Now link to laptop
function laptop() {
    var buyNowLink = document.getElementById('buy-now-link');
    var imageDisplay = document.getElementById('image-display');
    var description = document.getElementById('description');
    
    // Update the image and description for laptop
    imageDisplay.src = 'product_tile_mba_13_15__fx2g3qlubdym_large.png';
    description.innerHTML = 'MacBook Pro 14″ and 16″ with M4, M4 Pro, or M4 Max chip.<br>The most advanced Mac laptops for demanding workflows. From S$2,199.';
    
    // Change the Buy Now link to the laptop-specific link
    buyNowLink.href = 'buy-laptop.html'; 
}

// Function to change image, description, and Buy Now link to desktop
function desktop() {
    var buyNowLink = document.getElementById('buy-now-link');
    var imageDisplay = document.getElementById('image-display');
    var description = document.getElementById('description');
    
    // Update the image and description for desktop
    imageDisplay.src = 'product_tile_imac_24__inq0od011wuq_large.png'; 
    description.innerHTML = 'iMac 24″ with M4 chip. <br>Vibrant display, ultra-fast performance. From S$1,799.'; 
    
    // Change the Buy Now link to the desktop-specific link
    buyNowLink.href = 'buy-desktop.html'; 
}

// Function to change image, description, and Buy Now link to display
function display() {
    var buyNowLink = document.getElementById('buy-now-link');
    var imageDisplay = document.getElementById('image-display');
    var description = document.getElementById('description');
    
    // Update the image and description for display
    imageDisplay.src = 'product_tile_pro_display__duklzyfwl92e_large.png';
    description.innerHTML = 'Pro Display XDR. 32″ <br>Retina 6K display for professional workflows. From S$5,999.'; 
    
    // Change the Buy Now link to the display-specific link
    buyNowLink.href = 'buy-display.html'; 
}


/*search*/
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const products = document.querySelectorAll('.flex-item3');

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase().trim(); // Normalize input

        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase().trim(); // Normalize attribute
            if (productName.includes(searchTerm)) {
                product.style.display = ''; // Show matching product
            } else {
                product.style.display = 'none'; // Hide non-matching product
            }
        });
    });
});


/*cart*/
// JavaScript for adding items to the cart and updating the counter

// DOM Elements
let listProductHTML = document.querySelector('.flex-container3');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('#cart-counter');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let cart = []; // Array of cart items

// Show/Hide Cart Sidebar
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Update the Total Price
const updateCartTotal = () => {
    let total = 0;
    cart.forEach(item => {
        const productElement = document.querySelector(`.flex-item3[data-id="${item.product_id}"]`);
        if (productElement) {
            const price = parseFloat(productElement.getAttribute('data-price'));
            total += price * item.quantity;
        }
    });
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `S$${total.toFixed(2)}`;
};

// Render the Cart Items to HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            const productElement = document.querySelector(`.flex-item3[data-id="${item.product_id}"]`);
            if (productElement) {
                const name = productElement.getAttribute('data-name');
                const price = parseFloat(productElement.getAttribute('data-price'));
                totalQuantity += item.quantity;

                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                newItem.innerHTML = `
                    <div class="image"><img src="${productElement.querySelector('img').src}"></div>
                    <div class="name">${name}</div>
                    <div class="totalPrice">S$${(price * item.quantity).toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(newItem);
            }
        });
    }

    iconCartSpan.innerText = totalQuantity;
    updateCartTotal();
};

// Add Item to Cart
const addToCart = (productId) => {
    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product_id: productId, quantity: 1 });
    }

    addCartToHTML();
};

// Event Listener for Adding Product to Cart
listProductHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-now-button')) {
        const productId = parseInt(event.target.parentElement.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Handle Quantity Changes in Cart
listCartHTML.addEventListener('click', (event) => {
    const productId = parseInt(event.target.parentElement.parentElement.getAttribute('data-id'));

    if (event.target.classList.contains('minus')) {
        const item = cart.find(item => item.product_id === productId);
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.product_id !== productId); // Remove item from cart
        }
    }

    if (event.target.classList.contains('plus')) {
        const item = cart.find(item => item.product_id === productId);
        if (item) {
            item.quantity += 1;
        }
    }

    addCartToHTML();
});

// No explicit product list initialization is needed here
// checkout
// Save user details to localStorage when "Continue to Payment" is clicked
document.getElementById('continue-to-payment').addEventListener('click', () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const address = document.getElementById('address').value.trim();
    const postalCode = document.getElementById('postal-code').value.trim();
    // Save user details to localStorage
    const userDetails = {
        firstName,
        lastName,
        address,
        apartment: document.getElementById('apartment').value.trim(),
        postalCode,
        country: 'Singapore',
        isBusinessAddress: document.getElementById('business-address').checked
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));


});






