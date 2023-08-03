function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  const li = document.createElement('li');
  li.innerText = taskText;
  taskList.appendChild(li);
  taskInput.value = '';
}

document.getElementById('taskInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
