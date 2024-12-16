import React, { useEffect, useState } from "react"
import { GET_GAME } from "../lib/queries"
import { useQuery } from "@apollo/client"
import Loader from "../components/Loader"
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface Review {
    rating: number;
}

interface Game {
    title: string;
    reviews: Review[];
    imageUrl: string;
    description: string;
    platform: [string];
}

const GameInfo = () => {
    const [game, setGame] = useState<Game>();
    const { id } = useParams();

    const { loading, data } = useQuery(GET_GAME, {
        variables: {
            gameId: id
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    useEffect(() => {
        setGame(data?.game)
    },[data])
    
    if(loading){
        return (
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        );
    }

    return (
        <div >
            {game && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <img className="rounded-md" style={{ height: '400px', objectFit: 'cover' }} src={game?.imageUrl} alt="Game Poster"/>
                        <h1 className="mt-4 font-bold text-lg">Description</h1>
                        <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }}/>
                        <p className="mt-4">{game?.description}</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl">{game?.title}</h1>
                        <div className="mt-3">
                            {game?.platform.map(g => 
                                <span className="bg-gray-200 py-1.5 px-3 rounded-md mr-1.5 font-bold text-gray-700">{g}</span>
                            )}
                        </div>
                    </div>               
                </div>
            )}
        </div>
    )
}

export default GameInfo