let cartItems = [];
let cartTotal = 0;
let allMeals = [];
let isSubMode = localStorage.getItem('shokids_build_mode') === 'subscription';

document.addEventListener("DOMContentLoaded", () => {
    const ageGroup = localStorage.getItem('shokids_age') || 'toddler';
    const userAllergies = JSON.parse(localStorage.getItem('shokids_allergies')) || [];
    const container = document.getElementById('menuContainer');
    const searchInput = document.getElementById('searchInput');
    const warningLabel = document.getElementById('allergyWarning');
    const subBanner = document.getElementById('subscriptionBanner');
    const menuTitle = document.getElementById('menuTitle');
    const cartActionBtn = document.getElementById('cartActionBtn');

    if (userAllergies.length > 0) {
        warningLabel.innerText = `✓ Filtered to avoid: ${userAllergies.join(', ')}`;
    }

    if (isSubMode) {
        menuTitle.innerText = "Build Weekly Menu";
        subBanner.style.display = 'none';
        cartActionBtn.innerText = "Save Weekly Plan";
    } else if (localStorage.getItem('shokids_subscription') !== 'true') {
        subBanner.style.display = 'flex';
    }

    fetch('data/menu.json')
        .then(response => response.json())
        .then(data => {
            allMeals = data.filter(meal => {
                const ageMatch = meal.category === ageGroup;
                const isSafe = !meal.allergens.some(allergen => userAllergies.includes(allergen));
                return ageMatch && isSafe;
            });
            renderMeals(allMeals);
        });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allMeals.filter(meal => meal.name.toLowerCase().includes(term));
        renderMeals(filtered);
    });

    function renderMeals(meals) {
        container.innerHTML = '';
        meals.forEach(meal => {
            const card = document.createElement('div');
            card.className = 'meal-card';
            card.onclick = () => openMealModal(meal);
            
            // CHANGED: Generating an actual <img> tag pulling the image URL from JSON
            card.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}" class="meal-art" loading="lazy">
                <div class="meal-info">
                    <h4>${meal.name}</h4>
                    <p>€${meal.price.toFixed(2)}</p>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(${meal.id})">+ Quick Add</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
});

window.startSubscriptionBuild = function() {
    localStorage.setItem('shokids_build_mode', 'subscription');
    location.reload();
};

window.openMealModal = function(meal) {
    document.getElementById('modalArt').src = meal.image;
    document.getElementById('modalCategory').innerText = meal.category.toUpperCase();
    document.getElementById('modalName').innerText = meal.name;
    document.getElementById('modalPrice').innerText = `€${meal.price.toFixed(2)}`;
    document.getElementById('modalIngredients').innerText = meal.ingredients;
    
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.onclick = () => {
        addToCart(meal.id);
        closeModal('mealModal');
    };

    document.getElementById('mealModal').classList.add('active');
};

window.closeModal = function(modalId) {
    document.getElementById(modalId).classList.remove('active');
};

window.addToCart = function(id) {
    const meal = allMeals.find(m => m.id === id);
    if (!meal) return;

    cartItems.push({ id: meal.id, name: meal.name, price: meal.price });
    cartTotal += meal.price;
    
    document.getElementById('cartLabel').innerText = `${cartItems.length} items`;
    document.getElementById('cartTotal').innerText = `€${cartTotal.toFixed(2)}`;
    document.getElementById('floatingCart').classList.add('active');
};

window.processCart = function() {
    if (isSubMode) {
        localStorage.setItem('shokids_subscription', 'true');
        localStorage.setItem('shokids_sub_total', cartTotal.toFixed(2));
        localStorage.setItem('shokids_sub_items', JSON.stringify(cartItems));
        localStorage.removeItem('shokids_build_mode');
        window.location.href = 'profile.html';
    } else {
        localStorage.setItem('shokids_active_order', 'true');
        localStorage.setItem('shokids_order_total', cartTotal.toFixed(2));
        window.location.href = 'tracking.html';
    }
};