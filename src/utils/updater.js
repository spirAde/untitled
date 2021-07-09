export const updater = (context, event) => {
  console.log('updater', context, event);
  Object.keys(event.payload || {}).forEach((key) => {
    context[key] = event.payload[key];
  });
  return context;
};
