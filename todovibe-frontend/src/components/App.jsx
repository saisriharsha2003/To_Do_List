import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddTask from "./AddTask";
import ViewTasks from "./ViewTasks";
import ViewTask from "./ViewTask";
import { ToastContainer } from "react-toastify";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/view-tasks" element={<ViewTasks />} />
        <Route path="/view-task/:id" element={<ViewTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/delete-task/:id" element={<DeleteTask />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
