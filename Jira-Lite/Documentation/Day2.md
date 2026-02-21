## Day 2: The Brain (Global State Management)

Today, we breathed life into our static application by building a **Global State Store**. Instead of passing data manually through every component (Prop Drilling), we built a "Radio Tower" that broadcasts our project data to the entire app instantly. We replaced the simple `useState` with the professional-grade `useReducer` to manage our data like a bank vault.

---

### Concepts We Used:

#### 1. `createContext` (The Network)
*   **What:** A React function that creates a "space" for global data to exist, independent of the component tree.
*   **Why We Used It:** To solve the "Prop Drilling" problem. It allows us to teleport data from the top of the app (`App.jsx`) directly to deep components (`ProjectList.jsx`) without passing it through `Layout` or intermediate files.
*   **Syntax:**
    ```jsx
    const ProjectContext = createContext();
    ```

#### 2. `useReducer` (The Bank Teller)
*   **What:** A hook for managing complex state logic. It uses a **Reducer Function** (The Teller) and **Actions** (Request Slips) to update data.
*   **Why We Used It:** Unlike `useState`, which allows any component to overwrite data arbitrarily, `useReducer` forces us to define strict **rules** (e.g., "ADD_PROJECT"). This makes the application predictable, scalable, and much easier to debug.
*   **Syntax:**
    ```jsx
    const [state, dispatch] = useReducer(projectReducer, initialState);
    ```

#### 3. The Provider Pattern (`<Provider>`)
*   **What:** A component that acts as the "Radio Tower." It wraps the part of the app that needs access to the data.
*   **Why We Used It:** By wrapping our entire `BrowserRouter` inside `<ProjectProvider>`, we ensured that every single route and page in our application has instant access to the Global State.
*   **Syntax:**
    ```jsx
    <ProjectContext.Provider value={{ state, dispatch }}>
       {children}
    </ProjectContext.Provider>
    ```

#### 4. Custom Hooks (`useProjects`)
*   **What:** A helper function we created that wraps `useContext`.
*   **Why We Used It:** It simplifies our code and hides the complexity. Instead of importing the Context object in every file, components simply call `const { state } = useProjects()` to "tune in" to the data.

#### 5. Immutability (The Golden Rule)
*   **What:** The practice of **never** modifying state directly (e.g., `state.push()`), but instead creating a copy (e.g., `[...state, newItem]`).
*   **Why We Used It:** React compares memory addresses to decide when to re-render the screen. If we modify the existing array, React thinks nothing changed and won't update the UI. Creating a new copy forces React to update the screen instantly.
*   **Syntax:**
    ```jsx
    // Bad (No re-render):
    state.projects.push(newProject);

    // Good (Instant re-render):
    return { ...state, projects: [...state.projects, newProject] };
    ```