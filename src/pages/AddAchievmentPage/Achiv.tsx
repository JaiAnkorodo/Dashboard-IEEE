import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaTrash } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Achievement {
  id: number;
  name: string;
  achievement: string;
  link: string;
  date: string;
  category: string;
  photo?: string;
  photoLink?: string;
}

const AddAchievementPage: React.FC = () => {
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<Achievement>({
    id: Date.now(),
    name: '',
    achievement: '',
    link: '',
    date: '',
    category: '',
    photo: '',
    photoLink: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    achievement: '',
    link: '',
    date: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const getAchievementsFromLocalStorage = (): Achievement[] => {
    const storedAchievements = localStorage.getItem('achievements');
    return storedAchievements ? JSON.parse(storedAchievements) : [];
  };

  const saveToLocalStorage = (achievement: Achievement) => {
    const achievements = getAchievementsFromLocalStorage();
    achievements.push(achievement);
    localStorage.setItem('achievements', JSON.stringify(achievements));
  };

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!achievement.name) newErrors.name = 'Name is required';
    if (!achievement.achievement)
      newErrors.achievement = 'Achievement is required';
    if (!achievement.link) newErrors.link = 'Link is required';
    if (!achievement.date) newErrors.date = 'Date is required';
    if (!achievement.category) newErrors.category = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    saveToLocalStorage(achievement);

    toast.success('Achievement added successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    setTimeout(() => {
      navigate('/achievements');
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/achievements');
  };

  const handleDeletePhoto = () => {
    toast.info('Photo deleted successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    setAchievement({ ...achievement, photo: undefined });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const fileURL = URL.createObjectURL(file);
      setAchievement({ ...achievement, photo: fileURL });
    } else {
      toast.error('Only PNG, JPEG, and JPG images are allowed!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: '.png,.jpeg,.jpg',
  });

  const isValidDate = (date: string): boolean =>
    !isNaN(new Date(date).getTime());

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Add New Achievement" />

      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Name Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Name
          </h2>
          <input
            type="text"
            placeholder="Enter achievement name"
            value={achievement.name}
            onChange={(e) =>
              setAchievement({ ...achievement, name: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>

        {/* Achievement Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Achievement
          </h2>
          <input
            type="text"
            placeholder="Enter achievement"
            value={achievement.achievement}
            onChange={(e) =>
              setAchievement({ ...achievement, achievement: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.achievement && (
            <div className="text-red-500 text-sm mt-1">
              {errors.achievement}
            </div>
          )}
        </div>

        {/* Achievement Link Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Achievement Link
          </h2>
          <input
            type="url"
            placeholder="Enter achievement link"
            value={achievement.link}
            onChange={(e) =>
              setAchievement({ ...achievement, link: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.link && (
            <div className="text-red-500 text-sm mt-1">{errors.link}</div>
          )}
        </div>

        {/* Date Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Date
          </h2>
          <DatePicker
            selected={
              achievement.date && isValidDate(achievement.date)
                ? new Date(achievement.date)
                : null
            } // Ensure valid date
            onChange={(date) =>
              setAchievement({
                ...achievement,
                date: date ? date.toISOString().split('T')[0] : '', // Format as 'yyyy-MM-dd'
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
          {errors.date && (
            <div className="text-red-500 text-sm mt-1">{errors.date}</div>
          )}
        </div>

        {/* Category Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Category
          </h2>
          <select
            value={achievement.category}
            onChange={(e) =>
              setAchievement({ ...achievement, category: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          >
            <option value="">Select Category</option>
            <option value="International">International</option>
            <option value="National">National</option>
            <option value="Campus">Campus</option>
          </select>
          {errors.category && (
            <div className="text-red-500 text-sm mt-1">{errors.category}</div>
          )}
        </div>

        {/* Drag & Drop Image Upload Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Upload Image (JPEG/PNG)
          </h2>
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border-gray-800 dark:border-gray-600"
          >
            <input {...getInputProps()} />
            <p>Drag & drop a photo here, or click to select one</p>
          </div>
        </div>

        {/* Image Preview Section */}
        {achievement.photo && (
          <div className="mt-4 relative">
            <img
              src={achievement.photo}
              alt="Preview"
              className="w-full max-h-80 object-cover rounded-lg transition-all"
            />
            <button
              onClick={handleDeletePhoto}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-md"
            >
              <FaTrash size={24} />
            </button>
          </div>
        )}

        {/* Photo Link Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Photo Link
          </h2>
          <input
            type="url"
            placeholder="Enter photo link"
            value={achievement.photoLink}
            onChange={(e) =>
              setAchievement({ ...achievement, photoLink: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3"
            style={{
              background: 'linear-gradient(to right, #C0A2FE, #4E2D96)', // Gradient purple
              color: 'white',
              borderRadius: '0.375rem', // Rounded-lg
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow-md
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={
              (e) =>
                (e.currentTarget.style.background =
                  'linear-gradient(to right, #5906BA, #6B0DE3)') // Hover gradient
            }
            onMouseLeave={
              (e) =>
                (e.currentTarget.style.background =
                  'linear-gradient(to right, #C0A2FE, #4E2D96)') // Reset gradient
            }
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Achievement'}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ToastContainer for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddAchievementPage;
