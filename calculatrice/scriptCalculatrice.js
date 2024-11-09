const display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Erreur";
    }
}

function calculateSquareRoot() {
    try {
        display.value = Math.sqrt(eval(display.value));
    } catch (error) {
        display.value = "Erreur";
    }
}

function calculatePower() {
    const base = display.value;
    const exponent = prompt("Entrez l'exposant:");
    if (exponent !== null) {
        try {
            display.value = Math.pow(eval(base), eval(exponent));
        } catch (error) {
            display.value = "Erreur";
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeButton = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.innerText = "Désactiver le mode sombre";
    } else {
        darkModeButton.innerText = "Activer le mode sombre";
    }
}
