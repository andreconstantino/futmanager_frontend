import {getUser} from './../../services/storage'

export default function ImagemFundo(){
    const usuario = getUser();
    
    return(
        usuario.perfil_id == 1 ? 
        <img className="opacity-50" style={{width:'1190px', height: '480px'}} src="equipe.jpeg" />
        : <img className="opacity-50" style={{width:'1190px', height: '480px'}} src="SUB-11.jpeg" />
    )
}