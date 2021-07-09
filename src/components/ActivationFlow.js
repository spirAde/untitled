import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { inspect } from '@xstate/inspect';
import { SUCCESS_EVENT, ERROR_EVENT } from '../constants';

inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});

const ActivationFlow = ({ steps, machine }) => {
  const [state, send, service] = useMachine(machine, { devTools: true });

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      console.log(state.value, state.context);
    });

    return subscription.unsubscribe;
  }, [service]);

  const stepKeys = Object.keys(steps);
  const currentStep = Object.keys(state.value)[0];
  const StepComponent = steps[currentStep] || null;

  console.log(currentStep);

  const handleSuccessCurrentStep = (payload) => send({ type: SUCCESS_EVENT, payload });
  const handleErrorCurrentStep = (payload) => send({ type: ERROR_EVENT, payload });

  return (
    <div>
      <div>ActivationFlow</div>
      <div>
        {StepComponent && (
          <StepComponent
            {...state.context}
            onSuccess={handleSuccessCurrentStep}
            onError={handleErrorCurrentStep}
          />
        )}
      </div>
    </div>
  );
};

export default ActivationFlow;
