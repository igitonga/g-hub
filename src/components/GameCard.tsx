import { useRouter } from 'next/router'
import Image from 'next/image'
import { Star } from 'lucide-react'
interface PropsType {
    title: string;
    rating: number;
    imageUrl: string;
    description: string;
    id: string;
}

const GameCard = (props: PropsType) => {
    const router = useRouter();

    const handleRedirectToGame = (id: string) => {
        router.push(`/game/${id}`)
    }

    return (
        <div key={props.id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300" 
            onClick={() => handleRedirectToGame(props.id)}>
            <div className="relative">
            <Image src={props.imageUrl} alt={props.title} className="w-full h-48 object-cover" />
            <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-90 rounded-full px-3 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-white font-bold">{props.rating}</span>
            </div>
            </div>
            <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{props.title}</h3>
            <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400">Action</span>
                <span className="text-gray-400">N/A</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-gray-400">2000 reviews</span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
                Review
                </button>
            </div>
            </div>
        </div>
    )
}

export default GameCard