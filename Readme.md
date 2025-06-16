# 📝 TodoVibe

**TodoVibe** is a dynamic and modern full-stack to-do list application designed to manage daily tasks with an elegant and responsive interface. Built with **React + Vite** on the frontend and **Express.js + MongoDB** on the backend, it supports task creation, editing, deletion, and filtering.

---

## 🚀 Features

- ✅ Add, view, edit, and delete tasks
- 🔍 Filter and sort tasks
- 🔐 JWT-based authentication
- 💾 MongoDB for persistent storage
- ⚡ Vite + Tailwind for fast and clean UI
- ☁️ GitHub Actions CI/CD for frontend deployment

---

## 🧠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **Deployment:** GitHub Actions, GitHub Pages

---

## 📁 Project Structure (with descriptions)

```
saisriharsha2003-to_do_list/
├── todovibe-backend/                      # Backend API built with Node.js and Express
│   ├── index.js                           # Main entry point for the server
│   ├── package.json                       # Backend dependencies and scripts
│   ├── package-lock.json                  # Locks installed package versions
│   ├── .gitignore                         # Ignores sensitive/config files and node_modules
│   ├── controllers/                       # Contains business logic for handling routes
│   │   └── userController.js              # Logic for handling task-related operations (CRUD)
│   ├── middleware/                        # Custom middleware logic
│   │   └── verifyJWT.js                   # Middleware to verify JWT tokens (auth guard)
│   ├── models/                            # MongoDB schema definitions using Mongoose
│   │   └── Task.js                        # Mongoose model for a task
│   └── routes/                            # All API endpoint definitions
│       └── Routes.js                      # Route definitions for tasks (e.g., /add, /view, /delete)
│
├── todovibe-frontend/                     # Frontend client built with React + Vite
│   ├── README.md                          # Optional README for frontend setup
│   ├── index.html                         # HTML entry point for the SPA
│   ├── package.json                       # Frontend dependencies and scripts
│   ├── package-lock.json                  # Locks installed package versions
│   ├── tailwind.config.js                 # Tailwind CSS configuration file
│   ├── vite.config.js                     # Vite configuration file (e.g., base path, plugins)
│   ├── .gitignore                         # Ignores build output and other local files
│   ├── public/                            # Static assets served as-is
│   │   ├── icon.webp                      # Web app icon
│   │   ├── manifest.json                  # Metadata for PWA features
│   │   └── robots.txt                     # Rules for web crawlers/SEO
│   └── src/                               # Source code for the React frontend
│       ├── App.css                        # Global styles for App component
│       ├── App.js                         # Legacy App structure (if still used)
│       ├── App.test.js                    # Example frontend test file
│       ├── config.js                      # Configuration (e.g., backend API URL)
│       ├── index.css                      # Global styles
│       ├── index.jsx                      # Main entry point to render the React app
│       ├── reportWebVitals.js             # For measuring app performance (optional)
│       ├── setupTests.js                  # Test environment setup file
│       ├── assets/                        # Static files like images and CSS
│       │   ├── images/                    # Image assets used in the UI
│       │   └── styles/                    # CSS files scoped to components
│       │       ├── add-task.css
│       │       ├── delete-task.css
│       │       ├── edit-task.css
│       │       ├── home.css
│       │       ├── nav.css
│       │       ├── view-task.css
│       │       └── viewtasks.css
│       └── components/                    # Reusable React components
│           ├── AddTask.jsx                # Form to add new tasks
│           ├── App.jsx                    # Main application layout and routing
│           ├── DeleteTask.jsx             # Component to delete a task
│           ├── EditTask.jsx               # Component to edit task content
│           ├── Home.jsx                   # Home page UI
│           ├── Nav.jsx                    # Navigation bar component
│           ├── ViewTask.jsx               # Single task view component
│           └── ViewTasks.jsx              # Lists all tasks in the UI
│
└── .github/
    └── workflows/
        └── deploy.yml                     # GitHub Actions workflow for automatic deployment
```

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/saisriharsha2003/to_do_list.git
cd to_do_list
```

---

## ⚙️ Backend Setup (`todovibe-backend`)

1. Navigate to the backend folder:

   ```bash
   cd todovibe-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the `todovibe-backend` folder:

   ```
   MONGODB_URL=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The backend will start on [http://localhost:8080](http://localhost:8080).

---

## 💻 Frontend Setup (`todovibe-frontend`)

1. Navigate to the frontend folder:

   ```bash
   cd ../todovibe-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the backend `BASE_URL` in `src/config.js`:

   ```js
   export const BASE_URL = "http://localhost:8080";
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:5173](http://localhost:5173) by default (Vite's default port).

---

## 🚀 Deployment (Owner Only)

### 🌐 GitHub Pages – Frontend Deployment

This project uses **GitHub Actions** to automatically deploy the frontend to **GitHub Pages**  
on every push to the `main` branch.

> ⚠️ **Note:** Only the **repository owner** or collaborators with write access can trigger deployments.

---

### 🛠️ Setup Overview

1. ✅ **Workflow File:**  
   Ensure the GitHub Actions workflow is set up at:

   ```
   .github/workflows/deploy.yml
   ```

2. ✅ **Triggering Deployment:**  
   The deployment is triggered automatically on every push to the `main` branch:

   ```yaml
   on:
     push:
       branches: [main]
   ```

3. ✅ **Vite Base Configuration:**  
   Update the `vite.config.js` to set the correct base path for GitHub Pages:

   ```js
   export default defineConfig({
     base: '/<REPO_NAME>/', // Replace <REPO_NAME> with your GitHub repo name
     // ...other config
   });
   ```

4. ✅ **To Deploy Changes:**

   If you made changes to the frontend:

   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```

   GitHub Actions will build and automatically deploy your frontend to GitHub Pages.

---

> 📝 This section is for the repository owner. Contributors do not need to handle deployment.


### Backend Deployment

- Can be deployed on platforms like **Render**, **Railway**, or **Heroku**.
- Make sure to update your frontend `BASE_URL` in `config.js` file for production.

---

## 🙌 Author

**Rankela Sai Sri Harsha**

[GitHub Profile](https://github.com/saisriharsha2003)

---

## 📄 License

This project is licensed under the MIT License.
