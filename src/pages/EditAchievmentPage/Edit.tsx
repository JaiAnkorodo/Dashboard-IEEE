import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2';

interface Achievment {
  id: number;
  title: string;
  description: string;
  date: string;
  photo?: string;
}

const EditAchievmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [achievment, setAchievment] = useState<Achievment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const achievments: Achievment[] = [
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
  ];

  useEffect(() => {
    const achievmentToEdit = achievments.find(
      (achievment) => achievment.id === Number(id),
    );
    if (achievmentToEdit) {
      setAchievment(achievmentToEdit);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    if (!achievment?.title || !achievment?.description || !achievment?.date) {
      setError('Please fill out all fields.');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update this achievment.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Achievment updated:', achievment);
        navigate('/Achievment ');
      }
    });
  };

  const handleCancel = () => {
    navigate('/Achievment');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAchievment({ ...achievment, photo: fileURL });
    }
  };

  if (!achievment) return null;

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <div className="mb-6">
        <Breadcrumb pageName="Edit Achievment" />
      </div>

      <div className="space-y-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Title"
          value={achievment.title}
          onChange={(e) =>
            setAchievment({ ...achievment, title: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <textarea
          placeholder="Description"
          value={achievment.description}
          onChange={(e) =>
            setAchievment({ ...achievment, description: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <input
          type="date"
          value={achievment.date}
          onChange={(e) =>
            setAchievment({ ...achievment, date: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600"
        />

        {achievment.photo && (
          <div className="mt-4">
            <img
              src={achievment.photo}
              alt="Preview"
              className="max-w-full max-h-60 object-contain rounded-lg"
            />
          </div>
        )}

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#6B0DE3] text-white rounded-lg shadow-md hover:bg-[#6B0DE3] dark:bg-[#6B0DE3] dark:hover:bg-[#6B0DE3]0"
          >
            Update Achievment
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAchievmentPage;
