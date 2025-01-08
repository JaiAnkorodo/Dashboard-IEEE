import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const LogPage: React.FC = () => {
  const logs = [
    {
      id: 1,
      message: 'User John updated profile',
      timestamp: '2024-12-15 10:30 AM',
    },
    {
      id: 2,
      message: 'Admin added new product',
      timestamp: '2024-12-14 02:45 PM',
    },
    {
      id: 3,
      message: 'User Alice signed up',
      timestamp: '2024-12-14 01:20 PM',
    },
    {
      id: 4,
      message: 'Order #1234 was completed',
      timestamp: '2024-12-13 09:15 AM',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Filter logs berdasarkan input
  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Breadcrumb pageName="Log" />
      <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">
            Activity Log
          </h1>
          {/* Filter Input */}
          <div className="relative w-full mb-6">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-[#6B0DE3]"
            />
          </div>
          {/* Log List */}
          <ul className="space-y-4">
            {filteredLogs.length > 0 ? (
              filteredLogs.map(({ id, message, timestamp }) => (
                <li
                  key={id}
                  className="border border-light-border dark:border-dark-border rounded-lg bg-light-surface dark:bg-dark-surface p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <p className="font-medium text-lg text-black dark:text-white">
                    {message}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {timestamp}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-black dark:text-white text-center">
                No logs found
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogPage;
