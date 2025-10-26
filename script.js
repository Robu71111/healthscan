// ============================================
// HEALTHSCAN MVP - JAVASCRIPT
// ============================================

// Product Database (Simulated - will be replaced with API later)
const PRODUCT_DATABASE = {
    'coca-cola': {
        name: 'Coca-Cola Classic',
        category: 'Beverages',
        brand: 'Coca-Cola',
        image: '🥤',
        ingredients: [
            'Carbonated Water',
            'High Fructose Corn Syrup',
            'Caramel Color (E150d)',
            'Phosphoric Acid',
            'Natural Flavors',
            'Caffeine'
        ],
        harmfulSubstances: [
            {
                name: 'High Fructose Corn Syrup',
                severity: 'high',
                concern: 'Linked to obesity, diabetes, and metabolic syndrome'
            },
            {
                name: 'Caramel Color (E150d)',
                severity: 'medium',
                concern: 'May contain 4-MEI, a possible carcinogen'
            },
            {
                name: 'Phosphoric Acid',
                severity: 'medium',
                concern: 'Can affect bone density with excessive consumption'
            }
        ],
        rating: 3.5,
        price: 2.99
    },
    'dove-soap': {
        name: 'Dove Beauty Bar',
        category: 'Personal Care',
        brand: 'Dove',
        image: '🧼',
        ingredients: [
            'Sodium Lauroyl Isethionate',
            'Stearic Acid',
            'Sodium Tallowate',
            'Water',
            'Sodium Isethionate',
            'Coconut Acid',
            'Sodium Stearate',
            'Fragrance',
            'Titanium Dioxide'
        ],
        harmfulSubstances: [
            {
                name: 'Fragrance',
                severity: 'low',
                concern: 'May contain allergens; can cause skin irritation'
            },
            {
                name: 'Titanium Dioxide',
                severity: 'low',
                concern: 'Potential respiratory irritant when inhaled as powder'
            }
        ],
        rating: 7.2,
        price: 4.99
    },
    'doritos': {
        name: 'Doritos Nacho Cheese',
        category: 'Food',
        brand: 'Frito-Lay',
        image: '🌽',
        ingredients: [
            'Corn',
            'Vegetable Oil',
            'Maltodextrin',
            'Salt',
            'Cheddar Cheese',
            'Monosodium Glutamate (MSG)',
            'Artificial Colors (Yellow 6, Yellow 5, Red 40)',
            'Disodium Inosinate',
            'Disodium Guanylate'
        ],
        harmfulSubstances: [
            {
                name: 'Monosodium Glutamate (MSG)',
                severity: 'medium',
                concern: 'Can cause headaches and sensitivity reactions in some people'
            },
            {
                name: 'Artificial Colors (Yellow 6, Yellow 5, Red 40)',
                severity: 'high',
                concern: 'Linked to hyperactivity in children; potential carcinogenic concerns'
            },
            {
                name: 'High Sodium Content',
                severity: 'medium',
                concern: 'Excessive sodium linked to hypertension'
            }
        ],
        rating: 4.1,
        price: 3.49
    },
    'nutella': {
    name: 'Nutella Hazelnut Spread',
    category: 'Food',
    brand: 'Ferrero',
    image: '🍫',
    ingredients: [
        'Sugar',
        'Palm Oil',
        'Hazelnuts',
        'Cocoa',
        'Skim Milk',
        'Soy Lecithin',
        'Vanillin'
    ],
    harmfulSubstances: [
        {
            name: 'Palm Oil',
            severity: 'medium',
            concern: 'High in saturated fat; environmental concerns'
        },
        {
            name: 'High Sugar Content',
            severity: 'high',
            concern: 'Excessive sugar linked to obesity and diabetes'
        }
    ],
    rating: 4.8,
    price: 5.99
}
};

