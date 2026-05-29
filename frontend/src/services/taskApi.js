import api from "../api/axios";

export async function getTasks(username) {

    const response =
        await api.get(
            `/users/${username}/tasks`
        );

    return response.data;
}

export async function createTask(
    username,
    taskData
) {

    const response =
        await api.post(
            `/users/${username}/tasks`,
            taskData
        );

    return response.data;
}

export async function updateTask(
    username,
    taskId,
    taskData
) {

    const response =
        await api.put(
            `/users/${username}/tasks/${taskId}`,
            taskData
        );

    return response.data;
}

export async function deleteTask(
    username,
    taskId
) {

    const response =
        await api.delete(
            `/users/${username}/tasks/${taskId}`
        );

    return response.data;
}