import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../config";
import { motion } from "framer-motion";
import { FaPen, FaClipboardList, FaCalendarAlt, FaFlag } from "react-icons/fa";
import "../assets/styles/add-task.css";
import Select from "react-select";

const AddTask = () => {
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    due_date: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { task_name, description, due_date, priority } = formData;

    if (!task_name || !description || !due_date || !priority) {
      toast.error("Please fill all details", { autoClose: 1500 });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/add-task`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message || "Task added!", {
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/view-tasks");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.", {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="add-task-container"
      >
        <motion.div
          className="add-task-box"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <h2 className="title">Add Task</h2>
          <form onSubmit={handleSubmit} className="add-task-form">
            <div className="input-group">
              <label className="input-title">Task Name</label>
              <div className="input-wrapper">
                <FaPen className="icon" />
                <input
                  type="text"
                  name="task_name"
                  placeholder="Name of the Task"
                  value={formData.task_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-title">Due Date</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="icon" />
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label className="input-title">Description</label>
              <div className="input-wrapper">
                <FaClipboardList className="icon" />
                <textarea
                  name="description"
                  placeholder="Description of the Task"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-title">Priority</label>
              <div className="input-wrapper">
                <FaFlag className="icon" />
                <Select
                  options={priorityOptions}
                  value={priorityOptions.find(
                    (opt) => opt.value === formData.priority
                  )}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, priority: selectedOption.value })
                  }
                  className="custom-dropdown"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            

            <motion.button
              whileHover={{ scale: 1.1 }}
              type="submit"
              className="add-task-btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddTask;
