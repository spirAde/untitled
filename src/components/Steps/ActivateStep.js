import React, { useState, useEffect } from 'react';
import {
  getStoresSuccess,
  activateUserSuccess,
  activateStoreSuccess,
  getUserContractsSuccess
} from '../../utils/requester';
import {
  areUserAndStoreAlreadyActivated,
  isUserAlreadyActivated,
  isStoreAlreadyActivated,
} from '../../services/activation.service';
import Loading from '../Loading';

const ActivateStep = ({ user, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const { stores } = await getStoresSuccess({
          status: 'pending',
          type: 'shopify',
        });
        const currentStore = stores.find((store) => store.name === 'Osome Pending Shopify Store');

        setStore(currentStore);

        if (areUserAndStoreAlreadyActivated({ user, store: currentStore })) {
          const { contracts } = await getUserContractsSuccess();
          onSubmit({ contracts, store: currentStore });
          return;
        }

        setIsLoading(false);
      } catch (error) {}
    };

    getInitialState();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>Activate Step</h3>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!isUserAlreadyActivated({ user })) {
      await activateUserSuccess();
    }

    if (!isStoreAlreadyActivated({ store })) {
      await activateStoreSuccess();
    }

    const { contracts } = await getUserContractsSuccess();

    setIsLoading(false);
    onSubmit({ store, contracts });
  };

  return (
    <div>
      <h3>Activate Step</h3>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default ActivateStep;
