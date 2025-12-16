import React from 'react';

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    htmlFor: string;
    description?: string;
    required?: boolean;
    error?: string;
}

const FormRow: React.FC<FormRowProps> = ({
    label,
    htmlFor,
    description,
    required,
    error,
    className,
    children,
    ...props
}) => {
    return (
        <div className={['space-y-1', className].filter(Boolean).join(' ')} {...props}>
            <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-100">
                {label}
                {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
            </label>
            {description && <p className="text-xs text-slate-400">{description}</p>}
            {children}
            {error && (
                <p className="text-xs text-red-400" role="alert" id={`${htmlFor}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormRow;
