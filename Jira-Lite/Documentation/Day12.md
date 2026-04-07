## 🔐 Day 12: Authentication & Protected Routes

Today, we secured our application by implementing a complete frontend authentication flow. We built a global `AuthContext` to manage the user's session, a dedicated Login page, and a powerful `<ProtectedRoute>` component that acts as a bouncer, redirecting unauthenticated users away from our core application.

---

### Concepts We Used:

#### 1. Authentication Context (`AuthContext`)
*   **What:** A separate, global context dedicated solely to managing the user's logged-in state (`user`, `login`, `logout`).
*   **Why:** It decouples user management from our project data. Now, our `ProjectContext` only cares about projects, and our `AuthContext` only cares about who is logged in. This separation makes the app much easier to debug.

#### 2. Synchronous State Initialization (The `useEffect` Killer)
*   **What:** Initializing `useState` with a function that reads from `localStorage` directly, instead of using a `useEffect` after the first render.
*   **Why:** It's a massive performance win. We eliminated the "Cascading Render" bug by determining the user's auth status *before* the first paint, allowing React to draw the correct UI (Logged In or Logged Out) on the very first try.
    ```jsx
    // The Professional Way: Read storage during initialization
    const [user, setUser] = useState(() => {
      const token = localStorage.getItem("token");
      return token ? { name: "Admin" } : null;
    });
    ```

#### 3. Programmatic Navigation (`useNavigate`)
*   **What:** A hook from `react-router-dom` that gives you a function to change the URL from inside your JavaScript logic.
*   **Why:** After a user successfully logs in, we can't just wait for them to click a link. We need to *forcefully* teleport them to the main dashboard. `navigate('/')` does exactly that.

#### 4. Declarative Redirects (`<Navigate />`)
*   **What:** A component from `react-router-dom` that, when rendered, immediately redirects the user to a different URL.
*   **Why:** It's the perfect tool for building bouncers. Inside `<ProtectedRoute>`, if the user isn't logged in, we `return <Navigate to="/login" />`. This stops the current render dead in its tracks and changes the page.

#### 5. Layout Routes & Protected Routes
*   **What:** Using a `<Route>` without a `path` but with an `element` to wrap child routes.
*   **Why:** It creates a "permission checklist." To get to our main app, the user first has to pass through the `<ProtectedRoute>` wrapper. If they pass, React renders the `<Outlet />`, which then renders the next wrapper (`<Layout>`), and so on, until the final page is displayed.