import {SvgIcon} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
      caminho: '/atletaview/' + user.id
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
]