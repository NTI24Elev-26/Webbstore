// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (!loggedInUsername) {
        alert('Du måste vara inloggad för att se din profil.');
        window.location.href = 'login.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === loggedInUsername);

    if (!currentUser) {
        alert('Ett fel uppstod. Kunde inte hitta användardata.');
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
        return;
    }

    const profileUsernameSpan = document.getElementById('profile-username');
    const profileEmailSpan = document.getElementById('profile-email');
    const profilePasswordDisplay = document.getElementById('profile-password-display');

    const showPasswordBtn = document.getElementById('show-password-btn');
    const passwordConfirmModal = document.getElementById('password-confirm-modal');
    const closeModalBtn = passwordConfirmModal.querySelector('.close-button');
    const modalPasswordInput = document.getElementById('modal-password');
    const confirmPasswordBtn = document.getElementById('confirm-password-btn');
    const modalErrorMessage = document.getElementById('modal-error-message');

    if (profileUsernameSpan) profileUsernameSpan.textContent = currentUser.username;
    if (profileEmailSpan) profileEmailSpan.textContent = currentUser.email;
    if (profilePasswordDisplay) profilePasswordDisplay.textContent = '••••••••';

    let passwordVisible = false;

    if (showPasswordBtn && profilePasswordDisplay) {
        showPasswordBtn.addEventListener('click', () => {
            if (passwordVisible) {
                profilePasswordDisplay.textContent = '••••••••';
                showPasswordBtn.textContent = 'Visa Lösenord';
                passwordVisible = false;
            } else {
                passwordConfirmModal.style.display = 'block';
                modalPasswordInput.value = '';
                modalErrorMessage.style.display = 'none';
                modalPasswordInput.focus();
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            passwordConfirmModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === passwordConfirmModal) {
            passwordConfirmModal.style.display = 'none';
        }
    });

    if (confirmPasswordBtn) {
        confirmPasswordBtn.addEventListener('click', () => {
            const enteredPassword = modalPasswordInput.value;

            if (enteredPassword === currentUser.password) {
                profilePasswordDisplay.textContent = currentUser.password;
                passwordVisible = true;
                showPasswordBtn.textContent = 'Dölj Lösenord';
                passwordConfirmModal.style.display = 'none';
                modalErrorMessage.style.display = 'none';
            } else {
                modalErrorMessage.style.display = 'block';
            }
        });
    }


    const showPersonalInfoBtn = document.getElementById('show-personal-info');
    const showGameLibraryBtn = document.getElementById('show-game-library');
    const personalInfoSection = document.getElementById('personal-info-section');
    const gameLibrarySection = document.getElementById('game-library-section');
    const ownedGamesGrid = document.getElementById('owned-games-grid');
    const noOwnedGamesMessage = document.getElementById('no-owned-games-message');

    function showSection(sectionToShow) {
        personalInfoSection.style.display = 'none';
        gameLibrarySection.style.display = 'none';

        showPersonalInfoBtn.classList.remove('active');
        showGameLibraryBtn.classList.remove('active');

        sectionToShow.style.display = 'block';

        if (sectionToShow === personalInfoSection) {
            showPersonalInfoBtn.classList.add('active');
            profilePasswordDisplay.textContent = '••••••••';
            showPasswordBtn.textContent = 'Visa Lösenord';
            passwordVisible = false;
        } else if (sectionToShow === gameLibrarySection) {
            showGameLibraryBtn.classList.add('active');
            renderGameLibrary(currentUser);
        }
    }

    if (showPersonalInfoBtn) {
        showPersonalInfoBtn.addEventListener('click', () => showSection(personalInfoSection));
    }
    if (showGameLibraryBtn) {
        showGameLibraryBtn.addEventListener('click', () => showSection(gameLibrarySection));
    }

    // --- NY FUNKTION: Ta bort spel från biblioteket ---
    window.removeFromOwnedGames = (gameId) => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Du måste vara inloggad för att redigera ditt bibliotek.');
            window.location.href = 'login.html';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUserIndex = users.findIndex(u => u.username === loggedInUser);

        if (currentUserIndex !== -1) {
            const currentUser = users[currentUserIndex];
            if (currentUser.ownedGames) {
                // Filtrera bort spelet baserat på dess ID
                currentUser.ownedGames = currentUser.ownedGames.filter(id => id !== gameId);
                localStorage.setItem('users', JSON.stringify(users));
                alert(`"${games.find(g => g.id === gameId).name}" har tagits bort från ditt bibliotek.`);
                renderGameLibrary(currentUser); // Uppdatera vyn direkt
            }
        }
    };


    // --- Rendera Spelbiblioteket (UPPDATERAD) ---
    function renderGameLibrary(user) {
        ownedGamesGrid.innerHTML = '';
        // ownedGames är nu en array av bara ID:n igen
        const ownedGameIds = user.ownedGames || [];

        if (ownedGameIds.length === 0) {
            noOwnedGamesMessage.style.display = 'block';
            return;
        } else {
            noOwnedGamesMessage.style.display = 'none';
        }

        ownedGameIds.forEach(gameId => { // Loopar igenom varje ägt spel-ID
            const game = games.find(g => g.id === gameId);
            if (game) {
                ownedGamesGrid.appendChild(window.renderGameCard(game, {
                    showAddToCart: false,
                    showAddToWishlist: false,
                    showRemoveFromLibrary: true // NY: Visa "Ta bort från bibliotek"-knappen
                }));
            }
        });
    }

    showSection(personalInfoSection);
});