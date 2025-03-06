import React from "react"
import { GET_GAME } from "@/lib/queries";
import { useQuery } from "@apollo/client"
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Share2, Trophy, Clock, Users, MessageSquare, ThumbsUp, Award } from 'lucide-react';
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

    const gameDetails = {
        id: 1,
        title: "The Legend of Zelda: Tears of the Kingdom",
        image: "https://images.unsplash.com/photo-1642176849879-92f85770f212?auto=format&fit=crop&q=80&w=1650",
        rating: 4.9,
        reviews: 3421,
        genre: "Action Adventure",
        releaseDate: "May 12, 2023",
        developer: "Nintendo",
        publisher: "Nintendo",
        platforms: ["Nintendo Switch"],
        description: "Return to Hyrule and the skies above in this sequel to The Legend of Zelda: Breath of the Wild. Princess Zelda has disappeared, and a new darkness threatens the land. As Link, you'll explore vast landscapes, floating islands, and treacherous dungeons while wielding the power to manipulate time and create amazing constructions.",
        features: [
          "Vast open world exploration",
          "New sky islands to discover",
          "Enhanced building mechanics",
          "Improved combat system",
          "New abilities and powers"
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1650",
          "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1650",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1650"
        ],
        recentReviews: [
          {
            user: "Sarah K.",
            rating: 5,
            comment: "A masterpiece that builds upon everything that made Breath of the Wild great while adding its own unique twists.",
            date: "2023-10-15"
          },
          {
            user: "Mike R.",
            rating: 4.8,
            comment: "The new building mechanics open up endless possibilities for creative problem-solving.",
            date: "2023-10-12"
          }
        ]
      };
    

    return (
        <Layout >
            <div className="relative rounded-xl overflow-hidden mb-8">
                <Image 
                    src={data?.game.imageUrl ?? 'https://images.unsplash.com/photo-1642176849879-92f85770f212?auto=format&fit=crop&q=80&w=1650'} 
                    alt={data?.game.title ?? 'Game'}
                    className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between">
                        <div>
                        <h1 className="text-4xl font-bold text-white mb-4">{data?.game.title}</h1>
                        <div className="flex items-center space-x-4 text-gray-300">
                            <span>{gameDetails.developer}</span>
                            <span>•</span>
                            <span>{gameDetails.genre}</span>
                            <span>•</span>
                            <span>{gameDetails.releaseDate}</span>
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <Link href={`/game/${id}/review`} className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition flex items-center">
                            <Star className="w-5 h-5 mr-2" />
                            Write Review
                        </Link>
                        <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition">
                            <Share2 className="w-5 h-5" />
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
               {/* Game Details Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Main Content */}
                 <div className="lg:col-span-2">
                   {/* Quick Stats */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                     <div className="bg-gray-800 p-4 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Trophy className="w-6 h-6 text-yellow-500" />
                         <div>
                           <div className="text-2xl font-bold text-white">{gameDetails.rating}</div>
                           <div className="text-gray-400 text-sm">Rating</div>
                         </div>
                       </div>
                     </div>
                     <div className="bg-gray-800 p-4 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <MessageSquare className="w-6 h-6 text-blue-500" />
                         <div>
                           <div className="text-2xl font-bold text-white">{gameDetails.reviews}</div>
                           <div className="text-gray-400 text-sm">Reviews</div>
                         </div>
                       </div>
                     </div>
                     <div className="bg-gray-800 p-4 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Clock className="w-6 h-6 text-green-500" />
                         <div>
                           <div className="text-2xl font-bold text-white">40+</div>
                           <div className="text-gray-400 text-sm">Hours</div>
                         </div>
                       </div>
                     </div>
                     <div className="bg-gray-800 p-4 rounded-xl">
                       <div className="flex items-center space-x-3">
                         <Users className="w-6 h-6 text-purple-500" />
                         <div>
                           <div className="text-2xl font-bold text-white">1.2M</div>
                           <div className="text-gray-400 text-sm">Players</div>
                         </div>
                       </div>
                     </div>
                   </div>
       
                   {/* Description */}
                   <div className="bg-gray-800 rounded-xl p-6 mb-8">
                     <h2 className="text-xl font-bold text-white mb-4">About</h2>
                     <p className="text-gray-300 leading-relaxed">{gameDetails.description}</p>
                   </div>
       
                   {/* Screenshots */}
                   <div className="mb-8">
                     <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {gameDetails.screenshots.map((screenshot, index) => (
                         <Image 
                           key={index}
                           src={screenshot}
                           alt={`Screenshot ${index + 1}`}
                           className="rounded-xl w-full h-48 object-cover hover:opacity-75 transition cursor-pointer"
                         />
                       ))}
                     </div>
                   </div>
       
                   {/* Features */}
                   <div className="bg-gray-800 rounded-xl p-6 mb-8">
                     <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {gameDetails.features.map((feature, index) => (
                         <div key={index} className="flex items-center space-x-3">
                           <Award className="w-5 h-5 text-purple-500" />
                           <span className="text-gray-300">{feature}</span>
                         </div>
                       ))}
                     </div>
                   </div>
       
                   {/* Recent Reviews */}
                   <div>
                     <h2 className="text-xl font-bold text-white mb-4">Recent Reviews</h2>
                     <div className="space-y-4">
                       {gameDetails.recentReviews.map((review, index) => (
                         <div key={index} className="bg-gray-800 rounded-xl p-6">
                           <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center space-x-3">
                               <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                 <span className="text-white font-bold">{review.user[0]}</span>
                               </div>
                               <div>
                                 <div className="text-white font-semibold">{review.user}</div>
                                 <div className="text-gray-400 text-sm">{review.date}</div>
                               </div>
                             </div>
                             <div className="flex items-center">
                               <Star className="w-5 h-5 text-yellow-500 mr-1" />
                               <span className="text-white font-bold">{review.rating}</span>
                             </div>
                           </div>
                           <p className="text-gray-300">{review.comment}</p>
                           <div className="flex items-center space-x-4 mt-4">
                             <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition">
                               <ThumbsUp className="w-4 h-4" />
                               <span>Helpful</span>
                             </button>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
       
                 {/* Sidebar */}
                 <div>
                   {/* Game Info Card */}
                   <div className="bg-gray-800 rounded-xl p-6 mb-6">
                     <h3 className="text-lg font-bold text-white mb-4">Game Info</h3>
                     <div className="space-y-4">
                       <div>
                         <div className="text-gray-400 mb-1">Developer</div>
                         <div className="text-white">{gameDetails.developer}</div>
                       </div>
                       <div>
                         <div className="text-gray-400 mb-1">Publisher</div>
                         <div className="text-white">{gameDetails.publisher}</div>
                       </div>
                       <div>
                         <div className="text-gray-400 mb-1">Release Date</div>
                         <div className="text-white">{gameDetails.releaseDate}</div>
                       </div>
                       <div>
                         <div className="text-gray-400 mb-1">Platforms</div>
                         <div className="flex flex-wrap gap-2">
                           {gameDetails.platforms.map((platform, index) => (
                             <span 
                               key={index}
                               className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                             >
                               {platform}
                             </span>
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>
       
                   {/* Similar Games */}
                   <div className="bg-gray-800 rounded-xl p-6">
                     <h3 className="text-lg font-bold text-white mb-4">Similar Games</h3>
                     <div className="space-y-4">
                       {[1, 2, 3].map((_, index) => (
                         <div key={index} className="flex space-x-4">
                           <Image
                             src={`https://images.unsplash.com/photo-${index + 1}?auto=format&fit=crop&q=80&w=150`}
                             alt="Similar Game"
                             className="w-20 h-20 object-cover rounded-lg"
                           />
                           <div>
                             <div className="text-white font-semibold mb-1">Similar Game {index + 1}</div>
                             <div className="flex items-center">
                               <Star className="w-4 h-4 text-yellow-500 mr-1" />
                               <span className="text-gray-400">4.{8 - index}</span>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>

        </Layout>
    )
}

export default GameInfo