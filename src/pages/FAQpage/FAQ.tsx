import React, { useState, useEffect } from 'react';
import {
  FaPen,
  FaTrash,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaCheck,
  FaChevronDown,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  status: 'draft' | 'published';
}

const getStatusColor = (status: 'draft' | 'published') => {
  return status === 'published'
    ? 'bg-green-500 text-white'
    : 'bg-yellow-500 text-white';
};

const FAQPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState<string[]>([
    'draft',
    'published',
  ]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedFaqs = localStorage.getItem('faqs');
    if (storedFaqs) {
      const parsedFaqs = JSON.parse(storedFaqs);
      setFaqs(sortFaqs(parsedFaqs, sortOrder));
    }
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortFaqs = (faqs: FAQ[], order: 'asc' | 'desc'): FAQ[] => {
    return faqs.sort((a, b) => {
      const questionA = a.question.toLowerCase();
      const questionB = b.question.toLowerCase();

      if (order === 'asc') {
        return questionA.localeCompare(questionB);
      } else {
        return questionB.localeCompare(questionA);
      }
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.getElementById('status-dropdown');
    if (dropdown && !dropdown.contains(e.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredFaqs = faqs.filter(({ question = '', status }) => {
    const matchesStatus = statusFilter.includes(status);
    return (
      question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      matchesStatus
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteFaq = (id: number) => {
    if (!toast.isActive('delete-notification')) {
      toast.info(
        <div>
          <p>Are you sure you want to delete this FAQ?</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                const faqToDelete = faqs.find((faq) => faq.id === id);
                if (!faqToDelete) return;

                const updatedFaqs = faqs.filter((faq) => faq.id !== id);
                setFaqs(updatedFaqs);
                localStorage.setItem('faqs', JSON.stringify(updatedFaqs));

                const trash = JSON.parse(localStorage.getItem('trash') || '[]');
                trash.push({ ...faqToDelete, type: 'faq' });
                localStorage.setItem('trash', JSON.stringify(trash));

                toast.dismiss();
                toast.success('FAQ moved to trash successfully!');
              }}
              className="px-3 py-1 bg-red-600 text-white rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="px-3 py-1 bg-gray-300 text-gray-900 rounded"
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

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="FAQ Page" />
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Link
            to="/add-faq"
            className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #C0A2FE, #4E2D96)' }}
          >
            <FaPlus className="mr-2" /> ADD FAQ
          </Link>

          <div className="relative">
            <button
              onClick={() => setDropdownVisible(!isDropdownVisible)}
              className="flex items-center text-gray-700 rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-md"
              style={{
                backgroundColor: '#f5f5f5',
                border: '2px solid #dcdcdc',
                outline: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a1a1a1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#dcdcdc';
              }}
            >
              <FaChevronDown className="mr-2" />
              Status
            </button>

            {isDropdownVisible && (
              <div
                id="status-dropdown"
                className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-4"
              >
                <label className="flex items-center space-x-3 mb-4 w-full">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes('draft')}
                    onChange={(e) => {
                      const updatedFilter = e.target.checked
                        ? [...statusFilter, 'draft']
                        : statusFilter.filter((status) => status !== 'draft');
                      setStatusFilter(updatedFilter);
                    }}
                    className="hidden"
                  />
                  <span
                    className={`inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                      statusFilter.includes('draft')
                        ? 'bg-yellow-500 shadow-lg scale-105 hover:scale-110 hover:bg-yellow-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    <FaPen className="mr-2" />
                    Draft
                  </span>
                </label>
                <label className="flex items-center space-x-3 w-full">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes('published')}
                    onChange={(e) => {
                      const updatedFilter = e.target.checked
                        ? [...statusFilter, 'published']
                        : statusFilter.filter(
                            (status) => status !== 'published',
                          );
                      setStatusFilter(updatedFilter);
                    }}
                    className="hidden"
                  />
                  <span
                    className={`inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out transform ${
                      statusFilter.includes('published')
                        ? 'bg-green-500 shadow-lg scale-105 hover:scale-110 hover:bg-green-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    <FaCheck className="mr-2" />
                    Published
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search FAQs..."
        className="p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full dark:bg-gray-800 dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  <span>QUESTION</span>
                  <button
                    className="ml-2 text-gray-500 dark:text-gray-300"
                    onClick={toggleSortOrder}
                  >
                    <FaSort />
                  </button>
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  ANSWER
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  STATUS
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((faq, index) => (
                <tr
                  key={faq.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-6 text-gray-900 dark:text-white">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="py-3 px-6 text-gray-900 dark:text-white">
                    {faq.question}
                  </td>
                  <td className="py-3 px-6 text-gray-900 dark:text-white">
                    {faq.answer}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full ${getStatusColor(faq.status)}`}
                    >
                      {faq.status.charAt(0).toUpperCase() + faq.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex justify-center items-center space-x-2">
                      <Link
                        to={`/faq/${faq.id}`}
                        className="text-purple-600 p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white transition"
                      >
                        <FaPen />
                      </Link>
                      <button
                        onClick={() => deleteFaq(faq.id)}
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.ceil(filteredFaqs.length / itemsPerPage))].map(
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
              currentPage === Math.ceil(filteredFaqs.length / itemsPerPage)
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

export default FAQPage;
