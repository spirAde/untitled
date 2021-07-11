import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Loading from '../Loading';

const InstallStep = ({ installStore, onSubmit }) => {
  const history = useHistory();

  const { code } = queryString.parse(history.location.search);

  const install = async () => {
    try {
      const { url } = await installStore();
      window.location.href = url;
    } catch (error) {}
  };

  useEffect(() => {
    if (code) {
      onSubmit();
      return;
    }

    install();
  }, []);

  return (
    <div>
      <h3>Install Step</h3>
      <Loading />
    </div>
  );
};

export default InstallStep;
