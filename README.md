# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
# Student Task Management System

A full stack MERN application where students can register, log in, and manage academic
tasks by category, priority, deadline, and completion status.

Built as a 10-day individual Full Stack Minor Project — Quillance Infotech, August 2026.

## 🔗 Live Links

- **Live App (Frontend):** https://student-task-manager-eight-orpin.vercel.app
- **Backend API:** https://student-task-manager-5ews.onrender.com
- **API Health Check:** https://student-task-manager-5ews.onrender.com/api/health
- **GitHub Repository:** https://github.com/monalisha2004/student-task-manager

> **Note:** The backend is hosted on Render's free tier, which spins down after
> periods of inactivity. The first request after idle time may take 30-60 seconds
> to respond while the server wakes up — this is expected behavior, not a bug.

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Frontend       | React (Vite), React Router, Axios    |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB Atlas (cloud) with Mongoose  |
| Authentication | JWT + bcrypt                         |
| Deployment     | Vercel (frontend) + Render (backend) |

## Project structure
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
