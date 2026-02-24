## Day 3: The Brain (Global State & Actions)

Today, we turned our read-only application into a fully interactive one. We completed the **Global State Management** system by implementing the "Write" operations. We connected our UI to the `useReducer` logic, allowing users to create new projects via a form and delete existing ones via a button. We also refactored our initial state to start empty, proving that our logic works dynamically.

---

### Concepts We Used:

#### 1. `useReducer` in Action
*   **What:** We utilized the `dispatch` function provided by the `useReducer` hook.
*   **Why We Used It:** instead of modifying data directly (which causes bugs), we send specific instructions ("Actions") to our reducer. This ensures that all data changes happen in one predictable place (The Bank Teller).
*   **Syntax:**
    ```jsx
    const [state, dispatch] = useReducer(reducer, initialState);
    ```

#### 2. Dispatching Actions
*   **What:** Sending a "Request Slip" to the reducer to trigger a state change.
*   **Why We Used It:** To trigger the `ADD_PROJECT` and `DELETE_PROJECT` logic we wrote in the reducer function.
*   **Syntax:**
    ```jsx
    // Adding
    dispatch({ type: "ADD_PROJECT", payload: { id: 1, name: "New App" } });

    // Deleting
    dispatch({ type: "DELETE_PROJECT", payload: 1 });
    ```

#### 3. Forms in React
*   **What:** A controlled component (`ProjectForm`) that tracks user input using `useState` locally, but sends the final data to the Global Store on submit.
*   **Why We Used It:** To capture the project name before sending it to the global array. We prevented the default HTML form reload using `e.preventDefault()`.

#### 4. CRUD Operations (Create, Read, Delete)
*   **Create:** Implemented via `ProjectForm` dispatching `ADD_PROJECT`.
*   **Read:** Implemented via `ProjectList` mapping over `state.projects`.
*   **Delete:** Implemented via the Delete button dispatching `DELETE_PROJECT`.

#### 5. Cleaning Up Mock Data
*   **What:** We removed the hardcoded "Website Redesign" data from our `initialState`.
*   **Why We Used It:** To verify that our `ADD` logic actually works from scratch. Now the app starts empty and relies entirely on user interaction to populate data.

---

### Current Status
The app now has a fully functioning Project Management system (in memory).
- [x] Routing (Pages)
- [x] Global State (Context)
- [x] Add Projects
- [x] List Projects
- [x] Delete Projects