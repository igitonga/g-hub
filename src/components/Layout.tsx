import { ReactNode, FC } from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Search, TowerControl as GameController } from "lucide-react";

interface ChildrenData {
    children: ReactNode;
}

const Layout: FC<ChildrenData> = ({children}) => {
    return (
        <div className="min-h-screen bg-gray-900">
            <header className="bg-gray-800 shadow-lg">
                <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <GameController className="w-8 h-8 text-purple-500" />
                        <Link href='/' className="text-2xl font-bold text-white">GameCritic</Link>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                    <div className="relative w-full">
                        <input
                        type="text"
                        placeholder="Search games..."
                        className="w-full bg-gray-700 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-gray-300 hover:text-white transition">Browse</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">New Releases</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">Top Rated</a>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
                        Sign In
                    </button>
                    </nav>
                </div>
                </div>
            </header>
            <main className="px-10 py-5">
                <Toaster />
                {children}
            </main>
        </div>
    )
}

export default Layout;