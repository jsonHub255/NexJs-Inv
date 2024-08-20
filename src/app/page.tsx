"use client";

import React from 'react';
import BarcodeScanner from '../components/features/BarcodeScanner';

export default function Home() {
  const handleDetected = (code: string) => {
    console.log('Detected:', code);
    // Handle the detected barcode
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <BarcodeScanner onDetected={handleDetected} />
    </div>
  );
}