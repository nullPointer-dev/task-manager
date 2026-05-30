import api from "../api/axios";

export async function getTasks() {

    const response =
        await api.get(
            "/tasks/"
        );

    return response.data;
}

export async function createTask(
    taskData
) {

    const response =
        await api.post(
            "/tasks/",
            taskData
        );

    return response.data;
}

export async function updateTask(
    taskId,
    taskData
) {

    const response =
        await api.put(
            `/tasks/${taskId}`,
            taskData
        );

    return response.data;
}

export async function deleteTask(
    taskId
) {

    const response =
        await api.delete(
            `/tasks/${taskId}`
        );

    return response.data;
}
