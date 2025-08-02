Backend for MERN Student CRUD App

Purpose

This backend provides a RESTful API to manage student records (name and roll number) as part of the MERN stack demonstration. It is intended to be clean, extendable, and easy to integrate with the frontend. The implementation should show thoughtful structure, validation, error handling, and clear API contracts.

Tech Stack Expectations

Runtime / Framework: Node.js with Express

Database: MongoDB (local or Atlas) via Mongoose

Config: dotenv for environment variables

Cross-Origin: CORS enabled for frontend consumption

Dev UX: nodemon for development auto-reload

Error handling: Consistent shape with proper HTTP status codes

Directory Structure (pre-created)

backend/
├── config/          # DB connection & config
├── controllers/     # Business logic for each route
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── server.js         # Application entry point
└── .env             # Environment variables (not committed)

Setup Instructions (what the backend implementer should do)

Install dependencies:

npm install express mongoose cors dotenv
npm install --save-dev nodemon

Create .env file (example below).

Implement database connection logic in config/db.js.

Define the Student schema/model in models/Student.js.

Write controller functions in controllers/studentController.js for CRUD.

Wire up routes in routes/studentRoutes.js.

Initialize Express app in server.js, apply middleware, and mount /api/students.

Add script to package.json:

"scripts": {
  "dev": "nodemon server.js"
}

Test all endpoints with Postman / curl before frontend integration.

Branch off main (e.g., backend-setup), commit incrementally, open a PR for review.

Environment Variables (.env file example)

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentdb

API Contract

Base URL

http://localhost:5000/api/students

Response Shape (Success)

{
  "success": true,
  "data": ...
}

Response Shape (Error)

{
  "success": false,
  "message": "Description of what went wrong"
}

Endpoints

1. Get all students

Method: GET

Endpoint: /

Success Response (200):

{
  "success": true,
  "data": [
    { "_id": "abc123", "name": "Alice", "rollNumber": "101" },
    { "_id": "def456", "name": "Bob", "rollNumber": "102" }
  ]
}

2. Create a student

Method: POST

Endpoint: /

Request Body:

{
  "name": "Charlie",
  "rollNumber": "103"
}

Success Response (201):

{
  "success": true,
  "data": { "_id": "ghi789", "name": "Charlie", "rollNumber": "103" }
}

Error Cases:

Missing required fields → 400

Invalid payload → 400

3. Update a student

Method: PUT

Endpoint: /:id

Request Body: (partial or full)

{
  "name": "Charlie Updated"
}

Success Response (200):

{
  "success": true,
  "data": { "_id": "ghi789", "name": "Charlie Updated", "rollNumber": "103" }
}

Error Cases:

Student not found → 404

Invalid update data → 400

4. Delete a student

Method: DELETE

Endpoint: /:id

Success Response (200):

{
  "success": true,
  "message": "Student deleted"
}

Error Cases:

Student not found → 404

Example curl Calls

Create:

curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","rollNumber":"999"}'

List:

curl http://localhost:5000/api/students

Update:

curl -X PUT http://localhost:5000/api/students/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

Delete:

curl -X DELETE http://localhost:5000/api/students/<id>

Suggested Development Workflow

Create a feature branch (e.g., backend-setup or feature/student-crud).

Implement model → controller → routes in that order.

Test each endpoint independently.

Commit logically (e.g., feat: add student model, feat: implement create endpoint).

Open a pull request to main with a summary and checklist.

Peer review / self-review before merge.