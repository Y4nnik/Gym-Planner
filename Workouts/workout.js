// script.js
const searchField = document.getElementById('searchField');

document.addEventListener('DOMContentLoaded', function() {
  // Load Workouts
    const workoutList = document.getElementById('workout-list');

    fetch('workouts.json')
        .then(response => response.json())
        .then(data => {
            data.workouts.forEach(workout => {
                const workoutItem = document.createElement('div');
                workoutItem.className = 'workout-item';

                workoutItem.innerHTML = `
                    <img src="${workout.image}" alt="Exercise">
                    <div>
                        <h2>${workout.name}</h2>
                        <p>${workout.description}</p>
                    </div>
                    <a href="workoutplan.html?workout=${encodeURIComponent(workout.name)}"><i class="fa-solid fa-chevron-right" style="color: #ffffff;"></i></a>
                `;

                workoutList.appendChild(workoutItem);
            });
        })
        .catch(error => console.error('Error loading workouts:', error));
});

searchField.addEventListener('keyup', (e) => {
    const exerciseList = document.getElementById('workout-list');
    const li = exerciseList.getElementsByClassName('workout-item');
    const filter = e.target.value.toUpperCase();
    for (let i = 0; i < li.length; i++) {
      const h2 = li[i].getElementsByTagName('h2')[0];
      const txtValue = h2.textContent || h2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  });

// Navigation Dropdown
const navBar = document.querySelector('.nav-bar');
navBar.addEventListener('click', () => {
    navBar.classList.toggle('open');
});