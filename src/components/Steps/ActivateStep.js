import React, { useState, useEffect } from 'react';
import { getStoresSuccess, activateUserSuccess, activateStoreSuccess } from '../../utils/requester';
import {
  areUserAndStoreAlreadyActivated,
  isUserAlreadyActivated,
  isStoreAlreadyActivated,
} from '../../services/activation.service';
import Loading from '../Loading';

const ActivateStep = ({ user, onSuccess }) => {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          onSuccess({ store: currentStore });
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getInitialState();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div>Activate Step</div>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!isUserAlreadyActivated({ user })) {
      await activateUserSuccess();
    }

    if (!isStoreAlreadyActivated({ store })) {
      await activateStoreSuccess();
    }

    onSuccess({ store });
  };

  return (
    <div>
      <div>Activate Step</div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default ActivateStep;
