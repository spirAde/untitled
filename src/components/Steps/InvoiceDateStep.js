import React, { useEffect, useState } from 'react';
import { isStoreAlreadySetUp } from '../../services/activation.service';
import Loading from '../Loading';

const InvoiceDateStep = ({ store, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (isStoreAlreadySetUp({ store })) {
      onSubmit();
      return;
    }

    setIsLoading(false);
  }, []);

  const handleSubmit = () =>
    onSubmit({
      store: {
        ...store,
        invoiceFromDate: date,
      },
    });

  const handleChange = (event) => setDate(event.target.value);

  if (isLoading) {
    return (
      <div>
        <h3>Invoice Date Step</h3>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h3>Invoice Date Step</h3>
      <div>
        <input placeholder="Invoice Date" value={date} onChange={handleChange} />
      </div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default InvoiceDateStep;
