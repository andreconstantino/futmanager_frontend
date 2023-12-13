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
import CadastroAdvertencia from './src/pages/CadastroAdvertencia/CadastroAdvertencia';
import CadastroAdvertenciaForm from './src/pages/CadastroAdvertencia/CadastroAdvertenciaForm';
import AtletaMenu from './src/pages/Atleta/AtletaMenu';
import AtletaList from './src/pages/Atleta/AtletaList';
import AtletaForm from './src/pages/Atleta/AtletaForm';
import CadastroUsuario from './src/pages/Usuarios/CadastroUsuario';
import CadastroUsuarioForm from './src/pages/Usuarios/CadastroUsuarioForm';
import ResponsavelList from './src/pages/Responsavel/ResponsavelList';
import ResponsavelForm from './src/pages/Responsavel/ResponsavelForm';
import Chamada from './src/pages/Chamada/Chamada';
import ChamadaForm from './src/pages/Chamada/ChamadaForm';
import Presencas from './src/pages/Presencas/Presencas';
import PresencasView from './src/pages/Presencas/PresencasView';
import AtletaView from './src/pages/AtletaView/AtletaView';
import AtletaViewEdit from './src/pages/AtletaView/AtletaViewEdit';
import ResponsavelView from './src/pages/ResponsavelView/ResponsavelView';
import ResponsavelViewEdit from './src/pages/ResponsavelView/ResponsavelViewEdit';
import ResponsavelListView from './src/pages/ResponsavelView/ResponsavelListView';
import Frequencia from './src/pages/Frequencia/Frequencia';
import Advertencias from './src/pages/Advertencias/Advertencias';

export default function MyRoute(){
    return(
        <Routes>
            <Route path="/" element={<Login />}>
            </Route>
            <Route Component={Pages}>
                <Route path="/home" Component={Home} />
                <Route path="/cadastroPerfil" Component={CadastroPerfil} />
                <Route path="/cadastroPerfilForm/:id" Component={CadastroPerfilForm} />
                <Route path="/cadastroCategoria" Component={CadastroCategoria} />
                <Route path="/cadastroCategoriaForm/:id" Component={CadastroCategoriaForm} />
                <Route path="/cadastroChamadaTipo" Component={ChamadaTipo} />
                <Route path="/cadastroChamadaTipoForm/:id" Component={ChamadaTipoForm} />
                <Route path="/cadastroAdvertenciaTipo" Component={CadastroAdvertencia} />
                <Route path="/cadastroAdvertenciaTipoForm/:id" Component={CadastroAdvertenciaForm} />
                <Route path="/atleta/:id" Component={Atleta} />
                <Route path="/atletaForm/:id/:categoria_id" Component={AtletaForm} />
                <Route path="/atletaMenu" Component={AtletaMenu} />
                <Route path="/atletaList/:id" Component={AtletaList} />
                <Route path="/usuarios/" Component={CadastroUsuario} />
                <Route path="/usuarioForm/:id" Component={CadastroUsuarioForm} />
                <Route path="/responsaveis/" Component={ResponsavelList} />
                <Route path="/responsaveisForm/:id" Component={ResponsavelForm} />
                <Route path="/chamadas/" Component={Chamada} />
                <Route path="/chamadasForm/:id" Component={ChamadaForm} />
                <Route path="/presencas/:id" Component={Presencas} />
                <Route path="/presencasView/:id" Component={PresencasView} />
                <Route path="/atletaview/:id" Component={AtletaView} />
                <Route path="/atletaviewedit/:id" Component={AtletaViewEdit} />
                <Route path="/responsavellistview/" Component={ResponsavelListView} />
                <Route path="/responsavelview/:id" Component={ResponsavelView} />
                <Route path="/responsavelviewedit/:id" Component={ResponsavelViewEdit} />
                <Route path="/frequencia/:id" Component={Frequencia} />
                <Route path="/advertencias/:id" Component={Advertencias} />
            </Route>
        </Routes>
    )
}