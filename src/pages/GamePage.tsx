import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Maximize } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameGrid from '@/components/GameGrid';
import { getGameById, getOtherGames } from '@/lib/gameData';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, [gameId]);

  const game = gameId ? getGameById(gameId) : undefined;
  const otherGames = gameId ? getOtherGames(gameId) : [];

  if (!game) {
    navigate('/');
    return null;
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;

    try {
      if (!isFullscreen) {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else if ((iframeRef.current as any).webkitRequestFullscreen) {
          (iframeRef.current as any).webkitRequestFullscreen();
        } else if ((iframeRef.current as any).mozRequestFullScreen) {
          (iframeRef.current as any).mozRequestFullScreen();
        } else if ((iframeRef.current as any).msRequestFullscreen) {
          (iframeRef.current as any).msRequestFullscreen();
        }
        
        if (isIOS) {
          iframeRef.current.style.position = 'fixed';
          iframeRef.current.style.top = '0';
          iframeRef.current.style.left = '0';
          iframeRef.current.style.width = '100%';
          iframeRef.current.style.height = '100%';
          iframeRef.current.style.zIndex = '9999';
          iframeRef.current.style.border = 'none';
          iframeRef.current.style.backgroundColor = '#000';
          setIsFullscreen(true);
          
          if (window.screen && (window.screen as any).orientation) {
            try {
              (window.screen as any).orientation.lock('landscape').catch(() => {
                // Orientation lock failed, which is expected on iOS
              });
            } catch (error) {
              // Browser doesn't support orientation lock
            }
          }
        }
      } else if (isIOS) {
        iframeRef.current.style.position = '';
        iframeRef.current.style.top = '';
        iframeRef.current.style.left = '';
        iframeRef.current.style.width = '';
        iframeRef.current.style.height = '';
        iframeRef.current.style.zIndex = '';
        iframeRef.current.style.border = '';
        iframeRef.current.style.backgroundColor = '';
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (isFullscreen && window.screen && (window.screen as any).orientation) {
        try {
          (window.screen as any).orientation.lock('landscape').catch(() => {
            // Orientation lock failed, which is expected on desktop or if permission is denied
          });
        } catch (error) {
          // Browser doesn't support orientation lock
        }
      }
    };

    if (isFullscreen) {
      handleOrientationChange();
    }

    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isFullscreen]);

  return (
    <>
      <Helmet>
        <title>{game.title} - Play Online For Free | Subway Surfers Universe</title>
        <meta name="description" content={`Play ${game.title} online for free! Run through the city, dodge trains, and collect coins. Enjoy endless running fun in this classic Subway Surfers game!`} />
        <meta property="og:title" content={`${game.title} - Play Online For Free | Subway Surfers Universe`} />
        <meta property="og:description" content={`Play ${game.title} online for free! Run through the city, dodge trains, and collect coins. Enjoy endless running fun in this classic Subway Surfers game!`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://subwaysurfersuniverse.com/game/${gameId}`} />
        <meta property="og:image" content={game.thumbnailUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game.title,
            "description": game.description,
            "image": game.thumbnailUrl,
            "genre": "Endless Runner",
            "playMode": "SinglePlayer",
            "applicationCategory": "Browser Game",
            "author": {
              "@type": "Organization",
              "name": "SYBO Games"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        
        <main className="flex-grow container mx-auto animate-fade-in">
          <div className={`game-frame-container mb-2 mt-[15px] ${isMounted ? 'animate-fade-in' : ''}`}>
            {game.iframeUrl ? (
              <>
                <iframe
                  ref={iframeRef}
                  src={game.iframeUrl}
                  title={game.title}
                  className="game-frame"
                  allowFullScreen
                  id="game-iframe"
                ></iframe>
                <button 
                  onClick={toggleFullscreen}
                  className="fullscreen-button text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-900 rounded-xl border border-gray-800">
                <p className="text-white">Game coming soon!</p>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mt-1 mb-3">{game.title}</h1>
          
          <div className="mb-6">
            <GameGrid games={otherGames} currentGameId={gameId} />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-300 text-sm md:text-base">{game.description}</p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GamePage;
