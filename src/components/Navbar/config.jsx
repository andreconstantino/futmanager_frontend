import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
        titulo: "Gerencial",
        icone: <SettingsIcon />,
        submenu: [
          {
            titulo: "Perfils",
            icone: <AccountCircleIcon />,
            caminho: '/cadastroPerfil'
          },
          {
            titulo: "Categorias",
            icone: <ContentPasteSearchIcon />,
            caminho: '/cadastroCategoria'
          },
          {
            titulo: "Chamadas",
            icone: <AssignmentIcon />,
            caminho: '/cadastroChamadaTipo'
          },
          {
            titulo: "Advertências",
            icone: <WarningAmberIcon />,
            caminho: '/cadastroAdvertenciaTipo'
          }
        ]
    }
]