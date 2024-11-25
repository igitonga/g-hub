import './App.css';
import { gql, useQuery } from "@apollo/client";
import GameCard from './components/GameCard';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';

const LIST_GAMES = gql`
  query getAllGames {
    games {
      title,
      reviews {
        rating
      }
    }
  }
`;

function App() {
  const [games, setGames] = useState([]);

  const { loading, error } = useQuery(LIST_GAMES, {
    onCompleted: (queryData) => {
      setGames(queryData.games);
    }
  });

  if(loading) return <p>loading...</p>
  if(error) return <p>Error: {error.message}</p>
  
  return (
    <div className="p-5">
        <h2 className='text-3xl font-bold underline text-center'>Games Review</h2>

        <div class="grid grid-cols-4 gap-4">
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
