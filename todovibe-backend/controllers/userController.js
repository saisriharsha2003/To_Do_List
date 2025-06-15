import { StatusCodes } from "http-status-codes";
import Task from "../models/Task.js";
import jwt from "jsonwebtoken";
import { EMAIL_USER, JWT_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

export const add_task = async (req, res) => {
  try {
    const { task_name, description, due_date, priority } = req.body;

    if (!task_name || !due_date) {
      return res
        .status(400)
        .json({ error: "Task name and due date are required." });
    }

    const parsedDueDate = new Date(due_date);
    const onlyDate = new Date(parsedDueDate.toISOString().split("T")[0]);

    const today = new Date();
    const onlyToday = new Date(today.toISOString().split("T")[0]);

    const newTask = new Task({
      task_name,
      description,
      due_date: onlyDate,
      priority,
      created_at: onlyToday,
      updated_at: onlyToday,
    });

    const savedTask = await newTask.save();

    return res.status(201).json({
      message: "Task created successfully.",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const view_tasks = async (req, res) => {
  try {
    const tasks = await Task.find({ is_deleted: false }).sort({
      created_at: -1,
    });

    return res.status(200).json({
      message: "Tasks fetched successfully.",
      tasks: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const view_task_by_id = async (req, res) => {
  const { taskid } = req.params;

  try {
    const task = await Task.findOne({ _id: taskid });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task, message: "Task fetched successfully" });
  } catch (error) {
    console.error("Error fetching Task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const edit_task = async (req, res) => {
  try {
    const { taskid } = req.params;
    const { task_name, description, due_date, priority, status } = req.body;

    const updateData = {
      updated_at: new Date(),
    };

    if (task_name !== undefined) updateData.task_name = task_name;
    if (description !== undefined) updateData.description = description;
    if (due_date) updateData.due_date = new Date(due_date);
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;

    const updatedTask = await Task.findByIdAndUpdate(taskid, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const delete_task = async (req, res) => {
  try {
    const { taskid } = req.params;

    const deletedTask = await Task.findByIdAndUpdate(
      taskid,
      { is_deleted: true, updated_at: new Date() },
      { new: true }
    );

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully (soft delete)" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
