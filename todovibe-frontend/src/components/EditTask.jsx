import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { BASE_URL } from "../config";
import { motion } from "framer-motion";
import {
  FaPen,
  FaClipboardList,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa";
import "../assets/styles/edit-task.css";
import Select from "react-select";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    task_name: "",
    description: "",
    due_date: "",
    priority: "Medium",
  });

  const [loading, setLoading] = useState(true);

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
  ];

  const statusOptions = [
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
  ];

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/task/${id}`);
        const fetched = res.data.task;
        setTask({
          task_name: fetched.task_name,
          description: fetched.description || "",
          due_date: fetched.due_date?.slice(0, 10),
          priority: fetched.priority || "Medium",
          status: fetched.status || "Pending",
        });
      } catch (error) {
        toast.error("Failed to fetch task", { autoClose: 1500 });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (selectedOption) => {
    setTask((prev) => ({ ...prev, priority: selectedOption.value }));
  };

  const handleStatusChange = (selectedOption) => {
    setTask((prev) => ({ ...prev, status: selectedOption.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !task.task_name ||
      !task.description ||
      !task.due_date ||
      !task.priority ||
      !task.status
    ) {
      toast.error("Please fill all fields", { autoClose: 1500 });
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/user/edit-task/${id}`, task);
      toast.success("Task updated successfully", { autoClose: 1500 });
      setTimeout(() => navigate("/view-tasks"), 2000);
    } catch (error) {
      toast.error("Update failed", { autoClose: 1500 });
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
        className="edit-task-container"
      >
        <motion.div
          className="edit-task-box"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <h2 className="title">Edit Task</h2>
          <form className="edit-task-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-title">Task Name</label>
              <div className="input-wrapper">
                <FaPen className="icon" />
                <input
                  type="text"
                  name="task_name"
                  value={task.task_name}
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
                  value={task.due_date}
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
                  rows="4"
                  value={task.description}
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
                    (opt) => opt.value === task.priority
                  )}
                  onChange={handlePriorityChange}
                  className="custom-dropdown"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-title">Status</label>
              <div className="input-wrapper">
                <FaCheckCircle className="icon" />
                <Select
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === task.status)}
                  onChange={handleStatusChange}
                  className="custom-dropdown"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            <motion.div
              className="button-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/view-tasks")}
                className="cancel-button"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="edit-task-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Update Task"}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditTask;
