import React, { useState } from 'react';
import deepmerge from 'deepmerge';

const isFunction = (fn) => typeof fn === 'function';
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ActivationFlow = ({ steps, initialState }) => {
  const [state, setState] = useState(initialState);

  const currentStepName = state.step;
  const currentStep = steps[currentStepName];

  const StepComponent = currentStep.component;

  console.log('current state', state);

  const handleSubmit = (payload) => {
    const updatedState = deepmerge(state, payload || {});
    const nextStep = isFunction(currentStep?.nextStep)
      ? currentStep.nextStep(updatedState)
      : currentStep.nextStep;

    setState({ ...updatedState, step: nextStep });
  };

  return (
    <div>
      <h2>{capitalize(state.storeType)} Activation Flow</h2>
      <div>
        {StepComponent && <StepComponent {...state} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default ActivationFlow;
