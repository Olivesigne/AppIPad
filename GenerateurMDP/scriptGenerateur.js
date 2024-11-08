const passwordDisplay = document.getElementById('password-display');
const passwordList = document.getElementById('password-list');

// Génération de mot de passe sécurisé
function generatePassword() {
    const length = document.getElementById('length').value;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordDisplay.value = password;
}

// Basculer le mode sombre
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

