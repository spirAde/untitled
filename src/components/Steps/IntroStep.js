import React, { useEffect, useState } from 'react';
import { getUserContractsSuccess } from '../../utils/requester';
import { hasUserAlreadyBoughtAnyProducts } from '../../services/activation.service';
import Loading from '../Loading';

const IntroStep = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = () => onSuccess();

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const { contracts } = await getUserContractsSuccess();

        if (hasUserAlreadyBoughtAnyProducts({ contracts })) {
          onSuccess({ contracts });
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
        <div>Intro Step</div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div>Intro Step</div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default IntroStep;
