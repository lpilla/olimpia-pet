import {Alert, Button} from "@material-tailwind/react";
import React, {useState} from "react";
import {CgDanger} from "react-icons/cg";

const MyAlert = ({m, open , onCloseAlert}) => {
    return    <>
    <Alert open={open} onClose={() => {
        onCloseAlert()
    }} className={"absolute bottom-0 right-0"} color="red" icon={<CgDanger className="h-6 w-6" />}>
        {m}
    </Alert> </>
}

export default MyAlert