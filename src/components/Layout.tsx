import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ReactNode, FC } from "react";

interface ChildrenData {
    children: ReactNode;
}

const Layout: FC<ChildrenData> = ({children}) => {
    return (
        <div>
            <nav className='flex justify-between bg-black py-3 px-10'>
                <Link href='/' className="text-center text-3xl font-bold text-white">Games Review</Link>
                <div className='flex'>
                <div className='mr-3'>
                    <form className="max-w-md mx-auto">   
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required />
                    </div>
                    </form>
                </div>
                <button className='text-black text-sm bg-white hover:bg-gray-100 rounded-lg px-5 py-2'>Login / Register</button>
                </div>
            </nav>
            <main className="px-10 py-5">
                <Toaster />
                {children}
            </main>
        </div>
    )
}

export default Layout;