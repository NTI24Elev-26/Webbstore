// js/script.js

// games-arrayen antas vara laddad från data.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Global Sökfunktionalitet från headern (oförändrad) ---
    const headerSearchInput = document.getElementById('header-search-input');
    const headerSearchBtn = document.getElementById('header-search-btn');

    if (headerSearchBtn && headerSearchInput) {
        headerSearchBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const searchTerm = headerSearchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                window.location.href = `products.html`;
            }
        });

        headerSearchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                headerSearchBtn.click();
            }
        });
    }

    // --- Varukorgs- och Önskelista-logik (oförändrad, men se till att `renderCartPage` och `renderWishlistPage`
    // anropas bara om elementen finns på sidan, vilket de redan gör med `if (!container) return;`) ---
    const cartCountSpan = document.getElementById('cart-count');
    const wishlistCountSpan = document.getElementById('wishlist-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function updateCounts() {
        if (cartCountSpan) {
            cartCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
        if (wishlistCountSpan) {
            wishlistCountSpan.textContent = wishlist.length;
        }
    }

    window.addToCart = (productId) => { /* ... (Din befintliga addToCart-logik) ... */
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounts();
        alert(`"${games.find(g => g.id === productId).name}" har lagts till i varukorgen!`);
        if (typeof renderCartPage === 'function') renderCartPage();
    };

    window.removeFromCart = (productId) => { /* ... (Din befintliga removeFromCart-logik) ... */
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounts();
        if (typeof renderCartPage === 'function') renderCartPage();
    };

    window.changeCartQuantity = (productId, change) => { /* ... (Din befintliga changeCartQuantity-logik) ... */
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                window.removeFromCart(productId);
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCounts();
                if (typeof renderCartPage === 'function') renderCartPage();
            }
        }
    };

    window.addToWishlist = (productId) => { /* ... (Din befintliga addToWishlist-logik) ... */
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateCounts();
            alert(`"${games.find(g => g.id === productId).name}" har lagts till i önskelistan!`);
            if (typeof renderWishlistPage === 'function') renderWishlistPage();
        } else {
            alert('Denna produkt finns redan i önskelistan.');
        }
    };

    window.removeFromWishlist = (productId) => { /* ... (Din befintliga removeFromWishlist-logik) ... */
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCounts();
        if (typeof renderWishlistPage === 'function') renderWishlistPage();
    };

    // --- Funktion för att rendera ett spelkort (oförändrad) ---
    window.renderGameCard = function(game, options = {}) {
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

        link.appendChild(imgPlaceholder);
        link.appendChild(title);
        link.appendChild(price);
        article.appendChild(link);

        if (options.showAddToCart) {
            const buyButton = document.createElement('button');
            buyButton.classList.add('add-to-cart-btn', 'btn', 'primary-btn');
            buyButton.textContent = 'Köp';
            buyButton.onclick = () => window.addToCart(game.id);
            article.appendChild(buyButton);
        }

        if (options.showAddToWishlist) {
            const wishlistButton = document.createElement('button');
            wishlistButton.classList.add('add-to-wishlist-btn', 'btn', 'secondary-btn');
            wishlistButton.textContent = 'Lägg till önskelista';
            wishlistButton.onclick = () => window.addToWishlist(game.id);
            // Dölj om spelet redan finns i önskelistan
            const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (currentWishlist.includes(game.id)) {
                wishlistButton.style.display = 'none';
            }
            article.appendChild(wishlistButton);
        }

        if (options.showRemoveFromCart) {
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-from-cart-btn', 'btn');
            removeButton.textContent = 'Ta bort';
            removeButton.onclick = () => window.removeFromCart(game.id);
            article.appendChild(removeButton);
        }

        if (options.showRemoveFromWishlist) {
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-from-wishlist-btn', 'btn');
            removeButton.textContent = 'Ta bort';
            removeButton.onclick = () => window.removeFromWishlist(game.id);
            article.appendChild(removeButton);
        }

        if (options.showQuantityControls && options.quantity !== undefined) {
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-controls');
            quantityContainer.innerHTML = `
                <button class="quantity-btn decrease-quantity" data-id="${game.id}">-</button>
                <span>Antal: ${options.quantity}</span>
                <button class="quantity-btn increase-quantity" data-id="${game.id}">+</button>
            `;
            article.appendChild(quantityContainer);

            quantityContainer.querySelector('.decrease-quantity').onclick = () => window.changeCartQuantity(game.id, -1);
            quantityContainer.querySelector('.increase-quantity').onclick = () => window.changeCartQuantity(game.id, 1);
        }

        return article;
    }


    // --- Ladda spel på startsidan (index.html) ---
    const featuredGamesGrid = document.getElementById('featured-games-grid');
    const newReleasesGrid = document.getElementById('new-releases-grid');

    if (featuredGamesGrid) {
        games.slice(0, 4).forEach(game => {
            featuredGamesGrid.appendChild(renderGameCard(game, { showAddToCart: true, showAddToWishlist: true }));
        });
    }

    if (newReleasesGrid) {
        games.slice(4, 8).forEach(game => {
            newReleasesGrid.appendChild(renderGameCard(game, { showAddToCart: true, showAddToWishlist: true }));
        });
    }

    // --- Rendera varukorgssidan (`cart.html`) ---
    window.renderCartPage = function() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryDiv = document.getElementById('cart-summary');
        const cartTotalSpan = document.getElementById('cart-total');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const clearCartBtn = document.querySelector('.clear-cart-btn');

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let totalSum = 0;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartSummaryDiv.style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartSummaryDiv.style.display = 'block';

            cart.forEach(item => {
                const game = games.find(g => g.id === item.id);
                if (game) {
                    const card = renderGameCard(game, {
                        showRemoveFromCart: true,
                        showQuantityControls: true,
                        quantity: item.quantity
                    });

                    const itemPrice = document.createElement('span');
                    itemPrice.classList.add('item-price');
                    itemPrice.textContent = `Totalt: ${game.price * item.quantity} SEK`;
                    card.querySelector('a').appendChild(itemPrice);

                    cartItemsContainer.appendChild(card);
                    totalSum += game.price * item.quantity;
                }
            });
            cartTotalSpan.textContent = `${totalSum} SEK`;
        }
    };

    if (document.getElementById('cart-items') && document.querySelector('.clear-cart-btn')) {
        document.querySelector('.clear-cart-btn').addEventListener('click', () => {
            if (confirm('Är du säker på att du vill tömma varukorgen?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCounts();
                renderCartPage();
            }
        });
    }

    // --- Rendera önskelistan (`wishlist.html`) ---
    window.renderWishlistPage = function() {
        const wishlistItemsContainer = document.getElementById('wishlist-items');
        const wishlistEmptyMessage = document.getElementById('wishlist-empty-message');

        if (!wishlistItemsContainer) return;

        wishlistItemsContainer.innerHTML = '';

        if (wishlist.length === 0) {
            wishlistEmptyMessage.style.display = 'block';
        } else {
            wishlistEmptyMessage.style.display = 'none';

            wishlist.forEach(gameId => {
                const game = games.find(g => g.id === gameId);
                if (game) {
                    wishlistItemsContainer.appendChild(renderGameCard(game, {
                        showAddToCart: true,
                        showRemoveFromWishlist: true
                    }));
                }
            });
        }
    };


    // --- Användarnamn i headern efter inloggning (UPPDATERAD LOGIK) ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userActionsDiv = document.getElementById('header-user-actions');
    const loginLink = document.getElementById('login-link'); // Den vanliga login-länken

    if (loggedInUser && userActionsDiv) {
        // Om inloggad: ta bort "Logga In"-länken, lägg till "Välkommen" och "Logga Ut"
        if (loginLink) {
            loginLink.remove(); // Ta bort login-länken
        }

        const userNameSpan = document.createElement('span');
        userNameSpan.textContent = `Välkommen, ${loggedInUser}!`;
        userNameSpan.style.color = 'var(--primary-color)';
        userNameSpan.style.fontWeight = 'bold';

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logga Ut';
        logoutBtn.classList.add('btn');
        logoutBtn.classList.add('primary-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('cart'); // Töm även varukorgen vid utloggning om önskat
            localStorage.removeItem('wishlist'); // Töm även önskelistan vid utloggning
            window.location.reload(); // Ladda om sidan för att uppdatera headern
        });

        // Hitta varukorgsknappen för att infoga före
        const cartButton = userActionsDiv.querySelector('.cart-btn');
        const wishlistButton = userActionsDiv.querySelector('.wishlist-btn');
        if (wishlistButton) {
            userActionsDiv.insertBefore(userNameSpan, wishlistButton);
            userActionsDiv.insertBefore(logoutBtn, wishlistButton);
        } else if (cartButton) {
            userActionsDiv.insertBefore(userNameSpan, cartButton);
            userActionsDiv.insertBefore(logoutBtn, cartButton);
        }
    }
    // Om inte inloggad, behöver vi inte göra något här, login-länken kommer att finnas kvar som standard.


    // Initial uppdatering av räknare
    updateCounts();

    // Rendera innehållet på sidorna om vi är på dem (använder de nu globala funktionerna)
    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
    if (document.getElementById('wishlist-items')) {
        renderWishlistPage();
    }
});