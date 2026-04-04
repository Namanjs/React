import { createContext, useContext, useReducer, useEffect } from "react";

const savedData = localStorage.getItem('jiraLiteData');

const initialState = savedData ? JSON.parse(savedData) : {
  projects: [],
  tasks: [],
  isLoading: false 
};

function projectReducer(state, action) {

    let newState;

    switch (action.type) {
        case "ADD_PROJECT":
            newState = {...state, projects: [...state.projects, action.payload]};
            break;

        case "DELETE_PROJECT":
            newState = {...state, projects: state.projects.filter((p) => p.id !== action.payload)};
            break;

        case "ADD_TASK":
            newState = {...state, tasks: [...state.tasks, action.payload]};
            break;

        case "DELETE_TASK":
            newState = {...state, tasks: state.tasks.filter((t) => t.id !== action.payload)};
            break;

        case "SET_PROJECTS":
            newState = {...state, projects: action.payload};
            break;

        case 'UPDATE_PROJECT':
            newState = {...state, projects: state.projects.map((p) => 
                p.id === action.payload.id ? {...p, ...action.payload} : p
            )};
            break;

        case 'UPDATE_TASK_STATUS':
            newState = {...state, tasks: state.tasks.map((t) => 
                t.id === action.payload.taskId ? 
                {...t, status: action.payload.newStatus} : t
            )};
            break;

        default:
            return state;
    }

    localStorage.setItem("jiraLiteData", JSON.stringify(newState));

    return newState;
}

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext)
}