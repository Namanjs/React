## Day 4: Relational Data & The Task System

Today, we expanded our Global Store to handle multiple types of data. We introduced **Tasks** into our application and linked them to specific **Projects**. Instead of nesting tasks inside project objects (which creates deeply nested, hard-to-update state), we used a professional "Flat" state architecture and connected them using relational IDs.

---

### Concepts We Used:

#### 1. Flat State Architecture (Normalization)
*   **What:** Keeping different data types in separate, top-level arrays in our initial state (`projects: []` and `tasks:[]`).
*   **Why We Used It:** If we nested tasks inside projects (`project.tasks.push()`), updating a single task would require complex, deep cloning of the state tree. By keeping them flat, adding or deleting a task is as simple as updating a single, top-level array.
*   **Syntax:**
    ```javascript
    const initialState = {
      projects: [],
      tasks:[] // Flat structure
    };
    ```

#### 2. Relational Data Linking
*   **What:** Giving every new task a `projectId` property that matches the ID of the project it belongs to.
*   **Why We Used It:** So tasks aren't floating aimlessly. When a user creates a task on Project A's page, we stamp it with Project A's ID so we can find it later.
*   **Syntax:**
    ```javascript
    // Inside TaskForm.jsx
    const newTask = { id: 123, projectId: 456, title: "Design Logo" };
    ```

#### 3. Derived State (Filtering Relational Data)
*   **What:** Calculating what to show on the screen by combining the URL parameter with our Global State.
*   **Why We Used It:** The Global Store holds *all* tasks for *all* projects. When viewing a specific project, we must filter the global `state.tasks` array to only show the ones matching the current URL's `projectId`.
*   **Syntax:**
    ```jsx
    // Inside ProjectDetails.jsx
    const { projectId } = useParams();
    const projectTasks = state.tasks.filter(t => t.projectId === Number(projectId));
    ```

#### 4. Expanding the Reducer
*   **What:** Adding new `case` statements to our existing `projectReducer`.
*   **Why We Used It:** A single reducer can handle dozens of different actions. We taught our "Bank Teller" two new commands: `ADD_TASK` and `DELETE_TASK`, proving how scalable the `useReducer` pattern is.

---

### Current Status
The application now supports fully relational data management entirely in memory.
- [x] Foundation & Routing
- [x] Global State (Projects)
- [x] Relational Global State (Tasks)
- [x] Filtered Views based on URL Parameters