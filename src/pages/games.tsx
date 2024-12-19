import { useState } from "react";
import { useQuery } from "@apollo/client";
import { LIST_GAMES } from "@/lib/queries";
import AddGameModal from "@/components/AddGameModal";
import GameCard from "@/components/GameCard";
import { truncateString } from "@/helpers";
import Layout from "@/components/Layout";

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

interface GamesData {
  games: Game[]
}

export default function Games() {
  const {data, loading, error} = useQuery<GamesData>(LIST_GAMES);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading....</p>
      </div>
    );
  }  

  if(data){
    return (
      <Layout>
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
              {`Try refreshing page there was an error`}
            </div>
          </div>
        )}

        <div className="grid grid-cols-6 gap-4">
          {data.games.length > 0 && data.games.map(game => 
            <GameCard
              key={game.id} 
              id={game.id}
              title={game.title}
              rating={game.reviews[0]?.rating}
              imageUrl={game.imageUrl}
              description={truncateString(game.description)} />
          )}
        </div>
      </Layout>
    );
  }

}

