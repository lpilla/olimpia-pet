import {Spinner} from "@material-tailwind/react";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {Link} from "react-router-dom";

const MySpinnerComponent = () => {
    const { user,loading } = useContext(UserContext);

    return (

        <div className={"h-[100vh] w-[100vw] bg-gray-100 flex justify-center items-center"}>
            {loading || user === undefined ? <Spinner className="h-16 w-16 text-blue-500/10" /> : <div> <Link to={'/login'} ><p className={"text-center"}>EFFETTUA IL LOGIN</p></Link>
                <img src="https://usagif.com/wp-content/uploads/gifs/dancing-cat-66.gif" alt=""/> </div>}    </div>)
}

export  default MySpinnerComponent