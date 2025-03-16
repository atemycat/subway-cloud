
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameGrid from '@/components/GameGrid';
import { games } from '@/lib/gameData';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Subway Surfers Universe - Play Free Subway Surfers Games Online</title>
        <meta name="description" content="Play all Subway Surfers games online for free! Run, dodge, and collect coins in different cities and themes around the world. Endless running fun!" />
        <meta property="og:title" content="Subway Surfers Universe - Play Free Subway Surfers Games Online" />
        <meta property="og:description" content="Play all Subway Surfers games online for free! Run, dodge, and collect coins in different cities and themes around the world. Endless running fun!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://subwaysurfersuniverse.com" />
        <meta property="og:image" content="/lovable-uploads/f2c77c17-5935-4b39-af69-648159d36b79.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        
        <main className="flex-grow container mx-auto py-4 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            Subway Surfers Games
          </h1>
          
          <div className="mt-4">
            <GameGrid games={games} />
          </div>

          <div className="mt-8 mb-4">
            <p className="text-gray-300 text-sm md:text-base px-4">
              Play all Subway Surfers games online for free! Run, dodge, and collect coins in different cities and themes around the world. Experience the thrill of endless running as you surf through subways, dodge trains, and escape from the grumpy inspector and his dog. Explore exciting locations from Paris to Tokyo, unlock cool characters, and upgrade your hoverboard for the ultimate subway surfing adventure!
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
