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
        {error && (
          <div className="flex items-center justify-center mt-12">
            <div className='font-bold'>
              {`Try refreshing page there was an error`}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

