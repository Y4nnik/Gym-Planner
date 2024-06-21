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
    //local Storage reseten wenn neuer Tag
    const lastDay = parseInt(window.localStorage.getItem('lastDay'));
    if (currentDay !== lastDay) {
        console.log(currentDay, lastDay)
        window.localStorage.setItem('caloriesEaten', 0);
        const kalorienInputnew = parseInt(window.localStorage.getItem('kalorienInput'));
        window.localStorage.setItem('caloriesLeft', kalorienInputnew);
        window.localStorage.setItem('lastDay', currentDay);
        window.localStorage.setItem('proteins', 0);
        window.localStorage.setItem('carbs', 0);
        window.localStorage.setItem('fat', 0);
    }


    // set all local storage values to 0
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
                caloriesOverview.parentNode.insertBefore(caloriesDropdown, caloriesOverview);

                // Hinzufügen des Containers für die ausgewählte Kalorienklasse
                const selectedCaloriesContainer = document.createElement('div');
                selectedCaloriesContainer.classList.add('selected-calories-container');
                caloriesDropdown.parentNode.insertBefore(selectedCaloriesContainer, caloriesOverview);

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

    // Get the values from local storage
    const kalorienInput = parseInt(window.localStorage.getItem('kalorienInput'));
    const proteinsGramm = parseInt(window.localStorage.getItem('proteinsGramm'));
    const proteins = parseInt(window.localStorage.getItem('proteins'));
    const carbsGramm = parseInt(window.localStorage.getItem('carbsGramm'));
    const carbs = parseInt(window.localStorage.getItem('carbs'));
    const fatGramm = parseInt(window.localStorage.getItem('fatGramm'));
    const fat = parseInt(window.localStorage.getItem('fat'));
    const kalorienEaten = parseInt(window.localStorage.getItem('caloriesEaten'));
    const kaloriesleft = kalorienInput - kalorienEaten;
    const prozentKalorien = 100 - ((kalorienEaten / kalorienInput) * 100);
    const valuePathpurple = (prozentKalorien * 213) / 100 + 20;


    // Set the initial values
    document.querySelector('.calories-planned h3').innerText = kalorienInput;
    document.querySelector('.calories-left h3').innerText = kaloriesleft || kalorienInput;
    document.querySelector('.calories-eaten h3').innerText = window.localStorage.getItem('caloriesEaten') || 0;
    document.getElementById('carbs-value').innerText = `${carbs || 0} / ${carbsGramm}g`;
    document.getElementById('carbs').value = (carbs / carbsGramm) * 100;
    document.getElementById('proteins-value').innerText = `${proteins || 0} / ${proteinsGramm}g`;
    document.getElementById('proteins').value = (proteins / proteinsGramm) * 100;
    document.getElementById('fat-value').innerText = `${fat || 0} / ${fatGramm}g`;
    document.getElementById('fat').value = (fat / fatGramm) * 100;
    if (kalorienInput === 0) {
        document.getElementById('purple').style.strokeDashoffset = 233;
    }
    if (kalorienEaten > kalorienInput) {
        document.getElementById('purple').style.strokeDashoffset = 20;
    }
    else {
    document.getElementById('purple').style.strokeDashoffset = valuePathpurple;
    }

    // Function to update the values
    function updateValues(event) {
        // Get the parent banner of the clicked add button
        const banner = event.target.closest('.banner');

        // Get input values
        const inputCarbs = banner.querySelector('.input-carbs').value;
        const inputProteins = banner.querySelector('.input-proteins').value;
        const inputFat = banner.querySelector('.input-fat').value;

        // Validate inputs
        if (inputCarbs === '' || inputProteins === '' || inputFat === '') {
            alert("Please fill in all fields.");
            return;
        }

        // Calculate the calories
        const carbsCalories = parseInt(inputCarbs) * carbFactor;
        const proteinsCalories = parseInt(inputProteins) * proteinFactor;
        const fatCalories = parseInt(inputFat) * fatFactor;
        const totalCalories = carbsCalories + proteinsCalories + fatCalories;

        // Update the calories-eaten value
        const caloriesEatenElement = document.querySelector('.calories-eaten h3');
        const currentCaloriesEaten = parseInt(caloriesEatenElement.innerText) || 0;
        const newCaloriesEaten = currentCaloriesEaten + totalCalories;
        const prozentKalorien = 100 - ((newCaloriesEaten / kalorienInput) * 100);
        const valuePathpurple = (prozentKalorien * 213) / 100 + 20;
        caloriesEatenElement.innerText = newCaloriesEaten;
        window.localStorage.setItem('caloriesEaten', newCaloriesEaten);
        document.getElementById('purple').style.strokeDashoffset = valuePathpurple;

        // Update the carbs value
        const carbsValueElement = document.getElementById('carbs-value');
        const currentCarbs = parseInt(carbsValueElement.innerText.split('/')[0]) || 0;
        carbsValueElement.innerText = `${currentCarbs + parseInt(inputCarbs)} / ${carbsGramm}g`;
        document.getElementById('carbs').value = ((currentCarbs + parseInt(inputCarbs)) / carbsGramm) * 100;
        window.localStorage.setItem('carbs', ((currentCarbs + parseInt(inputCarbs))));

        // Update the proteins value
        const proteinsValueElement = document.getElementById('proteins-value');
        const currentProteins = parseInt(proteinsValueElement.innerText.split('/')[0]) || 0;
        proteinsValueElement.innerText = `${currentProteins + parseInt(inputProteins)} / ${proteinsGramm}g`;
        document.getElementById('proteins').value = ((currentProteins + parseInt(inputProteins)) / proteinsGramm) * 100;
        window.localStorage.setItem('proteins', ((currentProteins + parseInt(inputProteins))));

        // Update the fat value
        const fatValueElement = document.getElementById('fat-value');
        const currentFat = parseInt(fatValueElement.innerText.split('/')[0]) || 0;
        fatValueElement.innerText = `${currentFat + parseInt(inputFat)} / ${fatGramm}g`;
        document.getElementById('fat').value = ((currentFat + parseInt(inputFat)) / fatGramm) * 100;
        window.localStorage.setItem('fat', ((currentFat + parseInt(inputFat))));

        // Update the calories-left value
        const caloriesLeftElement = document.querySelector('.calories-left h3');
        const newCaloriesLeft = kalorienInput - newCaloriesEaten;
        caloriesLeftElement.innerText = newCaloriesLeft;
        window.localStorage.setItem('caloriesLeft', newCaloriesLeft);

        // Clear input fields
        banner.querySelector('.input-carbs').value = '';
        banner.querySelector('.input-proteins').value = '';
        banner.querySelector('.input-fat').value = '';
    }

    // Get all add buttons (images) and attach click event listener
    const addButtons = document.querySelectorAll('.banner img[alt="add icon"]');
    addButtons.forEach(function (button) {
        button.addEventListener('click', updateValues);
    });
});
