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
        
        case "SET_PROJECTS":    
            return{
                ...state,
                projects: action.payload,
                isLoading: false
            }

        case 'UPDATE_PROJECT':
            return{
                ...state,
                projects: state.projects.map((p) => {
                    if(p.id === action.payload.id){
                        return{
                            ...p,
                            name: action.payload.name
                        };
                    }else{
                        return p;
                    }
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
                {id: 1, name: "Website Redesign", status: "Active"},
                {id: 2, name: "Mobile App V2", status: "Planning"}
            ]

            dispatch({type: "SET_PROJECTS", payload: fakeServerData})
        }, 1500)
    }, [])

    return(
        <ProjectContext.Provider value = {{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    return useContext(ProjectContext)
}