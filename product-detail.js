// js/product-detail.js (mindre ändring i URL-parametern för taggar)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    const game = games.find(g => g.id === gameId);

    if (game) {
        document.getElementById('product-page-title').textContent = game.name;
        document.getElementById('product-detail-image').src = game.image;
        document.getElementById('product-detail-image').alt = `Spelomslag för ${game.name}`;
        document.getElementById('product-detail-name').textContent = game.name;
        document.getElementById('product-detail-price').textContent = `${game.price} SEK`;
        document.getElementById('product-detail-description').textContent = game.description;

        const tagsContainer = document.getElementById('product-detail-tags');
        game.tags.forEach(tag => {
            const tagSpan = document.createElement('a');
            tagSpan.classList.add('product-tag');
            tagSpan.textContent = tag;
            // Skicka tag som en singular 'tag' parameter.
            // På products.html kan vi sedan läsa den och konvertera till en array om det behövs
            // eller bara lägga till den som första filter.
            tagSpan.href = `products.html?tags=${encodeURIComponent(tag)}`; // Ändrad till 'tags' för konsekvens
            tagsContainer.appendChild(tagSpan);
        });

        const addToCartBtn = document.getElementById('product-detail-add-to-cart');
        addToCartBtn.dataset.productId = game.id;
    } else {
        document.getElementById('product-page-title').textContent = 'Spel hittades ej';
        document.getElementById('product-detail-name').textContent = 'Spel hittades ej';
        document.getElementById('product-detail-description').textContent = 'Tyvärr kunde vi inte hitta spelet du sökte.';
        document.getElementById('product-detail-add-to-cart').style.display = 'none';
    }
});