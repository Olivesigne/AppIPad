// Récupérer les éléments de la page
const passwordList = document.getElementById('password-list');

// Charger les mots de passe au démarrage
document.addEventListener('DOMContentLoaded', loadPasswords);

// Fonction pour ajouter un mot de passe
function addPassword() {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (website && username && password) {
        const encryptedPassword = btoa(password); // Chiffrement basique en Base64
        const passwordData = { website, username, password: encryptedPassword };

        // Sauvegarder dans le localStorage
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords.push(passwordData);
        localStorage.setItem('passwords', JSON.stringify(passwords));

        // Ajouter à la liste et réinitialiser le formulaire
        displayPassword(passwordData);
        document.getElementById('website').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Fonction pour charger les mots de passe depuis le localStorage
function loadPasswords() {
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords.forEach(displayPassword);
}

// Fonction pour afficher un mot de passe dans la liste
function displayPassword(passwordData) {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <strong>${passwordData.website}</strong> - ${passwordData.username}
        <input type="text" value="${atob(passwordData.password)}" readonly>
        <button onclick="editPassword(this)">Modifier</button>
        <button onclick="deletePassword(this)">Supprimer</button>
    `;

    passwordList.appendChild(listItem);
}

// Fonction pour supprimer un mot de passe
function deletePassword(button) {
    const listItem = button.parentElement;
    const website = listItem.querySelector('strong').innerText;

    // Supprimer du localStorage
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    passwords = passwords.filter(item => item.website !== website);
    localStorage.setItem('passwords', JSON.stringify(passwords));

    // Supprimer de l'interface
    passwordList.removeChild(listItem);
}

// Fonction pour modifier un mot de passe
function editPassword(button) {
    const listItem = button.parentElement;
    const passwordInput = listItem.querySelector('input[type="text"]');

    if (button.innerText === "Modifier") {
        passwordInput.removeAttribute('readonly');
        passwordInput.focus();
        button.innerText = "Enregistrer";
    } else {
        // Sauvegarder le nouveau mot de passe chiffré
        const newPassword = passwordInput.value;
        const website = listItem.querySelector('strong').innerText;

        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwords = passwords.map(item => {
            if (item.website === website) {
                return { ...item, password: btoa(newPassword) };
            }
            return item;
        });

        localStorage.setItem('passwords', JSON.stringify(passwords));

        // Rendre le champ en lecture seule et réinitialiser le bouton
        passwordInput.setAttribute('readonly', true);
        button.innerText = "Modifier";
    }
}

// Fonction pour activer/désactiver le mode sombre
// Fonction pour activer/désactiver le mode sombre et enregistrer la préférence
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Met à jour le texte du bouton (facultatif)
    const darkModeButton = document.getElementById('darkModeToggle');
    if (darkModeButton) {
        darkModeButton.innerText = isDarkMode ? "Désactiver le mode sombre" : "Activer le mode sombre";
    }

    // Enregistre la préférence dans le Local Storage
    localStorage.setItem('darkMode', isDarkMode);
}

// Fonction pour appliquer le thème sombre au chargement de la page si la préférence est enregistrée
function applySavedTheme() {
    const savedDarkMode = localStorage.getItem('darkMode');

    // Vérifie si le mode sombre est activé dans le Local Storage
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const darkModeButton = document.getElementById('darkModeToggle');
        if (darkModeButton) {
            darkModeButton.innerText = "Désactiver le mode sombre";
        }
    }
}

// Appelle applySavedTheme() lorsque la page est chargée
window.addEventListener('DOMContentLoaded', applySavedTheme);

