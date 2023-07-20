// libs
import React from 'react';
import { useState, useEffect } from 'react';

// hooks

function PrinterDetails(props) {
  const [details, setDetails] = useState(props.details);

  useEffect(() => {
    if (!details) {
      const storedPrinter = sessionStorage.getItem('printerDetails');
      setDetails(JSON.parse(storedPrinter));
    }
  }, []);

  if (!details) {
    return <div>Brak wybranej drukarki.</div>;
  }

  return (
    <div>
      <div>{details.name}</div>
      <div>{details.model}</div>
    </div>
  );
}

export default PrinterDetails;
