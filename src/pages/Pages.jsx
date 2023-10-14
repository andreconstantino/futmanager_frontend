import {Navbar} from "../components/Navbar"
import Header from "../components/Header"
import { useEffect, useState } from "react";
import Content from "../components/Content";
import { get } from "../services/http";
import { setUser } from "../services/storage";

export default function Pages() {

    const [isVisible, setIsVisible] = useState(true);

    const me =() => {
        get('api/me').then((response) => {
          setUser(response.data);
        }).catch ((error) => {
          console.log(error)
        })
      }

      useEffect(() => {
        me()
      }, []);

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