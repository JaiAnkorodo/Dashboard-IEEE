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

interface Activity {
  id: number;
  title: string;
  date: string;
  photo: string;
}

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('en-GB', options);
};

const RecentActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'title' | 'date'>('title');

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  const filteredActivities = activities.filter(({ title = '' }) =>
    title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedActivities = filteredActivities.sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedActivities.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSortOrder = (column: 'title' | 'date') => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const deleteActivity = (id: number) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id,
    );
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    toast.success('Activity deleted successfully!');
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="Recent Activities" />
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/add-activity"
          className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
          style={{ background: 'linear-gradient(45deg, #C0A2FE, #4E2D96)' }}
        >
          <FaPlus className="mr-2" /> ADD ACTIVITY
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search activities..."
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
                  onClick={() => toggleSortOrder('title')}
                >
                  <FaSort />
                </button>
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                DATE
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
            {currentItems.map((activity, index) => (
              <tr
                key={activity.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-3 px-6">
                  {activity.photo ? (
                    <img
                      src={activity.photo}
                      alt={activity.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {activity.title}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white whitespace-nowrap">
                  {formatDate(activity.date)}
                </td>
                <td className="py-3 px-6">
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/edit-activity/${activity.id}`}
                      className="text-purple-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white transition"
                    >
                      <FaPen />
                    </Link>
                    <button
                      onClick={() => deleteActivity(activity.id)}
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
          {[...Array(Math.ceil(filteredActivities.length / itemsPerPage))].map(
            (_, index) => (
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
            ),
          )}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredActivities.length / itemsPerPage)
            }
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

export default RecentActivitiesPage;
