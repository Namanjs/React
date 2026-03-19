import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

export default function TaskForm({ projectId }) {
    const { dispatch } = useProjects();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium"
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!formData.title.trim()) {
            return;
        }

        const newTask = {
            id: Date.now(),
            projectId: projectId,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: "Todo"
        }

        dispatch({
            type: 'ADD_TASK',
            payload: newTask
        });

        setFormData({
            title: "",
            description: "",
            priority: "Medium"
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-4 rounded shadow-sm border border-gray-200"
        >

            <h3 className="font-bold mb-4 text-gray-700">Add a New Task</h3>

            <div className="flex flex-col gap-4">

                <div>

                    <label
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                        placeholder="E.g., Design the homepage"
                    />

                </div>

                <div>

                    <label
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                        placeholder="More details..."
                        rows="3"
                    />

                </div>

                <div>

                    <label
                    className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                </div>

                <button
                    type="submit"
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium self-start"
                >
                    Create Task
                </button>
            </div>
        </form>
    );
}