import { Box, ButtonBase } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarItens(props){
    const {titulo, icone, caminho, isVisible} = props
    const location = useLocation();
    const navegacao = useNavigate();

    return (
        <li className="list-none">
            <ButtonBase className={`hover:bg-blue-fut-paz-900 p-3 mb-2 ${location.pathname == caminho ? 'bg-blue-fut-paz-900 text-white' : 'text-gray-400'}`}
                sx={{
                alignItems: 'center',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '100%',
                listStyle: 'none',
                }}
                onClick={()=> {navegacao(caminho)}}
            > 
            {icone && (
            <Box component="span" className={`${!isVisible ? 'p-2' : ''} ${location.pathname == caminho ? 'bg-blue-fut-paz-900 text-red-500' : 'text-gray-400'}`}
            sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                }}
            >
                {icone}
            </Box>
            )}
            <Box component="span" className={`${!isVisible ? 'hidden' : ''}`}
            sx={{
                color: 'neutral.400',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 18,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
            }}
            >
            {titulo}
            </Box>
            </ButtonBase>
        </li>
    )
}