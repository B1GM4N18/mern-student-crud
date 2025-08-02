# MERN Student CRUD Backend

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow) ![Node.js](https://img.shields.io/badge/node-%3E=18-brightgreen) ![MongoDB](https://img.shields.io/badge/database-MongoDB-blue)

## Overview
Backend service for a MERN stack student record manager.  
Provides a clean RESTful API to create, read, update, and delete student entries (name + roll number) with proper validation, error handling, and a consistent response shape.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Setup](#setup)
3. [Environment](#environment)
4. [API Contract](#api-contract)
5. [Example Requests](#example-requests)
6. [Development Workflow](#development-workflow)
7. [Acceptance Criteria](#acceptance-criteria)
8. [Optional Enhancements](#optional-enhancements)
9. [Handoff Notes](#handoff-notes)

## Tech Stack
- Node.js with Express  
- MongoDB via Mongoose  
- dotenv for configuration  
- CORS for cross-origin frontend integration  
- nodemon for developer experience

## Setup
```bash
cd backend
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

Add this script to `package.json`:
```json
"scripts": {
  "dev": "nodemon server.js"
}
```

## Environment
Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentdb
```
> **Note:** `.env` is ignored via `.gitignore` already.

## API Contract

**Base URL:**  
`http://localhost:5000/api/students`

### Common Response Shapes

**Success:**
```json
{
  "success": true,
  "data": ...
}
```

**Error:**
```json
{
  "success": false,
  "message": "Description of failure"
}
```

### Endpoints

#### 1. List all students
- **Method:** `GET`
- **Path:** `/`
- **Success (200):**
  ```json
  {
    "success": true,
    "data": [
      { "_id": "abc123", "name": "Alice", "rollNumber": "101" }
    ]
  }
  ```

#### 2. Create a student
- **Method:** `POST`
- **Path:** `/`
- **Body:**
  ```json
  {
    "name": "Charlie",
    "rollNumber": "103"
  }
  ```
- **Success (201):**
  ```json
  {
    "success": true,
    "data": { "_id": "ghi789", "name": "Charlie", "rollNumber": "103" }
  }
  ```

#### 3. Update a student
- **Method:** `PUT`
- **Path:** `/:id`
- **Body:** partial or full (e.g., `{ "name": "New Name" }`)
- **Success (200):**
  ```json
  {
    "success": true,
    "data": { "_id": "ghi789", "name": "New Name", "rollNumber": "103" }
  }
  ```

#### 4. Delete a student
- **Method:** `DELETE`
- **Path:** `/:id`
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Student deleted"
  }
  ```

## Example Requests

**Create:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","rollNumber":"999"}'
```

**List:**
```bash
curl http://localhost:5000/api/students
```

**Update:**
```bash
curl -X PUT http://localhost:5000/api/students/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

**Delete:**
```bash
curl -X DELETE http://localhost:5000/api/students/<id>
```

## Development Workflow
- Create a feature branch (e.g., `backend-setup` or `feature/student-crud`).
- Implement in order: model → controller → routes.
- Test each endpoint individually (Postman / curl).
- Commit with descriptive messages:
  - `feat: add Student model`
  - `feat: implement create endpoint`
  - `fix: validation error handling`
- Open pull request to `main` with summary & checklist.

## Acceptance Criteria
- [x] CRUD endpoints work as specified.
- [x] MongoDB connection via `.env`.
- [x] CORS enabled.
- [x] Required field validation with proper status codes.
- [x] Consistent success/error response structure.
- [x] README & API contract present for frontend.
- [ ] Clean commit history.

## Optional Enhancements
- Input sanitization.
- Request/response logging middleware.
- Swagger/OpenAPI documentation.
- Unit tests for controllers.
- Enforce unique `rollNumber`.

## Handoff Notes
- To add a new field (e.g., `department`): update Mongoose schema, adjust controller logic, and ensure responses include it. No need to refactor unrelated layers.
- Always document changes here or in the related GitHub issue.
