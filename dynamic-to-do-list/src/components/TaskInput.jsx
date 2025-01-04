import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = () => {
    if (task.trim() && deadline) {
      addTask({ text: task.trim(), deadline, completed: false });
      setTask('');
      setDeadline('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskInput;
