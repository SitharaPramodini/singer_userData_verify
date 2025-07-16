import { useState, useEffect } from 'react';

function Barcode() {
  const [barcode, setBarcode] = useState('No barcode scanned');
  const [buffer, setBuffer] = useState('');

  useEffect(() => {
    let scanBuffer = '';
    let lastKeyTime = Date.now();

    const handleKeyDown = (e) => {
      const currentTime = Date.now();

      // Reset if delay between keys is too long (>100ms)
      if (currentTime - lastKeyTime > 100) {
        scanBuffer = '';
      }

      if (e.key === 'Enter') {
        if (scanBuffer.length >= 3) {
          console.log('Barcode scanned:', scanBuffer);
          setBarcode(scanBuffer);
        }
        scanBuffer = '';
      } else {
        scanBuffer += e.key;
      }

      lastKeyTime = currentTime;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ padding: '5rem 10rem', textAlign: 'center' }}>
      <h2>Scan a Barcode</h2>
      <p style={{ fontSize: '1.5rem', color: '#333' }}>{barcode}</p>
    </div>
  );
}

export default Barcode;
