import React from 'react';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const XeroStep = ({ onSuccess }) => {
  const handleSubmit = async () => {
    await delay(500);
    onSuccess();
  };

  return (
    <div>
      <div>Xero Step</div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default XeroStep;
