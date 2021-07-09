import React from 'react';
import ActivationBootstrap from '../components/ActivationBootstrap';
import { createShopifyMachine } from '../machines/shopifyMachine';
import {
  PhoneStep,
  CodeStep,
  UserContactsStep,
  CompanyStep,
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
  ACTIVATE_STEP,
  INVOICE_DATE_STEP,
  INTRO_STEP,
  XERO_STEP,
  MAPPINGS_STEP,
  SUCCESS_STEP,
} from '../constants';

const steps = {
  [PHONE_STEP]: PhoneStep,
  [CODE_STEP]: CodeStep,
  [USER_CONTACTS_STEP]: UserContactsStep,
  [COMPANY_STEP]: CompanyStep,
  [ACTIVATE_STEP]: ActivateStep,
  [XERO_STEP]: XeroStep,
  [INTRO_STEP]: IntroStep,
  [INVOICE_DATE_STEP]: InvoiceDateStep,
  [MAPPINGS_STEP]: MappingsStep,
  [SUCCESS_STEP]: SuccessStep,
};

const ShopifyPage = () => {
  const handleSignIn = () => {
    console.log('ShopifyPage onSignIn');
  };

  return (
    <ActivationBootstrap
      storeType="shopify"
      applicationType="connect"
      steps={steps}
      createMachineFn={createShopifyMachine}
      onSignIn={handleSignIn}
    />
  );
};

export default ShopifyPage;
