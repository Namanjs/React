import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { projectId } = useParams(); 
  return <h1 className="text-3xl font-bold">Project Details: {projectId}</h1>;
}