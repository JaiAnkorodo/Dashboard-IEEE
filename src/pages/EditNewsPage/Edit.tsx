import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';

interface News {
  id: number;
  title: string;
  description: string;
  date: string;
  photo?: string;
}

const EditNewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [error, setError] = useState<string | null>(null);

  const newsy: News[] = [
    {
      id: 1,
      title: 'Company Meeting',
      description: 'Monthly company meeting to discuss goals.',
      date: '2024-12-14',
      photo: '',
    },
    {
      id: 2,
      title: 'Product Launch',
      description: 'Launching the new app update.',
      date: '2024-12-10',
      photo: '',
    },
  ];

  useEffect(() => {
    const newsToEdit = newsy.find((news) => news.id === Number(id));
    if (newsToEdit) {
      setNews(newsToEdit);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    if (!news?.title || !news?.description || !news?.date) {
      setError('Please fill out all fields.');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update this activity.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Activity updated:', news);
        navigate('/news ');
      }
    });
  };

  const handleCancel = () => {
    navigate('/news');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Convert the file to a URL
      setNews({ ...news, photo: fileURL });
    }
  };

  if (!news) return null;

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <div className="mb-6">
        <Breadcrumb pageName="Edit News" />
      </div>

      <div className="space-y-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Title"
          value={news.title}
          onChange={(e) => setNews({ ...news, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <textarea
          placeholder="Description"
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <input
          type="date"
          value={news.date}
          onChange={(e) => setNews({ ...news, date: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />

        {news.photo && (
          <div className="mt-4">
            <img
              src={news.photo}
              alt="Preview"
              className="max-w-full max-h-60 object-contain rounded-lg"
            />
          </div>
        )}

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Update News
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNewsPage;
