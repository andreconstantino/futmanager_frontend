import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Section from "../components/Section"

export default function Home(){
    return(
        <>
        <div className="flex relative">
                <Navbar />
            <div className="flex-1">
                <Header />  
                <Section />
            </div>  
        </div> 
        </>
    )
}