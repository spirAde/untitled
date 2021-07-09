import React, { useState } from 'react';
import { sendPhoneNumberSuccess, sendPhoneNumberError } from '../../utils/requester';

const PhoneStep = ({ onSuccess, onError }) => {
  const [phone, setPhone] = useState('');

  const handleChange = (event) => setPhone(event.target.value);

  const handleSubmit = async () => {
    try {
      const { verificationToken, email } = await sendPhoneNumberSuccess();
      onSuccess({ phone, verificationToken, email });
    } catch (error) {
      console.log('PhoneStep', error);
      onError({ error });
    }
  };

  return (
    <div>
      <div>PhoneStep</div>
      <div>
        <label>
          Phone Number
          <input placeholder="Phone Number" value={phone} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default PhoneStep;
