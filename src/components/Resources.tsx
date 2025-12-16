import React from 'react';
import BookList from './resources/BookList';
import LegalAidList from './resources/LegalAidList';

const Resources: React.FC = () => {
    return (
        <section id="recommended-resources" className="py-16 md:py-24 bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <BookList />
                <LegalAidList />
            </div>
        </section>
    );
};

export default React.memo(Resources);