import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    onDelete,
    onToggle,
    onEdit
}) {
    return (
        <div className="task-list">
            {
                tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                        onEdit={onEdit}
                    />
                ))
            }
        </div>
    );
}

export default TaskList;
