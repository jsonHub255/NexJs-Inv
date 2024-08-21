'use client';

import React, { useState } from 'react';
import BarcodeScanner from '../components/features/BarcodeScanner';

export default function Home() {
  const [isScannerActive, setIsScannerActive] = useState(false);

  const handleDetected = (code: string) => {
    // eslint-disable-next-line no-console
    console.log('Barcode detected:', code);
  };

  return (
    <div>
      <button onClick={() => setIsScannerActive(!isScannerActive)}>
        {isScannerActive ? 'Deactivate Scanner' : 'Activate Scanner'}
      </button>
      <BarcodeScanner
        onDetected={handleDetected}
        isScannerActive={isScannerActive}
      />
    </div>
  );
}
