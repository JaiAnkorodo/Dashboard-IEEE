import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  status: 'draft' | 'published';
}

const EditFAQPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faq, setFAQ] = useState<FAQ | null>(null);
  const [errors, setErrors] = useState({
    question: '',
    answer: '',
  });
  const [loading, setLoading] = useState(false);

  const getFAQsFromLocalStorage = (): FAQ[] => {
    const storedFAQs = localStorage.getItem('faqs');
    return storedFAQs ? JSON.parse(storedFAQs) : [];
  };

  useEffect(() => {
    const faqs = getFAQsFromLocalStorage();
    const faqToEdit = faqs.find((faq) => faq.id === Number(id));

    if (faqToEdit) {
      setFAQ(faqToEdit);
    } else {
      navigate('/faq');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!faq?.question) newErrors.question = 'Question is required';
    if (!faq?.answer) newErrors.answer = 'Answer is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Update FAQ in localStorage
    const faqs = getFAQsFromLocalStorage();
    const updatedFAQs = faqs.map((item) => (item.id === faq?.id ? faq : item));

    localStorage.setItem('faqs', JSON.stringify(updatedFAQs));

    toast.success('FAQ updated successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    setTimeout(() => {
      navigate('/faq');
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/faq');
  };

  if (!faq) return null;

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <div className="mb-6">
        <Breadcrumb pageName="Edit FAQ" />
      </div>

      {/* Full Width Card */}
      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Question Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Question
          </h2>
          <input
            type="text"
            placeholder="Enter FAQ question"
            value={faq.question}
            onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.question && (
            <div className="text-red-500 text-sm mt-1">{errors.question}</div>
          )}
        </div>

        {/* Answer Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Answer
          </h2>
          <textarea
            placeholder="Enter FAQ answer"
            value={faq.answer}
            onChange={(e) => setFAQ({ ...faq, answer: e.target.value })}
            className="w-full p-3 min-h-[120px] border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all resize-none"
          />
          {errors.answer && (
            <div className="text-red-500 text-sm mt-1">{errors.answer}</div>
          )}
        </div>

        {/* Status Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Status
          </h2>
          <select
            value={faq.status}
            onChange={(e) =>
              setFAQ({
                ...faq,
                status: e.target.value as 'draft' | 'published',
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3"
            style={{
              background: 'linear-gradient(to right, #C0A2FE, #4E2D96)',
              color: 'white',
              borderRadius: '0.375rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #5906BA, #6B0DE3)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to right, #C0A2FE, #4E2D96)')
            }
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update FAQ'}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditFAQPage;
