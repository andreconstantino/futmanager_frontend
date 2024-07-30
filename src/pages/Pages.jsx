import {Navbar} from "../components/Navbar"
import Header from "../components/Header"
import { useState } from "react";
import Content from "../components/Content";
import { getToken, getUser } from "../services/storage";

export default function Pages() {

    const [isVisible, setIsVisible] = useState(true);
    const isUserLoggedIn = () => !getToken() || !getUser();

    if (isUserLoggedIn()) {
        window.location.href = '/';
    }

    return(
        <>
        <div className="flex relative">
                <Navbar isVisible = {isVisible} />
            <div className="flex-1">
                <Header onClick={() => setIsVisible((prev) => !prev)} />
                <Content/> 
            </div>  
            </div> 
        </>
    )

    
}