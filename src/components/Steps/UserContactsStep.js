import React, { useState, useEffect } from 'react';
import { registerSuccess, updateUserSuccess } from '../../utils/requester';
import { hasUserFullInformation } from '../../services/activation.service';
import Loading from '../Loading';

const UserContactsStep = ({ user, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (hasUserFullInformation({ user })) {
      onSubmit();
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>User Contacts Step</h3>
        <Loading />
      </div>
    );
  }

  const handleChangeNickname = (event) => setNickname(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleUpdateUser = async () => {
    try {
      await updateUserSuccess();
      onSubmit({ user: { email, nickname } });
    } catch (error) {
      console.log('UserContactsStep', error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      const { token, user } = await registerSuccess();
      await updateUserSuccess();

      onSubmit({ user, token });
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
      <h3>User Contacts Step</h3>
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
