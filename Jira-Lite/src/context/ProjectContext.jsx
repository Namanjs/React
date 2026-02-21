import { createContext, useContext, useReducer } from "react";

const initialState = { //Mock Data
    projects: [
        { id: 1, name: "Website Redesign", status: "Active" },
        { id: 2, name: "Mobile App V2", status: "Planning" }
    ]
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