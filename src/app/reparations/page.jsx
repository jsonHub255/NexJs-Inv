"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReparationModal from '@/components/features/AddReparationModal';

const ReparationsPage = () => {
  const [reparations, setReparations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReparations();
  }, []);

  const fetchReparations = async () => {
    try {
      const response = await axios.get('/api/reparations/');
      setReparations(response.data);
    } catch (error) {
      console.error('Error fetching reparations:', error);
    }
  };

  const handleAddReparation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchReparations(); // Refresh the list after adding a new reparation
  };

  return (
    <div>
      <h1>Reparations</h1>
      <button onClick={handleAddReparation}>Add Reparation</button>
      <table>
        <thead>
          <tr>
            <th>Reparation Number</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Date Created</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {reparations.map((reparation) => (
            <tr key={reparation.id}>
              <td>{reparation.reparation_number}</td>
              <td>{reparation.vehicle}</td>
              <td>{reparation.driver}</td>
              <td>{reparation.date_created}</td>
              <td>{reparation.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddReparationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ReparationsPage;