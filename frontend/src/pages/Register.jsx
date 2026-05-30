import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/userApi";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {

        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await register(
                username,
                password
            );

            alert("Account created successfully");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Registration failed"
            );
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-tabs">
                    <Link
                        className="auth-tab"
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className="auth-tab active"
                        to="/register"
                    >
                        Register
                    </Link>
                </div>

                <form
                    onSubmit={handleRegister}
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

                    <div className="auth-field">
                        <label className="auth-label">
                            Confirm Password
                        </label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-button auth-submit"
                    >
                        Create account
                    </button>

                    <p className="auth-footer">
                        Already have an account?{" "}
                        <Link
                            className="auth-link"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
