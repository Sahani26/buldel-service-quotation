 

// export default Page1;
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Page1 = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [services, setServices] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
 
  // console.log(process.env.REACT_APP_API_URL);
  // console.log('API URL:', apiUrl);  

  // Fetch all services when the page loads
  useEffect(() => {
    const fetchServices = async () => {
  
      const apiUrl = process.env.REACT_APP_API_URL;
 
      // console.log(process.env.REACT_APP_API_URL);
      // console.log('API URL:', apiUrl);  
      try {
        const response = await axios.get(`${apiUrl}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Handle form submission to create a new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/services`, { name, amount });
      setServices([...services, response.data]); // Add the new service to the list
    
      setName('');
      setAmount('');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service');
    }
  };

  // Handle delete service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/services/${id}`);
      setServices(services.filter(service => service._id !== id)); // Remove deleted service from the list
      alert('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  // Handle edit service
  const handleEdit = async (id) => {
    const editedName = prompt('Enter new service name:', name);
    const editedAmount = prompt('Enter new amount:', amount);
    
    if (editedName && editedAmount) {
      try {
        const response = await axios.put(`${apiUrl}/services/${id}`, {
          name: editedName,
          amount: editedAmount,
        });
        setServices(services.map(service =>
          service._id === id ? response.data : service
        ));
        alert('Service updated successfully');
      } catch (error) {
        console.error('Error updating service:', error);
        alert('Error updating service');
      }
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
    <button type="submit" className='submit-btn'>Add Service</button>
  </form>

  <h2 className='services-title'>All Services</h2>
  <ul className='services-list'>
    {services.map((service) => (
      <li key={service._id} className='service-item'>
        <span className='service-info'>{service.name} - ${service.amount}</span>
        <button onClick={() => handleEdit(service._id)} className='edit-btn'>Edit</button>
        <button onClick={() => handleDelete(service._id)} className='delete-btn'>Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Page1;
