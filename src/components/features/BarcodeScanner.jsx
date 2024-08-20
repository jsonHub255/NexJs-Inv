"use client";
import React, { useEffect } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner')
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function(err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.stop()
    }
  }, [onDetected]);

  return (
    <div id="scanner" style={{width: 400, height: 300}}></div>
  );
}

export default BarcodeScanner;