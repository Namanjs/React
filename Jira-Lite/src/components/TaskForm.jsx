import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

export default function TaskForm({ projectId }) {
    const [title, setTitle] = useState("");
    const { dispatch } = useProjects();

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            projectId: projectId,
            title: title,
            status: "Todo"
        };

        dispatch({
            type: "ADD_TASK",
            payload: newTask
        });

        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">

            <input
                type="text"
                placeholder="What needs to be done?"
                className="flex-1 p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium"
            >
                Add Task
            </button>

        </form>
    );
}