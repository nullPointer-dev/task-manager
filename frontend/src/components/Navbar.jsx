import { useNavigate } from "react-router-dom";

function Navbar({ username }) {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem(
            "username"
        );
        localStorage.removeItem(
            "access_token"
        );

        navigate("/login");
    }

    return (
        <div>
            <h2>{username}</h2>

            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar;
