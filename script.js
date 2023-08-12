// Function to add a task to the list and save it in Local Storage
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();
  const deadlineText = deadlineInput.value.trim();

  if (taskText === '' || deadlineText === '') {
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const editIcon = document.createElement('span');
  editIcon.innerHTML = '&#9998;';
  editIcon.className = 'edit-task';
  editIcon.addEventListener('click', function (event) {
    editTaskName(event.target.closest('.task-item'));
  });

  const taskName = document.createElement('span');
  taskName.innerText = taskText;
  taskName.className = 'task-name';

  const taskDeadline = document.createElement('span');
  taskDeadline.innerText = `${deadlineText}`;
  taskDeadline.className = 'task-deadline';

  const completedButton = document.createElement('button');
  completedButton.innerText = 'Completed';
  completedButton.addEventListener('click', function () {
    markCompleted(li);
  });

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.style.backgroundColor = 'red';
  removeButton.addEventListener('click', function () {
    removeTask(li);
  });

  li.appendChild(editIcon);
  li.appendChild(taskName);
  li.appendChild(taskDeadline);
  li.appendChild(completedButton);
  li.appendChild(removeButton);
  taskList.appendChild(li);
  taskInput.value = '';
  deadlineInput.value = '';

  saveTasksToLocalStorage();
  sortTasksByDeadline();
}

// Function to mark a task as completed and update Local Storage
function markCompleted(taskElement) {
  taskElement.classList.toggle('completed');
  saveTasksToLocalStorage();
  sortTasksByDeadline();
}

// Function to remove a task from the list and update Local Storage
function removeTask(taskElement) {
  const taskList = document.getElementById('taskList');
  taskList.removeChild(taskElement);
  saveTasksToLocalStorage();
  sortTasksByDeadline();
}

// Function to edit a task name and update Local Storage
function editTaskName(taskElement) {
  const taskName = taskElement.querySelector('.task-name');
  const taskDeadline = taskElement.querySelector('.task-deadline');
  const currentText = taskName.innerText;
  const currentDeadline = taskDeadline.innerText.substr(10);

  const newText = prompt('Edit task name:', currentText);
  const newDeadline = prompt('Edit deadline:', currentDeadline);

  if (newText !== null && newText.trim() !== '' && newDeadline !== null && newDeadline.trim() !== '') {
    taskName.innerText = newText.trim();
    taskDeadline.innerText = `Deadline: ${newDeadline.trim()}`;
    saveTasksToLocalStorage();
    sortTasksByDeadline();
  }
}

// Function to filter and display all tasks
function showAllTasks() {
  const allTasks = document.querySelectorAll('.task-item');
  allTasks.forEach(task => {
    task.style.display = 'flex';
  });
}

// Function to filter and display completed tasks
function showCompletedTasks() {
  const completedTasks = document.querySelectorAll('.task-item.completed');
  const pendingTasks = document.querySelectorAll('.task-item:not(.completed)');
  completedTasks.forEach(task => {
    task.style.display = 'flex';
  });
  pendingTasks.forEach(task => {
    task.style.display = 'none';
  });
}

// Function to filter and display pending tasks
function showPendingTasks() {
  const completedTasks = document.querySelectorAll('.task-item.completed');
  const pendingTasks = document.querySelectorAll('.task-item:not(.completed)');
  pendingTasks.forEach(task => {
    task.style.display = 'flex';
  });
  completedTasks.forEach(task => {
    task.style.display = 'none';
  });
}

// Function to save tasks to Local Storage
function saveTasksToLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  taskList.querySelectorAll('.task-item').forEach(task => {
    tasks.push({
      text: task.querySelector('.task-name').innerText,
      completed: task.classList.contains('completed'),
      deadline: task.querySelector('.task-deadline').innerText.substr(10)
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from Local Storage on page load
function loadTasksFromLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks && tasks.length > 0) {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';

      const editIcon = document.createElement('span');
      editIcon.innerHTML = '&#9998;';
      editIcon.className = 'edit-task';
      editIcon.addEventListener('click', function (event) {
        editTaskName(event.target.closest('.task-item'));
      });

      const taskName = document.createElement('span');
      taskName.innerText = task.text;
      taskName.className = 'task-name';

      const taskDeadline = document.createElement('span');
      taskDeadline.innerText = `Deadline: ${task.deadline}`;
      taskDeadline.className = 'task-deadline';

      const completedButton = document.createElement('button');
      completedButton.innerText = 'Completed';
      completedButton.addEventListener('click', function () {
        markCompleted(li);
      });

      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.style.backgroundColor = 'red';
      removeButton.addEventListener('click', function () {
        removeTask(li);
      });

      li.appendChild(editIcon);
      li.appendChild(taskName);
      li.appendChild(taskDeadline);
      li.appendChild(completedButton);
      li.appendChild(removeButton);
      taskList.appendChild(li);

      if (task.completed) {
        li.classList.add('completed');
      }
    });
  }
}

// Function to sort tasks by deadline
function sortTasksByDeadline() {
  const taskList = document.getElementById('taskList');
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    const aDeadline = new Date(getDeadlineFromElement(a));
    const bDeadline = new Date(getDeadlineFromElement(b));

    if (aDeadline < bDeadline) {
      return -1;
    } else if (aDeadline > bDeadline) {
      return 1;
    } else {
      return tasks.indexOf(a) - tasks.indexOf(b);
    }
  });

  for (const task of tasks) {
    taskList.removeChild(task);
  }

  for (const task of tasks) {
    taskList.appendChild(task);
  }
}

// Function to extract deadline from task element
function getDeadlineFromElement(taskElement) {
  return taskElement.querySelector('.task-deadline').innerText.substr(10);
}

// Add event listener to the Add button
document.getElementById('taskInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Add event listener to allow task name editing when clicked
document.getElementById('taskList').addEventListener('click', function (event) {
  const editIcon = event.target.closest('.edit-task');
  if (editIcon) {
    const taskElement = editIcon.closest('.task-item');
    if (taskElement) {
      editTaskName(taskElement);
    }
  }
});

// Load tasks from Local Storage on page load
loadTasksFromLocalStorage();
sortTasksByDeadline();
