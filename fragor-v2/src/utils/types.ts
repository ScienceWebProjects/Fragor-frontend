// ***************** UI types ***************** \\

export type ButtonColors = { textColor: string; borderColor: string };

// ***************** Inputs types ***************** \\

export interface InputProps {
  $isValid: boolean | null;
  required?: boolean;
  placeholder: string;
  onChange: (text: React.ChangeEvent<HTMLInputElement>) => void;
}
