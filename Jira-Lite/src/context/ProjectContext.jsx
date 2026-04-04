import { createContext, useContext, useReducer, useEffect } from "react";

const initialState = { //Mock Data
    projects: [],
    tasks: [],
    isLoading: true
};

function projectReducer(state, action) {
    switch (action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };

        case "DELETE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter((p) => p.id !== action.payload)
            }

        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload)
            }

        case "SET_PROJECTS":
            return {
                ...state,
                projects: action.payload,
                isLoading: false
            }

        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === action.payload.id ? { ...p, ...action.payload } : p
                )
            };

        case 'UPDATE_TASK_STATUS':
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.taskId) {
                        return { ...task, status: action.payload.newStatus };
                    }
                    return task;
                })
            }

        default:
            return state;
    }
}

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    useEffect(() => {
        setTimeout(() => {
            const fakeServerData = [
                { id: 1, name: "Website Redesign", status: "Active", notes: "" },
                { id: 2, name: "Mobile App V2", status: "Planning", notes: "" }
            ]

            dispatch({ type: "SET_PROJECTS", payload: fakeServerData })
        }, 1500)
    }, [])

    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext)
}