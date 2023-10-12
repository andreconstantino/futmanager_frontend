import Logo from "../LoginPage/Logo"
import { Roboto } from "../../styles/Styles";
import NavbarItens from "./NavbarItens";
import { itens } from "./config";

export function Navbar({ isVisible }){
    return(
      <div className="flex">
          <div className={` bg-blue-fut-paz ${isVisible ? "w-72": "w-20"} duration-300 relative shadow-md`}>
             <div className={`${isVisible ? "pl-12":"p-1"}`}>
              <Logo />
              </div>
              <h3 className="ml-5 mb-5 font-bold text-red-400">Menu</h3>
              <div className="m-2">
                <Roboto>
                  <nav>    
                  {itens.map((item, index) => {
                    const active = item.path ? (pathname === item.path) : false;
                    return <NavbarItens key={index} titulo={item.titulo} icone={item.icone} caminho={item.caminho} isVisible={isVisible}/>
                  })}
                  </nav> 
                </Roboto>
              </div>
          </div>
      </div>
    )
}