import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import Settings from "./pages/Settings";
import { ProjectProvider } from "./context/ProjectContext";
import ToastContainer from "./components/ToastContainer";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>

            {/* PUBLIC ROUTE: Anyone can see this */}
            <Route path="/login" element={<Login />} />

            {/* THE BOUNCER: It wraps the entire application */}
            <Route element={<ProtectedRoute />}>

              {/* If the bouncer lets you in, it will render its Outlet, which contains your entire app Layout and all its children. */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/:projectId" element={<ProjectDetails />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<h1 className="p-10 text-red-500">404 - Page Not Found</h1>} />
              </Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}
