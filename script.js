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

    // --- Varukorgs- och Önskelista-logik ---
    const cartCountSpan = document.getElementById('cart-count');
    const wishlistCountSpan = document.getElementById('wishlist-count');

    // Varukorgen lagrar nu bara en lista med unika ID:n, inte objekt med kvantitet
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Förväntas vara [id1, id2]
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; // Förväntas vara [id1, id2]

    function updateCounts() {
        if (cartCountSpan) {
            cartCountSpan.textContent = cart.length; // Räknar unika spel
        }
        if (wishlistCountSpan) {
            wishlistCountSpan.textContent = wishlist.length;
        }
    }

    window.addToCart = (productId) => {
        if (!cart.includes(productId)) { // Kontrollera om spelet redan finns i varukorgen
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCounts();
            alert(`"${games.find(g => g.id === productId).name}" har lagts till i varukorgen!`);
            // Uppdatera produktsidan om funktionen finns där
            if (typeof renderCartPage === 'function') renderCartPage();
            // Uppdatera knappen på produktdetaljsidan (om vi är där)
            if (window.location.pathname.includes('product-detail.html')) {
                // Enkel lösning för att tvinga uppdatering av knappen på detaljsidan
                // Bättre att ha en specifik uppdateringsfunktion i product-detail.js
                const addToCartBtn = document.getElementById('product-detail-add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.textContent = 'I varukorgen';
                    addToCartBtn.disabled = true;
                }
            }
        } else {
            alert('Denna produkt finns redan i varukorgen.');
        }
    };

    window.removeFromCart = (productId) => {
        cart = cart.filter(id => id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCounts();
        if (typeof renderCartPage === 'function') renderCartPage();
    };

    // changeCartQuantity tas bort eftersom vi inte hanterar kvantiteter i varukorgen längre
    // window.changeCartQuantity = (productId, change) => { ... };

    window.addToWishlist = (productId) => {
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateCounts();
            alert(`"${games.find(g => g.id === productId).name}" har lagts till i önskelistan!`);
            if (typeof renderWishlistPage === 'function') renderWishlistPage();
            // Uppdatera knappen på produktdetaljsidan
            if (window.location.pathname.includes('product-detail.html')) {
                const addToWishlistBtn = document.getElementById('product-detail-add-to-wishlist');
                if (addToWishlistBtn) {
                    addToWishlistBtn.style.display = 'none'; // Dölj den om den lagts till
                }
            }
        } else {
            alert('Denna produkt finns redan i önskelistan.');
        }
    };

    window.removeFromWishlist = (productId) => {
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCounts();
        if (typeof renderWishlistPage === 'function') renderWishlistPage();
    };

    // --- Funktion för att lägga till spel i användarens bibliotek (UPPDATERAD) ---
    // Tar nu emot en array av game IDs, inte varukorgsobjekt
    window.addToOwnedGames = (gameIds) => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Du måste vara inloggad för att lägga till spel i ditt bibliotek.');
            window.location.href = 'login.html';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUserIndex = users.findIndex(u => u.username === loggedInUser);

        if (currentUserIndex !== -1) {
            const currentUser = users[currentUserIndex];
            if (!currentUser.ownedGames) {
                currentUser.ownedGames = []; // Initialisera som en array av ID:n
            }

            let gamesAddedCount = 0;
            gameIds.forEach(gameId => {
                if (!currentUser.ownedGames.includes(gameId)) { // Lägg bara till unika ID:n
                    currentUser.ownedGames.push(gameId);
                    gamesAddedCount++;
                }
            });

            if (gamesAddedCount > 0) {
                localStorage.setItem('users', JSON.stringify(users));
                console.log(`${gamesAddedCount} spel har lagts till i biblioteket för ${loggedInUser}.`);
            } else {
                console.log('Inga nya spel lades till i biblioteket.');
            }
        } else {
            console.error('Kunde inte hitta inloggad användare för att lägga till spel i biblioteket.');
        }
    };

    // --- Funktion för att rendera ett spelkort (UPPDATERAD) ---
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

        // Kontrollera om spelet redan ägs av den inloggade användaren (UPPDATERAD FÖR UNIKA ID:N)
        const loggedInUser = localStorage.getItem('loggedInUser');
        let userOwnsGame = false;
        if (loggedInUser) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = users.find(u => u.username === loggedInUser);
            if (currentUser && currentUser.ownedGames && currentUser.ownedGames.includes(game.id)) {
                userOwnsGame = true;
            }
        }
        // Kontrollera om spelet finns i varukorgen
        const isInCart = cart.includes(game.id);


        if (options.showAddToCart) {
            const buyButton = document.createElement('button');
            buyButton.classList.add('add-to-cart-btn', 'btn', 'primary-btn');

            if (userOwnsGame) {
                buyButton.textContent = 'Ägs redan';
                buyButton.disabled = true;
            } else if (isInCart) {
                buyButton.textContent = 'I varukorgen';
                buyButton.disabled = true;
            }
            else {
                buyButton.textContent = 'Köp';
                buyButton.disabled = false;
                buyButton.onclick = () => window.addToCart(game.id);
            }
            article.appendChild(buyButton);
        }

        if (options.showAddToWishlist) {
            const wishlistButton = document.createElement('button');
            wishlistButton.classList.add('add-to-wishlist-btn', 'btn', 'secondary-btn');
            wishlistButton.textContent = 'Lägg till önskelista';
            wishlistButton.onclick = () => window.addToWishlist(game.id);
            // Dölj om spelet redan finns i önskelistan eller om det ägs
            const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (currentWishlist.includes(game.id) || userOwnsGame) {
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

        // NY: showRemoveFromLibrary (för profilsidan)
        if (options.showRemoveFromLibrary) {
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-from-library-btn', 'btn');
            removeButton.textContent = 'Ta bort från bibliotek';
            removeButton.onclick = () => window.removeFromOwnedGames(game.id);
            article.appendChild(removeButton);
        }

        // Kvantitetskontroller tas bort för varukorgen men kvar i renderGameCard (om det behövs för andra syften)
        // I detta scenario med "bara en kopia", behövs de inte här.
        // options.showQuantityControls och options.quantity är nu irrelevant för varukorgen/biblioteket.
        // Om du har en annan sida där du vill visa kvantitet för ett kort, kan du behålla den här sektionen.
        // För biblioteket kommer vi inte att visa det, bara att det "ägs".
        if (options.showQuantityControls && options.quantity !== undefined) {
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-controls');
            quantityContainer.innerHTML = `<span>Antal: ${options.quantity}</span>`;
            article.appendChild(quantityContainer);
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

    // --- Rendera varukorgssidan (`cart.html`) (UPPDATERAD) ---
    window.renderCartPage = function() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryDiv = document.getElementById('cart-summary');
        const cartTotalSpan = document.getElementById('cart-total');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const clearCartBtn = document.querySelector('.clear-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let totalSum = 0;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            cartSummaryDiv.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            cartSummaryDiv.style.display = 'block';
            if (checkoutBtn) checkoutBtn.style.display = 'block';

            cart.forEach(gameId => { // Loopar nu igenom bara ID:n
                const game = games.find(g => g.id === gameId);
                if (game) {
                    const card = renderGameCard(game, {
                        showRemoveFromCart: true,
                        // Kvantitetskontroller och redigerbarhet tas bort här
                        showAddToCart: false,
                        showAddToWishlist: false
                    });

                    const itemPrice = document.createElement('span');
                    itemPrice.classList.add('item-price');
                    itemPrice.textContent = `Pris: ${game.price} SEK`; // Nu bara enhetspris
                    card.querySelector('a').appendChild(itemPrice);

                    cartItemsContainer.appendChild(card);
                    totalSum += game.price; // Summerar bara enhetspriserna
                }
            });
            cartTotalSpan.textContent = `${totalSum} SEK`;
        }
    };
    const header = document.querySelector('header');

    let headerHeight = header.offsetHeight;

    const contentToPushDown = document.body;



    function handleStickyHeader() {

        if (window.scrollY > headerHeight) {

            header.classList.add('fixed');

            contentToPushDown.style.paddingTop = `${headerHeight}px`;

        } else {

            header.classList.remove('fixed');

            contentToPushDown.style.paddingTop = '0';

        }

    }



    window.addEventListener('scroll', handleStickyHeader);

    handleStickyHeader();

    window.addEventListener('resize', () => {

        headerHeight = header.offsetHeight;

        handleStickyHeader();

    })

    if (document.getElementById('cart-items') && document.querySelector('.clear-cart-btn')) {
        document.querySelector('.clear-cart-btn').addEventListener('click', () => {
            if (confirm('Är du säker på att du vill tömma varukorgen?')) {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCounts();
                renderCartPage();
            }
        });

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const loggedInUser = localStorage.getItem('loggedInUser');
                if (!loggedInUser) {
                    alert('Du måste vara inloggad för att slutföra köpet.');
                    window.location.href = 'login.html';
                    return;
                }

                if (cart.length === 0) {
                    alert('Din varukorg är tom!');
                    return;
                }

                if (confirm('Vill du slutföra ditt köp?')) {
                    // Skicka bara en lista med ID:n
                    window.addToOwnedGames(cart);

                    cart = []; // Töm varukorgen efter köp
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCounts();
                    renderCartPage();

                    alert('Ditt köp har slutförts! Spelen finns nu i ditt bibliotek.');
                    window.location.href = 'profile.html'; // Omdirigera till profilsidan
                }
            });
        }
    }


    // --- Rendera önskelistan (`wishlist.html`) (oförändrad, fungerar redan med ID-lista) ---
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
                        showAddToCart: true, // Fortsätt visa köp-knapp i önskelistan
                        showRemoveFromWishlist: true
                    }));
                }
            });
        }
    };


    // --- Användarstatus och Inloggning/Utloggning (oförändrad) ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userActionsDiv = document.getElementById('header-user-actions');
    const authStatusElement = document.getElementById('auth-status');

    if (loggedInUser && userActionsDiv && authStatusElement) {
        const welcomeContainer = document.createElement('div');
        welcomeContainer.classList.add('logged-in-status');
        welcomeContainer.style.display = 'flex';
        welcomeContainer.style.alignItems = 'center';
        welcomeContainer.style.gap = '15px';

        const userNameLink = document.createElement('a');
        userNameLink.href = 'profile.html';
        userNameLink.textContent = `Välkommen, ${loggedInUser}!`;
        userNameLink.style.color = 'var(--primary-color)';
        userNameLink.style.fontWeight = 'bold';
        userNameLink.classList.add('profile-link');

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logga Ut';
        logoutBtn.classList.add('btn');
        logoutBtn.classList.add('primary-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('cart');
            localStorage.removeItem('wishlist');
            window.location.reload();
        });

        welcomeContainer.appendChild(userNameLink);
        welcomeContainer.appendChild(logoutBtn);

        userActionsDiv.replaceChild(welcomeContainer, authStatusElement);

    }

    updateCounts();

    if (document.getElementById('cart-items')) {
        renderCartPage();
    }
    if (document.getElementById('wishlist-items')) {
        renderWishlistPage();
    }

});
// (Sticky Header Logik kan vara kvar som den är.)