import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import Settings from "./pages/Settings";
import { ProjectProvider } from "./context/ProjectContext";

export default function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          {/* PARENT ROUTE: The Layout */}
          <Route path="/" element={<Layout />}>
            {/* CHILD ROUTES: These render INSIDE the <Outlet /> of Layout */}

            {/* index means "this is the default page when path is /" */}
            <Route index element={<Dashboard />} />

            <Route path="projects" element={<ProjectList />} />

            {/* :projectId is a Variable. It matches /projects/1, /projects/abc, etc. */}
            <Route path="projects/:projectId" element={<ProjectDetails />} />

            <Route path="settings" element={<Settings />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<h1 className="p-10 text-red-500">404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectProvider>
  );
}
