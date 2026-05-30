import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/userApi";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {

        event.preventDefault();

        try {

            const tokenResponse =
                await login(
                    username,
                    password
                );

            localStorage.setItem(
                "username",
                username
            );

            localStorage.setItem(
                "access_token",
                tokenResponse.access_token
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Login failed"
            );
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Username</label>

                    <br />

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) =>
                            setUsername(
                                event.target.value
                            )
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>

                    <br />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

                <br />
                <br />

                <Link to="/register">
                    Do not have an account? Register here
                </Link>

            </form>

        </div>
    );
}

export default Login;
