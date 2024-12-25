import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface News {
  id: number;
  title: string;
  description: string;
  date: string;
  photo?: string;
}

const getNewsFromLocalStorage = (): News[] => {
  const storedNews = localStorage.getItem('news');
  return storedNews ? JSON.parse(storedNews) : [];
};

const saveNewsToLocalStorage = (news: News[]) => {
  localStorage.setItem('news', JSON.stringify(news));
};

const useFilteredNews = (
  news: News[],
  filterType: string,
  sortOrder: string,
  searchQuery: string,
) => {
  return useMemo(() => {
    let sorted = [...news];

    if (searchQuery) {
      sorted = sorted.filter(
        (newsItem) =>
          newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          newsItem.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (filterType === 'title') {
      sorted.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    } else if (filterType === 'date') {
      sorted.sort((a, b) => {
        const comparison =
          new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return sorted;
  }, [news, filterType, sortOrder, searchQuery]);
};

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [filterType, setFilterType] = useState<'date' | 'title' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default value for items per page
  const itemsPerPageOptions = [5, 25, 50, 100];

  useEffect(() => {
    setNews(getNewsFromLocalStorage());
  }, []);

  const handleDelete = () => {
    if (selectedNewsId !== null) {
      const updatedNews = news.filter(
        (newsItem) => newsItem.id !== selectedNewsId,
      );
      setNews(updatedNews);
      saveNewsToLocalStorage(updatedNews);
      toast.success('News deleted successfully!');
      setIsModalOpen(false);
    }
  };

  const filteredNews = useFilteredNews(
    news,
    filterType,
    sortOrder,
    searchQuery,
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="News" />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="mb-6 flex justify-between">
          <Link
            to="/add-news"
            className="flex items-center px-4 py-2 bg-[#6B0DE3] text-white rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <FaPlus className="mr-2" />
            Add New News
          </Link>
        </div>

        {/* Search Section */}
        <input
          type="text"
          placeholder="Search news..."
          className="p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter and Sort Section */}
        <div className="flex space-x-6 mb-6 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 dark:text-gray-300">
              Filter By:
            </label>
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as 'date' | 'title' | '')
              }
              className="p-2 border border-gray-400 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B0DE3] transition-all duration-300"
            >
              <option value="">Select Filter</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-gray-700 dark:text-gray-300">
              Sort Order:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="p-2 border border-gray-400 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B0DE3] transition-all duration-300"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Dropdown for Items per Page */}
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 dark:text-gray-300">
              Items per Page:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 border border-gray-400 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B0DE3] transition-all duration-300"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-light-border dark:border-dark-border">
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
              {currentItems.map((newsItem, index) => (
                <tr
                  key={newsItem.id}
                  className="bg-white dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{newsItem.title}</td>
                  <td className="border px-4 py-2 break-words">
                    {newsItem.description}
                  </td>
                  <td className="border px-4 py-2">{newsItem.date}</td>
                  <td className="border px-4 py-2">
                    {newsItem.photo?.trim() ? (
                      <img
                        src={newsItem.photo}
                        alt="News"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-400 dark:border-gray-600 shadow-md"
                      />
                    ) : (
                      'No photo'
                    )}
                  </td>
                  <td className="border-t border-gray-300 dark:border-dark-border px-4 py-2 flex justify-center space-x-4">
                    <Link
                      to={`/edit-activity/${newsItem.id}`}
                      className="flex items-center px-3 py-1 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-all duration-200"
                    >
                      <FaPen className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedNewsId(newsItem.id);
                      }}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-gray-700 dark:text-gray-300">
            Showing {indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredNews.length)} of{' '}
            {filteredNews.length} news
          </div>
          <div className="space-x-2">
            {Array.from({
              length: Math.ceil(filteredNews.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-[#6B0DE3] text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">
              Are you sure you want to delete this news?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default NewsPage;
