import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface News {
  id: number;
  title: string;
  description: string;
  date: string;
  photo?: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([
    {
      id: 1,
      title: 'New Office Opened',
      description: 'We have opened a new office in Jakarta.',
      date: '2024-12-01',
      photo: '',
    },
    {
      id: 2,
      title: 'Annual Report Published',
      description: 'Our annual report for 2023 is now available.',
      date: '2024-11-30',
      photo: '',
    },
    {
      id: 3,
      title: 'Partnership Announcement',
      description: 'We are now partnering with XYZ Corporation.',
      date: '2024-11-25',
      photo: '',
    },
  ]);

  const [filterType, setFilterType] = useState<'date' | 'title' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setNews((prev) => prev.filter((article) => article.id !== id));
        Swal.fire('Deleted!', 'The news has been deleted.', 'success');
      }
    });
  };

  const sortedNews = () => {
    const sorted = [...news];

    if (filterType === 'title') {
      return sorted.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    if (filterType === 'date') {
      return sorted.sort((a, b) => {
        const comparison =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return sorted;
  };

  const filteredNews = sortedNews();

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="News" />

      <div className="mb-6 flex justify-between">
        <Link
          to="/add-news"
          className="flex items-center px-4 py-2 bg-[#6B0DE3] text-white rounded-lg shadow-md hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900"
        >
          <FaPlus className="mr-2" />
          Add New News
        </Link>
      </div>

      <div className="flex space-x-6 mb-6 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 dark:text-gray-300">Filter By:</label>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as 'date' | 'title' | '')
            }
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Filter</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-gray-600 dark:text-gray-300">
            Sort Order:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-light-border dark:border-dark-border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                #
              </th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                Title
              </th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                Description
              </th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                Date
              </th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                Photo
              </th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white">
            {filteredNews.map((article, index) => (
              <tr key={article.id} className="bg-white dark:bg-gray-800">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{article.title}</td>
                <td className="border px-4 py-2 break-words">
                  {article.description}
                </td>
                <td className="border px-4 py-2">{article.date}</td>
                <td className="border px-4 py-2">
                  {article.photo?.trim() ? (
                    <img
                      src={article.photo}
                      alt="News"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    'No photo'
                  )}
                </td>
                <td className="border px-4 py-2 flex items-center space-x-2">
                  <Link
                    to={`/edit-news/${article.id}`}
                    className="flex items-center px-3 py-1 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                  >
                    <FaPen className="mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsPage;
