import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

export default function ProjectForm(){
    const[name, setName] = useState("");

    const { dispatch } = useProjects();

    function handleSubmit(e) {
        e.preventDefault();

        if(!name.trim()) return;

        const newProject = {
            id: Date.now(),
            name: name,
            status: "Active"
        };

        dispatch({
            type: "ADD_PROJECT",
            payload: newProject
        });

        dispatch({
            type: "SHOW_TOAST",
            payload: { message: `Project "${name}" created successfully!`, type: 'success'}
        })

        setName("");
    }

    return(
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">

            <h3 className="font-bold mb-2">Add New Project</h3>

            <div className="flex gap-2">
                <input 
                type="text"
                placeholder="Project Name..."
                className="flex-1 p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
        </form>
    )
}