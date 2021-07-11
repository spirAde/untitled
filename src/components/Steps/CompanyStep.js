import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

const CompanyStep = ({ companies, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCompanyId, setActiveCompanyId] = useState(null);

  useEffect(() => {
    if (companies.length === 1) {
      onSubmit({ activeCompanyId: companies[0].id });
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>Company Step</h3>
        <Loading />
      </div>
    );
  }

  const handleSubmit = () => onSubmit({ activeCompanyId });

  const handleChange = (event) => setActiveCompanyId(Number(event.target.value));

  const renderedRadio = companies.map((company) => (
    <label key={company.id}>
      <input
        type="radio"
        value={company.id}
        checked={activeCompanyId === company.id}
        onChange={handleChange}
      />
      {company.name}
    </label>
  ));

  return (
    <div>
      <h3>Company Step</h3>
      <div>{renderedRadio}</div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default CompanyStep;
