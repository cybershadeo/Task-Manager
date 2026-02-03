import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';

function EditProfile({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePictureUrl: ''
  });
  const [profileFile, setProfileFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      //console.log('User data in EditProfile:', user); // Debug log
      setFormData({
        username: user.username || '',
        email: user.email || '',
        profilePictureUrl: user.profilePicture || user.profilePictureUrl || ''
      });
      // Set initial preview if user has a profile picture
      if (user.profilePicture) {
        setPreviewUrl(null); // Reset preview URL to use the actual user picture
      }
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setProfileFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    
    try {
      const formDataToSend = new FormData();

      
      if (formData.username !== user.username) {
        formDataToSend.append('username', formData.username);
      }

      if (formData.email !== user.email) {
        formDataToSend.append('email', formData.email);
      }

      if (profileFile) {
        formDataToSend.append('avatar', profileFile);
      }
      

      await onSave(formDataToSend);
      
      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    const name = formData.username;
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayImage = previewUrl || user?.profilePicture || user?.profilePictureUrl;

  //console.log('Display image URL:', displayImage); // Debug log
 // console.log('Preview URL:', previewUrl);
  //console.log('User profile picture:', user?.profilePicture);console.log('Display image:', displayImage); // Debug log

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-4xl font-semibold overflow-hidden border-4 border-gray-100 shadow-lg">
                {displayImage ? (
                  <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials()
                )}
              </div>
              
              {/* Upload Button Overlay */}
              <label 
                htmlFor="profile-upload" 
                className="absolute inset-0 rounded-full bg-white-900 bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center cursor-pointer transition-all"
              >
                <Camera 
                  size={32} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3">Click to upload profile picture</p>
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            <p className="text-xs text-gray-500">
              Your profile helps people recognize you.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;