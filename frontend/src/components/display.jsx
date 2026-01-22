import { Sun } from "lucide-react";

function Display () {
    return (
        <>
            <button className="w-full px-3 py-2 pt-3 pb-4 h-15 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Sun className="w-3.5 h-3.5"/>
                Display
            </button>
        </>
    )
}

export default Display;

