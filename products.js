// js/products.js
document.addEventListener('DOMContentLoaded', () => {
    const allGamesGrid = document.getElementById('all-games-grid');
    const productsHeading = document.getElementById('products-heading');
    const tagFiltersContainer = document.getElementById('tag-filters');
    const sidebarSearchInput = document.getElementById('sidebar-search-input');

    // Ändrad: currentFilterTag blir currentFilterTags (en array)
    let currentFilterTags = [];
    let currentSearchTerm = '';
    let currentSort = '';

    // --- Funktion för att rendera spelkort (oförändrad) ---
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
        buyButton.classList.add('add-to-cart-btn');
        buyButton.dataset.productId = game.id;
        buyButton.textContent = 'Köp';

        link.appendChild(imgPlaceholder);
        link.appendChild(title);
        link.appendChild(price);

        article.appendChild(link);
        article.appendChild(buyButton);

        return article;
    }

    // --- Hämta taggar OCH sökterm från URL vid sidladdning ---
    const urlParams = new URLSearchParams(window.location.search);
    const initialTags = urlParams.get('tags'); // Nu heter parametern 'tags'
    const initialSearch = urlParams.get('search');

    if (initialTags) {
        currentFilterTags = initialTags.split(',').map(tag => tag.trim()); // Dela upp strängen i en array
    }
    if (initialSearch) {
        currentSearchTerm = initialSearch;
        if (sidebarSearchInput) {
            sidebarSearchInput.value = initialSearch;
        }
    }

    // --- Funktion för att applicera filter och sortering och rendera om ---
    function applyFiltersAndRender() {
        let filteredGames = [...games];

        // Filtrera på taggar (nu en array)
        if (currentFilterTags.length > 0) {
            filteredGames = filteredGames.filter(game =>
                // Spelet måste ha ALLA de valda taggarna
                currentFilterTags.every(filterTag =>
                    game.tags.some(gameTag => gameTag.toLowerCase() === filterTag.toLowerCase())
                )
            );
            // Om du vill att spelet ska ha NÅGON av de valda taggarna (OR-logik), använd:
            /*
            filteredGames = filteredGames.filter(game =>
                currentFilterTags.some(filterTag =>
                    game.tags.some(gameTag => gameTag.toLowerCase() === filterTag.toLowerCase())
                )
            );
            */
        }

        // Filtrera på sökterm (oförändrad)
        if (currentSearchTerm) {
            const lowerCaseSearch = currentSearchTerm.toLowerCase();
            filteredGames = filteredGames.filter(game =>
                game.name.toLowerCase().includes(lowerCaseSearch) ||
                game.description.toLowerCase().includes(lowerCaseSearch) ||
                (game.tags && game.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)))
            );
        }

        // Sortera (oförändrad)
        if (currentSort === 'price-asc') {
            filteredGames.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            filteredGames.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            filteredGames.sort((a, b) => a.name.localeCompare(b.name));
        }

        allGamesGrid.innerHTML = '';
        if (filteredGames.length > 0) {
            filteredGames.forEach(game => {
                allGamesGrid.appendChild(renderGameCard(game));
            });
        } else {
            allGamesGrid.innerHTML = '<p>Inga spel matchade dina kriterier.</p>';
        }

        // Markera aktiva taggar i sidopanelen
        tagFiltersContainer.querySelectorAll('.product-tag-filter').forEach(li => {
            if (currentFilterTags.includes(li.dataset.tag)) { // Kontrollera om taggen finns i arrayen
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });

        // Uppdatera sidhuvudet baserat på filter och sökterm
        let headingText = 'Alla Spel';
        if (currentFilterTags.length > 0 && currentSearchTerm) {
            headingText = `Spel med taggar: ${currentFilterTags.join(', ')} & sökterm: "${currentSearchTerm}"`;
        } else if (currentFilterTags.length > 0) {
            headingText = `Spel med taggar: ${currentFilterTags.join(', ')}`;
        } else if (currentSearchTerm) {
            headingText = `Sökresultat för "${currentSearchTerm}"`;
        }
        productsHeading.textContent = headingText;
    }


    // --- Generera taggfilter i sidopanelen ---
    const allTags = [...new Set(games.flatMap(game => game.tags))].sort();

    allTags.forEach(tag => {
        const li = document.createElement('li');
        li.classList.add('product-tag-filter');
        li.dataset.tag = tag;
        li.textContent = tag;
        li.addEventListener('click', () => {
            const index = currentFilterTags.indexOf(tag);
            if (index > -1) {
                // Taggen är redan vald, ta bort den
                currentFilterTags.splice(index, 1);
            } else {
                // Taggen är inte vald, lägg till den
                currentFilterTags.push(tag);
            }
            updateUrlAndRender(); // Funktion för att uppdatera URL och rendera
        });
        tagFiltersContainer.appendChild(li);
    });

    // --- Funktion för att uppdatera URL och rendera om ---
    function updateUrlAndRender() {
        const newUrl = new URL(window.location.href);

        // Uppdatera 'tags' parametern (joinar arrayen till en sträng)
        if (currentFilterTags.length > 0) {
            newUrl.searchParams.set('tags', currentFilterTags.join(','));
        } else {
            newUrl.searchParams.delete('tags');
        }

        // Behåll 'search' parametern
        if (currentSearchTerm) {
            newUrl.searchParams.set('search', currentSearchTerm);
        } else {
            newUrl.searchParams.delete('search');
        }

        window.history.pushState({path: newUrl.href}, '', newUrl.href);
        applyFiltersAndRender();
    }


    // --- Händelsehanterare för sökfältet i sidopanelen ---
    sidebarSearchInput.addEventListener('input', (event) => {
        currentSearchTerm = event.target.value;
        updateUrlAndRender(); // Använd den nya funktionen
    });


    // --- Händelsehanterare för sorteringsalternativ (oförändrad) ---
    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', (event) => {
            currentSort = event.target.dataset.sort;
            document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active-sort'));
            event.target.classList.add('active-sort');
            applyFiltersAndRender();
        });
    });

    // Kör initial rendering
    applyFiltersAndRender();
});