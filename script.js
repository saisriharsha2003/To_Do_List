// Function to add a task to the list and save it in Local Storage
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  const li = document.createElement('li');
  li.innerText = taskText;

  // Create a "Completed" button for the task
  const completedButton = document.createElement('button');
  completedButton.innerText = 'Completed';
  completedButton.addEventListener('click', function () {
    removeTask(li);
  });

  li.appendChild(completedButton);
  taskList.appendChild(li);
  taskInput.value = '';

  // Save the tasks to Local Storage
  saveTasksToLocalStorage();
}

// Function to remove a task from the list and update Local Storage
function removeTask(taskElement) {
  const taskList = document.getElementById('taskList');
  taskList.removeChild(taskElement);

  // Save the tasks to Local Storage after removing the task
  saveTasksToLocalStorage();
}

// Function to save tasks to Local Storage
function saveTasksToLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  // Iterate through each task in the list and save them to the tasks array
  taskList.querySelectorAll('li').forEach(task => {
    tasks.push(task.innerText);
  });

  // Save the tasks array to Local Storage as a JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from Local Storage on page load
function loadTasksFromLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks && tasks.length > 0) {
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.innerText = taskText;

      // Create a "Completed" button for the task
      const completedButton = document.createElement('button');
      completedButton.innerText = 'Completed';
      completedButton.addEventListener('click', function () {
        removeTask(li);
      });

      li.appendChild(completedButton);
      taskList.appendChild(li);
    });
  }
}

// Add event listener to the Add button
document.getElementById('taskInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Load tasks from Local Storage on page load
loadTasksFromLocalStorage();
