import { useProjects } from "../context/ProjectContext";
import ProjectForm from "../components/ProjectForm";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";

export default function ProjectList() {

  const { state, dispatch } = useProjects();

  const [projectToDelete, setProjectToDelete] = useState(null);

  const [editingProject, setEditingProject] = useState(null);
  const [newName, setNewName] = useState("");

  function handleUpdate() {
    if(newName.trim() && editingProject){
      dispatch({
        type: "UPDATE_PROJECT",
        payload: {
          id: editingProject.id,
          name: newName
        }
      });

      setEditingProject(null);
      setNewName("");
    }
  }

  function confirmDelete() {
    if (projectToDelete) {
      dispatch({
        type: "DELETE_PROJECT",
        payload: projectToDelete
      });

      setProjectToDelete(null);
    }
  }

  if (state.isLoading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-500 animate-pulse">
          Loading your workspace...
        </h2>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>

      <ProjectForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {state.projects.map((project) => (

          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">

            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>

              {/* Conditional Styling based on status */}
              <span className={`px-2 py-1 rounded text-xs font-semibold
                ${project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
              `}>
                {project.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm">ID: {project.id}</p>

            <div className="mt-4 flex gap-2">

              {/* Replace the old <button> with this <Link> */}
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details →
              </Link>

              <button
              onClick={() => {
                setEditingProject(project);
                setNewName(project.name);
              }}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium ml-auto"
              >
                Edit
              </button>

              <button
                onClick={() => setProjectToDelete(project.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium ml-auto"
              >
                Delete
              </button>

            </div>


          </div>

        ))}

        {/* Handle Empty State */}
        {state.projects.length === 0 && (
          <p className="text-gray-500">No projects found.</p>
        )}

      </div>

      <Modal
        isOpen={projectToDelete !== null}
        onClose={() => setProjectToDelete(null)}
      >
        <h3
          className="text-xl font-bold text-gray-900 mb-2"
        >Delete Project</h3>

        <p
          className="text-gray-600 mb-6"
        >Are you sure you want to delete this project? This action cannot be undone and will remove all associated tasks.</p>

        <div className="flex justify-end gap-3">
          <button
          onClick={() => setProjectToDelete(null)}
          className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-medium"
          >
            Cancel
          </button>

          <button
          onClick={confirmDelete}
          className="px-4 py2 text-white bg-red-600 hover:bg-red-700 rounded font-medium"
          >
            Yes, Delete it
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={editingProject !== null}
        onClose={() => setEditingProject(null)}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Project Name</h3>

        <input 
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-3 border-gray-300 rounded mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
          autoFocus
        />

        <div>

          <button
            onClick={() => setEditingProject(null)}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded font-medium"
          >
            Save Changes
          </button>

        </div>
      </Modal>

    </div>
  );
}