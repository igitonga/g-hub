import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Loader from './components/Loader';
import GameCard from './components/GameCard';
import AddGameModal from './components/AddGameModal';
import { LIST_GAMES } from './lib/api';
import { truncateString } from './utils/helpers';
import { Toaster } from 'react-hot-toast';
interface Review {
  rating: number; // Adjust the type as necessary
}

interface Game {
  title: string;
  reviews: Review[];
  imageUrl: string;
  description: string;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);

  const { loading, error } = useQuery<{ games: Game[] }>(LIST_GAMES, {
    onCompleted: (queryData) => {
      setGames(queryData.games);
    }
  });

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold">
        Games Review
      </h1>
      <Toaster />

      <button type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-non font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
       onClick={() => setOpenAddGameModal(true)}>
        Add Game
      </button>
      <AddGameModal openAddGameModal={openAddGameModal} setOpenAddGameModal={setOpenAddGameModal}/>

      {error && (
        <div className="flex items-center justify-center mt-12">
          <div className='font-bold'>
            {`${error.message}! Try refreshing page`}
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {games.length > 0 && games.map((game, index) => 
          <GameCard
            key={index} 
            title={game.title}
            rating={game.reviews[0]?.rating}
            imageUrl={game.imageUrl}
            description={truncateString(game.description)} />
        )}
      </div>
    </div>
  );
}

export default App;
