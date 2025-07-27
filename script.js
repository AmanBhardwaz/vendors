// Sample vendor data
const vendors = [
    {
        id: 1,
        name: "Tandoori Treats",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf79d1a1?ixlib=rb-1.2.1",
        rating: 4.5,
        menu: [
            {
                id: 1,
                name: "Butter Chicken",
                price: 150,
                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
                description: "Tender chicken cooked in butter masala"
            },
            {
                id: 2,
                name: "Naan",
                price: 30,
                image: "https://images.unsplash.com/photo-1579871494447-9811cf79d1a1",
                description: "Freshly baked naan bread"
            }
        ]
    },
    {
        id: 2,
        name: "Street Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        rating: 4.8,
        menu: [
            {
                id: 3,
                name: "Margherita Pizza",
                price: 120,
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
                description: "Classic Italian pizza with tomato sauce and mozzarella"
            },
            {
                id: 4,
                name: "Paneer Pizza",
                price: 140,
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
                description: "Indian style pizza with paneer and vegetables"
            }
        ]
    }
];

// Local storage management
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

// Display vendors
function showVendors() {
    const vendorGrid = document.getElementById('vendor-grid');
    vendorGrid.innerHTML = '';
    
    vendors.forEach(vendor => {
        const vendorCard = document.createElement('div');
        vendorCard.className = 'vendor-card';
        vendorCard.innerHTML = `
            <img src="${vendor.image}" alt="${vendor.name}" class="vendor-image">
            <div class="vendor-info">
                <h3>${vendor.name}</h3>
                <p>Rating: ${vendor.rating} ⭐</p>
                <button onclick="showMenu(${vendor.id})">View Menu</button>
            </div>
        `;
        vendorGrid.appendChild(vendorCard);
    });
}

// Display menu
function showMenu(vendorId) {
    const vendor = vendors.find(v => v.id === vendorId);
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = '';
    
    vendor.menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${vendorId}, ${item.id})">Add to Cart</button>
        `;
        menuItems.appendChild(menuItem);
    });
}

// Cart functionality
let cart = getFromLocalStorage('cart') || [];

function addToCart(vendorId, itemId) {
    const vendor = vendors.find(v => v.id === vendorId);
    const item = vendor.menu.find(i => i.id === itemId);
    
    cart.push({
        vendorId: vendorId,
        vendorName: vendor.name,
        itemId: itemId,
        itemName: item.name,
        price: item.price,
        quantity: 1
    });
    
    saveToLocalStorage('cart', cart);
    updateCartCount();
    showOrders();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    
    cart.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <h4>${order.itemName}</h4>
                <p>From: ${order.vendorName}</p>
                <p>₹${order.price}</p>
            </div>
            <button onclick="removeFromCart(${order.vendorId}, ${order.itemId})">Remove</button>
        `;
        orderList.appendChild(orderItem);
    });
}

function removeFromCart(vendorId, itemId) {
    cart = cart.filter(order => !(order.vendorId === vendorId && order.itemId === itemId));
    saveToLocalStorage('cart', cart);
    updateCartCount();
    showOrders();
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (confirm(`Total amount: ₹${total}\nProceed to checkout?`)) {
        alert('Thank you for your order!');
        cart = [];
        saveToLocalStorage('cart', cart);
        updateCartCount();
        showOrders();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showVendors();
    updateCartCount();
});

// Scroll to section when navigation links are clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
