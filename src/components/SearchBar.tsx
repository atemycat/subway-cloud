
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchGames, Game } from '@/lib/gameData';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const filteredResults = searchGames(query);
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleGameSelect = (gameId: string) => {
    navigate(`/game/${gameId}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games..."
          className="w-full py-2 px-4 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-fade-up">
          <ul className="py-1">
            {results.map((game) => (
              <li 
                key={game.id}
                onClick={() => handleGameSelect(game.id)}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-left text-white transition-colors"
              >
                {game.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
