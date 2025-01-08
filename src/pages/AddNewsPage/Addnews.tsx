import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaTrash } from 'react-icons/fa'; // Import FaTrash
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import Date Picker styles
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

interface News {
  id: number;
  title: string;
  description: string;
  date: Date;
  category: string;
  photo?: string;
  author?: string;
  link?: string; // Add link property
}

const AddNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<News>({
    id: Date.now(),
    title: '',
    description: '',
    date: new Date(),
    category: 'News', // Default category
    author: '',
    link: '', // Initialize link as empty string
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errors, setErrors] = useState<any>({}); // Track validation errors

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  // Handle image upload with validation
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;

      // Check if file type is JPEG, PNG, or JPG
      if (
        fileType !== 'image/jpeg' &&
        fileType !== 'image/png' &&
        fileType !== 'image/jpg'
      ) {
        toast.error('Only JPG, JPEG, and PNG images are allowed!');
        return; // Prevent file upload if the file type is invalid
      }

      const reader = new FileReader();
      reader.onload = () => {
        setNews({ ...news, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image deletion
  const handleImageDelete = () => {
    setNews({ ...news, photo: undefined });
  };

  // Form validation logic with image validation
  const validateForm = () => {
    const newErrors: any = {};
    if (!news.title) newErrors.title = 'Title is required';
    if (!news.description) newErrors.description = 'Description is required';
    if (!news.date) newErrors.date = 'Date is required';
    if (!news.author) newErrors.author = 'Author is required';
    if (!news.photo) newErrors.photo = 'Image is required'; // Ensure image is uploaded
    return newErrors;
  };

  // Save news logic with form validation and toast alert
  const handleSaveNews = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newNews = {
      ...news,
      date: news.date.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
    };

    const storedNews = localStorage.getItem('news');
    const newsList = storedNews ? JSON.parse(storedNews) : [];
    localStorage.setItem('news', JSON.stringify([...newsList, newNews]));

    // Show success toast
    toast.success('News added successfully!');

    // Add a delay before navigating
    setTimeout(() => {
      navigate('/news');
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  };

  // Custom toolbar configuration with image option
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['image'], // Adding image button
    ],
  };

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Add News" />

      {/* White Card for Input Fields */}
      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
            placeholder="Title"
            className="w-full text-3xl font-semibold bg-transparent focus:outline-none dark:text-gray-300 border-b-2 dark:border-gray-600"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title}</p>
          )}
        </div>

        {/* Link */}
        <div className="mb-4">
          <input
            type="url"
            value={news.link || ''}
            onChange={(e) => setNews({ ...news, link: e.target.value })}
            placeholder="Link (optional)"
            className="w-full text-lg bg-transparent focus:outline-none dark:text-gray-300 border-b-2 dark:border-gray-600"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={news.category}
            onChange={(e) => setNews({ ...news, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="News">News</option>
            <option value="Events">Events</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4">
          {news.photo ? (
            <div className="relative">
              <img
                src={news.photo}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              {/* Trash Icon to delete the image */}
              <button
                onClick={handleImageDelete}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
              >
                <FaTrash size={20} className="text-red-500" />
              </button>
            </div>
          ) : (
            <label className="w-full h-full flex items-center justify-center cursor-pointer">
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
              />
            </label>
          )}
          {errors.photo && (
            <p className="text-red-500 text-sm mt-2">{errors.photo}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <input
            type="text"
            value={news.author}
            onChange={(e) => setNews({ ...news, author: e.target.value })}
            placeholder="Author"
            className="w-full text-lg bg-transparent focus:outline-none dark:text-gray-300 border-b-2 dark:border-gray-600"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-2">{errors.author}</p>
          )}
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <DatePicker
            selected={news.date}
            onChange={(date) => setNews({ ...news, date: date! })}
            dateFormat="yyyy-MM-dd"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-2">{errors.date}</p>
          )}
        </div>

        {/* Content Block (React Quill Editor with Custom Toolbar) */}
        <div className="space-y-4 mb-4">
          <ReactQuill
            value={news.description}
            onChange={(content) => setNews({ ...news, description: content })}
            placeholder="Enter content here..."
            modules={modules}
            className="border p-4 rounded-md w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-6 mt-8">
        <button
          onClick={handleSaveNews}
          className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#C0A2FE] to-[#4E2D96] text-white rounded-lg shadow-md hover:from-[#4E2D96] hover:to-[#C0A2FE] transition-all"
        >
          Add News
        </button>
        <button
          onClick={() => navigate('/news')}
          className="px-8 py-3 text-lg font-semibold bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition-all"
        >
          Cancel
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </div>
  );
};

export default AddNewsPage;
