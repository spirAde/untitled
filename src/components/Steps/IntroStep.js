import React from 'react';

const IntroStep = ({ onSubmit }) => {
  const handleSubmit = () => onSubmit();

  return (
    <div>
      <h3>Intro Step</h3>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default IntroStep;
