import React from 'react';

const TaskFilters = ({ filterTasks }) => {
  return (
    <div className="task-sections">
      <button onClick={() => filterTasks('all')}>All</button>
      <button onClick={() => filterTasks('completed')}>Completed</button>
      <button onClick={() => filterTasks('pending')}>Pending</button>
    </div>
  );
};

export default TaskFilters;
