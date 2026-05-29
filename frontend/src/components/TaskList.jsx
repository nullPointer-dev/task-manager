import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    onDelete,
    onToggle,
    onEdit
}) {
    return (
        <>
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
        </>
    );
}

export default TaskList;