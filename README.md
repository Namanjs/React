# Jira-Lite: A React Mastery Project

This is a hands-on learning project designed to build a simplified clone of a project management tool like Jira, Trello, or Asana. The primary goal is not to build a production-ready application, but to master core and advanced React concepts by building real-world features from the ground up.

This project is being built incrementally, focusing on one major React concept at a time.

## Learning Objectives

This project serves as a practical guide to understanding and implementing the following concepts in a realistic application architecture:

-   **React Hooks:** Mastering the full suite (`useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, etc.).
-   **React Router:** Building a complete client-side routing system with nested, dynamic, and protected routes.
-   **Global State Management:** Implementing a robust global state solution using the `Context + useReducer` pattern.
-   **Asynchronous Patterns:** Handling data fetching, loading/error states, and avoiding race conditions.
-   **Performance Optimization:** Using `memo`, `useMemo`, `useCallback`, and code-splitting to keep the app fast.
-   **Advanced Component & Form Patterns:** Building reusable, complex components and forms.
-   **Authentication:** Creating a full authentication flow.

## Features

-   [ ] **Foundation & Routing:** A multi-page layout with a persistent sidebar and dynamic content area.
-   [ ] **Project & Task Management:** Create, Read, Update, and Delete projects and tasks.
-   [ ] **Kanban Board:** A drag-and-drop interface to move tasks between columns.
-   [ ] **API Integration:** Fetching and persisting data to a mock backend.
-   [ ] **User Authentication:** A simulated login/logout flow with protected routes.

## Technology Stack

-   **Framework:** React (via Vite)
-   **Routing:** React Router v6
-   **Styling:** Tailwind CSS
-   **Backend (Planned):** JSON Server (for a mock REST API)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository_name.git
    ```
2.  Navigate to the project directory
    ```sh
    cd your_repository_name
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Documentation

Detailed, day-by-day progress and concept explanations for this project are maintained in the `/documentation` folder.