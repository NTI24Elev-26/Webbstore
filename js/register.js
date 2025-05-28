document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Förhindra standardformulärinlämning

            const username = document.getElementById('reg-username').value.trim(); // Hämta användarnamn
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const passwordConfirm = document.getElementById('reg-password-confirm').value;

            // Enkel validering
            if (username === '' || email === '' || password === '' || passwordConfirm === '') {
                alert('Vänligen fyll i alla fält.');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert('Vänligen ange en giltig e-postadress.');
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

            // Hämtar befintliga användare eller skapa en tom array
            // Varje användare lagras som { username: "...", email: "...", password: "..." }
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Kontrollerar om användarnamnet redan finns
            if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
                alert('Användarnamnet är redan upptaget. Välj ett annat.');
                return;
            }
            // Kontrollerar om e-posten redan finns
            if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
                alert('E-postadressen är redan registrerad. Välj en annan.');
                return;
            }

            // Lägger till den nya användaren
            users.push({ username: username, email: email, password: password }); // Uppdaterad datastruktur
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registrering lyckades! Du kan nu logga in.');
            window.location.href = 'login.html'; // Omdirigera till inloggningssidan
        });
    }
});