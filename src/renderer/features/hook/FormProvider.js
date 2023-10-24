import React, { useState } from 'react';
import FormContext from './FormContext';
const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    woreda: '',
    subcity: '',
    officeNumber: '',
    department: '',
    floorNumber: '',
    elevatorNumber: '',
    gender: '',
    corporate: false,
    special: false,
  });

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
