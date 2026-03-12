# Leave Management System

A full-stack web application that allows employees to apply for leave and employers to manage and approve or reject leave requests.

The system provides role-based access where employees can submit leave applications and employers can review and approve them through an administrative dashboard.

---

## Live Demo

Frontend:
https://leave-management-frontend.onrender.com

Backend API:
https://leave-management-backend.onrender.com

---

## Features

### Authentication

* User signup and login
* Forgot password and reset password
* Password validation
* JWT-based authentication

### Employee Features

* Apply for leave
* View leave statistics
* View leave history
* Track leave request status (Pending, Approved, Rejected)
* User profile page

### Employer Features

* Employer dashboard
* View all leave requests
* Approve leave requests
* Reject leave requests
* Dashboard statistics

### UI Features

* Modern authentication pages
* Glassmorphism UI design
* Sidebar navigation
* Loading indicators
* Responsive layout

---

## Tech Stack

### Frontend

* Vue.js
* Tailwind CSS
* Axios
* Heroicons

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt password hashing

### Database

* MongoDB Atlas

### Deployment

* Render (Frontend + Backend)
* GitHub for version control

---

## Project Structure

```
leave-management-system

backend
│
├── models
│   ├── User.js
│   └── Leave.js
│
├── routes
│   ├── authRoutes.js
│   └── leaveRoutes.js
│
├── middleware
│   └── authMiddleware.js
│
├── server.js
└── .env


frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── router
│   ├── services
│   └── assets
│
├── index.html
└── package.json
```

---

## Installation (Local Setup)

### Clone Repository

```
git clone https://github.com/mohd-idrees/leave-management-system.git
```

```
cd leave-management-system
```

---

### Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
node server.js
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Open browser:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

POST `/api/auth/signup`
Register a new user

POST `/api/auth/login`
User login

PUT `/api/auth/reset-password`
Reset user password

---

### Leave Management

POST `/api/leave/apply`
Apply for leave

GET `/api/leave/my-leaves`
Get employee leave history

GET `/api/leave/all`
Get all leave requests (Employer)

PUT `/api/leave/approve/:id`
Approve leave request

PUT `/api/leave/reject/:id`
Reject leave request

---

## Deployment

The application is deployed using Render.

### Backend Deployment

* Create a Render Web Service
* Root directory: `backend`
* Start command: `node server.js`
* Add environment variables

### Frontend Deployment

* Create a Render Static Site
* Root directory: `frontend`
* Build command: `npm install && npm run build`
* Publish directory: `dist`

### Important Configuration

Add rewrite rule for Vue Router:

```
Source: /*
Destination: /index.html
Action: Rewrite
```

---

## Author

Mohammed Idrees
BTech – Artificial Intelligence & Machine Learning

---

## License

This project was developed for educational and internship evaluation purposes.
