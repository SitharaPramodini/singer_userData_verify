import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function BarcodeScanner() {
  const [data, setData] = useState('No result');

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Scan Barcode or QR Code</h2>
      <div style={{ maxWidth: 500, margin: '1rem auto' }}>
        <BarcodeScannerComponent
          width={500}
          height={400}
          onUpdate={(err, result) => {
            if (result) {
              setData(result.text);
            } else if (err) {
              console.error(err);
            }
          }}
        />
      </div>
      <h3>Scanned Result:</h3>
      <p>{data}</p>
    </div>
  );
}
