import React, { useState } from 'react';
import { sendCodeSuccess, sendPhoneNumberError, getMeSuccess } from '../../utils/requester';

const CodeStep = ({ onSubmit }) => {
  const [code, setPhone] = useState('');

  const handleChange = (event) => setPhone(event.target.value);

  const handleSubmit = async () => {
    try {
      const { token } = await sendCodeSuccess();
      const data = await getMeSuccess({ userStatus: 'active', companiesLength: 1 });
      onSubmit({ token, ...data });
    } catch (error) {
      console.log('CodeStep', error);
    }
  };

  return (
    <div>
      <h3>Code Step</h3>
      <div>
        <label>
          Code
          <input placeholder="Code" value={code} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default CodeStep;
