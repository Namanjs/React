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
                        className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing"
                    >
                        <p className="font-semibold text-gray-800">{task.title}</p>
                    </div>
                ))}
                {tasks.length === 0 && <p className="text-gray-400 text-sm">Drop tasks here.</p>}
            </div>
        </div>
    );
}