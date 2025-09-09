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
2. Run development server
bash
Copy code
npm run dev
Vite will start a dev server at http://localhost:5173.

3. Build for production
bash
Copy code
npm run build
The output will be in the dist/ folder.

4. Preview production build
bash
Copy code
npm run preview
📂 Project Structure
csharp
Copy code
frontend/
 ├── src/
 │   ├── components/    # Reusable UI components (Navbar, ItemList, Pagination, etc.)
 │   ├── pages/         # Page-level components (Home, Users, Posts)
 │   ├── services/      # API request helpers (apiGet, apiPost, apiDelete)
 │   ├── types/         # Shared TypeScript types
 │   └── main.tsx       # App entry point
 ├── public/            # Static assets (images, favicon, etc.)
 ├── index.html
 └── vite.config.ts
⚙️ Configuration
You can add a .env file in the frontend/ root to configure environment variables:

ini
Copy code
VITE_API_BASE_URL=http://localhost:3000
This sets the base URL for API requests.

📝 Features
CRUD operations for Users and Posts

Pagination for large lists

Relationship between Users and Posts displayed via userId

Responsive design using Tailwind CSS

Input validation for creating posts (checks if userId exists)

📜 Scripts
Script	Description
npm run dev	Start development server
npm run build	Build production-ready files
npm run preview	Preview the production build
npm run lint	Run ESLint to check for code quality

🛠 Technologies Used
React 18 + TypeScript

Vite for fast development and build

Tailwind CSS for styling

React Router for routing

Headless UI and Heroicons for accessible UI components
```
