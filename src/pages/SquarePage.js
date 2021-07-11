import React from 'react';
import ActivationBootstrap from '../components/ActivationBootstrap';
import {
  isNewUser,
  isUserAlreadyLoggedIn,
  isAccountingApplication,
  hasUserAlreadyBoughtAnyProducts,
} from '../services/activation.service';
import {
  PhoneStep,
  CodeStep,
  UserContactsStep,
  CompanyStep,
  InstallStep,
  ActivateStep,
  XeroStep,
  IntroStep,
  InvoiceDateStep,
  MappingsStep,
  SuccessStep,
} from '../components/Steps';
import {
  PHONE_STEP,
  CODE_STEP,
  USER_CONTACTS_STEP,
  COMPANY_STEP,
  INSTALL_STEP,
  ACTIVATE_STEP,
  INVOICE_DATE_STEP,
  INTRO_STEP,
  XERO_STEP,
  MAPPINGS_STEP,
  SUCCESS_STEP,
} from '../constants';

const steps = {
  [PHONE_STEP]: {
    component: PhoneStep,
    nextStep: (context) =>
      isUserAlreadyLoggedIn(context)
        ? USER_CONTACTS_STEP
        : isNewUser(context)
        ? USER_CONTACTS_STEP
        : CODE_STEP,
  },
  [CODE_STEP]: {
    component: CodeStep,
    nextStep: USER_CONTACTS_STEP,
  },
  [USER_CONTACTS_STEP]: {
    component: UserContactsStep,
    nextStep: COMPANY_STEP,
  },
  [COMPANY_STEP]: {
    component: CompanyStep,
    nextStep: INSTALL_STEP,
  },
  [INSTALL_STEP]: {
    component: InstallStep,
    nextStep: ACTIVATE_STEP,
  },
  [ACTIVATE_STEP]: {
    component: ActivateStep,
    nextStep: (context) => (isAccountingApplication(context) ? SUCCESS_STEP : XERO_STEP),
  },
  [XERO_STEP]: {
    component: XeroStep,
    nextStep: (context) => (hasUserAlreadyBoughtAnyProducts(context) ? SUCCESS_STEP : INTRO_STEP),
  },
  [INTRO_STEP]: {
    component: IntroStep,
    nextStep: INVOICE_DATE_STEP,
  },
  [INVOICE_DATE_STEP]: {
    component: InvoiceDateStep,
    nextStep: MAPPINGS_STEP,
  },
  [MAPPINGS_STEP]: {
    component: MappingsStep,
    nextStep: SUCCESS_STEP,
  },
  [SUCCESS_STEP]: {
    component: SuccessStep,
  },
};

const SquarePage = () => {
  const handleSignIn = () => {
    console.log('SquarePage onSignIn');
  };

  return (
    <ActivationBootstrap
      storeType="square"
      applicationType="connect"
      steps={steps}
      onSignIn={handleSignIn}
    />
  );
};

export default SquarePage;
