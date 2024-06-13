import React from 'react';

import PrimaryInputStyle from '../PrimaryInput/PrimaryInputStyle';

interface InputProps {
  input: any;
  meta: any;
  type: string;
}

const FormInput: React.FC<InputProps> = ({ input, meta, type }) => (
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
