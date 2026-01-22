import { useContext } from "react";
import { DashboardContext } from "../context/contextCreation";

export const useDash = () => {
    const context = useContext(DashboardContext);

    if(context === undefined) {
        throw new Error('useDash must be used within an DashProvider');
    }

    return context;
}