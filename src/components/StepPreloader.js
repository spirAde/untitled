import React, { useState, useEffect, cloneElement } from 'react';
import { ACTIVATE_STEP, INVOICE_DATE_STEP, MAPPINGS_STEP } from '../constants';
import { getStoresSuccess, getMappingsSuccess } from '../utils/requester';
import Loading from './Loading';

const preloaders = {
  [ACTIVATE_STEP]: () => getStoresSuccess({ status: 'pending' }),
  [INVOICE_DATE_STEP]: () => getStoresSuccess({ status: 'active' }),
  [MAPPINGS_STEP]: () => getMappingsSuccess(),
};

const StepPreloader = ({ step, children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialState = async () => {
      const preloaderFn = preloaders[step];

      try {
        const initial = await preloaderFn();
        setData(initial);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getInitialState();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return cloneElement(children, {
    ...children.props,
    ...data,
  });
};

export default StepPreloader;
