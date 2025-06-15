import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleCompleted, editTask, removeTask }) => {
  return (
    <ul id="taskList">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
