import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { state, dispatch } = useProjects();

  const [taskToDelete, setTaskToDelete] = useState(null);

  function confirmTaskDelete() {
    if (taskToDelete) {
      dispatch({
        type: "DELETE_TASK",
        payload: taskToDelete
      })
    }

    setTaskToDelete(null)
  }

  const project = state.projects.find((p) => p.id === Number(projectId));
  const projectTasks = state.tasks.filter((t) => t.projectId === Number(projectId));

  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Jira-Lite`;
    } else {
      document.title = "Project not found | Jira-Lite";
    }

    return () => { // useEffect rule: if you return something it must be a function
      document.title = "Jira-Lite";
    }
  }, [project])

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <>
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
                    onClick={() => setTaskToDelete(task.id)}
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

      <Modal
      isOpen={taskToDelete !== null}
      onClose={() => setTaskToDelete(null)}
      >
          <h3
          className="text-xl font-bold text-gray-900 mb-2"
        >Delete Project</h3>

        <p
          className="text-gray-600 mb-6"
        >Are you sure you want to delete this task? This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button
          onClick={() => setTaskToDelete(null)}
          className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-medium"
          >
            Cancel
          </button>

          <button
          onClick={confirmTaskDelete}
          className="px-4 py2 text-white bg-red-600 hover:bg-red-700 rounded font-medium"
          >
            Yes, Delete it
          </button>
        </div>
      </Modal>
    </>
  );
}