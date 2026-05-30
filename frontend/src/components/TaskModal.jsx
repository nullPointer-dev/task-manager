import { useState, useEffect } from "react";

function TaskModal({
    onClose,
    onSave,
    onUpdate,
    editingTask
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (editingTask) {

            setTitle(editingTask.title);

            setDescription(
                editingTask.description
            );

        } else {

            setTitle("");
            setDescription("");

        }

    }, [editingTask]);

    function handleSave() {

        if (!title.trim()) {
            return;
        }

        if (editingTask) {

            onUpdate({
                ...editingTask,
                title,
                description
            });

        } else {

            onSave({
                title,
                description
            });

        }
    }

    const createdDate = editingTask?.created_at
        ? new Date(editingTask.created_at)
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
        : editingTask?.created_at || "";

    return (
        <div className="modal-backdrop">
            <div className="modal-card">
                <div className="modal-header">
                    <h2>
                        {
                            editingTask
                                ? "Edit task"
                                : "Create task"
                        }
                    </h2>
                    <button
                        className="icon-button"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <label className="modal-label">
                        Title
                    </label>
                    <input
                        className="modal-input"
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <label className="modal-label">
                        Description
                    </label>
                    <textarea
                        className="modal-textarea"
                        placeholder="Task description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                {
                    editingTask && formattedDate && (
                        <div className="modal-meta">
                            <span>Created</span>
                            <span>{formattedDate}</span>
                        </div>
                    )
                }

                <div className="modal-actions">
                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="primary-button"
                        onClick={handleSave}
                    >
                        {
                            editingTask
                                ? "Save changes"
                                : "Create task"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;
