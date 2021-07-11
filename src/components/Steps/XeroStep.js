import React, { useState, useEffect } from 'react';
import { isXeroAlreadyConnected } from '../../services/activation.service';
import Loading from '../Loading';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const XeroStep = ({ companies, activeCompanyId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isXeroAlreadyConnected({ companies, activeCompanyId })) {
      onSubmit();
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>Xero Step</h3>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async () => {
    await delay(500);
    onSubmit();
  };

  return (
    <div>
      <h3>Xero Step</h3>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default XeroStep;
