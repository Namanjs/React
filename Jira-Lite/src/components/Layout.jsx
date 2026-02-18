import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* 1. SIDEBAR (Fixed Left Panel) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-600">
          Jira-Lite
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* We use Link instead of <a href> to stop the page from reloading */}
          <Link to="/" className="block p-3 hover:bg-gray-800 rounded">
            Dashboard
          </Link>
          <Link to="/projects" className="block p-3 hover:bg-gray-800 rounded">
            Projects
          </Link>
          <Link to="/settings" className="block p-3 hover:bg-gray-800 rounded">
            Settings
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA (Right Panel) */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-300 p-5">
          <span className="text-gray-700">Welcome back, User</span>
        </header>

        <div className="p-8">
          {/* 3. THE OUTLET: This is the "Magic Hole" */}
          {/* React Router will dump the specific page content here */}
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}