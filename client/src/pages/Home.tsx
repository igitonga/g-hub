import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Loader from '../components/Loader';
import GameCard from '../components/GameCard';
import AddGameModal from '../components/AddGameModal';
import { LIST_GAMES } from '../lib/queries';
import { truncateString } from '../utils/helpers';


interface Review {
  rating: number; // Adjust the type as necessary
}

interface Game {
  id: string;
  title: string;
  reviews: Review[];
  imageUrl: string;
  description: string;
}

function Home() {
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
    <div className="">
      <div className='flex justify-between items-center mb-2'>
        <div>
          <button type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-non font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => setOpenAddGameModal(true)}>
            Add Game
          </button>
        </div>
      </div>
      
      <AddGameModal openAddGameModal={openAddGameModal} setOpenAddGameModal={setOpenAddGameModal}/>

      {error && (
        <div className="flex items-center justify-center mt-12">
          <div className='font-bold'>
            {`${error.message}! Try refreshing page`}
          </div>
        </div>
      )}
      <div className="grid grid-cols-6 gap-4">
        {games.length > 0 && games.map(game => 
          <GameCard
            key={game.id} 
            id={game.id}
            title={game.title}
            rating={game.reviews[0]?.rating}
            imageUrl={game.imageUrl}
            description={truncateString(game.description)} />
        )}
      </div>
    </div>
  );
}

export default Home;
