# MERN Student CRUD App

## 📌 Overview
A demonstration MERN stack application for managing student records (**name** and **roll number**).  
Features a polished frontend with toggleable add/edit form, inline edit highlighting, toast notifications, and a backend with validation, sanitization, and consistent API behavior.

---

## 🛠 Tech Stack
- **Frontend:** React (Vite), Axios, react-hot-toast  
- **Backend:** Node.js, Express, Mongoose (MongoDB)  
- **Database:** MongoDB (local or Atlas)  
- **Dev Tools:** nodemon, dotenv, CORS

---

## ✨ Key Features
✅ Add / view / edit / delete students  
✅ Input sanitization & validation (name + roll number)  
✅ Toggleable morphing Add/Edit form  
✅ Inline selection/edit highlighting  
✅ Toast notifications for feedback  
✅ CSS custom properties-based theming (easy dark mode extension)

---

## 📋 Prerequisites
- Node.js (v18+ recommended)  
- npm  
- MongoDB running locally **or** a MongoDB Atlas URI  
- Git

---

## 📂 Repository Structure
```
mern-student-crud/
├── backend/              # Express API
│   ├── config/           # DB connection
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Route definitions
│   ├── server.js         # Entry point
│   └── .env.example
├── frontend/             # React/Vite UI
│   ├── src/
│   ├── .env.example
│   └── ...
└── README.md             # This file
```

---

## 🚀 Setup & Startup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/mern-student-crud.git
cd mern-student-crud
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` and set:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentdb
```
Run backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env` and set:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Run frontend:
```bash
npm run dev
```

---

## 📡 API Specification

**Base URL:**  
```
http://localhost:5000/api/students
```

### Endpoints
| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| GET    | `/`             | Get all students             |
| POST   | `/`             | Add a new student            |
| PUT    | `/:id`          | Update student               |
| DELETE | `/:id`          | Delete student               |

**Example POST Body:**
```json
{ "name": "Alice", "rollNumber": "ABC123" }
```

---

## 🔍 Validation Rules

### Name
- Must start with a letter  
- Can include letters, hyphens, periods, apostrophes, spaces  
- Max length: 100  
- Regex: `^[\p{L}]['\p{L}\-\. ]{0,99}$`

### Roll Number
- 6–10 characters  
- Uppercase letters & digits only  
- Regex: `^[A-Z0-9]{6,10}$`

---

## 🎨 Frontend Features
- **Toggleable Add/Edit Form**  
- **Inline Edit Highlight**  
- **Toast Notifications**  
- **Responsive Design**

---

## 🧪 Testing
Manually test:
- Valid & invalid inputs  
- Duplicate roll numbers  
- Editing only name or roll number  
- Deleting records  
- Error handling in frontend

---

## ⚠ Troubleshooting
- **CORS errors:** Update CORS origin in backend  
- **MongoDB not connecting:** Ensure `mongod` is running and URI is correct  
- **Frontend not loading API:** Check `VITE_API_BASE_URL` and restart dev server

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).