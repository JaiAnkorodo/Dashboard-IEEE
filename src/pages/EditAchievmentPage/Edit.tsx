import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaTrash } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const EditAchievementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    achievement: '',
    link: '',
    date: '',
    category: '',
    photoLink: '',
  });
  const [loading, setLoading] = useState(false);

  const getAchievementsFromLocalStorage = (): Achievement[] => {
    const storedAchievements = localStorage.getItem('achievements');
    return storedAchievements ? JSON.parse(storedAchievements) : [];
  };

  useEffect(() => {
    const achievements = getAchievementsFromLocalStorage();
    const achievementToEdit = achievements.find(
      (achievement) => achievement.id === Number(id),
    );

    if (achievementToEdit) {
      setAchievement(achievementToEdit);
    } else {
      navigate('/achievements');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!achievement?.name) newErrors.name = 'Name is required';
    if (!achievement?.achievement)
      newErrors.achievement = 'Achievement is required';
    if (!achievement?.link) newErrors.link = 'Link is required';
    if (!achievement?.date) newErrors.date = 'Date is required';
    if (!achievement?.category) newErrors.category = 'Category is required';
    if (!achievement?.photoLink) newErrors.photoLink = 'Photo link is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Store achievements with the base64 photo string
    const achievements = getAchievementsFromLocalStorage();
    const updatedAchievements = achievements.map((ach) =>
      ach.id === achievement?.id ? achievement : ach,
    );

    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));

    toast.success('Achievement updated successfully!', {
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
    if (achievement) {
      setAchievement({ ...achievement, photo: undefined });
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Check if the file type is either PNG or JPEG
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
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
        return;
      }

      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;

        // Update the state with the base64 image
        if (achievement) {
          setAchievement({ ...achievement, photo: base64Image });
        }
      };

      // Read the file as a Data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/jpeg, image/png',
  });

  if (!achievement) return null;

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <div className="mb-6">
        <Breadcrumb pageName="Edit Achievement" />
      </div>

      {/* Kartu Full Width */}
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
            placeholder="Enter achievement description"
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

        {/* Link Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Link
          </h2>
          <input
            type="url"
            placeholder="Enter link to achievement"
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
            selected={new Date(achievement.date)}
            onChange={(date: Date) =>
              setAchievement({ ...achievement, date: date.toISOString() })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
            dateFormat="yyyy-MM-dd"
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
            <option value="international">International</option>
            <option value="national">National</option>
            <option value="campus">Campus</option>
          </select>
          {errors.category && (
            <div className="text-red-500 text-sm mt-1">{errors.category}</div>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Upload Image(JPEG/PNG)
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
            Photo Link (URL)
          </h2>
          <input
            type="url"
            placeholder="Enter URL for photo link"
            value={achievement.photoLink || ''}
            onChange={(e) =>
              setAchievement({ ...achievement, photoLink: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.photoLink && (
            <div className="text-red-500 text-sm mt-1">{errors.photoLink}</div>
          )}
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #5906BA, #6B0DE3)')
            } // Hover effect
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #C0A2FE, #4E2D96)')
            } // Reset effect
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Achievement'}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAchievementPage;
