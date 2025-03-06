import { TowerControl as GameController, Star, Users, Search, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070"
                    alt="Gaming Setup"
                    className="w-full h-full object-cover opacity-20"
                />
                </div>
                <nav className="relative z-10 container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                    <GameController className="w-8 h-8 text-purple-500" />
                    <span className="text-2xl font-bold text-white">GameCritic</span>
                    </div>

                    <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                        Get Started
                    </button>
                </div>
                </nav>
                
                <div className="relative z-10 container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Your Ultimate Gaming Review Platform
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of gamers sharing authentic reviews, ratings, and experiences across all gaming platforms.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition">
                        Start Reviewing
                    </button>
                    <Link href='/games' className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition">
                        Browse Reviews
                    </Link>
                </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 container mx-auto px-6">
                <h2 className="text-3xl font-bold text-white text-center mb-16">Why Choose GameCritic?</h2>
                <div className="grid md:grid-cols-3 gap-12">
                <div className="bg-gray-800 p-8 rounded-xl">
                    <Star className="w-12 h-12 text-yellow-500 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4">Trusted Reviews</h3>
                    <p className="text-gray-400">Real reviews from passionate gamers who've actually played the games.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl">
                    <Users className="w-12 h-12 text-blue-500 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4">Active Community</h3>
                    <p className="text-gray-400">Connect with fellow gamers, share experiences, and discover new titles.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-xl">
                    <Search className="w-12 h-12 text-green-500 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-4">Advanced Search</h3>
                    <p className="text-gray-400">Find exactly what you're looking for with our powerful search filters.</p>
                </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="bg-purple-900 py-16">
                <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                    <div className="text-4xl font-bold text-white mb-2">50K+</div>
                    <div className="text-purple-200">Active Users</div>
                    </div>
                    <div>
                    <div className="text-4xl font-bold text-white mb-2">100K+</div>
                    <div className="text-purple-200">Reviews</div>
                    </div>
                    <div>
                    <div className="text-4xl font-bold text-white mb-2">10K+</div>
                    <div className="text-purple-200">Games</div>
                    </div>
                    <div>
                    <div className="text-4xl font-bold text-white mb-2">4.8</div>
                    <div className="text-purple-200">Average Rating</div>
                    </div>
                </div>
                </div>
            </section> */}

            {/* Featured Games */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-white">Trending Reviews</h2>
                <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                    title: "Elden Ring",
                    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1650",
                    rating: 4.9,
                    reviews: 2345
                    },
                    {
                    title: "Cyberpunk 2077",
                    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1650",
                    rating: 4.5,
                    reviews: 1890
                    },
                    {
                    title: "God of War",
                    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1650",
                    rating: 4.8,
                    reviews: 2100
                    }
                ].map((game, index) => (
                    <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
                    <Image src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Award className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="text-yellow-500">{game.rating}</span>
                        </div>
                        <span className="text-gray-400">{game.reviews} reviews</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-purple-600 py-20">
                <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Ready to Share Your Gaming Experience?
                </h2>
                <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                    Join our community of passionate gamers and start sharing your thoughts on your favorite games today.
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100 transition">
                    Join GameCritic Now
                </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <GameController className="w-6 h-6 text-purple-500" />
                    <span className="text-xl font-bold text-white">GameCritic</span>
                    </div>
                    <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition">About</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    © 2025 GameCritic. All rights reserved.
                </div>
                </div>
            </footer>
        </div>
    );
}