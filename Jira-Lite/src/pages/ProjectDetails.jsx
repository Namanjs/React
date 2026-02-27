import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import TaskForm from "../components/TaskForm";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { state, dispatch } = useProjects();

  const project = state.projects.find((p) => p.id === Number(projectId));
  const projectTasks = state.tasks.filter((t) => t.projectId === Number(projectId));

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/projects" className="text-gray-500 hover:underline text-sm">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold mt-2">{project.name}</h1>
          <p className="text-gray-500">Status: {project.status}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>

        <TaskForm projectId={project.id} />
        
        {projectTasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {projectTasks.map((task) => (
              <div key={task.id} className="bg-white p-3 rounded shadow-sm flex justify-between items-center">
                <span className="font-medium">{task.title}</span>
                
                <button 
                  onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}