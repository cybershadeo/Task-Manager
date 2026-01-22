import { useContext } from "react";
import { AuthContext } from "../context/contextCreation";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if(context === undefined) {
        throw new Error('useDash must be used within an DashProvider');
    }

    return context;
}
