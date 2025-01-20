import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface News {
  id: number;
  title: string;
  description: string;
  date: Date;
  category: string;
  photo?: string;
  author?: string;
  link?: string;
  status: 'draft' | 'published';
}

const AddNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<News>({
    id: Date.now(),
    title: '',
    description: '',
    date: new Date(),
    category: '',
    author: '',
    link: '',
    status: 'draft',
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (
        fileType !== 'image/jpeg' &&
        fileType !== 'image/png' &&
        fileType !== 'image/jpg' &&
        file.type !== 'image/webp'
      ) {
        toast.error('Only PNG, JPEG, JPG, and WEBP images are allowed!');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setNews({ ...news, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setNews({ ...news, photo: undefined });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!news.title) newErrors.title = 'Title is required';
    if (!news.description) newErrors.description = 'Description is required';
    if (!news.date) newErrors.date = 'Date is required';
    if (!news.author) newErrors.author = 'Author is required';
    if (!news.photo) newErrors.photo = 'Image is required';
    if (!news.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSaveNews = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newNews = {
      ...news,
      date: news.date.toISOString().split('T')[0],
    };

    const storedNews = localStorage.getItem('news');
    const newsList = storedNews ? JSON.parse(storedNews) : [];
    localStorage.setItem('news', JSON.stringify([...newsList, newNews]));

    toast.success('News added successfully!');
    setTimeout(() => {
      navigate('/news');
    }, 1000);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['image'],
    ],
  };

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Add News" />

      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Form for News */}
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
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          >
            <option value="">Select Category</option>
            <option value="News">News</option>
            <option value="Events">Events</option>
          </select>
          {errors.category && (
            <div className="text-red-500 text-sm mt-1">{errors.category}</div>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={news.status}
            onChange={(e) => setNews({ ...news, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Image */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4">
          {news.photo ? (
            <div className="relative">
              <img
                src={news.photo}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
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

        {/* Date */}
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

        {/* Description */}
        <div className="space-y-4 mb-4">
          <ReactQuill
            value={news.description}
            onChange={(content) => setNews({ ...news, description: content })}
            placeholder="Enter content here..."
            modules={modules}
            className="border p-4 rounded-md w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 overflow-auto"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end space-x-6 mt-8">
          <button
            onClick={handleSaveNews}
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
            Add News
          </button>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddNewsPage;
