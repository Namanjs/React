import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectContext";

export default function ProjectNotes({ project }) {
  const { dispatch } = useProjects();
  
  const [localNotes, setLocalNotes] = useState(project.notes || "");

  const isSaving = localNotes !== project.notes;

  useEffect(() => {
    if (!isSaving) return;

    const timerId = setTimeout(() => {
      dispatch({
        type: "UPDATE_PROJECT",
        payload: { id: project.id, notes: localNotes }
      });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [localNotes, project.id, project.notes, dispatch, isSaving]);

  return (
    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6 mb-10">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-yellow-800">Project Notes</h3>
        <span className="text-xs font-semibold text-gray-400">
          {isSaving ? "Saving changes..." : "Saved to Vault"}
        </span>
      </div>
      <textarea
        className="w-full p-2 bg-transparent border-none resize-none focus:ring-1 focus:ring-yellow-400 rounded h-32 text-gray-700"
        placeholder="Type notes here... it auto-saves!"
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
      />
    </div>
  );
}