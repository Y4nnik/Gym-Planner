
const searchField = document.getElementById('searchField');

document.addEventListener('DOMContentLoaded', function() {
  // Load exercises from JSON file and display them on the page
    fetch('exercises.json')
        .then(response => response.json())
        .then(data => {
            const exerciseList = document.getElementById('exercise-list');
            data.exercises.forEach(exercise => {
                const exerciseItem = document.createElement('div');
                exerciseItem.className = 'exercise-item';

                exerciseItem.innerHTML = `
                    <img src="${exercise.image}" alt="Exercise">
                    <div>
                        <h2>${exercise.name}</h2>
                        <p>${exercise.equipment}<br>${exercise.target}</p>
                    </div>
                    <a href="exercise.html?exercise=${encodeURIComponent(exercise.name)}"><i class="fa-solid fa-chevron-right" style="color: #ffffff;"></i></a>
                `;

                exerciseList.appendChild(exerciseItem);
            });
        })
        .catch(error => console.error('Error loading exercises:', error));
});


// Search functionality
searchField.addEventListener('keyup', (e) => {
    const exerciseList = document.getElementById('exercise-list');
    const li = exerciseList.getElementsByClassName('exercise-item');
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
