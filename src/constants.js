export const PHONE_STEP = 'PHONE_STEP';
export const CODE_STEP = 'CODE_STEP';
export const USER_CONTACTS_STEP = 'USER_CONTACTS_STEP';
export const COMPANY_STEP = 'COMPANY_STEP';
export const ACTIVATE_STEP = 'ACTIVATE_STEP';
export const XERO_STEP = 'XERO_STEP';
export const INTRO_STEP = 'INTRO_STEP';
export const INVOICE_DATE_STEP = 'INVOICE_DATE_STEP';
export const MAPPINGS_STEP = 'MAPPINGS_STEP';
export const SUCCESS_STEP = 'SUCCESS_STEP';
export const INSTALL_STEP = 'INSTALL_STEP';

export const initialContext = {
  step: PHONE_STEP,
  phone: '',
  verificationToken: '',
  token: '',
  user: null,
  companies: [],
  conversations: [],
  store: null,
  mappings: [],
  contracts: [],
  activeCompanyId: null,
  errors: {},
};
