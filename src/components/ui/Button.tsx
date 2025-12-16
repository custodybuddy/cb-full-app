import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ElementType = 'button' | 'a';

type ButtonBaseProps = {
    variant?: ButtonVariant;
    fullWidth?: boolean;
    as?: ElementType;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = ButtonBaseProps & (AnchorProps | NativeButtonProps);

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-amber-400 text-black hover:bg-amber-300 focus:ring-amber-500 shadow-lg shadow-amber-500/20',
    secondary:
        'bg-slate-800 text-white border border-slate-700 hover:border-amber-400 hover:text-amber-200 focus:ring-amber-500',
    ghost: 'text-amber-400 hover:text-amber-300 bg-transparent focus:ring-amber-500'
};

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    fullWidth,
    as = 'button',
    href,
    ...props
}) => {
    const Component = as;
    const sharedProps = {
        className: [
            'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
            variantClasses[variant],
            fullWidth ? 'w-full px-4 py-3' : 'px-6 py-2.5',
            className
        ]
            .filter(Boolean)
            .join(' '),
        ...props
    };

    if (Component === 'a') {
        return (
            <a {...(sharedProps as AnchorProps)} href={href}>
                {children}
            </a>
        );
    }

    const buttonProps = sharedProps as NativeButtonProps;
    return (
        <button {...buttonProps} type={props.type as ButtonProps['type'] ?? 'button'} disabled={props.disabled}>
            {children}
        </button>
    );
};

export default Button;
