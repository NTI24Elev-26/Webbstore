// js/register.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Förhindra standardformulärinlämning

            const username = document.getElementById('reg-username').value.trim();
            const password = document.getElementById('reg-password').value;
            const passwordConfirm = document.getElementById('reg-password-confirm').value;

            // Enkel validering
            if (username === '' || password === '' || passwordConfirm === '') {
                alert('Vänligen fyll i alla fält.');
                return;
            }
            if (password !== passwordConfirm) {
                alert('Lösenorden matchar inte.');
                return;
            }
            if (password.length < 6) {
                alert('Lösenordet måste vara minst 6 tecken långt.');
                return;
            }

            // Hämta befintliga användare eller skapa en tom array
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Kontrollera om användarnamnet redan finns
            if (users.some(user => user.username === username)) {
                alert('Användarnamnet är redan upptaget. Välj ett annat.');
                return;
            }

            // Lägg till den nya användaren
            users.push({ username: username, password: password }); // OBS! Riktiga applikationer hashar lösenord!
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registrering lyckades! Du kan nu logga in.');
            window.location.href = 'login.html'; // Omdirigera till inloggningssidan
        });
    }
});