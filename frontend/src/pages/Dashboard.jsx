import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskApi";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import AddTaskButton from "../components/AddTaskButton";
import TaskModal from "../components/TaskModal";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("access_token");
    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {

        async function fetchTasks() {

            try {

                const tasksFromBackend =
                    await getTasks();

                setTasks(tasksFromBackend);

            } catch (error) {

                console.error(error);

            }
        }

        fetchTasks();

    }, []);

    async function handleCreateTask(taskData) {

        try {

            const newTask =
                await createTask(taskData);

            const tasksFromBackend =
                await getTasks();

            setTasks(tasksFromBackend);

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert("Failed to create task");

        }
    }

    async function handleDeleteTask(taskId) {

        try {

            await deleteTask(taskId);

            const tasksFromBackend =
                await getTasks();

            setTasks(tasksFromBackend);

        } catch (error) {

            console.error(error);

            alert("Failed to delete task");

        }
    }

    async function handleToggleTask(taskId) {

        try {

            const task =
                tasks.find(
                    task => task.id === taskId
                );

            await updateTask(
                taskId,
                {
                    completed:
                        !task.completed
                }
            );

            const tasksFromBackend =
                await getTasks();

            setTasks(tasksFromBackend);

        } catch (error) {

            console.error(error);

            alert("Failed to update task");

        }
    }

    function handleEditClick(task) {
        setEditingTask(task);
        setShowModal(true);
    }

    async function handleUpdateTask(
        updatedTask
    ) {

        try {

            await updateTask(
                updatedTask.id,
                {
                    title:
                        updatedTask.title,
                    description:
                        updatedTask.description
                }
            );

            const tasksFromBackend =
                await getTasks();

            setTasks(tasksFromBackend);

            setEditingTask(null);

            setShowModal(false);

        } catch (error) {

            console.error(error);

            alert("Failed to update task");

        }
    }

    const filteredTasks = tasks.filter(task => {

        if (filter === "pending") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });

    return (
        <div>

            <Navbar username={username || "User"} />

            <AddTaskButton
                onClick={() => {
                    setEditingTask(null);
                    setShowModal(true);
                }}
            />

            <div>
                <button
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>

                <button
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
            </div>

            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
                onEdit={handleEditClick}
            />

            {
                showModal &&
                (
                    <TaskModal
                        onClose={() => {
                            setShowModal(false);
                            setEditingTask(null);
                        }}
                        onSave={handleCreateTask}
                        onUpdate={handleUpdateTask}
                        editingTask={editingTask}
                    />
                )
            }

        </div>
    );
}

export default Dashboard;
