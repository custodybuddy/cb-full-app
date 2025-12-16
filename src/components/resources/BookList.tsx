import React, { useState } from 'react';
import { books } from '../../constants';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

const BookList: React.FC = () => {
    const [showAllBooks, setShowAllBooks] = useState(false);
    const visibleBooks = showAllBooks ? books : books.slice(0, 3);

    return (
        <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 animate-fade-in-up">
                <span className="text-amber-400">Recommended</span>
                <span className="text-white/90"> Reads</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-100">
                Discover expertly curated books to guide you through your journey. As Amazon Associates, 
                we earn from qualifying purchases, which helps support CustodyBuddy.com at no extra cost to you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                {visibleBooks.map((book, index) => (
                    <div 
                        key={index} 
                        className={`group bg-slate-900/70 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center h-full border border-amber-400/30 transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400 animate-fade-in-up`}
                        style={{ animationDelay: `${(index % 3) * 100}ms` }}
                    >
                        <div className="overflow-hidden rounded-xl mb-6 shadow-lg w-full">
                            <img 
                                src={book.imageUrl} 
                                alt={book.alt} 
                                loading="lazy"
                                className="w-full h-auto aspect-[2/3] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                        </div>
                        <span className="text-xl font-semibold bg-gradient-to-r from-amber-200 to-amber-400 text-transparent bg-clip-text text-center leading-tight flex-grow text-balance">
                            {book.title}
                        </span>
                        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                            <a className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold py-2.5 px-6 rounded-full shadow-lg transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:bg-amber-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                               href={book.amazonLink}
                               target="_blank" rel="sponsored noopener noreferrer"
                               aria-label={book.ariaLabel}>
                                <ExternalLinkIcon />
                                View on Amazon
                                <span className="sr-only">(opens in new tab)</span>
                            </a>
                            <span className="text-xs text-gray-400">(paid link)</span>
                        </div>
                    </div>
                ))}
            </div>

            {books.length > 3 && (
                <div className="mt-12 text-center animate-fade-in-up">
                    <button
                        onClick={() => setShowAllBooks(!showAllBooks)}
                        className="bg-transparent text-amber-400 border-2 border-amber-400 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 ease-out hover:bg-amber-400 hover:text-black motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                    >
                        {showAllBooks ? 'Show Less Books' : 'Show More Books'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookList;
