import { useState } from "react"
import { Plus } from "lucide-react";
import { useTask } from "../hooks/taskUseContext";



function CreateSubtaskButton({ taskId }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subtaskTitle, setSubtaskTitle]= useState('');
    const [error, setError] = useState();
    const { addSubtask } = useTask();

    
   async function handleSubmit(e) {
        e.preventDefault();

        try {
            await addSubtask( {taskId, title: subtaskTitle, completed: false});
            setSubtaskTitle('');
            setIsModalOpen(false);
            
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Creation failed')
        }
    }

    function handleChange(e) {
        setSubtaskTitle(e.target.value)
    }

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
            >
                <Plus className='w-3.5 h-3.5' />
                Add Subtask
            </button>    

            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                    <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Add Subtask
                        </h3>

                        <form onSubmit={handleSubmit}>
                                <input
                                    value={subtaskTitle} onChange={handleChange}
                                    placeholder='Title' required
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

export default CreateSubtaskButton;