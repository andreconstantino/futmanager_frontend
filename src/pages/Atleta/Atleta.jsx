import { useState, useEffect } from 'react'
import {CircularProgress, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import FutmanagerSnackbar from '../../components/FutmanagerSnackbar';
import AtletaForms from "./AtletaForms";

export default function CenarioFrm() {
    var { id } = useParams();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getItem = () => {
        setLoad(true)
        get(`api/fluxodecaixa/cenario/${id}`).then((response) => {
            setAtleta(response.data)
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const updateItem = (body) => {
        setLoad(true)
        put(`api/fluxodecaixa/cenario/${id}`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Cenario atualizado com Sucesso", type: "success", open: true }));
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const createItem = (body) => {
        setLoad(true)
        post(`api/atleta`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Atleta criado com Sucesso", type: "success", open: true }));
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? <Typography className='text-blue-fut-paz-900' variant="h4" gutterBottom>
        Cadastro de Atleta
    </Typography> : <Typography variant="h4" gutterBottom>
        Editar
    </Typography>

    var form = !load ?
    <AtletaForms titulo={titulo} id={id} createItem={createItem}/> : <CircularProgress />

    return (
        <>
            <div className=''>
                {form}
            </div>            
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />
        </>
    )
}