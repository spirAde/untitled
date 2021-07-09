export const isUserAlreadyLoggedIn = ({ user }) => {
  return user !== null;
};

export const isNotEnoughInformationAboutUser = ({ user }) => {
  return !user?.email || !user?.nickname;
};

export const isUserAlreadyActivated = ({ user }) => {
  return user && user.status === 'active';
};

export const isStoreAlreadyActivated = ({ store }) => {
  return store && store.status === 'active';
};

export const isStoreAlreadySetUp = ({ store }) => {
  return store && store.invoiceFromDate;
};

export const areUserAndStoreAlreadyActivated = ({ user, store }) => {
  return isUserAlreadyActivated({ user }) && isStoreAlreadyActivated({ store });
};

export const isAccountingApplication = ({ applicationType }) => {
  return applicationType === 'accounting';
};

export const isXeroAlreadyConnected = ({ companies, activeCompanyId }) => {
  const company = companies.find((company) => company.id === activeCompanyId);
  return company.xeroData.connectionStatus === 'success';
};

export const hasUserAlreadyBoughtAnyProducts = ({ contracts }) => {
  console.log('hasUserAlreadyBoughtAnyProducts', contracts);
  return contracts.some((contract) => contract.status === 'active');
};
