import React, { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner = ({ onDetected, isScannerActive }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isScannerActive && scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              width: 640,
              height: 480,
              facingMode: 'environment', // Use the back camera on mobile devices
            },
          },
          decoder: {
            readers: ['ean_reader'],
          },
        },
        function (err) {
          if (err) {
            console.error('Quagga initialization failed:', err);
            return;
          }
          console.log('Quagga initialization finished. Ready to start');
          Quagga.start();
        },
      );

      Quagga.onDetected((data) => {
        onDetected(data.codeResult.code);
      });
    }

    return () => {
      if (isScannerActive) {
        Quagga.stop();
        Quagga.offDetected(onDetected); // Remove the listener when stopping Quagga
      }
    };
  }, [isScannerActive, onDetected]);

  return (
    <div className="scanner-container">
      <div ref={scannerRef} className="scanner-area"></div>
    </div>
  );
};

export default BarcodeScanner;
