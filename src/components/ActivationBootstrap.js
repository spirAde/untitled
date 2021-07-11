import React, { useState, useEffect } from 'react';
import {
  getMeSuccess,
  getMeError,
  getStoresSuccess,
  getStoresError,
  getUserContractsSuccess,
  getUserContractsError,
} from '../utils/requester';
import { prepareInitialState } from '../services/bootstrap.service';
import { initialContext } from '../constants';
import ActivationFlow from './ActivationFlow';
import Loading from './Loading';

const ActivationBootstrap = ({
  steps,
  storeType,
  applicationType,
  installStore,
  activateStore,
  onSignIn,
}) => {
  const [initialState, setInitialState] = useState({
    ...initialContext,
    storeType,
    applicationType,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const data = await getMeError({ userStatus: 'active', companiesLength: 2 });
        const initial = await prepareInitialState(steps, data);
        setInitialState((prevState) => ({ ...prevState, ...initial }));
      } catch (error) {
        const initial = await prepareInitialState(steps, {});
        setInitialState((prevState) => ({ ...prevState, ...initial }));
      }
    };

    getInitialState().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ActivationFlow
      steps={steps}
      initialState={initialState}
      installStore={installStore}
      activateStore={activateStore}
      onSignIn={onSignIn}
    />
  );
};

export default ActivationBootstrap;
