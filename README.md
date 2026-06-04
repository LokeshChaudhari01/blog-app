# Blog/CMS Application

A full-stack blog and CMS application built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **User Authentication:** Sign up, log in, and secure sessions via JWT/cookies.
- **Posts Management:** Create, view, update, and delete posts (CRUD).
- **Commenting System:** Read and write comments on individual posts.
- **Responsive UI:** Modern design with a focus on readability and dark mode styling.

## Project Structure
- `/frontend`: Vite + React + Axios application.
- `/backend`: Node.js + Express + MongoDB RESTful API.

## Prerequisites
- Node.js installed
- MongoDB installed (or a cloud instance like MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file based on `.env.example` (or configure your hosting provider).
   - Set `MONGO_URI` to your MongoDB connection string.
   - Set `FRONTEND_URL` to your frontend's URL.
4. Seed the database with test data (Users, Posts, Comments):
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm start
   ```
   *(Server runs on port 5001 by default locally)*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file and set `VITE_API_URL` to your backend's API URL.
4. Start the development server:
   ```bash
   npm run dev
   ```
   *(Frontend runs on port 5173 by default locally)*

### 3. Usage
- Open your browser to your frontend URL.
- You can log in using the seeded test accounts:
  - Email: `user1@test.com`, Password: `password123`
  - Email: `user2@test.com`, Password: `password123`
- Create new posts or read and comment on existing ones.

## CORS & Deployment
CORS is configured to accept requests dynamically based on the `FRONTEND_URL` environment variable in your backend. When deploying to a service like Railway, Vercel, or Heroku:
- Set `FRONTEND_URL` on your backend to point to your deployed frontend.
- Set `VITE_API_URL` on your frontend to point to your deployed backend API.
