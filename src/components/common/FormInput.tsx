import React from 'react';
import AlertTriangleIcon from '../icons/AlertTriangleIcon';

interface FormInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type?: string;
    required?: boolean;
    error?: string;
    icon: React.ReactNode;
    isTextArea?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    required = false,
    error,
    icon,
    isTextArea = false,
}) => {
    const inputClasses = `w-full bg-slate-800 border ${
        error ? 'border-red-500 text-red-400' : 'border-slate-700'
    } rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 ${
        error ? 'focus:ring-red-500' : 'focus:ring-amber-400'
    }`;

    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
        <div>
            <label htmlFor={id} className="sr-only">
                {placeholder}
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {icon}
                </div>
                <InputComponent
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={inputClasses}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...(isTextArea ? { rows: 5 } : { type })}
                />
                {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                    </div>
                )}
            </div>
            {error && (
                <p id={`${id}-error`} className="text-red-400 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
