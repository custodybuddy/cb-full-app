import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements;
}

const Card: React.FC<CardProps> = ({ children, className, as: Component = 'div', ...props }) => {
    return (
        <Component
            className={[
                'bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-xl',
                className
            ]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
