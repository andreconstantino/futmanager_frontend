import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {getUser} from './../../services/storage'

const user = getUser();

export const itensAtleta = [
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
      titulo: 'Minhas informações',
      icone: (
          <SvgIcon>
              <AccountBoxIcon/>
          </SvgIcon>
      ),
      caminho: '/atletaview/' + user.atleta_id
    },
    {
      titulo: 'Meus responsáveis',
      icone: (
          <SvgIcon>
              <EscalatorWarningIcon/>
          </SvgIcon>
      ),
      caminho: '/responsavellistview'
    },
    {
        titulo: 'Frequência',
        icone: (
            <SvgIcon>
                <ViewTimelineIcon/>
            </SvgIcon>
        ),
        caminho: '/frequencia/' + user.atleta_id
    },
    {
        titulo: 'Advertências',
        icone: (
            <SvgIcon>
                <WarningAmberIcon/>
            </SvgIcon>
        ),
        caminho: '/advertencias/' + user.atleta_id
    },
]