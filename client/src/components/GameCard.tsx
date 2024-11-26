interface PropsType {
    title: string;
    rating: number;
    imageUrl: string;
    description: string;
}

const GameCard = (props: PropsType) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={props.imageUrl} style={{ height: '180px', objectFit: 'cover' }} alt="Game's poster"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.title}</div>
                <p className="text-gray-700 text-sm">
                    {props.description}
                </p>
            </div>
            <div className="px-6 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {props.rating ? `${props.rating} stars` : "No Reviews"}
                </span>
            </div>
        </div>
    )
}

export default GameCard