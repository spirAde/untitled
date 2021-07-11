import React, { useState, useEffect } from 'react';
import { sendPhoneNumberSuccess, sendPhoneNumberError } from '../../utils/requester';
import { isUserAlreadyLoggedIn } from '../../services/activation.service';
import Loading from '../Loading';

const PhoneStep = ({ user, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isUserAlreadyLoggedIn({ user })) {
      onSubmit();
      return;
    }

    setIsLoading(false);
  }, []);

  const handleChange = (event) => setPhone(event.target.value);

  const handleSubmit = async () => {
    try {
      const { verificationToken, email } = await sendPhoneNumberSuccess();
      onSubmit({ phone, verificationToken, email });
    } catch (error) {
      onSubmit({ errors: { PHONE_STEP: error } });
    }
  };

  if (isLoading) {
    return (
      <div>
        <h3>Phone Step</h3>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h3>Phone Step</h3>
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
