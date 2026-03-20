## Day 7: Complex Forms & Validation

Today, we transformed a basic, single-input form into a professional, multi-field data entry component. We learned how to manage complex form state efficiently and implemented a robust validation system that provides live feedback to the user.

---

### Concepts We Used:

#### 1. Unified Form State
*   **What:** Storing all form fields inside a single state object (`formData`) instead of multiple individual `useState` variables.
*   **Why We Used It:** It keeps the code clean and scalable. Adding 10 more fields to the form only requires adding 10 keys to the object, rather than writing 10 new hooks.

#### 2. Computed Property Names (`[name]: value`)
*   **What:** A JavaScript ES6 feature that allows us to dynamically set object keys based on a variable.
*   **Why We Used It:** It allowed us to write a single, universal `handleChange` function. By reading the `name` attribute of the HTML input, the function knows exactly which piece of the `formData` object to update.
*   **Syntax:**
    ```javascript
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    ```

#### 3. Form Validation & Error State
*   **What:** Creating a separate state object (`errors`) to track validation failures before allowing a dispatch to the global store.
*   **Why We Used It:** To prevent bad data (like empty titles or tiny strings) from entering our database, and to provide clear, color-coded UI feedback to the user.

#### 4. Live Error Clearing
*   **What:** Intercepting the `handleChange` event to instantly clear a specific field's error message the moment the user begins typing to correct it.
*   **Why We Used It:** It drastically improves UX (User Experience) by removing the red "error state" as soon as the user takes corrective action, rather than forcing them to click "Submit" again to see if it's fixed.