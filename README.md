# Da Vinci Web Assignment

This project has two main parts:

- 📦 [Frontend](./frontend/README.md) (React + Vite + TypeScript)
- ⚡ [Backend](./backend/README.md) (Node.js + Express + TypeScript)

---

## Overview

This application allows users to:

- View, add, edit, and delete **Users**.
- View, add, edit, and delete **Posts**.
- See the relation between **Users** and **Posts** through `userName`.

---

## Prerequisites

- Node.js v18+ and npm installed

---

## Getting Started

### Backend

```bash
cd backend
npm install
npm run start:dev
```

This will start the backend server at http://localhost:3000
(or whichever port you configured).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

This will start the frontend development server (Vite) at http://localhost:5173
by default.

## Notes ✏️

Make sure the backend is running before using the frontend, otherwise API calls will fail.

The root README links to the detailed READMEs in frontend/ and backend/ for more instructions and scripts.
