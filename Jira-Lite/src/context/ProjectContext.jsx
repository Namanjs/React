import { createContext, useContext, useReducer } from "react";

const initialState = { //Mock Data
    projects: [],
    tasks: []
};

function projectReducer(state, action) {
    switch (action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };

        case "DELETE_PROJECT":
            return{
                ...state,
                projects: state.projects.filter((p) => p.id !== action.payload)
            }

        case "ADD_TASK":
            return{
                ...state,
                tasks: [...state.tasks, action.payload]
            }

        case "DELETE_TASK":
            return{
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload)
            }

        default:
            return state;
    }
}

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    return(
        <ProjectContext.Provider value = {{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext)
}