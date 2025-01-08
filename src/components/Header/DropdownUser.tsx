import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import UserOne from '../../images/user/asep.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  return (
    <ClickOutside onClick={closeDropdown} className="relative">
      <button onClick={toggleDropdown} className="flex items-center gap-4">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Asep Jamaludin
          </span>
          <span className="block text-xs">IEEE SB | IT</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.41 0.91a1.1 1.1 0 011.58 0L6 5.32l4.41-4.41a1.1 1.1 0 111.58 1.58L6.59 7.09a1.1 1.1 0 01-1.58 0L0.41 2.49a1.1 1.1 0 010-1.58z" />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-64 flex-col rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-purple-600 lg:text-base"
              >
                <FaCog className="text-lg" />
                Settings
              </Link>
            </li>
          </ul>
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:text-base">
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
