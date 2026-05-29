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
        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

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

                <div>

                    <label>Confirm Password</label>

                    <br />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value
                            )
                        }
                    />

                </div>

                <br />

                <button type="submit">
                    Create Account
                </button>

                <br />
                <br />

                <Link to="/login">
                    Already have an account? Login
                </Link>

            </form>

        </div>
    );
}

export default Register;