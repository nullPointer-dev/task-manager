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
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-tabs">
                    <Link
                        className="auth-tab active"
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className="auth-tab"
                        to="/register"
                    >
                        Register
                    </Link>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="auth-form"
                >
                    <div className="auth-field">
                        <label className="auth-label">
                            Username
                        </label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">
                            Password
                        </label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-button auth-submit"
                    >
                        Login
                    </button>

                    <p className="auth-footer">
                        Don&apos;t have an account?{" "}
                        <Link
                            className="auth-link"
                            to="/register"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
