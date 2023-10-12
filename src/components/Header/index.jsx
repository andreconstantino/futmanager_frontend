import { Badge, IconButton } from "@mui/material"
import User from "../Header/User"
import MenuIcon from '@mui/icons-material/Menu';


export default function Header({onClick }){
    return (
      <div className=" bg-white h-16 w-full shadow-md flex justify-between">
      <div className="p-3">
        <IconButton onClick={onClick}>
          <Badge>
            <MenuIcon className="text-red-400"/>
          </Badge>
        </IconButton> 
        </div>
      <div className="p-3 flex flex-row">
              <User />
            </div>
      </div>
    )
}