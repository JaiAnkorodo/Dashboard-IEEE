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

interface Achievement {
  id: number;
  name: string;
  category: string;
  date: string;
  photo?: string;
  achievement: string;
}

const getCategoryColor = (category: string = ''): string => {
  switch (category.toLowerCase()) {
    case 'international':
      return 'bg-yellow-200 text-yellow-800';
    case 'national':
      return 'bg-blue-200 text-blue-800';
    case 'campus':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('en-GB', options);
};

const AchievementPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

  useEffect(() => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      const parsedData = JSON.parse(storedAchievements);
      console.log(parsedData); // Periksa data yang diambil
      setAchievements(parsedData);
    }
  }, []);

  const filteredAchievements = achievements.filter(
    ({ name = '', category = '', achievement = '' }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedAchievements = filteredAchievements.sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      // Sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAchievements.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSortOrder = (column: 'name' | 'date') => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const deleteAchievement = (id: number) => {
    const updatedAchievements = achievements.filter(
      (achievement) => achievement.id !== id,
    );
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
    toast.success('Achievement deleted successfully!');
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="Achievement Page" />
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/add-achievements"
          className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
          style={{ background: 'linear-gradient(45deg, #C0A2FE, #4E2D96)' }}
        >
          <FaPlus className="mr-2" /> ADD ACHIEVEMENT
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search achievements..."
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
                <span>NAME</span>
                <button
                  className="ml-2 text-gray-500 dark:text-gray-300"
                  onClick={() => toggleSortOrder('name')}
                >
                  <FaSort />
                </button>
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                ACHIEVEMENT
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                CATEGORY
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <span>DATE</span>
                <button
                  className="ml-2 text-gray-500 dark:text-gray-300"
                  onClick={() => toggleSortOrder('date')}
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
            {currentItems.map((achievement, index) => (
              <tr
                key={achievement.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  {achievement.photo ? (
                    <img
                      src={achievement.photo}
                      alt={achievement.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {achievement.name}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {achievement.achievement}
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(
                      achievement.category,
                    )}`}
                  >
                    {achievement.category}
                  </span>
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {formatDate(achievement.date)}
                </td>
                <td className="py-3 px-6">
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/edit-achievements/${achievement.id}`}
                      className="text-purple-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white transition"
                    >
                      <FaPen />
                    </Link>
                    <button
                      onClick={() => deleteAchievement(achievement.id)}
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
          {[
            ...Array(Math.ceil(filteredAchievements.length / itemsPerPage)),
          ].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-600 border border-purple-600 hover:bg-purple-100 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-600 dark:hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredAchievements.length}
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

export default AchievementPage;
