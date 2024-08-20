import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import axios from 'axios';

const AddReparationModal = ({ isOpen, onClose }) => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [orderItemUsages, setOrderItemUsages] = useState([]);
  const [reparationData, setReparationData] = useState({
    vehicle: '',
    driver: '',
    location: '',
    description: '',
    odometer_reading: '',
    bc: '',
    // Add other fields as necessary
  });

  const handleInputChange = (e) => {
    setReparationData({ ...reparationData, [e.target.name]: e.target.value });
  };

  const handleScan = async (ean13) => {
    try {
      const response = await axios.get(`/api/scan-barcode/${ean13}/`);
      const product = response.data.product;
      
      const newOrderItemUsage = {
        sku: product.sku,
        usage_type: 'total_units',
        total_units_used: 1
      };

      setOrderItemUsages(prev => [...prev, newOrderItemUsage]);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reparations/', {
        ...reparationData,
        order_item_usages_write: orderItemUsages
      });
      onClose();
      // Handle successful creation, maybe show a success message or refresh the reparations list
    } catch (error) {
      console.error('Error creating reparation:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Add New Reparation</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="vehicle" 
          value={reparationData.vehicle} 
          onChange={handleInputChange} 
          placeholder="Vehicle" 
        />
        <input 
          type="text" 
          name="driver" 
          value={reparationData.driver} 
          onChange={handleInputChange} 
          placeholder="Driver" 
        />
        <input 
          type="text" 
          name="location" 
          value={reparationData.location} 
          onChange={handleInputChange} 
          placeholder="Location" 
        />
        <input 
          type="text" 
          name="description" 
          value={reparationData.description} 
          onChange={handleInputChange} 
          placeholder="Description" 
        />
        <input 
          type="number" 
          name="odometer_reading" 
          value={reparationData.odometer_reading} 
          onChange={handleInputChange} 
          placeholder="Odometer Reading" 
        />
        <input 
          type="text" 
          name="bc" 
          value={reparationData.bc} 
          onChange={handleInputChange} 
          placeholder="BC Number" 
        />
        
        <button type="button" onClick={() => setIsScannerActive(!isScannerActive)}>
          {isScannerActive ? 'Deactivate Scanner' : 'Activate Scanner'}
        </button>
        
        {isScannerActive && <BarcodeScanner onDetected={handleScan} />}
        
        <h3>Scanned Products:</h3>
        <ul>
          {orderItemUsages.map((usage, index) => (
            <li key={index}>{usage.sku} - Units: {usage.total_units_used}</li>
          ))}
        </ul>
        
        <button type="submit">Create Reparation</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddReparationModal;