import React, { useState, useEffect } from 'react';
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface News {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  photo?: string;
}

const getNewsFromLocalStorage = (): News[] => {
  const storedNews = localStorage.getItem('news');
  return storedNews ? JSON.parse(storedNews) : [];
};

const saveNewsToLocalStorage = (news: News[]) => {
  localStorage.setItem('news', JSON.stringify(news));
};

// Function to determine category color
const getCategoryColor = (category: string | undefined): string => {
  const normalizedCategory = category?.toLowerCase() || '';
  switch (normalizedCategory) {
    case 'news':
      return 'bg-blue-200 text-blue-800';
    case 'events':
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Function to format date
const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const parsedDate = new Date(date);
  const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(
    parsedDate,
  );

  // Reconstruct the date in "dd Month yyyy" format
  const day = parts.find((part) => part.type === 'day')?.value || '';
  const month = parts.find((part) => part.type === 'month')?.value || '';
  const year = parts.find((part) => part.type === 'year')?.value || '';

  return `${day} ${month} ${year}`;
};

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortDateOrder, setSortDateOrder] = useState<'asc' | 'desc'>('asc'); // For date sorting

  useEffect(() => {
    setNews(getNewsFromLocalStorage());
  }, []);

  const filteredNews = news.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortNews = (news: News[]): News[] => {
    // Sort by title
    let sortedNews = news.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    // Then sort by date
    sortedNews = sortedNews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortDateOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    return sortedNews;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortNews(filteredNews).slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleSortDateOrder = () => {
    setSortDateOrder(sortDateOrder === 'asc' ? 'desc' : 'asc');
  };

  const deleteNews = (id: number) => {
    const updatedNews = news.filter((newsItem) => newsItem.id !== id);
    setNews(updatedNews);
    saveNewsToLocalStorage(updatedNews);
    toast.success('News deleted successfully!');
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="News Page" />

      <div className="flex justify-between items-center mb-4">
        <Link
          to="/add-news"
          className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
          style={{
            background: 'linear-gradient(45deg, #C0A2FE, #4E2D96)',
          }}
        >
          <FaPlus className="mr-2" /> ADD NEWS
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search news..."
        className="p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full dark:bg-gray-800 dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                PHOTO
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <span>TITLE</span>
                <button
                  className="ml-2 text-gray-500 dark:text-gray-300"
                  onClick={toggleSortOrder}
                >
                  <FaSort />
                </button>
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                AUTHOR
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                CATEGORY
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <span>DATE</span>
                <button
                  className="ml-2 text-gray-500 dark:text-gray-300"
                  onClick={toggleSortDateOrder}
                >
                  <FaSort />
                </button>
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((newsItem, index) => (
              <tr
                key={newsItem.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  {newsItem.photo ? (
                    <img
                      src={newsItem.photo}
                      alt={newsItem.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {newsItem.title}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {newsItem.author}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(
                      newsItem.category,
                    )}`}
                  >
                    {newsItem.category}
                  </span>
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {formatDate(newsItem.date)}
                </td>
                <td className="py-3 px-6">
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/edit-news/${newsItem.id}`}
                      className="text-purple-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white transition"
                    >
                      <FaPen />
                    </Link>
                    <button
                      onClick={() => deleteNews(newsItem.id)}
                      className="text-purple-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-600 dark:hover:text-white transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.ceil(filteredNews.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-600 border border-purple-600 hover:bg-purple-100 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-600 dark:hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            ),
          )}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredNews.length}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewsPage;
