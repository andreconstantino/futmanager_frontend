import LoginPage from "../components/LoginPage";
import { BackgroundSoccer, BlackBackground } from "../styles/Styles";


export default function Login(){
    return(
       <BackgroundSoccer>
        <BlackBackground>
        <LoginPage/>
        </BlackBackground>
       </BackgroundSoccer>
    )
}