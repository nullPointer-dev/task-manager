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
        <div className="navbar">
            <div className="navbar-left">
                <span className="navbar-username">
                    {username}
                </span>
            </div>
            <div className="navbar-right">
                <button
                    className="ghost-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
