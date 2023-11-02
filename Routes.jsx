import { Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Pages from './src/pages/Pages';
import Atleta from './src/pages/Atleta/Atleta';
import CadastroPerfil from './src/pages/CadastroPerfil/CadastroPerfil';
import CadastroPerfilForm from './src/pages/CadastroPerfil/CadastroPerfilForm';
import CadastroCategoria from './src/pages/CadastroCategoria/CadastroCategoria';
import CadastroCategoriaForm from './src/pages/CadastroCategoria/CadastroCategoriaForm';
import ChamadaTipo from './src/pages/ChamadaTipo/ChamadaTipo';
import ChamadaTipoForm from './src/pages/ChamadaTipo/ChamadaTipoForm';

export default function MyRoute(){
    return(
        <Routes>
            <Route path="/" element={<Login />}>
            </Route>
            <Route Component={Pages}>
                <Route path="/home" Component={Home} />
                <Route path="/atleta/:id" Component={Atleta} />
                <Route path="/cadastroPerfil" Component={CadastroPerfil} />
                <Route path="/cadastroPerfilForm/:id" Component={CadastroPerfilForm} />
                <Route path="/cadastroCategoria" Component={CadastroCategoria} />
                <Route path="/cadastroCategoriaForm/:id" Component={CadastroCategoriaForm} />
                <Route path="/cadastroChamadaTipo" Component={ChamadaTipo} />
                <Route path="/cadastroChamadaTipoForm/:id" Component={ChamadaTipoForm} />
            </Route>
        </Routes>
    )
}