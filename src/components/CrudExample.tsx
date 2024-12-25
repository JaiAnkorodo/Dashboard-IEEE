import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface Item {
  id: number;
  name: string;
}

const CrudExample = () => {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = () => {
    if (editingId !== null) {
      // Edit item
      setItems(
        items.map((item) => (item.id === editingId ? { ...item, name } : item)),
      );
      setEditingId(null);
    } else {
      // Add new item
      setItems([...items, { id: Date.now(), name }]);
    }
    setName('');
  };

  const handleEdit = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setName(item.name);
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>CRUD Example</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>{editingId ? 'Edit' : 'Add'}</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudExample;
