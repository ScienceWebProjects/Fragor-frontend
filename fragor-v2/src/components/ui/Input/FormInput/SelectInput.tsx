import React from 'react';
import { Select } from 'antd';

import FormInputProps from './input_props';

import styled from 'styled-components';
import { STYLES } from 'utils/styles';

const SelectStyled = styled(Select)`
  width: 95%;
  min-height: 2.5rem;
  margin: 0.125rem 0rem;

  &.ant-select-show-search:where(
      .css-dev-only-do-not-override-djtmh8
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-radius: ${STYLES.borderRadius};
  }

  &:where(.css-dev-only-do-not-override-djtmh8).ant-select
    .ant-select-selection-placeholder {
    font-size: 1.25rem;
  }

  &:where(.css-dev-only-do-not-override-djtmh8)[class^='ant-select']
    [class^='ant-select'],
  :where(.css-dev-only-do-not-override-djtmh8)[class*=' ant-select']
    [class^='ant-select'],
  :where(.css-dev-only-do-not-override-djtmh8)[class^='ant-select']
    [class*=' ant-select'],
  :where(.css-dev-only-do-not-override-djtmh8)[class*=' ant-select']
    [class*=' ant-select'] {
    font-size: 1.25rem !important;
  }
`;

export type selectOptionsProps = {
  value: string;
  label: string;
};

interface SelectInputProps extends Pick<FormInputProps, 'input'> {
  options: selectOptionsProps[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  input,
  options,
  placeholder = '',
}) => (
  <>
    {/* <PrimaryInputStyle
      {...input}
      type={type}
      placeholder={`${meta.touched ? meta.error : ''}`}
      $isValid={!meta.error || !meta.touched}
      // required={required}
    /> */}

    <SelectStyled
      showSearch
      placeholder={placeholder}
      optionFilterProp='label'
      onChange={(value) => input.onChange(value)}
      // onSearch={onSearch}
      options={options}
    />
  </>
);

export default SelectInput;
