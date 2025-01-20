import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';

const DropdownUser = () => {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-4 p-2 rounded-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-900"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-gray-800 dark:text-white">
            {user.name}
          </span>
          <span className="block text-xs font-medium text-gray-800 dark:text-white">
            IEEE SB | IT
          </span>
        </span>
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={user.photo}
            alt="User"
            className="object-cover w-full h-full"
          />
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-300 dark:ring-gray-600">
          <ul className="py-2">
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg transition-all"
                onClick={closeDropdown}
              >
                <FaCog className="text-lg" />
                Settings
              </Link>
            </li>
          </ul>
          <button
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white rounded-lg transition-all"
            onClick={closeDropdown}
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
