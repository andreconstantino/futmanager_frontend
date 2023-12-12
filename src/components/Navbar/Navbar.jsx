import Logo from "../LoginPage/Logo"
import NavbarItens from "./NavbarItens";
import { itensAdmin } from "./admin";
import { itensAtleta } from "./atleta";
import { itensEquipe } from "./equipe";
import {getUser} from './../../services/storage'
import { Stack } from "@mui/material";

export function Navbar({ isVisible }){

  const user = getUser();
  var perfil = user.perfil_id

  let itens = []
  
  if (perfil == 1)  {
    itens = itensAdmin
  } else if (perfil == 3){
    itens = itensEquipe
  } else if (perfil == 4){
    itens = itensAtleta
  } else if (perfil == 5){
    itens = itensAtleta
  }
    return(
      <div className="flex">
          <div className={` bg-blue-fut-paz ${isVisible ? "w-72": "w-20"} duration-300 relative shadow-md`}>
             <div className={`${isVisible ? "pl-12":"p-1"}`}>
              <Logo />
              </div>
              <h3 className="ml-5 mb-5 font-bold text-red-400">Menu</h3>
              <div className="m-2">
                <nav>
                  <Stack component="ul"
                    spacing={0.5}
                    sx={{
                      listStyle: 'none',
                      p: 0,
                      m: 0
                    }}>
                    {itens.map((item, index) => {
                      return <NavbarItens item={item} key={index} isVisible={isVisible} />;
                    })}
                  </Stack>
                </nav> 
              </div>
          </div>
      </div>
    )
}