export default function KanbanColumn({ title, tasks, status, handleDrop }) {

    function handleDragStart(e, task) {
        e.dataTransfer.setData('taskId', task.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleOnDrop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        handleDrop(status, Number(taskId));
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            className="bg-gray-100 rounded-lg p-3 flex flex-col w-80 min-h-40"
        >
            <h3 className="font-bold text-lg mb-4 text-gray-700">{title}</h3>
            <div className="space-y-3 flex-1">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, task)}
                        className={`bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing flex justify-between items-center border-l-4 
                        ${task.priority === 'High' ? 'border-red-500' :
                        task.priority === 'Medium' ? 'border-yellow-500' :
                        'border-blue-500'}
                        `}
                    >
                        <p className="font-semibold text-gray-800">{task.title}</p>

                        <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${task.priority === 'High' ? 'bg-red-100 text-red-700 border border-red-500' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'}
                        `}>
                            {task.priority} Priority
                        </span>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-gray-400 text-sm">Drop tasks here.</p>}
            </div>
        </div>
    );
}