import { useState } from 'react';
import useScanDetection from "use-scan-detection";

function Barcode() {

    const [barcodeScan, setBarcodeScan] = useState("No Barcode Scanned");

    useScanDetection({
        onComplete: setBarcodeScan,
        minLength: 3,
    })
    return (
        <div className="App" style={{ padding: "5rem 10rem" }}>
            <p>
                Barcode: {barcodeScan}
            </p>
        </div >
    );
}

export default Barcode;