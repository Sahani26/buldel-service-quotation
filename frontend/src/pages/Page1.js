import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page1 = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [services, setServices] = useState([]);

  // ✅ Inline edit states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  // ✅ Selected services
  const [selectedIds, setSelectedIds] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/services`);
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, [apiUrl]);

  // Add service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/services`, {
        name,
        amount: Number(amount),
      });

      setServices((prev) => [...prev, response.data]);
      setName('');
      setAmount('');
    } catch (error) {
      console.error(error);
      alert('Error adding service');
    }
  };

  // Delete single
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting service');
    }
  };

  // ✅ Toggle checkbox
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ Delete selected
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert('No services selected');
      return;
    }

    const confirmDelete = window.confirm('Delete selected services?');
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`${apiUrl}/services/${id}`)
        )
      );

      setServices((prev) =>
        prev.filter((s) => !selectedIds.includes(s._id))
      );

      setSelectedIds([]);
      alert('Selected services deleted');
    } catch (error) {
      console.error(error);
      alert('Error deleting selected');
    }
  };

  // Edit start
  const handleEdit = (service) => {
    setEditId(service._id);
    setEditName(service.name);
    setEditAmount(service.amount);
  };

  // Update
  const handleUpdate = async (id) => {
    if (editName.trim() === '' || editAmount === '') {
      alert('Fields cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/services/${id}`, {
        name: editName,
        amount: Number(editAmount),
      });

      setServices((prev) =>
        prev.map((item) =>
          item._id === id ? response.data : item
        )
      );

      setEditId(null);
    } catch (error) {
      console.error(error);
      alert('Error updating');
    }
  };

  return (
    <div className='page1'>
      <h1 className='page1-title'>Service Form</h1>

      <form className='service-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-label'>Service Name:</label>
          <input
            type="text"
            className='form-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-label'>Amount:</label>
          <input
            type="number"
            className='form-input'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className='submit-btn'>
          Add Service
        </button>
      </form>

      <h2 className='services-title'>All Services</h2>

      {/* ✅ Delete Selected Button */}
      <button onClick={handleDeleteSelected} className='delete-btn'>
        Delete Selected
      </button>

      <ul className='services-list'>
        {services.map((service) => (
          <li key={service._id} className='service-item'>

            {/* ✅ Checkbox */}
            <input
              type="checkbox"
              checked={selectedIds.includes(service._id)}
              onChange={() => handleSelect(service._id)}
            />

            {editId === service._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />

                <button onClick={() => handleUpdate(service._id)}>
                  Save
                </button>

                <button onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className='service-info'>
                  {service.name} - ₹{service.amount}
                </span>

                <button
                  onClick={() => handleEdit(service)}
                  className='edit-btn'
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service._id)}
                  className='delete-btn'
                >
                  Delete
                </button>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page1;