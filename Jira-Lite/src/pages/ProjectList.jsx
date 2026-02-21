import { useProjects } from "../context/ProjectContext"; 

export default function ProjectList() {
  
  const { state } = useProjects(); 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {state.projects.map((project) => (
          
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
              
              {/* Conditional Styling based on status */}
              <span className={`px-2 py-1 rounded text-xs font-semibold
                ${project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800" }
              `}>
                {project.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm">ID: {project.id}</p>
            
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>

        ))}
        
        {/* Handle Empty State */}
        {state.projects.length === 0 && (
          <p className="text-gray-500">No projects found.</p>
        )}

      </div>
    </div>
  );
}