# Task Manager Application

## Overview

The **Task Manager** application is a modern, full-stack task management tool built with **Next.js**, **TypeScript**, and **Material-UI (MUI)**. It allows users to create, edit, delete, and manage tasks efficiently. The application supports user authentication with role-based access (User/Admin) and profile management, including avatar uploads.

The UI is designed to be clean and professional, inspired by modern web apps, with responsive design ensuring usability on both desktop and mobile devices.

---

## Features

### Authentication

* **Login/Signup** functionality.
* **JWT-based authentication** with token management.
* Role-based user management (**User/Admin**).
* Redirects unauthorized users to the login page.

### Task Management

* **Create, edit, delete tasks**.
* **Update task status**: Pending, In Progress, Completed.
* Display tasks in a **sortable table** with details including owner, creation date, and status.
* **Edit tasks** via modal dialogs.

### Profile Management

* **Edit profile information** (name, email, avatar).
* Upload **profile avatar images**.
* Modals with clean form validation.

### UI/UX

* **Material-UI** components for a modern interface.
* Responsive layout with **Grid** system.
* **Friendly notifications** and error messages.
* User greeting with avatar and logout functionality.

### Tech Stack

* **Frontend:** Next.js, React, TypeScript, Material-UI (MUI).
* **Backend:** REST API (assumed Node.js/Express or similar).
* **Authentication:** JWT token stored in localStorage.
* **State Management:** React hooks.
* **File Upload:** FormData for avatar upload.

---

## Installation & Setup

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
   Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Folder Structure

```
├── pages
│   ├── index.tsx         # Login page
│   ├── signup.tsx        # Signup page
│   ├── task.tsx          # Main tasks page
├── components
│   ├── EditTaskModal.tsx # Task edit modal
│   ├── EditProfileModal.tsx # Profile edit modal
├── types
│   └── types.ts          # TypeScript interfaces and enums
├── utils
│   └── auth.ts           # Token management utilities
```

---

## Usage

### Login

1. Enter email and password.
2. Click **Login** to authenticate.
3. Redirects to the **Tasks** page upon success.

### Signup

1. Fill in name, email, password, and role.
2. Click **Sign Up**.
3. Automatically redirects to login page.

### Tasks Page

* **Create Task:** Fill in title and description, then click **Create Task**.
* **Edit Task:** Click on the task title to open modal and edit.
* **Delete Task:** Click **Delete** button.
* **Change Status:** Use the dropdown to update task status.
* **Edit Profile:** Click **Edit Profile** to update name, email, or avatar.
* **Logout:** Click **Logout** to sign out.

---

## Key Components

### `EditTaskModal`

* Modal dialog for editing task title and description.
* Auto-populates with current task data.
* Save updates via API.

### `EditProfileModal`

* Modal dialog for editing user profile.
* Allows name, email, and avatar updates.
* Uses `FormData` to handle file uploads.

### `TasksPage`

* Displays tasks in a **Material-UI Table**.
* Provides CRUD operations and status management.
* Handles user authentication and redirects if unauthorized.

### `Login & Signup`

* Forms with validation.
* Handles API calls for authentication.
* Redirects to appropriate pages after success.

### `Auth Utilities`

* `setToken`, `getToken`, `removeToken` for JWT handling.

---

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

* Used for API requests.
* Should point to your backend server.

---

## Dependencies

* `next` & `react` & `react-dom`
* `@mui/material` for UI components
* `typescript` for type safety

---

## Contributing

1. Fork the repo.
2. Create a new branch: `git checkout -b feature/xyz`
3. Commit changes: `git commit -m 'Add xyz feature'`
4. Push to branch: `git push origin feature/xyz`
5. Create a pull request.

---

## License

MIT License
