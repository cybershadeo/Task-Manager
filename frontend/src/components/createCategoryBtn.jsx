import { useState } from "react"
import { Plus } from "lucide-react";
import { useDash } from "../hooks/dashUseContext";



function CreateCategoryButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState();
    const { createCategory } = useDash();

   async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createCategory(categoryName);
            setCategoryName('');
            setIsModalOpen(false);
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Creation failed')
        }
    }

    function handleChange(e) {
        setCategoryName(e.target.value)
    }


    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className='w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-dashed border-gray-300 hover:border-indigo-300 mt-4'
            >
                <Plus className='w-4 h-4' />
                New Category
            </button>    

            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                    <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Create New Category
                        </h3>

                        <form onSubmit={handleSubmit}>
                                <input
                                    value={categoryName} onChange={handleChange}
                                    placeholder='Category Name' required
                                    className='w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none'
                                />  
                                <div className='overflow-hidden transition-all duration-300'>
                                     {error && 
                                     <p className='animate-in fade-in slide-in-from-top-2 duration-300 text-sm text-red-500 flex items-center gap-2'> 
                                        {error} 
                                     </p>}
                                </div>

                                <div className='flex justify-end gap-3'>
                                    <button type='button' onClick={() => setIsModalOpen(false)}
                                        className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                                    >
                                        Cancel
                                    </button>
                                    <button type='submit'
                                            className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
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