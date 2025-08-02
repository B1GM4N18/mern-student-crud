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
