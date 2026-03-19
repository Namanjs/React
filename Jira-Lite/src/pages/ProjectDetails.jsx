import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import { useEffect } from "react";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { state, dispatch } = useProjects();
  
  // State for the Delete Task Modal
  const [taskToDelete, setTaskToDelete] = useState(null);

  const project = state.projects.find((p) => p.id === Number(projectId));
  const projectTasks = state.tasks.filter((t) => t.projectId === Number(projectId));

  // Dynamic Browser Tab (Your Homework from Day 5!)
  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Jira-Lite`;
    } else {
      document.title = "Project Not Found | Jira-Lite";
    }
    return () => {
      document.title = "Jira-Lite";
    };
  }, [project]);

  // Function to handle the actual deletion after confirmation
  function confirmTaskDelete() {
    if (taskToDelete) {
      dispatch({ type: "DELETE_TASK", payload: taskToDelete });
      setTaskToDelete(null); // Close modal
    }
  }

  // Safety net if project ID in URL is wrong
  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="p-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/projects" className="text-gray-500 hover:underline text-sm">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold mt-2">{project.name}</h1>
          <p className="text-gray-500">Status: {project.status}</p>
        </div>
      </div>

      {/* --- TASK SECTION --- */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        
        {/* The Form to add new tasks */}
        <TaskForm projectId={project.id} />
        
        {/* The List of Tasks */}
        {projectTasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {projectTasks.map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2">
                
                {/* Top Row: Title & Delete Button */}
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-lg">{task.title}</h3>
                  <button 
                    // Open the modal instead of deleting immediately
                    onClick={() => setTaskToDelete(task.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>

                {/* Middle Row: Description (Only show if it exists) */}
                {task.description && (
                  <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">
                    {task.description}
                  </p>
                )}

                {/* Bottom Row: Badges (Status & Priority) */}
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                    {task.status || "Todo"} {/* Fallback to "Todo" if status is missing */}
                  </span>
                  
                  {/* Dynamic Priority Colors */}
                  <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-blue-100 text-blue-700'}
                  `}>
                    {task.priority} Priority
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- DELETE TASK MODAL --- */}
      <Modal 
        isOpen={taskToDelete !== null} 
        onClose={() => setTaskToDelete(null)}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Task</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setTaskToDelete(null)}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={confirmTaskDelete}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded font-medium"
          >
            Yes, Delete It
          </button>
        </div>
      </Modal>

    </div>
  );
}