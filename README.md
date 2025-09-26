# 📋 Task Manager Application

## 🚀 Overview

The **Task Manager** application is a modern, full-stack task management tool built with **Next.js, TypeScript, Material-UI (MUI)** on the frontend, and **Node.js, Express, MongoDB** on the backend.

It allows users to **create, edit, delete, and manage tasks** efficiently. The application supports **authentication with role-based access (User/Admin)** and **profile management**, including **avatar uploads via Cloudinary**.

The UI is designed to be **clean and professional**, inspired by modern web apps, with **responsive design** ensuring usability on both desktop and mobile devices.

---

## ✨ Features

### 🔐 Authentication

* Login/Signup functionality.
* JWT-based authentication with token management.
* Role-based user management (User/Admin).
* Redirects unauthorized users to the login page.

### ✅ Task Management

* Create, edit, delete tasks.
* Update task status: **Pending, In Progress, Completed**.
* Display tasks in a sortable table with details including owner, creation date, and status.
* Edit tasks via modal dialogs.

### 👤 Profile Management

* Edit profile information (name, email, avatar).
* Upload profile avatar images to Cloudinary.
* Modals with clean form validation.

### 🎨 UI/UX

* Material-UI components for a modern interface.
* Responsive layout with Grid system.
* Friendly notifications and error messages.
* User greeting with avatar and logout functionality.

---

## 🛠 Tech Stack

* **Frontend**: Next.js, React, TypeScript, Material-UI (MUI)
* **Backend**: Node.js, Express
* **Database**: MongoDB (Atlas)
* **Authentication**: JWT stored in localStorage
* **State Management**: React hooks
* **File Uploads**: Cloudinary for avatar and file storage

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone <repo-url>
cd task-manager-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set environment variables:**

Frontend → `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5090
```

Backend → `.env`

```env
MONGO_URI=<your-mongo-uri>
PORT=5090
JWT_SECRET=<your-secret-key>
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

4. **Run the backend server:**

```bash
npm start
```

5. **Run the frontend development server:**

```bash
npm run dev
```

📍 Frontend → [http://localhost:3000](http://localhost:3000)
📍 Backend → [http://localhost:5090](http://localhost:5090)

---

## 📂 Folder Structure

### Frontend

```
├── pages
│   ├── index.tsx        # Login page
│   ├── signup.tsx       # Signup page
│   ├── task.tsx         # Main tasks page
├── components
│   ├── EditTaskModal.tsx    # Task edit modal
│   ├── EditProfileModal.tsx # Profile edit modal
├── types
│   └── types.ts         # TypeScript interfaces and enums
├── utils
│   └── auth.ts          # Token management utilities
```

### Backend

```
├── routes
│   ├── auth.js          # Auth routes (login, signup)
│   ├── task.js          # Task CRUD routes
├── models
│   ├── User.js          # User schema
│   ├── Task.js          # Task schema
├── middleware
│   └── authMiddleware.js # JWT auth validation
├── server.js            # Entry point
```

---

## 📖 Usage

### 🔑 Login

1. Enter email and password.
2. Click **Login** to authenticate.
3. Redirects to the **Tasks page** upon success.

### 📝 Signup

1. Fill in name, email, password, and role.
2. Click **Sign Up**.
3. Automatically redirects to **Login** page.

### 📌 Tasks Page

* **Create Task**: Fill in title and description → click **Create Task**.
* **Edit Task**: Click task title → open modal → edit.
* **Delete Task**: Click **Delete** button.
* **Change Status**: Use dropdown to update task status.
* **Edit Profile**: Click **Edit Profile** to update name, email, or avatar.
* **Logout**: Click **Logout** to sign out.

---

## 🧩 Key Components

### 🖊 EditTaskModal

* Modal dialog for editing task title and description.
* Auto-populates with current task data.
* Save updates via API.

### 👤 EditProfileModal

* Modal dialog for editing user profile.
* Allows **name, email, and avatar** updates.
* Uses `FormData` to handle file uploads to Cloudinary.

### 📋 TasksPage

* Displays tasks in a **Material-UI Table**.
* Provides CRUD operations and status management.
* Handles user authentication and redirects if unauthorized.

### 🔐 Login & Signup

* Forms with validation.
* Handles API calls for authentication.
* Redirects to appropriate pages after success.

### 🛡 Auth Utilities

* `setToken`, `getToken`, `removeToken` for JWT handling.

---

## 🌍 Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5090
```

### Backend

```env
MONGO_URI=<your-mongo-uri>
PORT=5090
JWT_SECRET=<your-secret-key>
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

---

## 📦 Dependencies

### Frontend

* next, react, react-dom
* @mui/material
* typescript

### Backend

* express
* mongoose
* jsonwebtoken
* bcryptjs
* dotenv
* cloudinary
* multer

---

## 🤝 Contributing

1. Fork the repo.
2. Create a new branch:

   ```bash
   git checkout -b feature/xyz
   ```
3. Commit changes:

   ```bash
   git commit -m 'Add xyz feature'
   ```
4. Push to branch:

   ```bash
   git push origin feature/xyz
   ```
5. Create a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.
