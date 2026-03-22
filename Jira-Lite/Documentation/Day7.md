## Day 7: Complex Forms, Validation & Full CRUD

Today, we transitioned from simple inputs to enterprise-grade data management. We mastered how to handle multi-field forms efficiently and implemented the final piece of our Project Management engine: the **Update** feature. We also learned how to avoid "Cascading Renders" by managing state updates correctly.

---

### Concepts We Used:

#### 1. Unified Form State (`TaskForm.jsx`)
*   **What:** Grouping multiple inputs into a single state object instead of individual variables.
*   **Why:** It makes the form scalable. Whether you have 3 fields or 30, the logic remains the same.

#### 2. Computed Property Names (`[name]: value`)
*   **What:** A dynamic way to update object keys based on the HTML `name` attribute.
*   **Why:** It allows a single `handleChange` function to update the Title, Description, and Priority boxes without writing separate code for each.

#### 3. Form Validation & Error Feedback
*   **What:** An `errors` object that tracks rule violations (e.g., "Title too short") and prevents `dispatch` until fixed.
*   **UX Win:** We implemented "Live Clearing," which removes the red error state as soon as the user starts typing to fix their mistake.

#### 4. The "Draft vs. Original" Pattern (Editing)
*   **What:** Using a temporary local state (`newName`) to hold changes while editing, instead of modifying the global state directly.
*   **Why:** If the user hits "Cancel," the global data remains untouched. We only commit the change to the "Vault" when the user clicks "Save Changes."

#### 5. Avoiding Cascading Renders
*   **What:** We learned that calling `setState` inside a `useEffect` can cause React to draw the screen twice.
*   **The Fix:** We moved the state updates directly into the button's `onClick` handler, allowing React to "batch" the updates into a single, fast render.

#### 6. Reducer Update Logic (`.map`)
*   **What:** Using `.map()` in the reducer to find one specific object in an array and return a modified copy of it.
*   **Why:** It's the standard React way to update an item in a list while maintaining **Immutability**.

---

### Current Status
The Jira-Lite app is now a fully functional Project and Task manager.
- [x] Full CRUD for Projects (Create, Read, Update, Delete)
- [x] Task Management (Create and Delete) linked to Projects
- [x] Reusable Modal Component
- [x] Complex Form Validation