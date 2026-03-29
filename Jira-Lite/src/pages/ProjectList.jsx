import { useState, memo, useCallback, useMemo } from "react";
import { useProjects } from "../context/ProjectContext";
import ProjectForm from "../components/ProjectForm";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const ProjectCard = memo(({ project, onEdit, onDelete }) => {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
      
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-500 text-sm mb-4">ID: {project.id}</p>
      
      <div className="mt-auto flex items-center gap-3">
        <Link to={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Details →
        </Link>

        <button 
          onClick={() => onEdit(project)} 
          className="text-gray-500 hover:text-gray-700 text-sm font-medium ml-auto"
        >
          Edit
        </button>
        
        <button 
          onClick={() => onDelete(project.id)} 
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
});


export default function ProjectList() {
  const { state, dispatch } = useProjects();
  
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [newName, setNewName] = useState("");

  const activeProjectCount = useMemo(() => {
    return state.projects.filter((p) => p.status === "Active").length
  }, [state.projects])

  const handleEditClick = useCallback((p) => {
    setEditingProject(p);
    setNewName(p.name);
  }, []);

  const handleDeleteClick = useCallback((id) => {
    setProjectToDelete(id);
  }, []);

  function handleUpdate() {
    if (newName.trim() && editingProject) {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: { id: editingProject.id, name: newName }
      });
      setEditingProject(null);
      setNewName("");
    }
  }

  if (state.isLoading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-500 animate-pulse">Loading your workspace...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
       
      <ProjectForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
        {state.projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
      </div>

      <p className="text-md font-medium mt-8 text-gray-800 bg-gray-100 inline-block px-4 py-2 rounded-full border border-gray-300">Active Projects: {activeProjectCount}</p>

      <Modal isOpen={projectToDelete !== null} onClose={() => setProjectToDelete(null)}>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Project</h3>
        <p className="text-gray-900 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setProjectToDelete(null)} className="px-4 py-2 text-gray-900 bg-gray-500 hover:bg-gray-400 rounded font-medium">Cancel</button>
          <button 
            onClick={() => {
              dispatch({ type: "DELETE_PROJECT", payload: projectToDelete });
              setProjectToDelete(null);
            }}
            className="px-4 py-2 text-white bg-red-800 hover:bg-red-700 rounded font-medium"
          >
            Yes, Delete It
          </button>
        </div>
      </Modal>

      <Modal isOpen={editingProject !== null} onClose={() => setEditingProject(null)}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Project Name</h3>
        <input 
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:ring-1 focus:ring-blue-500 outline-none"
          autoFocus
        />
        <div className="flex justify-end gap-3">
          <button onClick={() => setEditingProject(null)} className="px-4 py-2 text-gray-900 bg-gray-500 hover:bg-gray-400 rounded font-medium">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 text-white bg-blue-800 hover:bg-blue-900 rounded font-medium">Save Changes</button>
        </div>
      </Modal>

    </div>
  );
}