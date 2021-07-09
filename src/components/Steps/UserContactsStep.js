import React, { useState } from 'react';
import { registerSuccess, updateUserSuccess } from '../../utils/requester';

const UserContactsStep = ({ user, onSuccess }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeNickname = (event) => setNickname(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleUpdateUser = async () => {
    try {
      await updateUserSuccess();
      onSuccess();
    } catch (error) {
      console.log('UserContactsStep', error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      const { token, user } = await registerSuccess();
      await updateUserSuccess();

      onSuccess({ user, token });
    } catch (error) {
      console.log('UserContactsStep', error);
    }
  };

  const handleSubmit = async () => {
    const isNewUser = user === null;
    await (isNewUser ? handleRegisterUser() : handleUpdateUser());
  };

  return (
    <div>
      <div>UserContactsStep</div>
      <div>
        <label>
          Nickname
          <input placeholder="Nickname" value={nickname} onChange={handleChangeNickname} />
        </label>
      </div>
      <div>
        <label>
          Email
          <input placeholder="Email" value={email} onChange={handleChangeEmail} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default UserContactsStep;
