import { useState } from "react";

function TaskCard({ task, onDelete, onToggle, onEdit }) {

    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                Date: {task.created_at}
            </p>

            <p>
                Status: {
                    task.completed
                        ? "Completed"
                        : "Incomplete"
                }
            </p>

            {
                hovered &&
                (
                    <div>
                        <button
                            onClick={() => onEdit(task)}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onToggle(task.id)}
                         >
                            {
                                task.completed
                                    ? "✗"
                                    : "✓"
                            }
                        </button>
                        <button
                            onClick={() =>
                                onDelete(task.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                )
            }

        </div>
    );
}

export default TaskCard;