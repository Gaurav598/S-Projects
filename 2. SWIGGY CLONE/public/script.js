document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchRestaurants();
});

const API_BASE_URL = window.location.origin; // Dynamically get the base URL

async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error(error);
        document.getElementById('categories-list').innerHTML = '<p>Failed to load categories</p>';
    }
}

function renderCategories(categories) {
    const list = document.getElementById('categories-list');
    list.innerHTML = ''; // Clear loader

    categories.forEach(item => {
        const div = document.createElement('div');
        div.className = 'category-item';
        
        // Image path needs to be constructed. 
        // Assuming images are served from /images/{imagename} based on the JSON structure I saw
        // The JSON had "image": "North_Indian_4.jpeg"
        const imgSrc = `/images/${item.image}`;
        
        div.innerHTML = `
            <img src="${imgSrc}" alt="${item.path}">
        `;
        list.appendChild(div);
    });
}

async function fetchRestaurants() {
    try {
        const response = await fetch(`${API_BASE_URL}/top-restaurant-chains`);
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const restaurants = await response.json();
        renderRestaurants(restaurants);
    } catch (error) {
        console.error(error);
        document.getElementById('restaurant-grid').innerHTML = '<p>Failed to load restaurants</p>';
    }
}

function renderRestaurants(restaurants) {
    const grid = document.getElementById('restaurant-grid');
    grid.innerHTML = ''; // Clear loader

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        // Construct image source
        const imgSrc = `/images/${restaurant.image}`;
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${imgSrc}" alt="${restaurant.title}">
                <div class="offer-text-gradient">${restaurant.offer || ''}</div>
            </div>
            <div class="card-details">
                <div class="restaurant-title">${restaurant.title}</div>
                <div class="rating-time">
                    <div class="rating-icon">★</div>
                    <span>${restaurant.rating}</span>
                    <span>•</span>
                    <span>${restaurant.minTime}-${restaurant.maxTime} mins</span>
                </div>
                <div class="cuisines">${restaurant.name}</div>
                <div class="location">${restaurant.place}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}
