import { useMemo } from "react";
import KanbanColumn from "./KanbanColumn";
import { useProjects } from "../context/ProjectContext";

export default function KanbanBoard({ tasks }) {
    const { dispatch } = useProjects();

    const columns = useMemo(() => {
        const cols = {
            Todo: [],
            InProgress: [],
            Done: []
        };

        for (const task of tasks) {
            if (task.status === "In Progress") {
                cols.InProgress.push(task);
            } else if (task.status === "Done") {
                cols.Done.push(task);
            } else {
                cols.Todo.push(task);
            }
        }

        return cols;
    }, [tasks]);

    function handleDrop(newStatus, taskId) {
        dispatch({
            type: 'UPDATE_TASK_STATUS',
            payload: { taskId, newStatus }
        });
    }

    return (
        <div className="flex gap-6 overflow-x-auto py-2">
            <KanbanColumn title="Todo" status="Todo" tasks={columns.Todo} handleDrop={handleDrop} />
            <KanbanColumn title="In Progress" status="In Progress" tasks={columns.InProgress} handleDrop={handleDrop} />
            <KanbanColumn title="Done" status="Done" tasks={columns.Done} handleDrop={handleDrop} />
        </div>
    )
}