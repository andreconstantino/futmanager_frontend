import { useEffect, useState } from 'react';
import {getUser} from './../../services/storage'
import { get } from '../../services/http';

export default function ImagemPrincipal(){
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
        <div className="absolute left-0">
            <img className="border-solid border-blue-fut-paz-900 border-8 
            w-2/5 rounded-full m-16 " 
            style={{width:'350px', height: '350px'}}
            src={atleta?.caminhoImagem} />
        </div>) : ""
    )
}
