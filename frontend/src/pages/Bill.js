import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/buldel-building-electrician-logo-surat.png';

const Bill = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [qty, setQty] = useState(1);
  const [quotations, setQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [newQty, setNewQty] = useState(1);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchServices = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const result = await axios.get(`${apiUrl}/services`);
        setServices(result.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchQuotations = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const result = await axios.get(`${apiUrl}/quotations`);
        setQuotations(result.data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchQuotations();
  }, []);

  const handleAddQuotation = async () => {
    const service = services.find((s) => s._id === selectedService);
    if (service) {
      const newQuotation = {
        serviceId: service._id,
        serviceName: service.name,
        quantity: qty,
        total: service.amount * qty,
      };

      try {
        await axios.post(`${apiUrl}/quotations`, newQuotation);
        setQuotations([...quotations, newQuotation]);
      } catch (error) {
        console.error('Error saving quotation:', error);
      }
    }
  };

  const handleDeleteQuotation = async (id) => {
    try {
      await axios.delete(`${apiUrl}/quotations/${id}`);
      setQuotations(quotations.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting quotation:', error);
    }
  };

  const handleEditQuotation = (quotation) => {
    setEditingQuotation(quotation);
    setNewQty(quotation.quantity); // Set the quantity to the current value for editing
  };

  const handleSaveEdit = async () => {
    if (!newQty || newQty <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    // Debugging: Log the values before saving
    console.log('Saving edit:', {
      quotationId: editingQuotation._id,
      newQuantity: newQty,
    });

    const updatedQuotation = {
      ...editingQuotation,
      quantity: newQty,
      total: editingQuotation.serviceAmount * newQty, // Recalculate total based on quantity
    };

    try {
      // Update the backend
      const response = await axios.put(`${apiUrl}/quotations/${editingQuotation._id}`, updatedQuotation);

      console.log('Update response:', response.data);

      // Update local state to reflect the edited quotation
      setQuotations(quotations.map((item) =>
        item._id === updatedQuotation._id ? updatedQuotation : item
      ));

      // Reset the editing state
      setEditingQuotation(null);
      setNewQty(1);
    } catch (error) {
      console.error('Error updating quotation:', error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handlePrint = () => {
  //   const printWindow = window.open('', '', 'height=500,width=800');
  //   printWindow.document.write('<html><head><title>Bill Table</title>');
  //   printWindow.document.write('<style> .quotation-table { width: 100%; border-collapse: collapse; } .quotation-table th, .quotation-table td { border: 1px solid black; padding: 10px; text-align: left; } .action{display:none;} </style>');
  //   printWindow.document.write('</head><body>');
  //   printWindow.document.write(document.querySelector('.main-page-print').inn);
  //   printWindow.document.write('</body></html>');
  //   printWindow.document.close();
  //   printWindow.print();
  // };

  return (
    <div className="service-quotation">
<div className="not-print">
<h1 className="service-quotation-title">Service Bill</h1>

<div className="search-container">
  <label className="label">Search Service:</label>
  <input
    type="text"
    className="search-input"
    placeholder="Search for a service..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

<div className="select-container">
  <label className="label">Service:</label>
  <select
    className="service-select"
    value={selectedService}
    onChange={(e) => setSelectedService(e.target.value)}
  >
    <option value="">Select Service</option>
    {filteredServices.map((service) => (
      <option key={service._id} value={service._id}>
        {service.name} - ₹{service.amount}
      </option>
    ))}
  </select>
</div>

<div className="quantity-container">
  <label className="label">Quantity:</label>
  <input
    type="number"
    className="quantity-input"
    value={qty}
    onChange={(e) => setQty(Number(e.target.value))}
    min="1"
  />
</div>

<div className="Billbt d-flex mx-3">
  <button className="add-btn" onClick={handleAddQuotation}>Add to Bill</button>

  <button className="print-btn" >Print Bill</button>
  {/* <button className="print-btn" onClick={handlePrint}>Print Bill</button> */}
</div>
</div>

      <div className="print_page" id="print_page">
      <div className="top_content">
        <div className="header">
          <h2>Service-Invoice</h2>
        </div>
        {/* Seller details */}
        <div className="seller">
          <div className="seller_details">
            <h2>Buldel (Building Electrician)</h2>
            <ul>
              <li>
                <a href="https://buldel.com/" className="web_link">
                  www.buldel.com
                </a>
              </li>
              <li>Adagara Street, </li>
              <li>Near Nanpura Police Station</li>
              <li>Nanpura-395001, Surat.</li>
              <li>Phone: +91-9428213314 </li>
              <li>service@buldel.com</li>
              {/* <li>
                GSTIN-22AAA000051W#R | STATE CODE-24 | PAN-FRUKS3398S
              </li> */}
            </ul>
          </div>
          <div className="seller_logo">
            <img
              src={logo}
              alt="Buldel Logo"
            />
          </div>
        </div>
      </div>
   
      <table className="quotation-table">
  <thead>
    <tr>
      <th className='sr'>Sr#</th> {/* Serial Number Column */}
      <th>Service Name</th>
      <th>Qty/Mt/Nug</th>
      <th>Total</th>
      <th className="action">Actions</th>
    </tr>
  </thead>
  <tbody>
    {quotations.map((item, index) => (
      <tr key={item._id}>
        <td className='sr'>{index + 1}</td> {/* Serial Number */}
        <td>{item.serviceName}</td>
        <td>
          {editingQuotation && editingQuotation._id === item._id ? (
            <input
              type="number"
              className="edit-quantity-input"
              value={newQty}
              onChange={(e) => setNewQty(Number(e.target.value))}
              min="1"
            />
          ) : (
            item.quantity
          )}
        </td>
        <td>₹{item.total}</td>
        <td className="action">
          {editingQuotation && editingQuotation._id === item._id ? (
            <button className="save-btn" onClick={handleSaveEdit}>
              Save
            </button>
          ) : (
            <>
              <button
                className="edit-btn"
                onClick={() => handleEditQuotation(item)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteQuotation(item._id)}
              >
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="3" className="text-right"><strong>Subtotal:</strong></td>
      <td><strong>₹{quotations.reduce((acc, item) => acc + item.total, 0)}</strong></td>
 
    </tr>
  </tfoot>
</table>



      <div className="disclaimer">
        <div className="material_use">
          <strong>Material Uses</strong>
          <ul>
            <li>Wire: R.R., Polycab, Finolex, KEI</li>
            <li>Cable: R.R., Polycab, Finolex, KEI</li>
            <li>Telephone Cable: Finolex, Polycab, Delton, R.R</li>
            <li>RG-6 TV Cable: R.R., Polycab</li>
            <li>Cat-6 Cable: D Link, Digi link, Finolex, Molex</li>
            <li>
              Switch, Socket, Box, Plate: Anchor Roma, GeratWhite Trivo,
              Parcos Forest, Alex
            </li>
            <li>Rigid PVC Pipe: rishiflex, unique, vikon</li>
          </ul>
        </div>
        <div className="price_disc">
          <strong>Rates</strong>
          <ul>
            <li>Material: GST Extra</li>
            <li>Labour: Service Tax Extra as applicable</li>
            <li>Retention: Not applicable</li>
            <li>Deduction: Only TDS as per IT rule</li>
            <li>
              Supply Payment: 25% advance along with order & 75% payment within
              15 days
            </li>
            <li>
              Installation Payment: 100% within 15 days of bill submission.
            </li>
            <li>All type civil work in client scope.</li>
          </ul>
        </div>
      </div>
    </div>
  
    </div>
  );
};

export default Bill;
