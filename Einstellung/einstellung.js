

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Dropdown
    const navBar = document.querySelector('.nav-bar');
    navBar.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });

    // Initialize tabs
    tabs(0);

    // Load saved data
    loadUserData('benutzer');
    loadUserData('benutzereinstellungen');
    loadUserData('privatsphaere');

    // Add event listeners for the buttons
    addEventListeners('benutzer');
    addEventListeners('benutzereinstellungen');
    addEventListeners('privatsphaere');

    // Add event listener for the contact form
});

function tabs(tabIndex) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Show the selected tab content
    const tabIds = ['benutzer', 'benutzereinstellungen', 'privatsphaere', 'kontaktanfrage', 'logout'];
    document.getElementById(tabIds[tabIndex]).style.display = 'block';

    // Remove the 'actual' class from all menu links
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => link.classList.remove('actual'));

    // Add the 'actual' class to the selected menu link
    menuLinks[tabIndex].classList.add('actual');
}

function loadUserData(tab) {
    const fields = {
        benutzer: ['vorname', 'nachname', 'email', 'telefon', 'plz', 'ort', 'strasse', 'nr'],
        benutzereinstellungen: ['geschlecht', 'kalorien', 'groesse', 'gewicht', 'aktivitätslevel'],
        privatsphaere: ['benachrichtigung', 'werbung']
    };

    fields[tab].forEach(field => {
        const savedValue = localStorage.getItem(field);
        const element = document.getElementById(field);
        if (savedValue !== null) {
            if (element.type === 'checkbox') {
                element.checked = savedValue === 'true';
            } else {
                element.value = savedValue;
            }
        }
    });

    if (tab === 'benutzereinstellungen') {
        const slider = document.getElementById('groesse');
        const progress = slider.closest('.range-slider').querySelector('.progress');
        const thumb = slider.closest('.range-slider').querySelector('.slider-thumb');
        const tooltip = slider.closest('.range-slider').querySelector('.tooltip');

        function customSlider() {
            const maxVal = slider.getAttribute("max");
            const val = (slider.value / maxVal) * 100 + "%";

            tooltip.innerHTML = slider.value;
            progress.style.width = val;
            thumb.style.left = val;
        }
        customSlider();
    }
}

function saveUserData(tab) {
    const fields = {
        benutzer: ['vorname', 'nachname', 'email', 'telefon', 'plz', 'ort', 'strasse', 'nr'],
        benutzereinstellungen: ['geschlecht', 'kalorien', 'groesse', 'gewicht', 'aktivitätslevel'],
        privatsphaere: ['benachrichtigung', 'werbung']
    };

    fields[tab].forEach(field => {
        const element = document.getElementById(field);
        const value = element.type === 'checkbox' ? element.checked : element.value;
        localStorage.setItem(field, value);
    });
}

function addEventListeners(tab) {
    const cancelButton = document.querySelector(`#${tab} .btn-zurück`);
    const form = document.querySelector(`#${tab} form`);


    form.addEventListener('submit', (event) => {
        if (event != "invalid") {
            event.preventDefault();
            saveUserData(tab);
            calculateMacros();
            window.alert('Daten erfolgreich gespeichert!');
        }
    }
    );
    form4.addEventListener('submit', (event) => {
        if (event != "invalid") {
            event.preventDefault();
            showSuccessMessage();
            clearContactForm();
        }
    }
    );

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        loadUserData(tab);
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'inline-block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2500);
}

function clearContactForm() {
    const contactFormFields = ['kontakt-vorname', 'kontakt-nachname', 'kontakt-email', 'kontakt-telefon', 'kontaktgrund', 'kontaktaufnahme', 'anliegen'];
    contactFormFields.forEach(field => {
        const element = document.getElementById(field);
        if (element.type === 'select-one') {
            element.selectedIndex = 0;
        } else {
            element.value = '';
        }
    });
}

// Range slider logic
const container = document.querySelectorAll(".range-slider");
for (let i = 0; i < container.length; i++) {
    const slider = container[i].querySelector(".slider");
    const thumb = container[i].querySelector(".slider-thumb");
    const tooltip = container[i].querySelector(".tooltip");
    const progress = container[i].querySelector(".progress");

    function customSlider() {
        const maxVal = slider.getAttribute("max");
        const val = (slider.value / maxVal) * 100 + "%";

        tooltip.innerHTML = slider.value;
        progress.style.width = val;
        thumb.style.left = val;
    }
    customSlider();

    slider.addEventListener("input", () => {
        customSlider();
    })
}

// Calorie to macronutrient breakdown
function calculateMacros() {
    const kalorienInput = document.getElementById('kalorien');
    const kalorien = parseFloat(kalorienInput.value);

    const proteinsCal = Math.round(kalorien * 0.30);
    const carbsCal = Math.round(kalorien * 0.385);
    const fatCal = Math.round(kalorien * 0.315);

    const proteinsGramm = Math.round(proteinsCal / 4);
    const carbsGramm = Math.round(carbsCal / 4);
    const fatGramm = Math.round(fatCal / 9);

    console.log(`Proteins: ${proteinsCal} cal, ${proteinsGramm} g`);
    console.log(`Carbs: ${carbsCal} cal, ${carbsGramm} g`);
    console.log(`Fat: ${fatCal} cal, ${fatGramm} g`);

    // Store values in localStorage
    window.localStorage.setItem('kalorienInput', kalorien);
    window.localStorage.setItem('proteinsGramm', proteinsGramm);
    window.localStorage.setItem('carbsGramm', carbsGramm);
    window.localStorage.setItem('fatGramm', fatGramm);
}
