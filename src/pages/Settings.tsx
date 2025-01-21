import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Settings = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState<File | string | null>(user?.photo || null);
  const [originalName] = useState(user?.name || '');
  const [originalEmail] = useState(user?.email || '');
  const [originalPhoto] = useState<File | string | null>(user?.photo || null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (photo instanceof File) {
        URL.revokeObjectURL(photo.preview);
      }
    };
  }, [photo]);

  const handleSave = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    // Validate form fields
    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
      toast.error('Name is required');
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
      toast.error('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
      toast.error('Invalid email format');
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Proceed to save and update the user data if all fields are valid
    const photoUrl = photo instanceof File ? URL.createObjectURL(photo) : photo;

    const userData = {
      name,
      email,
      photo: photoUrl,
    };

    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    toast.success('Profile updated successfully!');
    navigate('/');
  };

  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setPhoto(originalPhoto);
    toast.info('Changes canceled');
    navigate('/');
  };

  const handlePhotoUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, JPEG, or WEBP files are allowed!');
        return;
      }

      setPhoto(file);
      toast.success('Photo uploaded successfully!');
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    const updatedUser = { ...user, photo: null };
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    toast.info('Profile photo removed!');
  };

  const getPhotoPreview = (photo: File | string | null) => {
    if (photo instanceof File) {
      return URL.createObjectURL(photo);
    }
    return photo;
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Breadcrumb pageName="Settings" />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Profile Settings
        </h1>

        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Photo Section */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Photo
              </label>
              <div className="relative mt-2">
                <Dropzone
                  onDrop={handlePhotoUpload}
                  accept="image/jpeg, image/png, image/webp"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex justify-center items-center p-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-500"
                    >
                      <input {...getInputProps()} />
                      {!photo ? (
                        user?.photo ? (
                          <img
                            src={user.photo}
                            alt="User"
                            className="w-32 h-32 object-cover rounded-full border-4 border-purple-600"
                          />
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">
                            Drag or click to upload photo
                          </p>
                        )
                      ) : (
                        <img
                          src={getPhotoPreview(photo)}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-full border-4 border-purple-600"
                        />
                      )}
                    </div>
                  )}
                </Dropzone>

                {photo && (
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute top-0 right-0 m-2 p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3"
            style={{
              background: 'linear-gradient(to right, #C0A2FE, #4E2D96)',
              color: 'white',
              borderRadius: '0.375rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #5906BA, #6B0DE3)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #C0A2FE, #4E2D96)')
            }
          >
            Save Change
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
