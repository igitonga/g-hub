import Link from "next/link";
import Image from "next/image";

export default function Index() {
    return (
        <div className="flex items-center justify-center h-screen bg-black overflow-hidden box-shad"
            style={{
                boxShadow: 'inset 0 -30px 70px rgba(0, 20, 128, 0.5)',
            }}
        >
            <div className="w-6/12 text-center">
                <div className="absolute w-2/4 top-20">
                    <p className="text-4xl text-white font-bold mb-10">Your Ultimate Gaming Hub</p>
                    <p className="text-white mb-8">
                            Dive into the world of gaming like never before! At G-Hub, we bring you in-depth reviews, expert insights, 
                            and the latest news from the gaming universe. Whether you're a casual player or a hardcore gamer, our platform 
                            is your one-stop destination.
                    </p>
                    <Link href="/games" className="bg-white px-6 py-3 rounded-3xl text-black hover:bg-gray-100">See Reviews</Link>
                </div>
                <Image src="/hero_bg.png" alt="hero" width={800} height={400} className="relative top-40" />
            </div>
        </div>
    );
}