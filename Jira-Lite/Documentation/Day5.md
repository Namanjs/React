## Day 5: Data Fetching & Async Patterns

Today we transitioned from an "instant" in-memory app to a realistic asynchronous application. We learned that React renders instantly, so we must handle the "delay" of requesting data from a server. We implemented a simulated database fetch using `setTimeout` and managed the UI transition using an `isLoading` state.

---

### Concepts We Used:

#### 1. `useEffect` (The Side Effect Hook)
*   **What:** A hook that tells React to execute a specific function *after* the component has been drawn on the screen.
*   **Why We Used It:** To fetch data from our "server." If we put the fetch directly in the component body, it would freeze the UI. `useEffect` safely pushes this task to the background.
*   **Syntax:**
    ```javascript
    useEffect(() => {
       // Code to talk to the outside world goes here
    }, []);
    ```

#### 2. The Dependency Array `[]`
*   **What:** The second argument to `useEffect`. It is an array of variables that React watches. 
*   **Why We Used It:** By passing an *empty* array `[]`, we gave React strict orders: *"Only run this fetch once, when the app first opens. Never run it again on re-renders."* Without this, the app would be trapped in an infinite loop of fetching and rendering.

#### 3. Loading States
*   **What:** A boolean variable (`isLoading: true`) in our global state.
*   **Why We Used It:** To provide visual feedback to the user. We conditionally render a "Loading..." message if it is true, and swap to the actual data when the `SET_PROJECTS` action turns it to false.