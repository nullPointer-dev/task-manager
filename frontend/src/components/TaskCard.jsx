import { useState } from "react";

function TaskCard({ task, onDelete, onToggle, onEdit }) {

    const [hovered, setHovered] = useState(false);
    const createdDate = task.created_at
        ? new Date(task.created_at)
        : null;
    const formattedDate = createdDate &&
        !Number.isNaN(createdDate.getTime())
        ? createdDate.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
        : task.created_at || "—";
    const statusLabel = task.completed
        ? "Completed"
        : "Incomplete";

    return (
        <div
            className="task-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="task-card-top">
                <div>
                    <h3 className="task-title">
                        {task.title}
                    </h3>
                    {
                        task.description && (
                            <p className="task-description">
                                {task.description}
                            </p>
                        )
                    }
                </div>

                {
                    hovered &&
                    (
                        <div className="task-actions">
                            <button
                                className="icon-button"
                                onClick={() => onEdit(task)}
                                aria-label="Edit task"
                            >
                                ✎
                            </button>
                            <button
                                className="icon-button"
                                onClick={() =>
                                    onToggle(task.id)
                                }
                                aria-label="Toggle status"
                            >
                                {
                                    task.completed
                                        ? "✕"
                                        : "✓"
                                }
                            </button>
                            <button
                                className="icon-button danger"
                                onClick={() =>
                                    onDelete(task.id)
                                }
                                aria-label="Delete task"
                            >
                                🗑
                            </button>
                        </div>
                    )
                }
            </div>

            <div className="task-meta">
                <span className="task-date">
                    {formattedDate}
                </span>
                <span
                    className={
                        `task-status ${
                            task.completed
                                ? "status-completed"
                                : "status-incomplete"
                        }`
                    }
                >
                    {statusLabel}
                </span>
            </div>

        </div>
    );
}

export default TaskCard;
