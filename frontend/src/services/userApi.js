import api from "../api/axios";

export async function register(username, password) {

    const response = await api.post(
        "/users",
        {
            username,
            password
        }
    );

    return response.data;
}

export async function login(username, password) {

    const response = await api.post(
        "/users/login",
        {
            username,
            password
        }
    );

    return response.data;
}