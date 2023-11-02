import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BadgeIcon from '@mui/icons-material/Badge';

export const itens = [
    {
        titulo: 'Home',
        icone: (
            <SvgIcon>
                <HomeIcon/>
            </SvgIcon>
        ),
        caminho: '/home'
    },
    {
        titulo: 'Atletas',
        icone: (
            <SvgIcon>
                <BadgeIcon/>
            </SvgIcon>
        ),
        caminho: '/atleta/0'
    },
    {
        titulo: 'Perfils Cadastrados',
        icone: (
            <SvgIcon>
                <AccountCircleIcon/>
            </SvgIcon>
        ),
        caminho: '/cadastroPerfil'
    },
    {
        titulo: 'Categorias Cadastradas',
        icone: (
            <SvgIcon>
                <ContentPasteSearchIcon/>
            </SvgIcon>
        ),
        caminho: '/cadastroCategoria'
    },
    {
        titulo: 'Tipos de Chamadas',
        icone: (
            <SvgIcon>
                <AssignmentIcon/>
            </SvgIcon>
        ),
        caminho: '/cadastroChamadaTipo'
    }
]