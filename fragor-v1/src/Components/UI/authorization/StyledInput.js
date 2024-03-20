import styled from 'styled-components';

const Input = styled.input`
  width: 95%;
  min-height: 2.5rem;
  padding: 0 0.313rem;
  margin: 0.625rem 0rem;

  font-size: 1rem;

  border-radius: 0.625rem;
  border: 1px solid #000;
  background: #ffffff;

  transition: 0.3s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline-offset: 5px;
  }
`;

const StyledInput = (props) => {
  return (
    <Input
      style={props.style}
      className={props.className}
      name={props.name}
      id={props.id}
      type={props.type}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.isRequired}
    >
      {props.children}
    </Input>
  );
};

export default StyledInput;
