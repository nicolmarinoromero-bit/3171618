import React from 'react';

// Root
interface FormRootProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}
const FormRoot: React.FC<FormRootProps> = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="form">{children}</form>
);

// Field
const FormField: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="form-field">{children}</div>
);

// Label
const FormLabel: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="form-label">{children}</label>
);

// Input
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const FormInput: React.FC<FormInputProps> = (props) => (
  <input className="form-input" {...props} />
);

// Error
const FormError: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="form-error">{children}</span>
);

// Actions container
const FormActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="form-actions">{children}</div>
);

// Submit button
const FormSubmit: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button type="submit" className="form-submit">{children}</button>
);

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Input: FormInput,
  Error: FormError,
  Actions: FormActions,
  Submit: FormSubmit,
});