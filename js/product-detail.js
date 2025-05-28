document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    const productPageTitle = document.getElementById('product-page-title');
    const productDetailImage = document.getElementById('product-detail-image');
    const productDetailName = document.getElementById('product-detail-name');
    const productDetailPrice = document.getElementById('product-detail-price');
    const productDetailDescription = document.getElementById('product-detail-description');
    const tagsContainer = document.getElementById('product-detail-tags');

    const addToCartBtn = document.getElementById('product-detail-add-to-cart');
    const addToWishlistBtn = document.getElementById('product-detail-add-to-wishlist');

    const game = games.find(g => g.id === gameId);

    if (game) {
        if (productPageTitle) productPageTitle.textContent = game.name;
        if (productDetailImage) {
            productDetailImage.src = game.image || 'images/placeholder.jpg';
            productDetailImage.alt = `Spelomslag för ${game.name}`;
        }
        if (productDetailName) productDetailName.textContent = game.name;
        if (productDetailPrice) productDetailPrice.textContent = `${game.price} SEK`;
        if (productDetailDescription) productDetailDescription.textContent = game.description;

        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            game.tags.forEach(tag => {
                const tagSpan = document.createElement('a');
                tagSpan.classList.add('product-tag');
                tagSpan.textContent = tag;
                tagSpan.href = `products.html?tags=${encodeURIComponent(tag)}`;
                tagsContainer.appendChild(tagSpan);
            });
        }

        // --- Hämta användarstatus och spelstatus ---
        const loggedInUser = localStorage.getItem('loggedInUser');
        const isLoggedIn = loggedInUser !== null;
        let userOwnsGame = false;
        let isInWishlist = false;
        let isInCart = false; // NY: Kolla om spelet finns i varukorgen

        if (isLoggedIn) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = users.find(u => u.username === loggedInUser);
            if (currentUser && currentUser.ownedGames && currentUser.ownedGames.includes(game.id)) {
                userOwnsGame = true;
            }
            const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            isInWishlist = currentWishlist.includes(game.id);
            const currentCart = JSON.parse(localStorage.getItem('cart')) || []; // Hämta aktuell varukorg
            isInCart = currentCart.includes(game.id); // Kolla om spelet finns i varukorgen
        }

        // --- Logik för "Lägg i varukorg" / "Köp" / "Ägs redan" knappen ---
        if (addToCartBtn) {
            if (userOwnsGame) {
                addToCartBtn.textContent = 'Ägs redan';
                addToCartBtn.disabled = true;
                addToCartBtn.classList.remove('login-prompt-button');
                addToCartBtn.onclick = null;
            } else if (isInCart) { // NY: Om det redan finns i varukorgen
                addToCartBtn.textContent = 'I varukorgen';
                addToCartBtn.disabled = true;
                addToCartBtn.classList.remove('login-prompt-button');
                addToCartBtn.onclick = null;
            }
            else if (isLoggedIn) {
                addToCartBtn.textContent = 'Lägg i varukorg';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('login-prompt-button');
                addToCartBtn.onclick = () => window.addToCart(game.id);
            } else {
                addToCartBtn.textContent = 'Logga in för att köpa';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.add('login-prompt-button');
                addToCartBtn.onclick = () => {
                    alert('Du måste logga in för att köpa spel.');
                    window.location.href = 'login.html';
                };
            }
            addToCartBtn.style.display = '';
        }

        // --- Logik för "Lägg till önskelista" knappen ---
        if (addToWishlistBtn) {
            if (userOwnsGame || isInWishlist) {
                addToWishlistBtn.style.display = 'none';
                addToWishlistBtn.onclick = null;
            } else if (isLoggedIn) {
                addToWishlistBtn.textContent = 'Lägg till önskelista';
                addToWishlistBtn.classList.remove('login-prompt-button');
                addToWishlistBtn.style.display = '';
                addToWishlistBtn.onclick = () => window.addToWishlist(game.id);
            } else {
                addToWishlistBtn.textContent = 'Logga in för önskelista';
                addToWishlistBtn.classList.add('login-prompt-button');
                addToWishlistBtn.style.display = '';
                addToWishlistBtn.onclick = () => {
                    alert('Du måste logga in för att lägga till på önskelista.');
                    window.location.href = 'login.html';
                };
            }
        }

    } else {
        if (productPageTitle) productPageTitle.textContent = 'Spel hittades ej';
        if (productDetailName) productDetailName.textContent = 'Spel hittades ej';
        if (productDetailDescription) productDetailDescription.textContent = 'Tyvärr kunde vi inte hitta spelet du sökte.';
        if (addToCartBtn) addToCartBtn.style.display = 'none';
        if (addToWishlistBtn) addToWishlistBtn.style.display = 'none';
        if (tagsContainer) tagsContainer.innerHTML = '';
    }
});