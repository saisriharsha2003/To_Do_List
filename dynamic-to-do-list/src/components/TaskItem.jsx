import React from 'react';

const TaskItem = ({ task, toggleCompleted, editTask, removeTask }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span
        className="edit-task"
        onClick={() => {
          const newText = prompt('Edit task name:', task.text);
          if (newText !== null && newText.trim() !== '') editTask(task.id, newText);
        }}
      >
        ✎
      </span>
      <span className="task-name">{task.text}</span>
      <span className="task-deadline">Deadline: {task.deadline}</span>
      <button onClick={() => toggleCompleted(task.id)}>Completed</button>
      <button onClick={() => removeTask(task.id)} style={{ backgroundColor: 'red' }}>
        Remove
      </button>
    </li>
  );
};

export default TaskItem;
