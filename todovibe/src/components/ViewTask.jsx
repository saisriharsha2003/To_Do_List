import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { BASE_URL } from "../config";
import { motion } from "framer-motion";
import { FaPen, FaClipboardList, FaCalendarAlt, FaFlag } from "react-icons/fa";
import "../assets/styles/view-task.css";

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/task/${id}`);
        setTask(response.data.task);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="view-task-container"
      >
        <motion.div
          className="view-task-box"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <h2 className="title">View Task</h2>
          <form className="view-task-form">
            <div className="input-group">
              <label className="input-title">Task Name</label>
              <div className="input-wrapper">
                <FaPen className="icon" />
                <input type="text" value={task?.task_name || ""} readOnly />
              </div>
            </div>

            <div className="input-group">
              <label className="input-title">Due Date</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="icon" />
                <input
                  type="date"
                  value={task?.due_date?.slice(0, 10) || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="input-group full-width">
              <label className="input-title">Description</label>
              <div className="input-wrapper">
                <FaClipboardList className="icon" />
                <textarea
                  rows="4"
                  value={task?.description || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-title">Priority</label>
              <div className="input-wrapper">
                <FaFlag className="icon" />
                <input
                  type="text"
                  value={task?.priority || ""}
                  readOnly
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              className="view-task-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewTask;
