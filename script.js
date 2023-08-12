// Function to add a task to the list and save it in Local Storage
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();
  const taskDeadline = deadlineInput.value;

  if (taskText === '') {
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  // Create a span element for the edit symbol (pencil icon)
  const editIcon = document.createElement('span');
  editIcon.innerHTML = '&#9998;';
  editIcon.className = 'edit-task';
  editIcon.addEventListener('click', function (event) {
    editTaskName(event.target.closest('.task-item'));
  });

  // Create a span element for the task name
  const taskName = document.createElement('span');
  taskName.innerText = taskText;
  taskName.className = 'task-name';

  // Create a span element for the task deadline
  const taskDeadlineSpan = document.createElement('span');
  taskDeadlineSpan.innerText = `Deadline: ${taskDeadline}`;
  taskDeadlineSpan.className = 'task-deadline';

  // Create a "Completed" button for the task
  const completedButton = document.createElement('button');
  completedButton.innerText = 'Completed';
  completedButton.addEventListener('click', function () {
    markCompleted(li);
  });

  // Create a "Remove" button for the task
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.style.backgroundColor = 'red';
  removeButton.addEventListener('click', function () {
    removeTask(li);
  });

  li.appendChild(editIcon);
  li.appendChild(taskName);
  li.appendChild(taskDeadlineSpan);
  li.appendChild(completedButton);
  li.appendChild(removeButton);

  // Find the correct position to insert the new task based on deadline
  let insertIndex = 0;
  const taskItems = taskList.getElementsByClassName('task-item');
  for (let i = 0; i < taskItems.length; i++) {
    const itemDeadline = new Date(taskItems[i].querySelector('.task-deadline').innerText.split(': ')[1]);
    if (new Date(taskDeadline) <= itemDeadline) {
      insertIndex = i;
      break;
    }
  }
  taskList.insertBefore(li, taskItems[insertIndex]);

  taskInput.value = '';
  deadlineInput.value = ''; // Clear the deadline input

  // Save the tasks to Local Storage
  saveTasksToLocalStorage();
}



// Function to mark a task as completed and update Local Storage
function markCompleted(taskElement) {
  taskElement.classList.toggle('completed');

  // Save the tasks to Local Storage after marking as completed
  saveTasksToLocalStorage();
}

// Function to remove a task from the list and update Local Storage
function removeTask(taskElement) {
  const taskList = document.getElementById('taskList');
  taskList.removeChild(taskElement);

  // Save the tasks to Local Storage after removing the task
  saveTasksToLocalStorage();
}

// Function to edit a task name and update Local Storage
function editTaskName(taskElement) {
  const taskName = taskElement.querySelector('.task-name');
  const currentText = taskName.innerText;
  const newText = prompt('Edit task name:', currentText);

  if (newText !== null && newText.trim() !== '') {
    taskName.innerText = newText.trim();
    saveTasksToLocalStorage();
  }
}

// Function to save tasks to Local Storage
function saveTasksToLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  // Iterate through each task in the list and save them to the tasks array
  taskList.querySelectorAll('.task-item').forEach(task => {
    tasks.push({
      text: task.querySelector('.task-name').innerText,
      completed: task.classList.contains('completed')
    });
  });

  // Save the tasks array to Local Storage as a JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ...

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

// ...

// Function to load tasks from Local Storage on page load
function loadTasksFromLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks && tasks.length > 0) {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item';

      // Create a span element for the edit symbol (pencil icon)
      const editIcon = document.createElement('span');
      editIcon.innerHTML = '&#9998;'; // Pencil icon HTML code
      editIcon.className = 'edit-task';
      editIcon.addEventListener('click', function (event) {
        editTaskName(event.target.closest('.task-item'));
      });

      // Create a span element for the task name
      const taskName = document.createElement('span');
      taskName.innerText = task.text;
      taskName.className = 'task-name';

      // Create a "Completed" button for the task
      const completedButton = document.createElement('button');
      completedButton.innerText = 'Completed';
      completedButton.addEventListener('click', function () {
        markCompleted(li);
      });

      // Create a "Remove" button for the task
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.style.backgroundColor = 'red';
      removeButton.addEventListener('click', function () {
        removeTask(li);
      });

       // Create a span element for the task deadline
      const taskDeadlineSpan = document.createElement('span');
      taskDeadlineSpan.innerText = `Deadline: ${task.deadline}`;
      taskDeadlineSpan.className = 'task-deadline';

      li.appendChild(editIcon);
      li.appendChild(taskName);
      li.appendChild(taskDeadlineSpan); // Add the deadline span
      li.appendChild(completedButton);
      li.appendChild(removeButton);
      taskList.appendChild(li);

      // If the task is marked as completed, add the completed class
      if (task.completed) {
        li.classList.add('completed');
      }
    });
  }
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
// ...
let draggedTask = null;

// Function to handle the start of a drag
function handleDragStart(event) {
  draggedTask = event.target.closest('.task-item');
}

// Function to handle the drag over a valid drop target
function handleDragOver(event) {
  event.preventDefault();
}

// Function to handle the drop of a dragged task
function handleDrop(event) {
  event.preventDefault();
  
  if (draggedTask !== null) {
    const dropTarget = event.target.closest('.task-item');
    if (dropTarget !== null) {
      const taskList = document.getElementById('taskList');
      const dropIndex = Array.from(taskList.children).indexOf(dropTarget);
      const draggedIndex = Array.from(taskList.children).indexOf(draggedTask);
      
      if (draggedIndex !== dropIndex) {
        taskList.removeChild(draggedTask);
        taskList.insertBefore(draggedTask, dropIndex > draggedIndex ? dropTarget.nextSibling : dropTarget);
        
        // Save the updated tasks order to Local Storage
        saveTasksToLocalStorage();
      }
    }
  }
}

// Add event listeners for drag-and-drop
document.addEventListener('dragstart', handleDragStart);
document.addEventListener('dragover', handleDragOver);
document.addEventListener('drop', handleDrop);
// ...


// Load tasks from Local Storage on page load
loadTasksFromLocalStorage();