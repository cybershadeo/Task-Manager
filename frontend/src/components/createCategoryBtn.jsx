import { useState } from "react"
import { Plus } from "lucide-react";
import { useDash } from "../hooks/dashUseContext";
import { colorNameToHex } from "../utils/colorThem";


function CreateCategoryButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [colorInput, setColorInput] = useState("");
    const [hexColor, setHexColor] = useState(null);
    const [error, setError] = useState("");

    const { createCategory } = useDash();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!hexColor) {
            setError("Please enter a valid color name");
            return;
        }

        try {
            await createCategory({
                name: categoryName,
                color: hexColor
            });

            setCategoryName("");
            setColorInput("");
            setHexColor(null);
            setError("");
            setIsModalOpen(false);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                "Creation failed"
            );
        }
    }

    function handleColorChange(e) {
        const value = e.target.value;
        setColorInput(value);

        // Allow hex directly too
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            setHexColor(value);
            setError("");
            return;
        }

        const hex = colorNameToHex(value.trim().toLowerCase());
        if (!hex) {
            setHexColor(null);
            setError("Invalid color name");
        } else {
            setHexColor(hex);
            setError("");
        }
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-dashed border-gray-300 hover:border-indigo-300 mt-4"
            >
                <Plus className="w-4 h-4" />
                New Category
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4">
                            Create New Category
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Category Name */}
                            <input
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                                placeholder="Category Name"
                                required
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />

                            {/* Color Name */}
                            <div className="flex items-center gap-3">
                                <input
                                    value={colorInput}
                                    onChange={handleColorChange}
                                    placeholder="Color (e.g. red, skyblue, #ff5733)"
                                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                />

                                {/* Preview */}
                                <div
                                    className="h-8 w-8 rounded-full border"
                                    style={{
                                        backgroundColor: hexColor || "transparent"
                                    }}
                                />
                            </div>

                            {/* Error */}
                            <div className="overflow-hidden transition-all duration-300">
                                {error && (
                                    <p className="animate-in fade-in slide-in-from-top-2 duration-300 text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!hexColor}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateCategoryButton;
