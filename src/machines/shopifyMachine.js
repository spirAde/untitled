import { createMachine } from 'xstate';
import {
  PHONE_STEP,
  PHONE_STEP_STATE_INIT,
  PHONE_STEP_STATE_UNKNOWN,
  PHONE_STEP_STATE_SUCCESS,
  CODE_STEP,
  CODE_STEP_STATE_INIT,
  CODE_STEP_STATE_UNKNOWN,
  CODE_STEP_STATE_SUCCESS,
  USER_CONTACTS_STEP,
  USER_CONTACTS_STEP_STATE_INIT,
  USER_CONTACTS_STEP_STATE_UNKNOWN,
  USER_CONTACTS_STEP_STATE_SUCCESS,
  COMPANY_STEP,
  COMPANY_STEP_STATE_INIT,
  COMPANY_STEP_STATE_SUCCESS,
  ACTIVATE_STEP,
  ACTIVATE_STEP_STATE_INIT,
  ACTIVATE_STEP_STATE_UNKNOWN,
  ACTIVATE_STEP_STATE_SUCCESS,
  XERO_STEP,
  XERO_STEP_STATE_INIT,
  XERO_STEP_STATE_UNKNOWN,
  XERO_STEP_STATE_SUCCESS,
  INTRO_STEP,
  INTRO_STEP_STATE_INIT,
  INTRO_STEP_STATE_SUCCESS,
  INVOICE_DATE_STEP,
  INVOICE_DATE_STEP_STATE_INIT,
  INVOICE_DATE_STEP_STATE_UNKNOWN,
  INVOICE_DATE_STEP_STATE_SUCCESS,
  SUCCESS_STEP,
  SUCCESS_STEP_STATE_INIT,
  MAPPINGS_STEP,
  SHOPIFY_MACHINE,
} from '../constants';
import { updater } from '../utils/updater';
import { getRootStateNode } from '../utils/machine';
import {
  isUserAlreadyLoggedIn,
  isNotEnoughInformationAboutUser,
  areUserAndStoreAlreadyActivated,
  isAccountingApplication,
  isXeroAlreadyConnected,
  hasUserAlreadyBoughtAnyProducts,
  isStoreAlreadySetUp,
} from '../services/activation.service';

const phoneStepState = {
  initial: PHONE_STEP_STATE_UNKNOWN,
  states: {
    PHONE_STEP_STATE_UNKNOWN: {
      always: [
        { target: PHONE_STEP_STATE_SUCCESS, cond: 'isUserAlreadyLoggedIn' },
        { target: PHONE_STEP_STATE_INIT },
      ],
    },
    PHONE_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: getRootStateNode('shopify', CODE_STEP),
          actions: 'updater',
        },
        ERROR_EVENT: {
          target: getRootStateNode('shopify', USER_CONTACTS_STEP),
        },
      },
    },
    PHONE_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', CODE_STEP),
      },
    },
  },
};

const codeStepState = {
  initial: CODE_STEP_STATE_UNKNOWN,
  states: {
    CODE_STEP_STATE_UNKNOWN: {
      always: [
        { target: CODE_STEP_STATE_SUCCESS, cond: 'isUserAlreadyLoggedIn' },
        { target: CODE_STEP_STATE_INIT },
      ],
    },
    CODE_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: CODE_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    CODE_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', USER_CONTACTS_STEP),
      },
    },
  },
};

const userContactsStepState = {
  initial: USER_CONTACTS_STEP_STATE_UNKNOWN,
  states: {
    USER_CONTACTS_STEP_STATE_UNKNOWN: {
      always: [
        { target: USER_CONTACTS_STEP_STATE_INIT, cond: 'isNotEnoughInformationAboutUser' },
        { target: USER_CONTACTS_STEP_STATE_SUCCESS },
      ],
    },
    USER_CONTACTS_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: USER_CONTACTS_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    USER_CONTACTS_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', COMPANY_STEP),
      },
    },
  },
};

