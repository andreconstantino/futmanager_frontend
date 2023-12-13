import { useEffect, useState } from 'react';
import {getUser} from './../../services/storage'
import { get } from '../../services/http';

export default function ImagemFundo(){
    const usuario = getUser();
    const [atleta, setAtleta] = useState({})
    const [load, setLoad] = useState(false);

    console.log("Usuario", usuario)
    console.log("Atleta", atleta)

    const getAtleta = () => {
        setLoad(true)
        get(`api/atleta/${usuario.atleta_id}`).then((response) => {
            setAtleta(response.data)
            console.log(response.data)
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

    useEffect(() => {
        if (usuario?.perfil_id == 5){
            getAtleta();
        }
    }, []);

    
    return(
        usuario.perfil_id == 5 ? (
            <img className="opacity-50" style={{width:'1190px', height: '480px'}} src={atleta.categoria?.caminhoImagem} />
        ): <img className="opacity-50" style={{width:'1190px', height: '480px'}} src="equipe.jpeg" />
    )
}