import React, { useState, useEffect } from 'react';
import { getMeSuccess, getMeError } from '../utils/requester';
import { initialContext } from '../constants';
import ActivationFlow from './ActivationFlow';
import Loading from './Loading';

const ActivationBootstrap = ({ steps, applicationType, onSignIn, createMachineFn }) => {
  const [context, setContext] = useState(initialContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialContext = async () => {
      try {
        const data = await getMeSuccess({
          userStatus: 'active',
          companiesLength: 1,
        });
        setContext((prevState) => ({
          ...prevState,
          ...data,
          applicationType,
          onSignIn,
        }));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getInitialContext();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const machine = createMachineFn(context);

  return <ActivationFlow steps={steps} machine={machine} />;
};

export default ActivationBootstrap;
