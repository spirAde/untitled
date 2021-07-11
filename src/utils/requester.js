import { guestUser, activeUser } from '../fixtures/user';
import { companies } from '../fixtures/companies';
import { contracts } from '../fixtures/contracts';
import { stores } from '../fixtures/store';

const isResolvedRequest = (status) => status >= 200 && status < 400;

const request = (status, response, timeout = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (isResolvedRequest(status) ? resolve(response) : reject(response)), timeout),
  );

export const getMeSuccess = ({ userStatus, companiesLength = 1 }) => {
  return request(200, {
    user: userStatus === 'guest' ? guestUser : activeUser,
    companies: companies.slice(0, companiesLength),
  });
};

export const getMeError = () => {
  return request(401, {
    error: true,
    message: 'Unauthorized',
  });
};

export const sendPhoneNumberSuccess = () =>
  request(200, {
    verificationToken: 'dummyVerificationToken',
    email: 'dummyEmail',
  });

export const sendPhoneNumberError = () =>
  request(422, {
    error: true,
    requestId: '94cb2c4b-09a5-442b-bd66-10f12236256b',
    message: 'The number does not exist',
  });

export const sendCodeSuccess = () =>
  request(200, {
    token: 'dummyToken',
    user: guestUser,
  });

export const registerSuccess = () =>
  request(200, {
    token: 'dummyToken',
    user: guestUser,
  });

export const registerError = () =>
  request(400, {
    error: true,
    message: 'registerError: Something went wrong',
  });

export const updateUserSuccess = () => request(200, {});

export const activateUserSuccess = () => request(200, {});

export const getStoresSuccess = ({ status = 'active', type = 'shopify' }) => {
  return request(200, {
    stores: stores.filter((store) => store.status === status && store.type === type),
  });
}

export const getStoresError = () => request(400, {
  error: true,
  message: 'getStoresError: Something went wrong',
});

export const activateStoreSuccess = () => request(200, {});

export const getMappingsSuccess = () => request(200, {});

export const getUserContractsSuccess = () => {
  return  request(200, {
    contracts,
  });
}

export const getUserContractsError = () => request(400, {
  error: true,
  message: 'getUserContractsError: Something went wrong',
});
