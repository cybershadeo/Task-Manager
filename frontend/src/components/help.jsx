import { Info } from "lucide-react"

function Help () {
    return (
        <button className="w-full px-3 py-2 h-15 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            Help
        </button>
    )
}

export default Help;