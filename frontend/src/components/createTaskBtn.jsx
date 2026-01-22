import { useState } from "react"
import { Plus } from "lucide-react";
import { useTask } from "../hooks/taskUseContext";



function CreateTaskButton({ categoryId }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: ''
    });
    const [error, setError] = useState('');
    const { createTask } = useTask();

   async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        const isODate = formatDate(formData.dueDate);

        if(!isODate) {
            setError('Please enter date in DD/MM/YY format');
            return;
        }

        const dataToSubmit = {
            ...formData,
            dueDate: isODate,
            categoryId: categoryId
        }

        try {
            await createTask(dataToSubmit);
            setFormData('');
            setIsModalOpen(false);
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Creation failed')
        }
    }

    function handleChange(e) {
        const  { name, value} = e.target
        setFormData( prev => ({
            ...prev, 
            [name]: value
        }));
    }

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');

        const fullYear = parseInt(year) + 2000;

        const dateObj = new Date(fullYear, parseInt(month) - 1, parseInt(day));

        if(isNaN(dateObj.getTime())) throw new Error('Invalid Date');
        return dateObj.toISOString();
    }

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200'
            >
                <Plus className='w-4 h-4' />
                New Task
            </button>    

            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
                    <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Create New Task
                        </h3>

                        <form onSubmit={handleSubmit}>
                                <input
                                    name='title' value={formData.title} 
                                    onChange={handleChange} placeholder='Task Title' required
                                    className='w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none'
                                />
                                <input
                                    name='description' value={formData.description} onChange={handleChange}
                                    placeholder='descritption' required
                                    className='w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none'
                                /> 
                                <input
                                    name='status' value={formData.status} onChange={handleChange}
                                    placeholder='status' required
                                    className='w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none'
                                />      
                                <input
                                    name='priority' value={formData.priority} onChange={handleChange}
                                    placeholder='priority' required
                                    className='w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none'
                                />  
                                <input
                                    name='dueDate' value={(formData.dueDate)} onChange={handleChange}
                                    placeholder='DD/MM/YY (e.g. 02/01/2026)' required
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

export default CreateTaskButton;