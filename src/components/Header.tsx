
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-black py-4 px-6 sticky top-0 z-50 border-b border-gray-800 shadow-lg animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4">
        <Link to="/" className="text-white transition-all hover:opacity-90 duration-300">
          <img 
            src="/img/f2c77c17-5935-4b39-af69-648159d36b79.png" 
            alt="Subway Surfers Universe" 
            className={`${isMobile ? 'h-8' : 'h-10'}`} 
          />
        </Link>
        
        <div className={`${isMobile ? 'w-2/3' : 'w-1/3'}`}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
