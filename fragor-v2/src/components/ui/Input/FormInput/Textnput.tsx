import React from 'react';

import FormInputProps from './input_props';
import PrimaryInputStyle from '../PrimaryInput/PrimaryInputStyle';

const TextInput: React.FC<FormInputProps> = ({ input, meta, type }) => (
  <>
    <PrimaryInputStyle
      {...input}
      type={type}
      placeholder={`${meta.touched ? meta.error : ''}`}
      $isValid={!meta.error || !meta.touched}
    />
  </>
);

export default TextInput;
