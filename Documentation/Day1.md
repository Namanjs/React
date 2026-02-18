# Jira-Lite: React Mastery Project

## Day 1: Building the Foundation with React Router

Today, we built the foundational skeleton for our Jira-Lite application using `React Router`. We created a `Single Page Application (SPA)` structure with a persistent sidebar and a dynamic content area. This allows users to navigate between Dashboard, Projects, and Settings pages instantly without the browser ever reloading, and includes a fallback 404 page for invalid URLs.

### Concepts We Used:

*   **`<BrowserRouter>`**
    -   **What:** A component that wraps our entire app to enable client-side routing.
    -   **Why We Used It:** It prevents the page from fully reloading when the URL changes, creating a faster, smoother user experience than traditional multi-page websites.

*   **`<Routes>` and `<Route>`**
    -   **What:** Components used to map a specific URL path to a specific React component.
    -   **Why We Used It:** This replaces the server's job of sending a different HTML file for each page, allowing us to manage all our "pages" within a single React application.

*   **`<Link>`**
    -   **What:** A component to create navigation links.
    -   **Why We Used It:** Used instead of a traditional `<a href="">` tag. It changes the URL without triggering a full page reload, keeping our application state intact.

*   **`<Outlet />`**
    -   **What:** A placeholder used in a parent route's component (our `Layout`) where child routes will be rendered.
    -   **Why We Used It:** This avoids duplicating shared layouts (like sidebars) on every page. We define the frame once, and the content swaps inside it.

*   **Nested Routes**
    -   **What:** Placing `<Route>` components inside another `<Route>` to create parent-child relationships.
    -   **Why We Used It:** It's the perfect way to create layouts. Our parent `Layout` route renders on every page, and the child routes (Dashboard, etc.) render inside its `<Outlet />`.

*   **Dynamic Routes (`path="/:id"`) and `useParams`**
    -   **What:** A way to create routes that match a pattern, while the `useParams` hook reads the variable part from the URL.
    -   **Why We Used It:** It allows one component (`ProjectDetails`) to handle rendering data for thousands of different projects, which is impossible with static HTML files.