export const prepareInitialState = async (steps, data) => {
  const errors = Object.keys(steps).reduce(
    (accumulator, stepName) => ({
      ...accumulator,
      [stepName]: null,
    }),
    {},
  );

  return {
    ...data,
    errors,
  }
};
