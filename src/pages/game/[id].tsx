import React from "react"
import { GET_GAME } from "@/lib/queries";
import { useQuery } from "@apollo/client"
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
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

interface GameData {
    game: Game
}

const GameInfo = () => {
    const router = useRouter();
    const { id } = router.query;

    const { loading, data, error } = useQuery<GameData>(GET_GAME, {
        variables: {
            gameId: id
        }
    });
    
    if(loading){
        return (
          <div className="flex items-center justify-center h-screen">
            <p>Loading....</p>
          </div>
        );
    }

    if(error)
        return toast.error(error.message)

    return (
        <Layout >
            {data && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="relative" style={{ height: '400px' }}>
                            <Image className="rounded-md object-cover" fill src={data.game?.imageUrl} alt="Game Poster"/>
                        </div>
                        <h1 className="mt-4 font-bold text-lg">Description</h1>
                        <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }}/>
                        <p className="mt-4">{data.game?.description}</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl">{data.game?.title}</h1>
                        <div className="mt-3">
                            {data.game?.platform.map((g, index) => 
                                <span key={index} className="bg-gray-200 py-1.5 px-3 rounded-md mr-1.5 font-bold text-gray-700">{g}</span>
                            )}
                        </div>
                    </div>               
                </div>
            )}
        </Layout>
    )
}

export default GameInfo