// ***************** UI types ***************** \\

export type ButtonColors = { textColor: string; borderColor: string };

// ***************** Inputs types ***************** \\

export interface InputProps {
  id: string;
  $isValid: boolean | null;
  required?: boolean;
  placeholder: string;
  onChange: (text: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PinInputProps {
  label?: string;
  length: number;
  $isValid: boolean | null;
  onPinEntered?: (pin: string) => void;
}

// ***************** Fetch type ***************** \\
export type RequestFetchType = {
  method: 'GET' | 'POST' | 'UPDATE';
  headers: Record<string, string>;
  body: object;
};