// Alternative Products Database
const ALTERNATIVES = {
    'coca-cola': [
        { name: 'Zevia Zero Calorie Cola', rating: 8.5, price: 4.99, reason: 'Naturally sweetened with stevia, no artificial colors' },
        { name: 'Hint Water - Blackberry', rating: 9.2, price: 1.99, reason: 'No sweeteners, natural fruit essence' },
        { name: 'Spindrift Sparkling Water', rating: 8.8, price: 1.49, reason: 'Real fruit juice, no added sugars' },
        { name: 'OLIPOP Classic Cola', rating: 8.3, price: 2.99, reason: 'Prebiotic soda with real botanicals' },
        { name: 'Health-Ade Kombucha', rating: 8.7, price: 3.99, reason: 'Probiotic, low sugar fermented tea' }
    ],
    'dove-soap': [
        { name: 'Dr. Bronner\'s Castile Soap', rating: 9.5, price: 6.99, reason: 'Organic, no synthetic fragrances' },
        { name: 'Cetaphil Gentle Cleansing Bar', rating: 8.9, price: 5.49, reason: 'Fragrance-free, hypoallergenic' },
        { name: 'Vanicream Cleansing Bar', rating: 9.1, price: 5.99, reason: 'No dyes, fragrance, or harsh chemicals' },
        { name: 'Puracy Natural Body Wash', rating: 8.6, price: 9.99, reason: 'Plant-based, dermatologist tested' },
        { name: 'Everyone Soap for Every Body', rating: 8.4, price: 5.99, reason: 'EWG Verified, natural ingredients' }
    ],
    'doritos': [
        { name: 'Late July Organic Tortilla Chips', rating: 8.7, price: 3.99, reason: 'Organic, no artificial ingredients' },
        { name: 'Siete Grain-Free Tortilla Chips', rating: 9.0, price: 4.49, reason: 'Avocado oil, no seed oils' },
        { name: 'Simply Tostitos', rating: 7.8, price: 3.29, reason: 'Only 3 ingredients: corn, oil, salt' },
        { name: 'Beanfields Bean Chips', rating: 8.3, price: 3.99, reason: 'Protein-rich, no artificial colors' },
        { name: 'Jackson\'s Sweet Potato Chips', rating: 8.9, price: 4.99, reason: 'Coconut oil, non-GMO' }
    ],
    'nutella': [
    { name: 'Justin\'s Chocolate Hazelnut Butter', rating: 8.2, price: 9.99, reason: 'Organic, no palm oil' },
    { name: 'Nocciolata Organic Hazelnut Spread', rating: 8.5, price: 7.99, reason: 'Fair trade cocoa, no artificial ingredients' },
    ]
};

// App State
let currentScreen = 'home';
let selectedProduct = null;
let cart = [];

