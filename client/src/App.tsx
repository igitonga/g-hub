import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import GameCard from './components/GameCard';

const LIST_GAMES = gql`
query GetGames {
  games {
    title,
    reviews {
      rating
    }
  }
}
`

interface Review {
  rating: number; // Adjust the type as necessary
}

interface Game {
  title: string;
  reviews: Review[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const { loading, error } = useQuery<{ games: Game[] }>(LIST_GAMES, {
    onCompleted: (queryData) => {
      setGames(queryData.games);
    }
  });

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error.message}</p>
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold">
        Games Review
      </h1>
      <div className="grid grid-cols-4 gap-4">
          {games.length > 0 && games.map(game => 
            <GameCard 
              title={game.title}
              rating={game.reviews[0]?.rating} />
          )}
        </div>
    </div>
  );
}

export default App;
