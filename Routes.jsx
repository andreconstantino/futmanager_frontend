import { Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Pages from './src/pages/Pages';
import Atleta from './src/pages/Atleta/Atleta';
import CadastroPerfil from './src/pages/CadastroPerfil/CadastroPerfil';

export default function MyRoute(){
    return(
        <Routes>
            <Route path="/" element={<Login />}>
            </Route>
            <Route Component={Pages}>
                <Route path="/register" Component={Register} />
                <Route path="/home" Component={Home} />
                <Route path="/atleta/:id" Component={Atleta} />
                <Route path="/cadastroPerfil" Component={CadastroPerfil} />
            </Route>
        </Routes>
    )
}