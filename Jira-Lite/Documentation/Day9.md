## 📋 Day 9: The Kanban Board (Drag & Drop)

Today, we built a highly interactive Kanban board. We learned how to manage complex UI events using the HTML5 Drag and Drop API and how to seamlessly connect those physical DOM events to our Global State architecture.

---

### Concepts We Used:

#### 1. Derived State (`useMemo` for Filtering)
*   **What:** Instead of storing "Todo Tasks" and "Done Tasks" in separate arrays in our global state, we keep one master list and dynamically filter it into columns on the fly.
*   **Why:** It creates a "Single Source of Truth." If a task's status changes, it automatically moves to the correct column without us having to manually delete it from one array and push it to another.

#### 2. The HTML5 Drag and Drop API
*   **What:** Native browser events (`onDragStart`, `onDragOver`, `onDrop`) that allow elements to be picked up and moved.
*   **Syntax & Flow:**
    1.  **Make it draggable:** `<div draggable={true}>`
    2.  **Store the ID on pickup:** 
        `onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}`
    3.  **Allow the dropzone:** 
        `onDragOver={(e) => e.preventDefault()}` *(Required by browsers to allow dropping)*
    4.  **Read the ID on drop:** 
        `onDrop={(e) => const id = e.dataTransfer.getData('taskId')}`

#### 3. Reducer Mapping (The Safe Update)
*   **What:** Updating a single property (`status`) on a single object inside a massive array.
*   **The Trap:** Forgetting to return the *unmodified* tasks during a `.map()` loop results in `undefined` items, crashing the app.
*   **The Fix:** 
    ```javascript
    tasks.map(t => t.id === payload.id ? { ...t, status: payload.newStatus } : t) // ALWAYS return the fallback 't'!
    ```