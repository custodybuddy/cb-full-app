import React from 'react';
import { legalAidServices } from '@/constants';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';

const LegalAidList: React.FC = () => {
    return (
        <div className="mt-24">
            <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-amber-400/50 to-transparent my-16 animate-fade-in-up"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 animate-fade-in-up">
                <span className="text-white/90">Find </span> 
                <span className="text-amber-400">Legal Aid  </span>
                <span className="text-white/90">in </span>
                <span className="text-amber-400">Your Province</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up delay-100">
                Legal aid services provide crucial assistance to low-income individuals. Explore the resources in your province to see if you qualify for support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {legalAidServices.map((service, index) => (
                    <a 
                        key={index} 
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-slate-900/70 backdrop-blur-sm p-6 rounded-2xl flex items-center justify-between h-full border border-slate-800 transition-all duration-300 ease-out hover:bg-slate-800/50 motion-safe:hover:-translate-y-1 hover:border-amber-400/50 group animate-fade-in-up`}
                        style={{ animationDelay: `${(index % 3) * 100}ms` }}
                        aria-label={`Visit legal aid services for ${service.province}`}
                    >
                        <span className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                            {service.province}
                        </span>
                        <div className="text-amber-400 group-hover:text-white transition-all duration-300 ease-out group-hover:translate-x-1">
                            <ExternalLinkIcon />
                            <span className="sr-only">(opens in new tab)</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default LegalAidList;
