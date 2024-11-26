import { Triangle } from "react-loader-spinner";

const Loader = () => {
    return(
        <Triangle 
        visible={true}
        height="100"
        width="100"
        color="#000000"
        ariaLabel="triangle-loading"/>
    )
}

export default Loader;