const companyStepState = {
  initial: COMPANY_STEP_STATE_INIT,
  states: {
    COMPANY_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: COMPANY_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    COMPANY_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', ACTIVATE_STEP),
      },
    },
  },
};

const activateStepState = {
  initial: ACTIVATE_STEP_STATE_UNKNOWN,
  states: {
    ACTIVATE_STEP_STATE_UNKNOWN: {
      always: [
        { target: ACTIVATE_STEP_STATE_SUCCESS, cond: 'areUserAndStoreAlreadyActivated' },
        { target: ACTIVATE_STEP_STATE_INIT },
      ],
    },
    ACTIVATE_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: ACTIVATE_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    ACTIVATE_STEP_STATE_SUCCESS: {
      always: [
        { target: getRootStateNode('shopify', SUCCESS_STEP), cond: 'isAccountingApplication' },
        { target: getRootStateNode('shopify', XERO_STEP) },
      ],
    },
  },
};

const xeroStepState = {
  initial: XERO_STEP_STATE_UNKNOWN,
  states: {
    XERO_STEP_STATE_UNKNOWN: {
      always: [
        { target: XERO_STEP_STATE_SUCCESS, cond: 'isXeroAlreadyConnected' },
        { target: XERO_STEP_STATE_INIT },
      ],
    },
    XERO_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: XERO_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    XERO_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', INTRO_STEP),
      },
    },
  },
};

const introStepState = {
  initial: INTRO_STEP_STATE_INIT,
  states: {
    INTRO_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: INTRO_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    INTRO_STEP_STATE_SUCCESS: {
      always: [
        {
          target: getRootStateNode('shopify', SUCCESS_STEP),
          cond: 'hasUserAlreadyBoughtAnyProducts',
        },
        {
          target: getRootStateNode('shopify', INVOICE_DATE_STEP),
        },
      ],
    },
  },
};

const invoiceDateStepState = {
  initial: INVOICE_DATE_STEP_STATE_UNKNOWN,
  states: {
    INVOICE_DATE_STEP_STATE_UNKNOWN: {
      always: [
        { target: INVOICE_DATE_STEP_STATE_SUCCESS, cond: 'isStoreAlreadySetUp' },
        { target: INVOICE_DATE_STEP_STATE_INIT },
      ],
    },
    INVOICE_DATE_STEP_STATE_INIT: {
      on: {
        SUCCESS_EVENT: {
          target: INVOICE_DATE_STEP_STATE_SUCCESS,
          actions: 'updater',
        },
      },
    },
    INVOICE_DATE_STEP_STATE_SUCCESS: {
      always: {
        target: getRootStateNode('shopify', SUCCESS_STEP),
      },
    },
  },
};

const successStepState = {
  initial: SUCCESS_STEP_STATE_INIT,
  states: {
    SUCCESS_STEP_STATE_INIT: {},
  },
};

export const createShopifyMachine = (initialContext) =>
  createMachine(
    {
      context: initialContext,
      id: SHOPIFY_MACHINE,
      initial: PHONE_STEP,
      states: {
        [PHONE_STEP]: phoneStepState,
        [CODE_STEP]: codeStepState,
        [USER_CONTACTS_STEP]: userContactsStepState,
        [COMPANY_STEP]: companyStepState,
        [ACTIVATE_STEP]: activateStepState,
        [XERO_STEP]: xeroStepState,
        [INTRO_STEP]: introStepState,
        [INVOICE_DATE_STEP]: invoiceDateStepState,
        [SUCCESS_STEP]: successStepState,
      },
    },
    {
      actions: {
        updater,
      },
      guards: {
        isUserAlreadyLoggedIn,
        isNotEnoughInformationAboutUser,
        areUserAndStoreAlreadyActivated,
        isAccountingApplication,
        isXeroAlreadyConnected,
        hasUserAlreadyBoughtAnyProducts,
        isStoreAlreadySetUp,
      },
    },
  );
