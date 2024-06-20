// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Load Workouts
    const workoutList = document.createElement('div');
    workoutList.className = 'workout-list';

    fetch('workouts.json')
        .then(response => response.json())
        .then(data => {
            data.workouts.forEach(workout => {
                const workoutItem = document.createElement('div');
                workoutItem.className = 'workout-item';

                workoutItem.innerHTML = `
                    <h2>${workout.name}</h2>
                    <p>${workout.description}</p>
                    <a href="workoutplan.html?workout=${encodeURIComponent(workout.name)}">Details</a>
                `;

                workoutList.appendChild(workoutItem);
            });

            document.body.appendChild(workoutList);
        })
        .catch(error => console.error('Error loading workouts:', error));
});
