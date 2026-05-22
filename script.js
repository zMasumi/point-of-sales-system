// 1. Menu Data Configuration
const menuItems = [
    { id: 1, name: 'Burger', price: 60, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
    // Using your local authentic fishbol image
    { id: 2, name: 'Fishbol', price: 20, img: 'fishbol.jpg' },
    // Using your local authentic kwek-kwek image
    { id: 3, name: 'Kwek-kwek', price: 25, img: 'kwekkwek.jpg' },
    { id: 4, name: 'Kikiam', price: 20, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop' }
];

let cart = [];
let runningTotal = 0;

// 2. DOM Elements
const menuContainer = document.getElementById('menu-container');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');
const paymentInput = document.getElementById('payment-amount');
const payButton = document.getElementById('pay-btn');

// 3. Render Menu Items on Page Load
function renderMenu() {
    menuItems.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col';
        
        col.innerHTML = `
            <div class="card h-100 border shadow-sm">
                <img src="${item.img}" class="card-img-top menu-img" alt="${item.name}">
                <div class="card-body p-3 d-flex flex-column">
                    <h5 class="card-title mb-1">${item.name}</h5>
                    <p class="card-text mb-2 text-muted">${item.price} PHP</p>
                    <div class="mt-auto">
                        <input type="number" id="qty-${item.id}" class="menu-qty-input" min="1" placeholder="">
                        <button onclick="addToOrder(${item.id})" class="btn btn-primary w-100 btn-sm">Add to order</button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.appendChild(col);
    });
}

// 4. Add Items to Cart
function addToOrder(id) {
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = parseInt(qtyInput.value);

    if (quantity > 0) {
        const menuItem = menuItems.find(item => item.id === id);
        const existingCartItem = cart.find(item => item.id === id);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            cart.push({ ...menuItem, quantity: quantity });
        }
        
        // Reset input field after adding
        qtyInput.value = '';
        updateCartUI();
    }
}

// 5. Update Cart Display and Total
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    runningTotal = 0;

    cart.forEach(item => {
        runningTotal += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h5>${item.name}</h5>
            <span class="qty">Qty: ${item.quantity}</span>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    totalPriceDisplay.textContent = runningTotal;
}

// 6. Checkout Logic
payButton.addEventListener('click', function() {
    if (runningTotal === 0) return; 

    const paymentAmount = parseInt(paymentInput.value);

    if (isNaN(paymentAmount) || paymentAmount < runningTotal) {
        alert("Not enough balance. Please try again");
    } else {
        const change = paymentAmount - runningTotal;
        alert(`Thanks for ordering! Here's your ${change} pesos change`);
        
        // Reset system
        cart = [];
        updateCartUI();
        paymentInput.value = '';
    }
});

// Initialize the app
renderMenu();
