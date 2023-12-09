import { useState, useEffect } from 'react'
import { TextField, CircularProgress, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put} from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar, FutmanagerButton} from '../../components';
import SaveIcon from '@mui/icons-material/Save';

export default function ResponsavelView() {
    var { id } = useParams();
    const [responsavel, setResponsavel] = useState({
        nomeCompleto: "", 
        dataNascimento: "",
        cpf: "",
        rg: "",
        ativo: 1,
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getResponsavel = () => {
        setLoad(true)
        get(`api/responsavel/${id}`).then((response) => {
            setResponsavel(response.data)
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
        if (!responsavel?.id && id != 0) {
            getResponsavel();
        } 
    }, [responsavel]);

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/responsavellistview/')
        });
    };

    const editarResponsavel = (body) => {
        setLoad(true)
        put(`api/responsavel/${id}`, body).then((response) => {
            setSnackOptions(prev => ({ 
                mensage: "Responsável atualizado com Sucesso", 
                type: "success", 
                open: true 
            }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/responsavellistview')
            }, 3000);                
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

    const salvarResponsavel = (event) => {
        event.preventDefault();
        var body = {
            ...responsavel,
        }
        editarResponsavel(body)
    };

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setResponsavel({
            ...responsavel,
            [name]: value,
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = "Responsável"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full' onSubmit={salvarResponsavel}>
                    <div className='flex flex-col items-center'>
                        <TextField className='w-3/5'
                            required
                            label="Nome"
                            name="nomeCompleto"
                            value={responsavel.nomeCompleto}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                
                        <TextField className='w-3/5'
                            type='date'
                            required
                            label="Data de Nascimento"
                            name="dataNascimento"
                            value={responsavel.dataNascimento}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField className='w-3/5'
                            required
                            label="CPF"
                            name="cpf"
                            value={responsavel.cpf}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <TextField className='w-3/5'
                            required
                            label="RG"
                            name="rg"
                            value={responsavel.rg}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    
                    <div className='flex float-right p-5 mt-5'>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            className='bg-green-600 hover:bg-green-700' 
                            startIcon={<SaveIcon />}>
                            Salvar
                        </Button>
                    </div>
                    
                </form>
            )}
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handl
                eClose={closeSnackBar} 
            />
        </>
    )
}