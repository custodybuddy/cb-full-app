import React, { useState } from 'react';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';

interface Book {
    imageUrl: string;
    alt: string;
    title: string;
    amazonLink: string;
    ariaLabel: string;
}

const books: Book[] = [
    {
        imageUrl: 'https://m.media-amazon.com/images/I/81WNrK+icJL._SX342_.jpg',
        alt: 'Book cover for Co-parenting with a Toxic Ex',
        title: 'Co-parenting with a Toxic Ex by Amy J.L. Baker and Paul R. Fine',
        amazonLink: 'https://www.amazon.ca/dp/B0719CH1D3?tag=custodybudd0c-20&language=en_CA',
        ariaLabel: 'View Co-parenting with a Toxic Ex on Amazon (paid link)',
    },
    {
        imageUrl: 'https://m.media-amazon.com/images/I/71C30NlvpeL._SY466_.jpg',
        alt: 'Book cover for BIFF: Quick Responses to High-Conflict People',
        title: 'BIFF: Quick Responses to High-Conflict People by Bill Eddy',
        amazonLink: 'https://www.amazon.ca/dp/1936268728?tag=custodybudd0c-20&language=en_CA',
        ariaLabel: 'View BIFF: Quick Responses to High-Conflict People on Amazon (paid link)',
    },
    {
        imageUrl: 'https://m.media-amazon.com/images/I/5165NcbMc4L._SY445_SX342_QL70_ML2_.jpg',
        alt: 'Book cover for Divorce Poison',
        title: 'Divorce Poison by Dr. Richard A. Warshak',
        amazonLink: 'https://www.amazon.ca/dp/B06ZYG3KFX?tag=custodybudd0c-20&language=en_CA',
        ariaLabel: 'View Divorce Poison on Amazon (paid link)',
    },
    {
        imageUrl: 'https://prodimage.images-bn.com/pimages/9781499677522_p0_v1_s1200x630.jpg',
        alt: 'Book cover for Mindful Co-Parenting',
        title: 'Mindful Co-Parenting by Jeremy S. Gaies and James B. Morris Jr.',
        amazonLink: 'https://www.amazon.ca/dp/B0711GNLJF?tag=custodybudd0c-20&language=en_CA',
        ariaLabel: 'View Mindful Co-Parenting on Amazon (paid link)',
    },
];

const BookList: React.FC = () => {
    const [showAllBooks, setShowAllBooks] = useState(false);
    const visibleBooks = showAllBooks ? books : books.slice(0, 3);
    const listId = 'book-list';

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
            
            <div id={listId} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                {visibleBooks.map((book, index) => (
                    <div 
                        key={book.amazonLink || book.title || index}
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
                        aria-expanded={showAllBooks}
                        aria-controls={listId}
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
