import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
        titulo: 'Perfil',
        icone: (
            <SvgIcon>
                <AccountCircleIcon/>
            </SvgIcon>
        ),
        caminho: '/perfil'
    }
]