import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

const CompanyStep = ({ companies, onSuccess }) => {
  const [activeCompanyId, setActiveCompanyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (companies.length === 1) {
      onSuccess({ activeCompanyId: companies[0].id });
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = () => onSuccess({ activeCompanyId });

  const handleChange = (event) => setActiveCompanyId(Number(event.target.value));

  if (isLoading) {
    return (
      <div>
        <div>Company Step</div>
        <Loading />
      </div>
    );
  }

  const renderedRadio = companies.map((company) => (
    <label>
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
      <div>Company Step</div>
      <div>{renderedRadio}</div>
      <div>
        <button onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default CompanyStep;
