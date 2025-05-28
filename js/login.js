// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const identifierInput = document.getElementById('login-identifier'); // Nytt ID
            const passwordInput = document.getElementById('password');

            const identifier = identifierInput.value.trim(); // Kan vara användarnamn eller e-post
            const password = passwordInput.value;

            // Enkel validering
            if (identifier === '' || password === '') {
                alert('Vänligen fyll i både användarnamn/e-post och lösenord.'); 4
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Försök hitta användaren baserat på antingen användarnamn ELLER e-post
            const user = users.find(u =>
                (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase()) &&
                u.password === password
            );

            if (user) {
                // Logga in användaren. Vi sparar användarnamnet i localStorage för att visa det i headern.
                localStorage.setItem('loggedInUser', user.username);
                alert(`Välkommen, ${user.username}! Du är nu inloggad.`);
                window.location.href = 'index.html'; // Omdirigera
            } else {
                alert('Felaktigt användarnamn/e-post eller lösenord.');
                identifierInput.value = ''; // Rensa fält
                passwordInput.value = '';
            }
        });
    }
});