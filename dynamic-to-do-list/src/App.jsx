import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setFilteredTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleCompleted = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newText) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, text: newText } : task)));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filterTasks = (filter) => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else if (filter === 'completed') {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  };

  return (
    <div className="container">
      <h1>My Daily To-Do List</h1>
      <TaskInput addTask={addTask} />
      <TaskFilters filterTasks={filterTasks} />
      <TaskList
        tasks={filteredTasks}
        toggleCompleted={toggleCompleted}
        editTask={editTask}
        removeTask={removeTask}
      />
    </div>
  );
};

export default App;
