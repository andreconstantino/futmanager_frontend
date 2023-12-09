import {getUser} from './../../services/storage'

const usuario = getUser();

export default function ImagemFundo(){
    return(
        usuario.perfil_id == 1 ? 
        <img className="opacity-50" style={{width:'1190px', height: '480px'}} src="equipe.jpeg" />
        : <img className="opacity-50" style={{width:'1190px', height: '480px'}} src="SUB-11.jpeg" />
    )
}