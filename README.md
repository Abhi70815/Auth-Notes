 # Authenticated Notes Dashboard

## Project Description
This project is a fully functional Authenticated Notes Dashboard application. It provides users with the ability to sign up, log in, and manage their personal notes securely. The frontend is built with React and Vite, while the backend is implemented using Express.js with JWT-based authentication.

## Features
- User signup and login with secure password hashing (bcrypt).
- JWT authentication to protect user data and routes.
- Create, read, update, and delete personal notes.
- Responsive and user-friendly dashboard interface.
- Notes are stored in a JSON file on the server for simplicity.

## Installation and Running Instructions

### Backend
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `https://auth-notes-1.onrender.com`.

### Frontend
1. Navigate to the project root directory (if not already there):
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the URL shown in the terminal).

## Design Decisions and Implementation Approach

### Frontend
- Built as a Single Page Application (SPA) using React and Vite for fast development and hot module replacement.
- React Router is used for client-side routing between Login, Signup, and Dashboard pages.
- Authentication state is managed using a JWT token stored in `localStorage`.
- Protected routes redirect users based on authentication status.
- Components are modularized for Login, Signup, Sidebar, Topbar, NotesList, and Dashboard for maintainability.
- Tailwind CSS is used for styling to enable rapid UI development with utility-first classes.

### Backend
- Implemented with Express.js to provide RESTful API endpoints.
- User passwords are hashed using bcrypt for security.
- JWT tokens are issued upon successful login and verified on protected routes.
- Notes and user data are stored in a JSON file (`data.json`) for simplicity and ease of setup.
- CRUD operations for notes are scoped to the authenticated user.
- CORS enabled to allow frontend-backend communication during development.

## Deliverables
- A fully functional Authenticated Notes Dashboard application.
- Source code and documentation (this README).
- A brief explanation of design decisions and implementation approach.

---

This project demonstrates a simple yet secure notes application with authentication, showcasing full-stack development using modern JavaScript technologies.
