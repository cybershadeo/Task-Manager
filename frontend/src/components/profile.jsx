import { useState } from "react";
import { useDash } from "../hooks/dashUseContext";
import EditProfile from "./editProfile";

function Profile() {
  const { user, updateUserProfile } = useDash();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (updatedData) => {
    for (const [key, value] of updatedData.entries()) {
      console.log(key, value);
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const userId = savedUser?.id;
      
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      await updateUserProfile(userId, updatedData);
      
      // The context should handle updating the user state
      // If it doesn't, you might need to manually update localStorage and state here
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Re-throw to let EditProfile handle the error display
    }
  };

  const getInitials = () => {
    if (!user?.username) return 'U';
    return user.username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row items-center gap-5 pt-3 pb-4 pl-3 w-full hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold text-white overflow-hidden">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          ) : (
            getInitials()
          )}
        </div>
        <div className="leading-tight">
          <p className="text-sm pl-3 font-semibold text-gray-900">{user?.username || 'User'}</p>
        </div>
      </button>

      {isModalOpen && (
        <EditProfile 
          user={user} 
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default Profile;