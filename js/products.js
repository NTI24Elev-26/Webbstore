// js/products.js
// js/products.js
document.addEventListener('DOMContentLoaded', () => {
    const allGamesGrid = document.getElementById('all-games-grid');
    const productsHeading = document.getElementById('products-heading');
    const tagFiltersContainer = document.getElementById('tag-filters');
    const sidebarSearchInput = document.getElementById('sidebar-search-input');

    let currentFilterTags = [];
    let currentSearchTerm = '';
    let currentSort = '';

    function renderGameCard(game) {
        const article = document.createElement('article');
        article.classList.add('product-card');

        const link = document.createElement('a');
        link.href = `product-detail.html?id=${game.id}`;

        const imgPlaceholder = document.createElement('div');
        imgPlaceholder.classList.add('product-image-placeholder');
        const img = document.createElement('img');
        img.src = game.image || 'images/placeholder.jpg';
        img.alt = `Spelomslag för ${game.name}`;
        imgPlaceholder.appendChild(img);

        const title = document.createElement('p');
        title.classList.add('product-title');
        title.textContent = game.name;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `${game.price} SEK`;

        const buyButton = document.createElement('button');
        buyButton.classList.add('add-to-cart-btn', 'btn', 'primary-btn'); // Added 'btn' and 'primary-btn' for styling
        buyButton.dataset.productId = game.id;
        buyButton.textContent = 'Köp';

        // Add event listener for the buy button
        buyButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if inside an <a> tag
            addToCart(game.id);
        });

        link.appendChild(imgPlaceholder);
        link.appendChild(title);
        link.appendChild(price);

        article.appendChild(link);
        article.appendChild(buyButton);

        return article;
    }

    // --- Hämta taggar OCH sökterm från URL vid sidladdning ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialTags = urlParams.get('tags');
    const initialSearch = urlParams.get('search');

    if (initialTags) {
        currentFilterTags = initialTags.split(',').map(tag => tag.trim());
    }
    if (initialSearch) {
        currentSearchTerm = initialSearch;
        if (sidebarSearchInput) {
            sidebarSearchInput.value = initialSearch;
        }
    }

    function applyFiltersAndRender() {
        let filteredGames = [...games]; // 'games' should be defined in your data.js

        // Filtrera på taggar
        if (currentFilterTags.length > 0) {
            filteredGames = filteredGames.filter(game =>
                    game.tags && currentFilterTags.every(filterTag =>
                        game.tags.includes(filterTag)
                    )
            );
        }

        // Filtrera på sökterm
        if (currentSearchTerm) {
            const searchTermLower = currentSearchTerm.toLowerCase();
            filteredGames = filteredGames.filter(game =>
                game.name.toLowerCase().includes(searchTermLower) ||
                (game.tags && game.tags.some(tag => tag.toLowerCase().includes(searchTermLower)))
            );
        }

        // Sortering
        if (currentSort === 'price-asc') {
            filteredGames.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filteredGames.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            filteredGames.sort((a, b) => a.name.localeCompare(b.name));
        }

        allGamesGrid.innerHTML = ''; // Rensa befintliga kort

        if (filteredGames.length > 0) {
            filteredGames.forEach(game => {
                allGamesGrid.appendChild(renderGameCard(game));
            });
        } else {
            allGamesGrid.innerHTML = '<p>Inga spel hittades med dessa filter.</p>';
        }

        updateProductsHeading();
        updateTagFilterActiveState();
        updateSortOptionActiveState();
    }

    function updateProductsHeading() {
        let headingText = 'Alla Spel';
        const activeTags = currentFilterTags.map(tag => `#${tag}`).join(' ');
        const searchTerm = currentSearchTerm ? ` "${currentSearchTerm}"` : '';

        if (activeTags && searchTerm) {
            headingText = `Spel med ${activeTags} och "${searchTerm}"`;
        } else if (activeTags) {
            headingText = `Spel med ${activeTags}`;
        } else if (searchTerm) {
            headingText = `Sökresultat för "${searchTerm}"`;
        }
        productsHeading.textContent = headingText;
    }

    // --- Initial rendering of filters ---
    function populateTagFilters() {
        const allTags = new Set();
        games.forEach(game => {
            if (game.tags) {
                game.tags.forEach(tag => allTags.add(tag));
            }
        });

        tagFiltersContainer.innerHTML = '';
        const sortedTags = Array.from(allTags).sort();

        const allTagItem = document.createElement('li');
        allTagItem.textContent = 'Visa alla';
        allTagItem.classList.add('tag-filter');
        allTagItem.dataset.tag = 'all';
        allTagItem.addEventListener('click', () => {
            currentFilterTags = [];
            applyFiltersAndRender();
        });
        tagFiltersContainer.appendChild(allTagItem);


        sortedTags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            li.classList.add('tag-filter');
            li.dataset.tag = tag;
            li.addEventListener('click', () => {
                const clickedTag = li.dataset.tag;
                if (currentFilterTags.includes(clickedTag)) {
                    currentFilterTags = currentFilterTags.filter(t => t !== clickedTag);
                } else {
                    currentFilterTags.push(clickedTag);
                }
                applyFiltersAndRender();
            });
            tagFiltersContainer.appendChild(li);
        });
        updateTagFilterActiveState();
    }

    function updateTagFilterActiveState() {
        document.querySelectorAll('.tag-filter').forEach(item => {
            const tag = item.dataset.tag;
            if (tag === 'all') {
                if (currentFilterTags.length === 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            } else {
                if (currentFilterTags.includes(tag)) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    // Sidebar Search Functionality
    sidebarSearchInput.addEventListener('input', (event) => {
        currentSearchTerm = event.target.value.trim();
        applyFiltersAndRender();
    });

    // Sorting Functionality
    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', (event) => {
            currentSort = event.target.dataset.sort;
            applyFiltersAndRender();
        });
    });

    function updateSortOptionActiveState() {
        document.querySelectorAll('.sort-option').forEach(item => {
            if (item.dataset.sort === currentSort) {
                item.classList.add('active-sort');
            } else {
                item.classList.remove('active-sort');
            }
        });
    }

    // Initial load
    populateTagFilters();
    applyFiltersAndRender();

    // Add To Cart Functionality (Moved from script.js, or keep in script.js and call it)
    // This function will be called when a "Köp" button is clicked.
    window.addToCart = function(productId) { // Make it global or pass it around
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productToAdd = games.find(game => game.id === productId);

        if (productToAdd) {
            const existingItemIndex = cart.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ ...productToAdd,
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(); // Call the function from script.js to update the header cart count
            alert(`${productToAdd.name} har lagts till i varukorgen!`);
        }
    };
    // Kör initial rendering
    applyFiltersAndRender();
});