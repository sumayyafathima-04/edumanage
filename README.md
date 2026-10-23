# 🎓 Student Management System — MERN Stack Micro Project

> **College Term Work-2 Micro Project**  
> Built with **MongoDB, Express.js, React.js, and Node.js (MERN)**  
> Includes Secure JWT Authentication, Bcrypt Password Hashing, Complete CRUD Operations, Live Search, Dynamic Statistics, and Responsive UI.

---

## 📌 Table of Contents
1. [Project Overview & Objectives](#-project-overview--objectives)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [System Architecture](#-system-architecture)
5. [Directory Structure](#-directory-structure)
6. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
7. [Installation & Setup Guide](#-installation--setup-guide)
8. [Database Setup (Local MongoDB & Atlas Cloud)](#-database-setup)
9. [Environment Variables](#-environment-variables)
10. [REST API Documentation](#-rest-api-documentation)
11. [Git & GitHub Upload Commands](#-git--github-upload-commands)
12. [College Viva & Practical Demonstration Guide](#-college-viva--practical-demonstration-guide)
13. [Required Screenshots for College Print Submission](#-required-screenshots-for-college-print-submission)
14. [Future Enhancements](#-future-enhancements)

---

## 🎯 Project Overview & Objectives

The **Student Management System (SMS)** is a full-stack web application developed for academic institutions to digitize and automate the lifecycle of student records. It enables college staff, professors, and administrators to securely maintain student information, monitor departmental distribution, and perform real-time record manipulation.

### Objectives:
- Eliminate paper-based student record maintenance.
- Implement secure role/administrator authentication using **JSON Web Tokens (JWT)** and **bcrypt**.
- Provide complete **CRUD (Create, Read, Update, Delete)** operations on student profiles.
- Prevent data inconsistency through schema validation and duplicate roll number rejection.
- Deliver a fast, responsive user experience utilizing **React** with a clean blue-and-white academic design palette.

---

## ✨ Key Features

### 1. 🏠 Modern Landing Page
- Professional university branding with hero section and feature highlights.
- Clear action buttons (**Get Started**, **View Students**, **Account Login**).
- Architectural overview explaining the MERN workflow.

### 2. 🔐 Authentication & Security
- **User Registration**: Admin signup with Full Name, Email, Password, and Confirm Password.
- **Client & Server Validation**: Input format checks, password length enforcement (min 6 chars).
- **Password Hashing**: Passwords are encrypted with `bcrypt` (10 salt rounds) before persisting in MongoDB. Plaintext passwords are never stored.
- **JWT Authorization**: Stateless token verification on all protected student endpoints.
- **Protected Routes**: Unauthenticated users cannot access dashboard or modify student records.

### 3. 📊 Interactive Dashboard & Metrics
- Live metric cards:
  - **Total Enrolled Students**
  - **Active Departments**
  - **Top Department by Enrollment**
  - **Database Connection Status**
- Real-time search by **Student Name**, **Roll Number**, or **Email Address**.
- Dynamic academic department filtering.

### 4. 📝 Complete CRUD Operations
- **Create**: Add new student with validation for Name, Roll No, Email, Department, Year, and Phone.
- **Read**: Fetch and display records in a responsive, clean table with formatted badges.
- **Update**: Edit existing student details in an interactive modal with pre-filled inputs.
- **Delete**: Safe two-step deletion modal requiring explicit confirmation before record removal.
- **Instant Feedback**: Toast notifications for operations with auto-dismiss timers.

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18 (Vite) | Declarative component UI and lightning-fast HMR |
| **Routing** | React Router DOM v6 | Single Page Application client-side routing |
| **Styling** | Vanilla CSS3 (Design Tokens) | Curated blue/slate palette, flex/grid layouts, micro-animations |
| **Backend** | Node.js & Express.js | Asynchronous RESTful API framework |
| **Database** | MongoDB & Mongoose ODM | Document-oriented database with structured schemas |
| **Authentication** | JWT (`jsonwebtoken`) | Stateless token-based user authorization |
| **Encryption** | `bcryptjs` | Irreversible password hashing |
| **HTTP Communication** | Fetch API / REST | JSON communication between frontend and backend |
| **Version Control** | Git & GitHub | Distributed version control and source hosting |

---

## 🏗 System Architecture

```mermaid
graph TD
    Client["React.js SPA (Vite)<br/>Port 5173"]
    API["Express.js Server<br/>Port 5000"]
    AuthMW["JWT Auth Middleware<br/>(Bearer Token Verification)"]
    DB[(MongoDB Atlas / Local<br/>Port 27017)]

    Client -->|"1. POST /api/auth/login"| API
    API -->|"2. Hash & Verify (bcrypt)"| DB
    API -->|"3. Return JWT Token"| Client

    Client -->|"4. REST Requests + Authorization Header"| AuthMW
    AuthMW -->|"5. Token Validated"| API
    API -->|"6. Query / Update Mongoose Models"| DB
    DB -->|"7. JSON Data Result"| API
    API -->|"8. JSON Response"| Client
```

---

## 📂 Directory Structure

```text
student-management-system/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── StudentModal.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ViewStudentModal.jsx
│   │   ├── context/            # React AuthContext state
│   │   │   └── AuthContext.jsx
│   │   ├── pages/              # Application views / pages
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/           # REST API client
│   │   │   └── api.js
│   │   ├── App.jsx             # Main Router configuration
│   │   ├── index.css           # Global design system & theme
│   │   └── main.jsx            # React root mount
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express)
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── controllers/            # Controller business logic
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middleware/             # Express middlewares
│   │   └── authMiddleware.js   # JWT protection middleware
│   ├── models/                 # Mongoose schemas
│   │   ├── Student.js
│   │   └── User.js
│   ├── routes/                 # Express route definitions
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── .env                    # Local environment config (git-ignored)
│   ├── .env.example            # Environment configuration template
│   ├── package.json
│   └── server.js               # Express application entry point
│
├── .gitignore                  # Git ignore definitions
├── package.json                # Root package configuration
└── README.md                   # Complete documentation
```

---

## ⚙️ Prerequisites & System Requirements

Before running the application, make sure your computer has:
1. **Node.js** (v18.0.0 or higher) — [Download from nodejs.org](https://nodejs.org/)
2. **npm** (comes packaged with Node.js)
3. **MongoDB**:
   - Either **Local MongoDB Community Server** running locally on port 27017, OR
   - A free **MongoDB Atlas** Cloud Database connection string.

---

## 🚀 Installation & Setup Guide

### Step 1: Clone or Navigate to the Project Folder
```bash
cd "c:\Users\Mohammad\OneDrive\Desktop\FWSD"
```

### Step 2: Install Backend Dependencies
Open a terminal in the `server` folder:
```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies
Open a second terminal in the `client` folder:
```bash
cd client
npm install
```

---

## 🗄 Database Setup

You can use either **MongoDB Atlas (Recommended)** or **Local MongoDB**.

### Option A: MongoDB Atlas (Cloud Database — Free)
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a free **M0 Cluster**.
3. Under **Database Access**, create a database user (e.g., username `admin`, password `yourpassword123`).
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** → **Drivers** (Node.js) and copy the connection string.
6. Paste it into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://admin:yourpassword123@cluster0.xxx.mongodb.net/student_management_db?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB (Offline)
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
2. Start the MongoDB service on Windows:
   - Run `mongod` in a terminal, or
   - Start **MongoDB Server** in Windows Services (`services.msc`).
3. Set your connection string in `server/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/student_management_db
   ```

---

## 🔑 Environment Variables

The backend uses environment variables stored in `server/.env`.

### `server/.env.example`
```env
# Server Port
PORT=5000

# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb://127.0.0.1:27017/student_management_db

# JWT Secret Key for Token Generation
JWT_SECRET=super_secret_jwt_key_student_management_system_2026
```

> **Security Note:** Never commit `server/.env` to GitHub. The root `.gitignore` already protects your credentials.

---

## 🏃 Running the Application

### 1. Start the Backend Server
```bash
cd server
npm run dev
# Or: npm start
```
*The backend server will run on: `http://localhost:5000`*

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm run dev
```
*The React application will open on: `http://localhost:5173`*

---

## 📡 REST API Documentation

### 1. Authentication Endpoints

#### Register User
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "name": "Prof. Sharma",
  "email": "sharma@college.edu",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully! Welcome to Student Management System.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6718...",
    "name": "Prof. Sharma",
    "email": "sharma@college.edu"
  }
}
```

#### User Login
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "sharma@college.edu",
  "password": "password123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful! Welcome back.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6718...",
    "name": "Prof. Sharma",
    "email": "sharma@college.edu"
  }
}
```

#### Get Current User Profile
- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Access:** Private (Requires Header: `Authorization: Bearer <token>`)

---

### 2. Student Management Endpoints (All Protected)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students` | Get all students (Supports `?search=` and `?department=`) |
| `GET` | `/api/students/stats` | Get dashboard metrics and department distribution |
| `GET` | `/api/students/:id` | Get single student record by ID |
| `POST` | `/api/students` | Add a new student record |
| `PUT` | `/api/students/:id` | Update an existing student record |
| `DELETE` | `/api/students/:id` | Permanently remove a student record |

#### Sample Create Student Payload (`POST /api/students`):
```json
{
  "fullName": "Aarav Gupta",
  "rollNumber": "CS2026-001",
  "email": "aarav.gupta@college.edu",
  "department": "Computer Science & Engineering",
  "year": "Third Year",
  "phone": "+91 9876543210"
}
```

---

## 🐙 Git & GitHub Upload Commands

Follow these exact steps to push this project to your GitHub account:

### 1. Initialize Git in the Root Directory
```bash
cd "c:\Users\Mohammad\OneDrive\Desktop\FWSD"
git init
```

### 2. Stage All Project Files
```bash
git add .
```

### 3. Verify Staged Files (.env and node_modules will NOT be included)
```bash
git status
```

### 4. Create Initial Commit
```bash
git commit -m "feat: complete student management system (MERN stack micro project)"
```

### 5. Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Click the `+` icon in the top right and select **New repository**.
3. Repository name: `student-management-system-mern`.
4. Keep it **Public** (or Private), and **DO NOT** initialize with a README (we already have a complete one).
5. Click **Create repository**.

### 6. Link and Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/student-management-system-mern.git
git push -u origin main
```

---

## 🎓 College Viva & Practical Demonstration Guide

When presenting this project to your external/internal examiner, explain the following key architectural points:

### 1. Why MERN Stack?
- **Unified Language**: JavaScript/ES6 is used across both client and server tiers.
- **JSON Everywhere**: Data flows in native JSON format from MongoDB documents through Express REST controllers into React state without object-relational mapping impedance.
- **Component Reusability**: React functional components (`Navbar`, `StudentModal`, `StatCard`) allow modular development.

### 2. How Authentication Works (JWT Flow)
1. User submits login form with email and password.
2. Express controller retrieves the user record from MongoDB.
3. `bcrypt.compare()` compares the plain text password with the stored hash using a secure timing-safe algorithm.
4. If valid, `jwt.sign()` generates a signed token payload containing the user ID and expiration (`7d`).
5. The React frontend stores this token in `localStorage`.
6. For every subsequent student API request, `api.js` automatically attaches the token in the `Authorization: Bearer <token>` header.
7. `authMiddleware.js` intercepts the request and verifies the token using `jwt.verify(token, JWT_SECRET)`.

### 3. Prevention of Duplicate Roll Numbers
- Handled at both the **Mongoose Schema level** (`unique: true`) and the **Controller logic level** (`Student.findOne({ rollNumber })`).
- If an administrator tries to add or update a student with an existing roll number, a HTTP 400 Bad Request error is returned with a friendly message.

### 4. Responsiveness
- Implemented with CSS Grid, Flexbox, media queries (`@media (max-width: 768px)`), and a mobile drawer hamburger menu.

---

## 📸 Required Screenshots for College Print Submission

For your spiral-bound practical file / color printout, capture these exact screens:

1. **Home Landing Page**: Showing hero title, buttons ("Get Started", "View Students"), and live preview card.
2. **User Registration Page**: Filled registration form with name, email, password, and confirm password.
3. **User Login Page**: Filled login form ready for submission.
4. **Dashboard View (With Records)**: Showing statistic metric cards, search bar, department filter, and data table.
5. **Add Student Modal**: The pop-up form with input fields (Full Name, Roll Number, Email, Department dropdown, Year dropdown, Phone).
6. **Form Validation Demonstration**: Showing inline warning alerts when required fields are missing or email format is invalid.
7. **View Student Profile Modal**: Clean profile card showing student details and MongoDB `_id`.
8. **Edit Student Modal**: Updating an existing student's department or phone number.
9. **Delete Confirmation Dialog**: The pop-up confirmation warning before deleting a record.
10. **Search & Filter Action**: Search results showing real-time filtering by roll number or department.
11. **Browser Developer Tools (Console & Network Tab)**: Showing HTTP 200/201 REST API requests with JSON payload.
12. **MongoDB Atlas / Compass GUI**: Showing the `users` and `students` collections populated with records.

---

## 🔮 Future Enhancements
- Student attendance tracking and percentage calculation.
- Semester exam marks entry and automatic SGPA/CGPA grade calculation.
- Export student records to PDF report and Excel / CSV spreadsheet.
- Profile picture upload to Cloudinary or AWS S3.
- Role-based access control (Admin, Teacher, and Student roles).

---

### 👨‍💻 Author & Project Credits
- **Project Title:** Student Management System
- **Curriculum:** Term Work-2 Full Stack Web Development Micro Project
- **Built with:** MongoDB, Express.js, React.js, Node.js
