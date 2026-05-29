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

    return (
        <div
            style={{
                border: "1px solid black",
                padding: "20px",
                marginTop: "20px"
            }}
        >
            <h2>
                {
                    editingTask
                        ? "Edit Task"
                        : "Create Task"
                }
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <br />
            <br />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br />
            <br />

            <button
                onClick={handleSave}
            >
                {
                    editingTask
                        ? "Update"
                        : "Save"
                }
            </button>

            <button
                onClick={onClose}
                style={{
                    marginLeft: "10px"
                }}
            >
                Cancel
            </button>
        </div>
    );
}

export default TaskModal;