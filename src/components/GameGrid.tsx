
import React from 'react';
import GameCard from './GameCard';
import { Game } from '@/lib/gameData';

interface GameGridProps {
  games: Game[];
  currentGameId?: string;
}

const GameGrid: React.FC<GameGridProps> = ({ games, currentGameId }) => {
  return (
    <div className="game-grid">
      {games.map((game) => (
        <div key={game.id} className="game-grid-item">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
