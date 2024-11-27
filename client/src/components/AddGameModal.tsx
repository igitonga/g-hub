import { useRef } from "react";
import Modal from "./Modal";
import { useMutation } from "@apollo/client";
import { ADD_GAME, LIST_GAMES } from "../lib/queries";
import toast from "react-hot-toast";

interface PropsType {
    openAddGameModal: boolean;
    setOpenAddGameModal: (open: boolean) => void;
}

interface Game {
    id: string;
    name: string;
};

interface ListGamesQueryResult {
    games: Game[];
};

const AddGameModal = (props: PropsType) => {
    const titleRef = useRef<HTMLInputElement | null>(null); 
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const imageURLRef = useRef<HTMLInputElement | null>(null);
    const platformsRef = useRef<HTMLSelectElement | null>(null);

    const [addGame, { loading }] = useMutation(ADD_GAME, {
        onCompleted: () => {
            toast.success("Game has been added");
            handleCloseModal();
        },
        update: (cache, { data: { addGame } }) => {
            // Type the result of readQuery
            const existingGames = cache.readQuery<ListGamesQueryResult>({ query: LIST_GAMES });
            
            if (existingGames) {
                cache.writeQuery({
                    query: LIST_GAMES,
                    data: {
                        games: [...existingGames.games, addGame], // Add the new game to the list
                    },
                });
            }
        },
        onError: (error) => {
            toast.error("Failed to add game");
        }
    });

    const handleAddGame = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await addGame({
            variables: {
                game: {
                    title: titleRef.current?.value,
                    description: descriptionRef.current?.value,
                    imageUrl: imageURLRef.current?.value,
                    platform: platformsRef.current !== null && Array.from(platformsRef.current.selectedOptions, (option) => option.value)
                }
            }
        })
    }

    const handleCloseModal = () => {
        if (titleRef.current) {
            titleRef.current.value = ''; 
        }
        if (descriptionRef.current) {
            descriptionRef.current.value = '';
        }
        if (imageURLRef.current) {
            imageURLRef.current.value = '';
        }
        if (platformsRef.current) {
            platformsRef.current.selectedIndex = -1;
        }

        props.setOpenAddGameModal(false);
    }

    return (
        <Modal open={props.openAddGameModal} onClose={() => props.setOpenAddGameModal(false)}>
            <div className="w-full">
                <div className="mx-auto my-4">
                    <h3 className="text-lg font-black text-gray-800">Add Game</h3>
                </div>
                <form onSubmit={handleAddGame}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Title
                        </label>
                        <input ref={titleRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Description
                        </label>
                        <textarea ref={descriptionRef}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Image URL
                        </label>
                        <input ref={imageURLRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="imageUrl" type="text" placeholder="Image link" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">
                            Platforms
                        </label>
                        <select ref={platformsRef} multiple className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="PS">PS</option>
                            <option value="XBOX">XBOX</option>
                            <option value="PC">PC</option>
                            <option value="Switch">Switch</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                    <button
                        type="submit" 
                        className="btn bg-black text-white rounded-lg text-sm px-5 py-2.5 w-full"
                        disabled={loading ? true : false}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        className="btn bg-red-500 text-white rounded-lg px-5 py-2.5 w-full"
                        onClick={() => handleCloseModal()}
                    >
                        Cancel
                    </button>
                </div>
                </form>
                
            </div>
        </Modal>
    )
}

export default AddGameModal;