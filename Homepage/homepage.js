var datum = new Date();
var wochentag = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

// Aktuellen Wochentag ermitteln
var currentDay = datum.getDay();

// Entsprechenden Tag-String aus Array holen
var day = wochentag[currentDay].toLowerCase();

// Aktuelle Klasse "actual" entfernen
document.querySelector('.actual')?.classList.remove('actual');

// Neue Klasse "actual" zum aktuellen Tag hinzufügen
document.getElementById(day).classList.add('actual');

document.addEventListener('DOMContentLoaded', () => {
    // Setzen der Local Storage Variablen auf default Werte (Wichtig für Ernährungsseite bei erstem Aufruf und Anzeige der Kalorien auf der Homepage)
    if (!window.localStorage.getItem('caloriesEaten')) {
        window.localStorage.setItem('caloriesEaten', 0);
    }
    if (!window.localStorage.getItem('caloriesLeft')) {
        window.localStorage.setItem('caloriesLeft', 3000);
    }
    if (!window.localStorage.getItem('kalorienInput')) {
        window.localStorage.setItem('kalorienInput', 3000);
    }
    if (!window.localStorage.getItem('proteinsGramm')) {
        window.localStorage.setItem('proteinsGramm', 225);
    }
    if (!window.localStorage.getItem('proteins')) {
        window.localStorage.setItem('proteins', 0);
    }
    if (!window.localStorage.getItem('carbsGramm')) {
        window.localStorage.setItem('carbsGramm', 289);
    }
    if (!window.localStorage.getItem('carbs')) {
        window.localStorage.setItem('carbs', 0);
    }
    if (!window.localStorage.getItem('fatGramm')) {
        window.localStorage.setItem('fatGramm', 105);
    }
    if (!window.localStorage.getItem('fat')) {
        window.localStorage.setItem('fat', 0);
    }


    // Navigation Dropdown
    const navBar = document.querySelector('.nav-bar');
    navBar.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });
    const callseaten = parseInt(window.localStorage.getItem('caloriesEaten'));
    const callsopen = window.localStorage.getItem('caloriesLeft');
    document.getElementById('calls').innerHTML = callseaten + ' kcal gegessen' + '<br>' + callsopen + ' kcal offen';
    // Funktion zum Erstellen der Dropdowns
    const createDropdowns = () => {
        if (window.innerWidth <= 768) {
            // Wochentage Dropdown
            const weekDays = document.querySelector('.week-days');
            if (!document.querySelector('.week-days-select')) {
                const weekDaysSelect = document.createElement('select');
                weekDaysSelect.classList.add('week-days-select');
                const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
                days.forEach(day => {
                    const option = document.createElement('option');
                    option.value = day.toLowerCase();
                    option.text = day;
                    weekDaysSelect.appendChild(option);
                });
                weekDays.parentNode.insertBefore(weekDaysSelect, weekDays.nextSibling);

                // Hinzufügen des ausgewählten Tages-Containers
                const selectedDayContainer = document.createElement('div');
                selectedDayContainer.classList.add('selected-day-container');
                const selectedDay = document.createElement('div');
                selectedDay.classList.add('day');
                const selectedDayWrapper = document.createElement('div');
                selectedDayWrapper.classList.add('selected-day');
                selectedDayWrapper.appendChild(selectedDay);
                selectedDayContainer.appendChild(selectedDayWrapper);
                weekDaysSelect.parentNode.insertBefore(selectedDayContainer, weekDaysSelect.nextSibling);

                weekDaysSelect.addEventListener('change', () => {
                    const selectedDayValue = weekDaysSelect.value;
                    const actualDay = weekDays.querySelector('.actual').id;

                    selectedDay.textContent = selectedDayValue.charAt(0).toUpperCase() + selectedDayValue.slice(1, 2);
                    selectedDay.classList.toggle('actual', selectedDayValue === actualDay);
                });

                // Initialisieren des ausgewählten Tages
                const actualDay = weekDays.querySelector('.actual').id;
                weekDaysSelect.value = actualDay;
                selectedDay.textContent = actualDay.charAt(0).toUpperCase() + actualDay.slice(1, 2);
                selectedDay.classList.add('actual');
            }

        } else {
            // Entfernen der Dropdowns bei größerer Bildschirmgröße
            const weekDaysSelect = document.querySelector('.week-days-select');
            if (weekDaysSelect) {
                weekDaysSelect.remove();
            }
            const selectedDayContainer = document.querySelector('.selected-day-container');
            if (selectedDayContainer) {
                selectedDayContainer.remove();
            }
        }
    };



    // Initiales Erstellen der Dropdowns
    createDropdowns();

    // Neuladen der Dropdowns bei Änderung der Fenstergröße
    window.addEventListener('resize', createDropdowns);
});



