import React, { useEffect, useState } from 'react';
import { isStoreAlreadySetUp } from '../../services/activation.service';
import Loading from '../Loading';

const InvoiceDateStep = ({ store, onSuccess }) => {
  console.log('InvoiceDateStep');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isStoreAlreadySetUp({ store })) {
      onSuccess();
      return;
    }

    setIsLoading(false);
  }, []);

  const handleSubmit = () =>
    onSuccess({
      store: {
        ...store,
        invoiceFromDate: date,
      },
    });

  const handleChange = (event) => setDate(event.target.value);

  if (isLoading) {
    return (
      <div>
        <div>Company Step</div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div>Invoice Date Step</div>
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
