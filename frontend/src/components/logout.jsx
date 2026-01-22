import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/AuthUseContext";
import { useNavigate } from "react-router-dom";


function Logout () {

    const navigate = useNavigate();
    const { logout } = useAuth();

    async function handleLogout () {
        await logout();
        navigate('/signin');
    }


    return (
        <>
            <button 
                onClick={handleLogout}
                className="w-full px-3 py-2 h-15 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <LogOut className="w-3.5 h-3.5" />
                log out
            </button>
        </>
    )
}

export default Logout;