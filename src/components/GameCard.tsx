
import React from 'react';
import { Link } from 'react-router-dom';
import { useImageLazyLoad } from '@/hooks/useImageLazyLoad';
import { Game } from '@/lib/gameData';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const { isVisible, imgRef } = useImageLazyLoad();

  return (
    <Link
      to={`/game/${game.id}`}
      onClick={onClick}
      className="game-card block w-full animate-scale-in transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
      aria-label={`Play ${game.title}`}
    >
      <div className="relative w-full max-w-[120px] h-[120px] overflow-hidden rounded-xl mx-auto">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" style={{ display: isVisible ? 'none' : 'block' }}></div>
        <img
          ref={imgRef}
          src={isVisible ? game.thumbnailUrl : ''}
          alt={game.title}
          width="120"
          height="120"
          className="w-full h-full object-cover rounded-xl border border-gray-800 shadow-md"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
          <p className="text-white text-xs font-medium truncate w-full text-center">{game.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
