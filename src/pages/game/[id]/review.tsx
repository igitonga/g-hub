import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Star } from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';

const Review = () => {
    const router = useRouter();
    const { id } = router.query;

    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission
        console.log({ gameId: id, rating, review });
    };

    const handleBack = () => {
        router.back(); 
    };
    
    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Write a Review</h1>
                
                <div className="bg-gray-800 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-6">
                    <Image
                        src="https://images.unsplash.com/photo-1642176849879-92f85770f212?auto=format&fit=crop&q=80&w=1650"
                        alt="Game"
                        className="w-24 h-24 object-cover rounded-lg mr-4"
                        width={800} 
                        height={400}
                    />
                    <div>
                    <h2 className="text-xl font-bold text-white">The Legend of Zelda: Tears of the Kingdom</h2>
                    <p className="text-gray-400">Nintendo • Action Adventure</p>
                    </div>
                </div>
        
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                    <label className="block text-white mb-4">Your Rating</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                            className={`w-8 h-8 ${
                                star <= (hoveredRating || rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-600'
                            }`}
                            />
                        </button>
                        ))}
                    </div>
                    </div>
        
                    <div className="mb-6">
                    <label htmlFor="review" className="block text-white mb-2">
                        Your Review
                    </label>
                    <textarea
                        id="review"
                        rows={6}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Share your thoughts about the game..."
                    />
                    </div>
        
                    <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleBack}
                        type="button"
                        className="px-6 py-3 rounded-full text-gray-300 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
                    >
                        Submit Review
                    </button>
                    </div>
                </form>
                </div>
        
                <div className="text-gray-400 text-sm">
                <h3 className="text-white text-lg font-semibold mb-2">Review Guidelines</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Focus on your personal experience with the game</li>
                    <li>Avoid spoilers or use spoiler tags when necessary</li>
                    <li>Be respectful and constructive in your criticism</li>
                    <li>Minimum length: 100 characters</li>
                </ul>
                </div>
            </div>
        </Layout>
    );
}

export default Review;