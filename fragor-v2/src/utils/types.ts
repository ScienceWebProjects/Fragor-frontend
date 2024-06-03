// ***************** UI types ***************** \\

export type ButtonColors = { textColor: string; borderColor: string };

// ***************** Inputs types ***************** \\

export interface InputProps {
  id: string;
  type?:
    | 'email'
    | 'number'
    | 'password'
    | 'text'
    | 'url'
    | 'tel'
    | 'search'
    | 'hidden';
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
  body?: object;
};

// ***************** body types ***************** \\
export type Filament = {
  id: number;
  color: string;
};

export type Printer = {
  filaments: Filament[];
  id: number;
  image: string;
  model: string;
  name: string;
  power: number;
  workHours: number;
};
