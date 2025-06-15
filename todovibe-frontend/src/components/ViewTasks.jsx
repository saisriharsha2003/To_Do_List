import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { motion } from "framer-motion";
import "../assets/styles/viewtasks.css";
import Select from "react-select";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("High");
  const tasksPerPage = 2;
  const navigate = useNavigate();
  const MAX_CONTENT_LENGTH = 20;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/view-tasks`);
        setTasks(response.data.tasks || []);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
        });
      } catch (error) {
        toast.error("Failed to fetch tasks.", {
          position: "top-right",
          autoClose: 1500,
        });
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      border: "2px solid #ff4ecb",
      borderRadius: "8px",
      boxShadow: state.isFocused
        ? "0 0 8px rgba(255, 78, 203, 0.4)"
        : "0 0 5px rgba(255, 78, 203, 0.1)",
      "&:hover": {
        borderColor: "#d63384",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff4ecb" : "#fff",
      color: state.isFocused ? "#fff" : "#333",
      fontWeight: state.isSelected ? "600" : "normal",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
  };

  const handleEdit = (taskId) => navigate(`/edit-task/${taskId}`);
  const handleDelete = (taskId) => navigate(`/delete-task/${taskId}`);
  const handleView = (taskId) => navigate(`/view-task/${taskId}`);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredTasks = tasks
    .filter((task) => {
      const inSearch =
        task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const inStatus = statusFilter === "All" || task.status === statusFilter;

      return inSearch && inStatus;
    })
    .sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;

      let result;
      if (sortOrder === "High") {
        result = bPriority - aPriority;
      } else {
        result = aPriority - bPriority;
      }

      if (result === 0) {
        const aDue = new Date(a.due_date);
        const bDue = new Date(b.due_date);
        return aDue - bDue;
      }

      return result;
    });

  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const currentTasks = filteredTasks.slice(firstTaskIndex, lastTaskIndex);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const changePage = (newPage) => setCurrentPage(newPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />
      <motion.div
        className="viewtasks-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="viewtasks-box"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="title">All Tasks</h2>

          {/* Controls */}
          <div className="task-controls">
            <div className="form-group">
              <label htmlFor="search-input">Search</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status-filter">Filter by Status</label>
              <Select
                inputId="status-filter"
                options={[
                  { value: "All", label: "All Statuses" },
                  { value: "Completed", label: "Completed" },
                  { value: "Pending", label: "Pending" },
                ]}
                value={{ value: statusFilter, label: statusFilter }}
                onChange={(selected) => setStatusFilter(selected.value)}
                className="react-select"
                styles={customStyles}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sort-priority">Sort by Priority</label>
              <Select
                inputId="sort-priority"
                options={[
                  { value: "High", label: "Sort by High Priority" },
                  { value: "Low", label: "Sort by Low Priority" },
                ]}
                value={{
                  value: sortOrder,
                  label: `Sort by ${sortOrder} Priority`,
                }}
                onChange={(selected) => setSortOrder(selected.value)}
                className="react-select"
                styles={customStyles}
              />
            </div>
          </div>

          {loading ? (
            <p className="loading-text">Loading tasks...</p>
          ) : (
            <>
              <motion.table
                className="tasks-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.length > 0 ? (
                    currentTasks.map((task, index) => (
                      <motion.tr
                        key={task._id}
                        className="task-row"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td>{task.task_name}</td>
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                task.description.length > MAX_CONTENT_LENGTH
                                  ? `${task.description.slice(
                                      0,
                                      MAX_CONTENT_LENGTH
                                    )}...`
                                  : task.description,
                            }}
                          />
                          {task.description.length > MAX_CONTENT_LENGTH && (
                            <button
                              onClick={() => handleView(task._id)}
                              className="read-more-btn"
                            >
                              Read More
                            </button>
                          )}
                        </td>
                        <td>{formatDate(task.due_date)}</td>
                        <td>{task.priority}</td>
                        <td>{task.status || "in-progress"}</td>
                        <td>{formatDate(task.created_at)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => handleView(task._id)}
                              className="view-btn"
                            >
                              <i className="fa fa-eye" />
                            </button>
                            <button
                              onClick={() => handleEdit(task._id)}
                              className="edit-btn"
                            >
                              <i className="fa fa-pencil" />
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="delete-btn"
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-tasks-text">
                        No tasks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </motion.table>

              <motion.div className="pagination">
                {currentPage > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => changePage(currentPage - 1)}
                    className="pagination-btn"
                  >
                    Previous
                  </motion.button>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i + 1}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => changePage(i + 1)}
                    className={`pagination-btn ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
                {currentPage < totalPages && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => changePage(currentPage + 1)}
                    className="pagination-btn"
                  >
                    Next
                  </motion.button>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ViewTasks;
