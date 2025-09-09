# Da Vinci Backend

This is the backend for the **Da Vinci Web Assignment**, built with:

- 🟢 Node.js + TypeScript
- 🌐 Express.js for API endpoints
- 🗂 In-memory or JSON-based data storage (can be replaced with a database)
- 🧪 CORS enabled for frontend requests

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Run development server

```bash
npm run dev
```

The server will start on http://localhost:3000

### 3. Build for production (optional, for deployment)

```bash
npm run build

```

### 4. Preview production build (optional)

```bash
npm start

```

## 📂 Project Structure

backend/
├── src/
│ ├── posts/ # Posts module (controller + service + DTOs)
│ ├── users/ # Users module (controller + service + DTOs)
│ ├── app.module.ts # Main application module
│ └── main.ts # App entry point
│ └── types.ts #Shared TypeScript types (User, Post)
├── test/ # Unit tests
├── package.json
├── tsconfig.json
└── nest-cli.json

## 📝 API Endpoints

### Users

| Method | Endpoint     | Description             | Request Body                   | Response                   |
| ------ | ------------ | ----------------------- | ------------------------------ | -------------------------- |
| GET    | `/users`     | Get all users           | –                              | Array of users             |
| GET    | `/users/:id` | Get a single user by ID | –                              | User object or 404         |
| POST   | `/users`     | Create a new user       | `{ name, username, email }`    | Newly created user object  |
| PATCH  | `/users/:id` | Update a user           | `{ name?, username?, email? }` | Updated user object or 404 |
| DELETE | `/users/:id` | Delete a user by ID     | –                              | 204 No Content or 404      |

### Posts

| Method | Endpoint     | Description             | Request Body                 | Response                   |
| ------ | ------------ | ----------------------- | ---------------------------- | -------------------------- |
| GET    | `/posts`     | Get all posts           | –                            | Array of posts             |
| GET    | `/posts/:id` | Get a single post by ID | –                            | Post object or 404         |
| POST   | `/posts`     | Create a new post       | `{ title, body, userId }`    | Newly created post object  |
| PATCH  | `/posts/:id` | Update a post           | `{ title?, body?, userId? }` | Updated post object or 404 |
| DELETE | `/posts/:id` | Delete a post by ID     | –                            | 204 No Content or 404      |

## 🛠 Technologies Used

Nest.js + TypeScript

CORS for cross-origin requests
