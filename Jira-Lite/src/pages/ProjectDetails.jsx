import { memo, useCallback, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import { useEffect } from "react";
import KanbanBoard from "../components/KanbanBoard";

const TaskCard = memo(({ task, onDelete }) => {
  console.log("Rendering Task:", task.title);

  return (
    <>
      <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2">

        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 text-lg">{task.title}</h3>
          <button
            onClick={() => onDelete(task)}
            className="text-red-500 hover:text-red-700 text-sm font-bold"
          >
            Delete
          </button>
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">
            {task.description}
          </p>
        )}

        <div className="flex gap-2 mt-2">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
            {task.status || "Todo"}
          </span>

          <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'}
                  `}>
            {task.priority} Priority
          </span>
        </div>

      </div>
    </>
  );
});

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { state, dispatch } = useProjects();

  const [taskToDelete, setTaskToDelete] = useState(null);

  const project = state.projects.find((p) => p.id === Number(projectId));
  const projectTasks = state.tasks.filter((t) => t.projectId === Number(projectId));

  const activeTaskCount = useMemo(() => {
    return state.tasks.filter((t) => t.projectId === Number(projectId)).length;
  }, [state.tasks, projectId])

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

  function confirmTaskDelete() {
    if (taskToDelete) {
      dispatch({ type: "DELETE_TASK", payload: taskToDelete.id });
      setTaskToDelete(null);
    }
  }

  const handleDeleteClick = useCallback((task) => {
    setTaskToDelete(task);
  }, []);

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

        <h2 className="text-xl font-bold mb-4">Board View</h2>

        <KanbanBoard tasks={projectTasks}></KanbanBoard>

        <h2 className="text-xl font-bold mt-8 mb-4">List View</h2>

        <TaskForm projectId={project.id} />

        {projectTasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {projectTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        <p className="text-md font-medium mt-8 text-gray-800 bg-gray-100 inline-block px-4 py-2 rounded-full border border-gray-300">Active
          tasks: {activeTaskCount}</p>

      </div>

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
            onClick={() => confirmTaskDelete()}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded font-medium"
          >
            Yes, Delete It
          </button>
        </div>
      </Modal>

    </div>
  );
}