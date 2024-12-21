import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface Achievment {
  id: number;
  title: string;
  description: string;
  date: string;
  photo?: string;
}

const AchievmentPage: React.FC = () => {
  const [achievment, setAchievment] = useState<Achievment[]>([
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
    {
      id: 3,
      title: 'Team Outing',
      description: 'Team building achievment.',
      date: '2024-12-12',
      photo: '',
    },
  ]);

  const [filterType, setFilterType] = useState<'date' | 'title' | ''>(''); // Filter by type (date or title)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sort order (A-Z or latest)

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
        setAchievment((prev) =>
          prev.filter((achievment) => achievment.id !== id),
        );
        Swal.fire('Deleted!', 'The achievment has been deleted.', 'success');
      }
    });
  };

  // Function for sorting achievment based on title or date
  const sortedAchievment = () => {
    const sorted = [...achievment];

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

  const filteredAchievment = sortedAchievment();
  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Achievment" />

      {/* Add New Button */}
      <div className="mb-6 flex justify-between">
        <Link
          to="/add-achievment"
          className="flex items-center px-4 py-2 bg-[#6B0DE3] text-white rounded-lg shadow-md hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-900"
        >
          <FaPlus className="mr-2" />
          Add New Achievment
        </Link>
      </div>

      {/* Filter Section */}
      <div className="flex space-x-6 mb-6 items-center">
        {/* Filter Type */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 dark:text-gray-300">Filter By:</label>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as 'date' | 'title' | '')
            }
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B0DE3]"
          >
            <option value="">Select Filter</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 dark:text-gray-300">
            Sort Order:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B0DE3]"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-light-border dark:border-dark-border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                #
              </th>
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                Title
              </th>
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                Description
              </th>
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                Date
              </th>
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                Photo
              </th>
              <th className="border border-light-border dark:border-dark-border px-4 py-2 text-left text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white">
            {filteredAchievment.map((achievment, index) => (
              <tr key={achievment.id} className="bg-white dark:bg-gray-800">
                <td className="border border-light-border dark:border-dark-border px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-light-border dark:border-dark-border px-4 py-2">
                  {achievment.title}
                </td>
                <td className="border border-light-border dark:border-dark-border px-4 py-2 break-words">
                  {achievment.description}
                </td>
                <td className="border border-light-border dark:border-dark-border px-4 py-2">
                  {achievment.date}
                </td>
                <td className="border border-light-border dark:border-dark-border px-4 py-2">
                  {achievment.photo?.trim() ? (
                    <img
                      src={achievment.photo}
                      alt="Achievment"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    'No photo'
                  )}
                </td>
                <td className="border border-light-border dark:border-dark-border px-4 py-2 flex items-center space-x-2">
                  <Link
                    to={`/edit-achievment/${achievment.id}`}
                    className="flex items-center px-3 py-1 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                  >
                    <FaPen className="mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(achievment.id)} // Trigger SweetAlert on click
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

export default AchievmentPage;
