// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const ingredientInput = document.getElementById('ingredient-input');
const ingredientBtn = document.getElementById('ingredient-btn');
const resultsContainer = document.getElementById('results-container');
const recipeModal = document.getElementById('recipe-modal');
const recipeDetails = document.getElementById('recipe-details');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');

// Event Listeners
searchBtn.addEventListener('click', searchMeals);
ingredientBtn.addEventListener('click', filterByIngredient);
closeBtn.addEventListener('click', closeModal);
themeToggle.addEventListener('click', toggleTheme);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        closeModal();
    }
});

// Search for meals by name
async function searchMeals() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        showError('Please enter a search term');
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        
        if (data.meals) {
            displayMeals(data.meals);
        } else {
            showError('No meals found. Try a different search term.');
        }
    } catch (error) {
        showError('Failed to fetch meals. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Filter meals by ingredient
async function filterByIngredient() {
    const ingredient = ingredientInput.value.trim();
    
    if (!ingredient) {
        showError('Please enter an ingredient');
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        
        if (data.meals) {
            // Fetch full details for each meal
            const mealDetailsPromises = data.meals.map(meal => 
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(res => res.json())
                    .then(data => data.meals[0])
            );
            
            const meals = await Promise.all(mealDetailsPromises);
            displayMeals(meals);
        } else {
            showError('No meals found with that ingredient. Try a different one.');
        }
    } catch (error) {
        showError('Failed to filter meals. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display meals in the grid
function displayMeals(meals) {
    resultsContainer.innerHTML = '';
    
    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img">
            <div class="meal-info">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea} • ${meal.strCategory}</p>
            </div>
        `;
        
        mealCard.addEventListener('click', () => showRecipeDetails(meal));
        resultsContainer.appendChild(mealCard);
    });
}

// Show recipe details in modal
function showRecipeDetails(meal) {
    recipeDetails.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
        <div class="recipe-info">
            <h2>${meal.strMeal}</h2>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            
            <h3>Ingredients</h3>
            <ul class="ingredients-list">
                ${getIngredientsList(meal)}
            </ul>
            
            <h3>Instructions</h3>
            <p>${formatInstructions(meal.strInstructions)}</p>
            
            ${meal.strYoutube ? `
                <h3>Video Tutorial</h3>
                <a href="${meal.strYoutube}" target="_blank" class="btn primary-btn">
                    <i class="fab fa-youtube"></i> Watch on YouTube
                </a>
            ` : ''}
        </div>
    `;
    
    recipeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    recipeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Get ingredients list from meal object
function getIngredientsList(meal) {
    let ingredientsList = '';
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li><strong>${measure}</strong> ${ingredient}</li>`;
        }
    }
    
    return ingredientsList;
}

// Format instructions with paragraphs
function formatInstructions(instructions) {
    return instructions.split('\r\n').filter(step => step.trim() !== '').map(step => 
        `<p>${step}</p>`
    ).join('');
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
}

// Show loading spinner
function showLoading() {
    resultsContainer.innerHTML = `
        <div class="loading-spinner" style="display: flex;">
            <div class="spinner"></div>
            <p>Loading recipes...</p>
        </div>
    `;
}

// Hide loading spinner
function hideLoading() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.style.display = 'none';
}

// Show error message
function showError(message) {
    resultsContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}

// Initialize with some meals on page load
window.addEventListener('DOMContentLoaded', () => {
    // Load Font Awesome for icons
    const faScript = document.createElement('script');
    faScript.src = 'https://kit.fontawesome.com/a076d05399.js';
    faScript.crossOrigin = 'anonymous';
    document.head.appendChild(faScript);
    
    // Show sample recipes
    searchInput.value = 'pasta';
    searchMeals();
});