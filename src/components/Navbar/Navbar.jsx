import Logo from "../LoginPage/Logo"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import { Roboto } from "../../styles/Styles";


export function Navbar({ isVisible }){

    const [open, setOpen] = useState(true);  

    return(
        <div className="flex">
            <div className={` bg-blue-fut-paz ${open ? "w-72": "w-20"} duration-300 relative shadow-md`}>
                <KeyboardArrowLeftIcon className={`bg-white text-red-400 rounded-full absolute -right-3 top-5 cursor-pointer shadow-md 
                ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
               <div className={`${open ? "pl-12":"p-1"}`}>
                <Logo />
                </div>
                <div className="m-2">
                    <Roboto>
                   <nav>    
                    <ul className="text-white">
                      <li className={`${open ? "p-4":"p-1"} cursor-pointer hover:bg-blue-fut-paz-900 rounded-lg duration-300`}>
                        {!open ? <HomeIcon sx={{fontSize: 40}} className="text-red-400 m-2"/> : <HomeIcon className="text-red-400 m-auto"/>} 
                        {open ? " Home": ""}
                      </li>
                      <li className={`${open ? "p-4":"p-1"} cursor-pointer hover:bg-blue-fut-paz-900 rounded-lg duration-300`}>
                        {!open ? <ChecklistIcon sx={{fontSize: 40}} className="text-red-400 m-2" /> : <ChecklistIcon className="text-red-400" />} 
                        {open ? " Lista de presença": ""}
                      </li> 
                      <li className={`${open ? "p-4":"p-1"} cursor-pointer hover:bg-blue-fut-paz-900 rounded-lg duration-300`}>
                        {!open ? <SettingsIcon sx={{fontSize: 40}} className="text-red-400 m-2"/> : <SettingsIcon className="text-red-400"/>} 
                        {open ? " Meu cadastro": ""}
                      </li> 
                      <li className={`${open ? "p-4":"p-1"} cursor-pointer hover:bg-blue-fut-paz-900 rounded-lg duration-300`}>
                        {!open ? <FlagIcon sx={{fontSize: 40}} className="text-red-400 m-2" /> : <FlagIcon className="text-red-400" />} 
                        {open ? " Perfil da Equipe": ""}
                      </li>   
                    </ul>
                    </nav> 
                    </Roboto>
                </div>
            </div>
        </div>
    )
}