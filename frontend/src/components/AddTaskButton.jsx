function AddTaskButton({ onClick }) {
    return (
        <button
            className="add-task-button"
            onClick={onClick}
        >
            + Add task
        </button>
    );
}

export default AddTaskButton;
