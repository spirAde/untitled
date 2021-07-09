import React, { useState } from 'react';
import { sendCodeSuccess, sendPhoneNumberError } from '../../utils/requester';

const CodeStep = ({ onSuccess }) => {
  const [code, setPhone] = useState('');

  const handleChange = (event) => setPhone(event.target.value);

  const handleSubmit = async () => {
    try {
      const { token, user } = await sendCodeSuccess();
      onSuccess({ token, user });
    } catch (error) {
      console.log('CodeStep', error);
    }
  };

  return (
    <div>
      <div>CodeStep</div>
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
