## 🏎️ Day 8: Performance & Optimization (The Speed Update)

Today, we stopped building features and started building for scale. We tackled the "hidden enemy" of React: **Unnecessary Re-renders**. When using a Global Context, a single keystroke can accidentally redraw 10,000 items on the screen. We learned how to use React's built-in "Ninja Tools" to cache our UI and keep the app running at a silky-smooth 60fps.

---

### 🛡️ The 3 Pillars of React Performance

#### 1. `React.memo` (The Component Bouncer)
*   **The Concept:** A wrapper that acts as a bouncer for your components. Before redrawing, it asks: *"Did your props actually change since last time?"* If no, it uses the cached HTML and skips the render entirely.
*   **The Syntax:**
    ```jsx
    import { memo } from 'react';

    // Wrap your component definition in memo()
    const ProjectCard = memo(({ project, onEdit }) => {
      console.log(`Rendering: ${project.name}`); // Will only log if 'project' changes!
      return <div className="card">{project.name}</div>;
    });
    ```

#### 2. `useCallback` (The ID Badge for Functions)
*   **The Concept:** In JavaScript, defining a function creates a brand new memory address every single render. If you pass that function as a prop to a `memo` component, the Bouncer thinks it's new and redraws anyway (breaking your optimization). `useCallback` forces React to remember the exact memory address of the function forever.
*   **The Syntax:**
    ```jsx
    import { useCallback } from 'react';

    // The empty array [] means "Never create a new version of this function"
    const handleDelete = useCallback((id) => {
      dispatch({ type: "DELETE", payload: id });
    }, []); 

    // Now it's safe to pass to a memoized component!
    <ProjectCard onDelete={handleDelete} />
    ```

#### 3. `useMemo` (The Sticky Note for Data)
*   **The Concept:** Some math is heavy (like filtering 10,000 tasks). You don't want to recount them every time the user types a letter in a search box. `useMemo` does the math once, writes the answer on a sticky note, and only recalculates if the underlying data actually changes.
*   **The Syntax:**
    ```jsx
    import { useMemo } from 'react';

    // Only recalculate this number if the 'projects' array changes
    const activeCount = useMemo(() => {
      console.log("Recalculating heavy math...");
      return projects.filter(p => p.status === 'Active').length;
    }, [projects]); // <-- The Dependency Array
    ```