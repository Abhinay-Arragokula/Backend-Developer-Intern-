# MERN Task Management System

A completely scalable, full-stack REST API and React frontend utilizing a beautifully styled dark theme out-of-the-box. Built using Node.js, Express, MongoDB, and React (+ Vite).

## Features
- **Backend**: Express REST API, MongoDB Mongoose Modeling, JWT Passport logic, Role-Based Access Control (Admin/User), and standard Error Handling. Contains Swagger API documentation.
- **Frontend**: Full React application via Vite, React Router DOM protected routes, Axios Interceptors tracking JWT in local storage, and custom rich CSS aesthetics focusing on animations and layouts.

## Requirements
- Node.js (v18+)
- MongoDB (running locally or a URI string from Mongo Atlas)

## Getting Started

### 1. Setup Backend
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Prepare environment variables:
   Copy `.env.example` to `.env` and configure your `MONGODB_URI` appropriately. E.g:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskapp
   JWT_SECRET=super_secret_jwt_key_here
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   > The backend will listen on `http://localhost:5000`.
   > Swagger documentation is automatically available at `http://localhost:5000/api-docs`.

### 2. Setup Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   > The frontend will typically start on `http://localhost:5173`. Any `/api/*` traffic automatically proxies to `locahost:5000` via Vites `proxy` config inside `vite.config.js`.

---

## API Documentation & Postman
- Check `/backend/swagger.yaml` or hit `http://localhost:5000/api-docs` directly from the browser for fully detailed OpenAPI definitions.
- Import the included `postman_collection.json` located dynamically in the project root to directly test the REST operations locally.

## Project Structure
```
├── backend/
│   ├── config/          # DB config
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth & Error handling
│   ├── models/          # Mongoose Schemas (User, Task)
│   ├── routes/          # Express Routers
│   ├── server.js        # Entrypoint
│   └── swagger.yaml     # API Docs
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, TaskItem
│   │   ├── context/     # Auth Context Hooks
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── App.jsx      # Main Router
│   │   └── index.css    # Premium Aesthetics Layer
│   └── vite.config.js   # Proxy Config
```
