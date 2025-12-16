import React from 'react';
import AlertTriangleIcon from '../icons/AlertTriangleIcon';

type AlertVariant = 'info' | 'error';

const variantClasses: Record<AlertVariant, string> = {
    info: 'bg-amber-400/10 border-amber-400/40 text-amber-100',
    error: 'bg-red-500/10 border-red-500/50 text-red-100'
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, variant = 'info', icon, className, ...props }) => {
    return (
        <div
            className={[
                'rounded-lg border px-3 py-2 text-sm flex items-center gap-2',
                variantClasses[variant],
                className
            ]
                .filter(Boolean)
                .join(' ')}
            role={variant === 'error' ? 'alert' : 'status'}
            {...props}
        >
            <span className="flex-shrink-0">
                {icon ?? (variant === 'error' ? <AlertTriangleIcon className="w-4 h-4" /> : null)}
            </span>
            <span className="leading-snug">{children}</span>
        </div>
    );
};

export default Alert;
