// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Enkel validering
            if (username === '' || password === '') {
                alert('Vänligen fyll i både användarnamn och lösenord.');
                return;
            }

            // Hämta registrerade användare
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Hitta användaren
            const user = users.find(u => u.username === username && u.password === password); // OBS! Klartext-jämförelse

            if (user) {
                // Logga in användaren
                localStorage.setItem('loggedInUser', username);
                alert(`Välkommen, ${username}! Du är nu inloggad.`);
                window.location.href = 'index.html'; // Omdirigera till startsidan eller där användaren kom ifrån
            } else {
                alert('Felaktigt användarnamn eller lösenord.');
                usernameInput.value = ''; // Rensa fält
                passwordInput.value = '';
            }
        });
    }
});