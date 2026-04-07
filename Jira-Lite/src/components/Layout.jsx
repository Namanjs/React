import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-gray-50">

      {/* 1. SIDEBAR (Fixed Left Panel) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-600">
          Jira-Lite
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* We use Link instead of <a href> to stop the page from reloading */}
          <Link to="/" className="block p-3 hover:bg-gray-800 rounded-xl">
            Dashboard
          </Link>
          <Link to="/projects" className="block p-3 hover:bg-gray-800 rounded-xl">
            Projects
          </Link>
          <Link to="/settings" className="block p-3 hover:bg-gray-800 rounded-xl">
            Settings
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA (Right Panel) */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">

          <span className="text-gray-500 font-medium">
            Welcome back, {user ? user.name : "Guest"}!
          </span>

          {user && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 text-sm font-semibold border border-red-200 px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          )}

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