# Project Camp Backend

### 1. What is this?
This is a **Node.js/Express** backend for a Project Management System. It uses **MongoDB** for data storage and implements a **RESTful API** architecture.
*   **Goal:** Manage Projects, Tasks, Subtasks, and Team Members.
*   **Key Tech:** Express (Server), Mongoose (DB Modeling), JWT (Auth), Nodemon (Dev).

### 2. Quick Start (Run it in 2 mins)
1.  **Prerequisites:** Node.js installed, MongoDB connection string.
2.  **Setup Environment:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<your_connection_string>
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_super_secret_key_123
    REFRESH_TOKEN_SECRET=your_super_secret_key_456
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_EXPIRY=10d
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run Server:**
    ```bash
    npm run dev  # Development (restarts on save)
    # OR
    npm start    # Production
    ```
5.  **Verify:**
    Open browser to `http://localhost:3000/`. You should see "Welcome to Project Management".
    Check Health: `http://localhost:3000/api/v1/healthcheck`.

---

### 3. Architecture Overview (How it works)
The project follows the standard **M-V-C** (Model-View-Controller) pattern (minus the View, as it's an API):

*   **`src/app.js`**: The Setup Center. Configures Middleware (CORS, JSON parsing) and mounts Routes.
*   **`src/db/index.js`**: Database Connection logic.
*   **`src/models/`** (The *Data Structure*):
    *   `user.models.js`: Users with passwords (hashed) and roles.
    *   `project.models.js`: Projects with owners.
    *   `task.models.js`: Tasks linked to projects.
*   **`src/controllers/`** (The *Logic*): Before checking files, we assume standard separation where logic lives here.
*   **`src/routes/`** (The *rAPI Endpoints*):
    *   `healthcheck.routes.js`: Simple status check.
    *   `auth.routes.js`: Login/Register logic (exists but currently **inactive** in `app.js`).
    *   `project.routes.js`: CRUD for projects (exists but currently **inactive** in `app.js`).

### 4. Key Workflows (Theoretical & Implemented)

#### A. Authentication (Ready in Code)
*   **Files:** `src/routes/auth.routes.js`, `src/models/user.models.js`
*   **How it works:** Users register -> Data validated -> Password hashed (bcrypt) -> Saved to DB. Login issues a **JWT** (JSON Web Token) for secure access.

#### B. Project & Task Management (Ready in Code)
*   **Files:** `src/routes/project.routes.js`, `src/models/project.models.js`, `src/models/task.models.js`
*   **How it works:** You create a Project. Inside the Project, you create Tasks. Tasks can have Subtasks.
*   **Logic:** RBAC (Role-Based Access Control) ensures only Admins can delete projects.

### 5. Developer Note: Current State
> ⚠️ **Important:** While the code for Auth and Projects exists in `src/routes`, only the `healthcheck` route is currently "plugged in" inside `src/app.js`.

To enable the full API, you would uncomment/add these lines in `src/app.js`:
```javascript
import userRouter from './routes/auth.routes.js'
import projectRouter from './routes/project.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/projects", projectRouter)
```

### 6. Folder Structure Reference
```
src/
├── app.js           # App configuration
├── index.js         # Entry point (Server listener)
├── db/              # DB Connection
├── models/          # Mongoose Schemas (User, Project, Task)
├── routes/          # API Route Definitions
├── controllers/     # Function logic for routes
├── middleware/      # Auth checks, File uploads (multer)
└── utils/           # Helper functions (APIResponse, ErrorHandler)
```
