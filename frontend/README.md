# MERN Student CRUD Frontend

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow) ![React](https://img.shields.io/badge/framework-React-blue) ![Axios](https://img.shields.io/badge/http-Axios-orange)

## Overview
Frontend React application for the MERN stack student record manager.  
Consumes the backend REST API to create, read, update, and delete student entries.  
Focuses on clean UI, reusable components, and a clear data flow from API to display.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Setup](#setup)
3. [Environment](#environment)
4. [UI Components](#ui-components)
5. [API Integration](#api-integration)
6. [Development Workflow](#development-workflow)
7. [Acceptance Criteria](#acceptance-criteria)
8. [Optional Enhancements](#optional-enhancements)
9. [Handoff Notes](#handoff-notes)

## Tech Stack
- React (Vite recommended for fast dev environment)
- Axios for HTTP requests
- TailwindCSS / Bootstrap / Material UI (choose one for styling)
- React Hooks (`useState`, `useEffect`) for state management

## Setup
```bash
cd frontend
npm create vite@latest
# Choose React + JavaScript
npm install
npm install axios
# Optional: npm install bootstrap or tailwindcss
```

Run development server:
```bash
npm run dev
```

## Environment
Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Access in code via:
```js
import.meta.env.VITE_API_BASE_URL
```

## UI Components

### Suggested Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── StudentForm.jsx
│   │   ├── StudentList.jsx
│   │   └── StudentTableRow.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── studentService.js
│   ├── App.jsx
│   └── main.jsx
```

**Component Roles:**
- `StudentForm` – Handles adding/updating students.
- `StudentList` – Displays all students in a table.
- `StudentTableRow` – Represents a single student with edit/delete options.
- `studentService.js` – Centralized API calls using Axios.

## API Integration
Example `studentService.js`:
```js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/students';

export const getStudents = () => axios.get(API_URL);
export const addStudent = (student) => axios.post(API_URL, student);
export const updateStudent = (id, student) => axios.put(`${API_URL}/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
```

## Development Workflow
- Create a feature branch (e.g., `frontend-setup` or `feature/student-ui`).
- Implement components in isolation.
- Integrate with backend API (mock if backend not ready).
- Test CRUD functionality end-to-end.
- Commit with descriptive messages:
  - `feat: add StudentForm component`
  - `feat: integrate list API`
  - `style: improve table layout`
- Open pull request to `main` with summary & checklist.

## Acceptance Criteria
- [x] Fetch and display students from API.
- [x] Add student via form, update UI without full reload.
- [x] Edit student inline or via form.
- [x] Delete student with confirmation prompt.
- [x] Handle loading and error states.
- [ ] Mobile-friendly layout.

## Optional Enhancements
- Add search/filter by name or roll number.
- Pagination for large datasets.
- Toast notifications on success/error.
- Form validation (frontend + backend).
- Dark mode toggle.

## Handoff Notes
- Ensure `VITE_API_BASE_URL` matches backend environment.
- When backend API changes (e.g., new field `department`), update form, service, and table columns.
- Use controlled components for form fields to ensure React state reflects inputs.