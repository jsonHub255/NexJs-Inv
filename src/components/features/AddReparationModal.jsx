import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styles from './AddReparationModal.module.css';

// Dynamically import BarcodeScanner only when the scanner is activated
const BarcodeScanner = dynamic(() => import('./BarcodeScanner'), { 
  ssr: false, 
  loading: () => <p>Loading Scanner...</p> 
});

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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setReparationData({ ...reparationData, [e.target.name]: e.target.value });
  };

  const handleScan = async (ean13) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product-detail/${ean13}/`);
      const product = response.data;
      const newOrderItemUsage = {
        sku: product.sku,
        usage_type: 'total_units',
        total_units_used: 1,
        product_name: product.name,
      };
      setOrderItemUsages((prev) => [...prev, newOrderItemUsage]);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError('Failed to fetch product data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reparations/`, {
        ...reparationData,
        order_item_usages_write: orderItemUsages,
      });
      onClose();
    } catch (error) {
      console.error('Error creating reparation:', error);
      setError('Failed to create reparation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <h2>Add New Reparation</h2>
        <form onSubmit={handleSubmit}>
          {/* Reparation Input Fields */}
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
          <button
            type="button"
            onClick={() => setIsScannerActive((prev) => !prev)}
          >
            {isScannerActive ? 'Deactivate Scanner' : 'Activate Scanner'}
          </button>
          {isScannerActive && <BarcodeScanner onDetected={handleScan} isScannerActive={isScannerActive} />}
          <h3>Scanned Products:</h3>
          <ul>
            {orderItemUsages.map((usage, index) => (
              <li key={index}>
                {usage.product_name} (SKU: {usage.sku}) - Units: {usage.total_units_used}
              </li>
            ))}
          </ul>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Reparation'}
          </button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddReparationModal;
