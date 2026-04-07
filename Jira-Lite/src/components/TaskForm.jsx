import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

export default function TaskForm({ projectId }) {
    const { dispatch } = useProjects();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium"
    });

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        let newErrors = {};
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = "Task title is required.";
            isValid = false;
        }

        if (formData.title.trim() && formData.title.trim().length < 3) {
            newErrors.title = "Title must be at least 3 characters long.";
            isValid = false;
        }

        if (formData.description && !formData.description.trim()) {
            newErrors.description = "Description cannot be empty spaces";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
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

        dispatch({
            type: "SHOW_TOAST",
            payload: {
                message: "Task added!",
                type: "success"
            }
        })

        setFormData({
            title: "",
            description: "",
            priority: "Medium"
        });

        setErrors({
            title: "",
            description: ""
        })
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
                        className={`w-full p-2 border rounded focus:outline-none 
                            ${errors.title ? 'border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}
                            `}
                        placeholder="E.g., Design the homepage"
                    />

                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
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
                        className={`w-full p-2 border rounded focus:outline-none 
                                 ${errors.description ? 'border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'}
                                `}
                        placeholder="More details..."
                        rows="3"
                    />

                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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