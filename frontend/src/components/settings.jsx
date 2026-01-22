import { useState, useRef, useEffect } from "react";
import { Settings,  } from 'lucide-react';
import Profile from "./profile";
import Logout from "./logout";
import Display from "./display";
import Help from "./help";

function SettingsSidebar () {

    const [isOpen, setIsOpen] = useState(false);
    const settingsMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if( settingsMenuRef.current && !settingsMenuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    

    
    return (
        <>
            <div className="p-4 border-t z-40 border-gray-200" ref={settingsMenuRef}>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                </button>

                {isOpen && (
                    <div className="absolute right-0 bottom-8 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-1 min-w-[200px] min-h-[250px]">
                        <Profile />
                        <div className="h-px bg-neutral-200 my-1" />

                        <Display />
                        <div className="h-px bg-neutral-200 my-1" />

                        <Help />
                        <div className="h-px bg-neutral-200 my-1" />

                        <Logout />
                    </div>
                )}
            </div>





            
        </>
    )
}

export default SettingsSidebar;
