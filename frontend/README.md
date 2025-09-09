# Da Vinci Frontend

This is the frontend for the **Da Vinci Web Assignment**, built with:

- ⚛️ React (with Vite + TypeScript)
- 🎨 Tailwind CSS
- 🛤 React Router
- 🧩 HeadlessUI + Heroicons for UI components

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run development server (for development)

```bash
npm run dev
```

Vite will start a dev server at http://localhost:5173

### 3. Build for production (optional, for deployment)

```bash
npm run build
```

The output will be in the dist/ folder.

### 4. Preview production build (optional)

```bash
npm run preview
```

## 📂 Project Structure

```
frontend/
 ├── src/
 │   ├── assets/        # images and logo
 │   ├── components/    # Reusable UI components (Navbar, ItemList, Pagination, etc.)
 │   ├── pages/         # Page-level components (Home, Users, Posts)
 │   ├── services/      # API request helpers (apiGet, apiPost, apiDelete)
 │   ├── types/         # Shared TypeScript types
 │   └── main.tsx       # App entry point
 ├── index.html
 └── vite.config.ts
```

## 🛠 Technologies Used

React 18 + TypeScript

Vite for fast development and build

Tailwind CSS for styling

React Router for routing

Headless UI and Heroicons for accessible UI components
