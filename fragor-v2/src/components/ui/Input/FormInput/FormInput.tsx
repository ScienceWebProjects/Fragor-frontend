import React from 'react';

import FormInputProps from './input_props';
import PrimaryInputStyle from '../PrimaryInput/PrimaryInputStyle';

const FormInput: React.FC<FormInputProps> = ({ input, meta, type }) => (
  <>
    <PrimaryInputStyle
      {...input}
      type={type}
      placeholder={`${meta.touched ? meta.error : ''}`}
      $isValid={!meta.error || !meta.touched}
      // required={required}
    />
    {/* {meta.error && meta.touched && <span>{meta.error}</span>} */}
  </>
);

export default FormInput;