// Initialize the app
function init() {
    renderScreen();
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Main render function
function renderScreen() {
    const appContainer = document.getElementById('app');
    
    if (currentScreen === 'home') {
        appContainer.innerHTML = renderHomeScreen();
    } else if (currentScreen === 'scan') {
        appContainer.innerHTML = renderScanScreen();
    } else if (currentScreen === 'analysis') {
        appContainer.innerHTML = renderAnalysisScreen();
    }
    
    // Re-initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// HOME SCREEN
function renderHomeScreen() {
    return `
        <div class="fade-in">
            <!-- Header -->
            <div class="app-header">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h1 class="header-title">HealthScan</h1>
                    <div style="position: relative;">
                        <i data-lucide="shopping-cart" style="width: 24px; height: 24px;"></i>
                        ${cart.length > 0 ? `<span class="cart-badge">${cart.length}</span>` : ''}
                    </div>
                </div>
                <p class="header-location">📍 New York, NY, US</p>
                <p class="header-subtitle">Free delivery on orders above $39.99</p>
            </div>

            <!-- Main Content -->
            <div class="p-6">
                <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">
                    Scan & Analyze Products
                </h2>
                <p style="color: #6b7280; margin-bottom: 1.5rem;">
                    Upload an image or enter product name to get instant health analysis
                </p>

                <!-- Scan Options -->
                <div class="scan-grid">
                    <div class="scan-card scan-card-camera" onclick="goToScan()">
                        <i data-lucide="camera" style="width: 48px; height: 48px; margin: 0 auto 0.75rem;"></i>
                        <p style="font-weight: 600;">Scan Barcode</p>
                    </div>
                    <div class="scan-card scan-card-upload" onclick="goToScan()">
                        <i data-lucide="upload" style="width: 48px; height: 48px; margin: 0 auto 0.75rem;"></i>
                        <p style="font-weight: 600;">Upload Image</p>
                    </div>
                </div>

                <!-- Features -->
                <div class="feature-list">
                    <h3 style="font-weight: 600; color: #1f2937; margin-bottom: 1rem; display: flex; align-items: center;">
                        <i data-lucide="star" style="width: 20px; height: 20px; margin-right: 0.5rem; color: #eab308;"></i>
                        Why HealthScan?
                    </h3>
                    <div class="feature-item">
                        <i data-lucide="check-circle" class="feature-icon" style="width: 20px; height: 20px; color: #16a34a;"></i>
                        <p class="feature-text">AI-powered ingredient analysis</p>
                    </div>
                    <div class="feature-item">
                        <i data-lucide="check-circle" class="feature-icon" style="width: 20px; height: 20px; color: #16a34a;"></i>
                        <p class="feature-text">Identifies harmful chemicals & allergens</p>
                    </div>
                    <div class="feature-item">
                        <i data-lucide="check-circle" class="feature-icon" style="width: 20px; height: 20px; color: #16a34a;"></i>
                        <p class="feature-text">Smart product recommendations</p>
                    </div>
                    <div class="feature-item">
                        <i data-lucide="check-circle" class="feature-icon" style="width: 20px; height: 20px; color: #16a34a;"></i>
                        <p class="feature-text">Delivery in 1hr, 24hrs, or 2-3 days</p>
                    </div>
                </div>

                <!-- Demo Products -->
                <div>
                    <h3 style="font-weight: 600; color: #1f2937; margin-bottom: 0.75rem;">Try Demo Analysis:</h3>
                    
                    <div class="product-card" onclick="scanProduct('coca-cola')">
                        <div class="product-card-content">
                            <span class="product-emoji">🥤</span>
                            <div class="product-info">
                                <h3>Coca-Cola Classic</h3>
                                <p class="product-category">Beverages</p>
                            </div>
                        </div>
                    </div>

                    <div class="product-card" onclick="scanProduct('dove-soap')">
                        <div class="product-card-content">
                            <span class="product-emoji">🧼</span>
                            <div class="product-info">
                                <h3>Dove Beauty Bar</h3>
                                <p class="product-category">Personal Care</p>
                            </div>
                        </div>
                    </div>

                    <div class="product-card" onclick="scanProduct('doritos')">
                        <div class="product-card-content">
                            <span class="product-emoji">🌽</span>
                            <div class="product-info">
                                <h3>Doritos Nacho Cheese</h3>
                                <p class="product-category">Snacks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// SCAN SCREEN
function renderScanScreen() {
    return `
        <div class="fade-in">
            <!-- Header -->
            <div class="app-header">
                <button onclick="goToHome()" style="color: white; background: none; border: none; cursor: pointer; margin-bottom: 1rem; font-size: 1rem;">
                    ← Back
                </button>
                <h1 class="header-title">Scan Product</h1>
            </div>

            <!-- Content -->
            <div class="p-6">
                <div style="background: linear-gradient(to bottom right, #e0e7ff, #f3e8ff); border-radius: 1.5rem; padding: 3rem; margin-bottom: 1.5rem; text-align: center;">
                    <i data-lucide="camera" style="width: 96px; height: 96px; margin: 0 auto 1rem; color: #4f46e5;"></i>
                    <p style="color: #374151; font-weight: 500;">Point camera at barcode</p>
                    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">or upload product image</p>
                </div>

                <div class="mb-6">
                    <p class="text-center" style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">
                        For demo, enter product name:
                    </p>
                    <input 
                        type="text" 
                        id="scanInput" 
                        class="input-field" 
                        placeholder="e.g., coca-cola, dove-soap, doritos"
                    />
                    <button onclick="handleScan()" class="btn btn-primary btn-block" style="margin-top: 0.75rem;">
                        Analyze Product
                    </button>
                </div>

                <div class="info-box">
                    <p>
                        <strong>💡 Tip:</strong> In the full app, you'll be able to scan barcodes with your camera or upload product photos instantly!
                    </p>
                </div>
            </div>
        </div>
    `;
}

// ANALYSIS SCREEN
function renderAnalysisScreen() {
    if (!selectedProduct || !PRODUCT_DATABASE[selectedProduct]) {
        return '<div class="p-6">Product not found</div>';
    }

    const product = PRODUCT_DATABASE[selectedProduct];
    const alternatives = ALTERNATIVES[selectedProduct];

    return `
        <div class="fade-in">
            <!-- Header -->
            <div class="app-header">
                <button onclick="goToHome()" style="color: white; background: none; border: none; cursor: pointer; margin-bottom: 1rem; font-size: 1rem;">
                    ← Back to Home
                </button>
                <h1 class="header-title">Product Analysis</h1>
            </div>

            <div class="p-6">
                <!-- Product Info -->
                <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem; margin-bottom: 1.5rem; border: 2px solid #f3f4f6;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: start;">
                            <span style="font-size: 3rem; margin-right: 1rem;">${product.image}</span>
                            <div>
                                <h2 style="font-size: 1.25rem; font-weight: bold; color: #1f2937;">${product.name}</h2>
                                <p style="font-size: 0.875rem; color: #6b7280;">${product.brand}</p>
                                <p style="font-size: 0.75rem; color: #9ca3af; margin-top: 0.25rem;">${product.category}</p>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <p style="font-size: 1.5rem; font-weight: bold; color: #4f46e5;">$${product.price}</p>
                        </div>
                    </div>

                    <!-- Health Rating -->
                    <div class="rating-container">
                        <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">Health Safety Rating</p>
                        <div class="rating-score">
                            <div style="display: flex; align-items: center;">
                                <span class="rating-number ${getRatingClass(product.rating)}">${product.rating}</span>
                                <span style="color: #6b7280; font-size: 1.125rem; margin-left: 0.25rem;">/10</span>
                            </div>
                            <div style="display: flex;">
                                ${generateStars(product.rating)}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Harmful Substances -->
                <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem; margin-bottom: 1.5rem; border: 2px solid #f3f4f6;">
                    <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 1rem; display: flex; align-items: center;">
                        <i data-lucide="alert-triangle" style="width: 20px; height: 20px; margin-right: 0.5rem; color: #dc2626;"></i>
                        Harmful Substances Detected
                    </h3>
                    ${generateHarmfulSubstances(product.harmfulSubstances)}
                </div>

                <!-- Ingredients List -->
                <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem; margin-bottom: 1.5rem; border: 2px solid #f3f4f6;">
                    <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 1rem;">Complete Ingredients</h3>
                    <div class="ingredient-tags">
                        ${product.ingredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
                    </div>
                </div>

                <!-- Better Alternatives -->
                <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 1.5rem; border: 2px solid #f3f4f6;">
                    <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 1rem; display: flex; align-items: center;">
                        <i data-lucide="trending-up" style="width: 20px; height: 20px; margin-right: 0.5rem; color: #16a34a;"></i>
                        Healthier Alternatives
                    </h3>
                    ${generateAlternatives(alternatives)}
                </div>

                <!-- Delivery Options -->
                <div class="delivery-container">
                    <h3 style="font-weight: bold; margin-bottom: 1rem;">Choose Delivery Speed</h3>
                    <div class="delivery-option">
                        <p class="delivery-title">⚡ 1 Hour Delivery</p>
                        <p class="delivery-subtitle">Get it within 60 minutes</p>
                    </div>
                    <div class="delivery-option">
                        <p class="delivery-title">🚚 24 Hour Delivery</p>
                        <p class="delivery-subtitle">Next day delivery</p>
                    </div>
                    <div class="delivery-option">
                        <p class="delivery-title">📦 2-3 Days Standard</p>
                        <p class="delivery-subtitle">Free delivery above $39.99</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper Functions

function getRatingClass(rating) {
    if (rating >= 8) return 'rating-high';
    if (rating >= 6) return 'rating-medium';
    if (rating >= 4) return 'rating-low';
    return 'rating-poor';
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 10; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i data-lucide="star" style="width: 16px; height: 16px; color: #fbbf24; fill: #fbbf24;"></i>';
        } else {
            stars += '<i data-lucide="star" style="width: 16px; height: 16px; color: #d1d5db;"></i>';
        }
    }
    return stars;
}

function generateHarmfulSubstances(substances) {
    return substances.map(substance => `
        <div class="substance-card substance-${substance.severity}">
            <div class="substance-header">
                <p class="substance-name">${substance.name}</p>
                <span class="severity-badge">${substance.severity}</span>
            </div>
            <p class="substance-concern">${substance.concern}</p>
        </div>
    `).join('');
}

function generateAlternatives(alternatives) {
    return alternatives.map(alt => `
        <div class="alternative-card">
            <div class="alternative-content">
                <div style="flex: 1;">
                    <p class="alternative-name">${alt.name}</p>
                    <p class="alternative-reason">${alt.reason}</p>
                </div>
                <div class="alternative-stats">
                    <p class="alternative-rating ${getRatingClass(alt.rating)}">${alt.rating}</p>
                    <p class="alternative-price">$${alt.price}</p>
                </div>
            </div>
            <button onclick="addToCart('${alt.name}', ${alt.price})" class="btn btn-success btn-block" style="margin-top: 0.5rem; font-size: 0.875rem; padding: 0.5rem;">
                Add to Cart - $${alt.price}
            </button>
        </div>
    `).join('');
}

// Navigation Functions

function goToHome() {
    currentScreen = 'home';
    renderScreen();
}

function goToScan() {
    currentScreen = 'scan';
    renderScreen();
}

function scanProduct(productKey) {
    if (PRODUCT_DATABASE[productKey]) {
        selectedProduct = productKey;
        currentScreen = 'analysis';
        renderScreen();
    } else {
        alert('Product not found in database. Try: coca-cola, dove-soap, or doritos');
    }
}

function handleScan() {
    const input = document.getElementById('scanInput');
    if (input) {
        const value = input.value.toLowerCase().trim();
        scanProduct(value);
    }
}

// Cart Functions

function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price,
        quantity: 1
    });
    alert(`✅ Added ${productName} to cart!`);
    renderScreen(); // Re-render to update cart badge
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);