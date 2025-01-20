import React, { useState, useEffect } from 'react';
import {
  FaTrashRestore,
  FaTrashAlt,
  FaSearch,
  FaSort,
  FaCheckSquare,
  FaRegSquare,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface TrashItem {
  id: number;
  title?: string;
  name?: string;
  question?: string;
  type: 'news' | 'achievement' | 'activity' | 'faq';
}

const TrashPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const storedTrash = JSON.parse(localStorage.getItem('trash') || '[]');
    const validatedTrash = storedTrash.filter(
      (item: TrashItem) =>
        item.type &&
        ['news', 'achievement', 'activity', 'faq'].includes(item.type),
    );
    setTrashItems(validatedTrash);
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredItems = trashItems.filter((item) => {
    const searchText = (
      item.title ||
      item.name ||
      item.question ||
      ''
    ).toLowerCase();
    return searchText.includes(searchQuery.toLowerCase());
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a.type === 'achievement' ? a.name : a.title;
    const bValue = b.type === 'achievement' ? b.name : b.title;
    if (aValue && bValue) {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const getTargetKey = (
    type: 'news' | 'achievement' | 'activity' | 'faq',
  ): string => {
    switch (type) {
      case 'news':
        return 'news';
      case 'achievement':
        return 'achievements';
      case 'activity':
        return 'activities';
      case 'faq':
        return 'faqs';
      default:
        return '';
    }
  };

  const confirmAction = (
    action: () => void,
    message: string,
    buttonColor: string,
  ) => {
    if (!toast.isActive('delete-notification')) {
      toast.info(
        <div>
          <p>{message}</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                action();
                setTimeout(() => {
                  toast.success('Action completed successfully!', {
                    toastId: 'action-completed',
                  });
                }, 500);
                toast.dismiss('delete-notification');
              }}
              className={`px-4 py-2 text-white rounded-md mr-2 ${buttonColor}`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss('delete-notification');
              }}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md"
            >
              No
            </button>
          </div>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
          toastId: 'delete-notification',
        },
      );
    }
  };

  const restoreItems = (itemId?: number) => {
    const itemsToRestore = itemId ? [itemId] : Array.from(selectedItems);
    if (itemsToRestore.length === 0) return;

    confirmAction(
      () => {
        const updatedTrash = trashItems.filter(
          (item) => !itemsToRestore.includes(item.id),
        );
        setTrashItems(updatedTrash);
        localStorage.setItem('trash', JSON.stringify(updatedTrash));

        itemsToRestore.forEach((id) => {
          const itemToRestore = trashItems.find((item) => item.id === id);
          if (!itemToRestore) return;

          const targetKey = getTargetKey(itemToRestore.type);
          const targetItems = JSON.parse(
            localStorage.getItem(targetKey) || '[]',
          );
          targetItems.push(itemToRestore);
          localStorage.setItem(targetKey, JSON.stringify(targetItems));
        });

        setSelectedItems(new Set());
      },
      `You are about to restore ${itemsToRestore.length} item(s).`,
      'bg-green-600',
    );
  };

  const deleteItemsPermanently = (itemId?: number) => {
    const itemsToDelete = itemId ? [itemId] : Array.from(selectedItems);
    if (itemsToDelete.length === 0) return;

    confirmAction(
      () => {
        const updatedTrash = trashItems.filter(
          (item) => !itemsToDelete.includes(item.id),
        );
        setTrashItems(updatedTrash);
        localStorage.setItem('trash', JSON.stringify(updatedTrash));

        setSelectedItems(new Set());
      },
      `You are about to permanently delete ${itemsToDelete.length} item(s).`,
      'bg-red-600',
    );
  };

  const handleSelectItem = (id: number) => {
    const updatedSelectedItems = new Set(selectedItems);
    if (updatedSelectedItems.has(id)) {
      updatedSelectedItems.delete(id);
    } else {
      updatedSelectedItems.add(id);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === trashItems.length) {
      setSelectedItems(new Set());
    } else {
      const allItemIds = trashItems.map((item) => item.id);
      setSelectedItems(new Set(allItemIds));
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="Trash Page" />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded w-full dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="ml-2 text-gray-500 dark:text-gray-300" />
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <button
              onClick={() => restoreItems()}
              className="px-4 py-2 bg-green-600 text-white rounded mr-4 disabled:opacity-50"
              disabled={selectedItems.size === 0}
            >
              <FaTrashRestore />
            </button>
            <button
              onClick={() => deleteItemsPermanently()}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              disabled={selectedItems.size === 0}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full w-full bg-white dark:bg-gray-800 table-auto">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  <button
                    onClick={handleSelectAll}
                    className="text-gray-500 dark:text-gray-300"
                  >
                    {selectedItems.size === trashItems.length ? (
                      <FaCheckSquare />
                    ) : (
                      <FaRegSquare />
                    )}
                  </button>
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  <span>TITLE/NAME</span>
                  <button
                    className="ml-2 text-gray-500 dark:text-gray-300"
                    onClick={toggleSortOrder}
                  >
                    <FaSort />
                  </button>
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  TYPE
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-6 text-sm text-gray-900 dark:text-white">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 dark:text-white">
                    {item.type === 'achievement'
                      ? item.name
                      : item.type === 'faq'
                        ? item.question
                        : item.title}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 dark:text-white">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => restoreItems(item.id)}
                      className="text-green-500 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-600 dark:hover:text-white transition"
                      title="Restore Item"
                    >
                      <FaTrashRestore />
                    </button>
                    <button
                      onClick={() => deleteItemsPermanently(item.id)}
                      className="text-red-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-600 dark:hover:text-white transition"
                      title="Delete Permanently"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
          />
        </div>
      </div>
    </div>
  );
};

export default TrashPage;
