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
const proteinFactor = 4;
const fatFactor = 9;
const carbFactor = 4;

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Dropdown
    const navBar = document.querySelector('.nav-bar');
    navBar.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });

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

            // Kalorien Übersicht Dropdown
            const caloriesOverview = document.querySelector('.calories-overview');
            if (!document.querySelector('.calories-dropdown')) {
                const caloriesDropdown = document.createElement('div');
                caloriesDropdown.classList.add('calories-dropdown');
                const caloriesSelect = document.createElement('select');
                const options = ['calories-eaten', 'calories-left', 'calories-planned'];
                options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.text = opt.replace('calories-', '').replace('-', ' ');
                    caloriesSelect.appendChild(option);
                });
                caloriesDropdown.appendChild(caloriesSelect);
                caloriesOverview.parentNode.insertBefore(caloriesDropdown, caloriesOverview.nextSibling);

                // Hinzufügen des Containers für die ausgewählte Kalorienklasse
                const selectedCaloriesContainer = document.createElement('div');
                selectedCaloriesContainer.classList.add('selected-calories-container');
                caloriesDropdown.parentNode.insertBefore(selectedCaloriesContainer, document.querySelector('.Naehrwerte'));

                // Default anzeigen
                const showSelectedCalories = () => {
                    options.forEach(opt => {
                        document.querySelector(`.${opt}`).style.display = 'none';
                    });
                    const selectedValue = caloriesSelect.value;
                    const selectedElement = document.querySelector(`.${selectedValue}`);
                    selectedElement.style.display = 'block';
                    selectedCaloriesContainer.innerHTML = '';
                    selectedCaloriesContainer.appendChild(selectedElement.cloneNode(true));
                };
                caloriesSelect.addEventListener('change', showSelectedCalories);
                showSelectedCalories();
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
            const caloriesDropdown = document.querySelector('.calories-dropdown');
            if (caloriesDropdown) {
                caloriesDropdown.remove();
            }
            const selectedCaloriesContainer = document.querySelector('.selected-calories-container');
            if (selectedCaloriesContainer) {
                selectedCaloriesContainer.remove();
            }
            // Alle Kalorienbereiche sichtbar machen
            const options = ['calories-eaten', 'calories-left', 'calories-planned'];
            options.forEach(opt => {
                document.querySelector(`.${opt}`).style.display = 'block';
            });
        }
    };

    // Initiales Erstellen der Dropdowns
    createDropdowns();

    // Neuladen der Dropdowns bei Änderung der Fenstergröße
    window.addEventListener('resize', createDropdowns);
});

