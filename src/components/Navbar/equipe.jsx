import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const itensEquipe = [
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
        caminho: '/atletaMenu'
    },
    {
      titulo: 'Responsáveis',
      icone: (
          <SvgIcon>
              <EscalatorWarningIcon/>
          </SvgIcon>
      ),
      caminho: '/responsaveis'
    },
    {
      titulo: 'Chamadas',
      icone: (
          <SvgIcon>
              <ChecklistIcon/>
          </SvgIcon>
      ),
      caminho: '/chamadas'
    },
    {
        titulo: "Gerencial",
        icone: <SettingsIcon />,
        submenu: [
          {
            titulo: "Perfils",
            icone: <ManageAccountsIcon />,
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
          },
          {
            titulo: "Usuários",
            icone: <GroupIcon />,
            caminho: '/usuarios'
          }
        ]
    }
]