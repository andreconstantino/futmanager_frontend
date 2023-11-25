import { useState, useEffect, startTransition } from 'react'
import { CircularProgress, Checkbox, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { get} from '../../services/http';
import { FutmanagerSnackbar} from '../../components';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';

export default function PresencasView() {
    var { id } = useParams();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [chamada, setChamada] = useState({});
    const [atletaList, setAtletaList] = useState({});
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getChamadaAtletas = () => {
        get(`api/presencasAtletasView/${id}`).then((response) => {
            setAtletaList(response.data)
            console.log("response", response.data)
            console.log("atleta", atletaList)
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

    const getChamada = () => {
        get(`api/presenca/${id}`).then((response) => {
            setChamada(response.data)
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

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/chamadas')
        });
    };


    useEffect(() => {
        getChamadaAtletas();    
        getChamada(); 
    }, []);

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = chamada.categoria ? chamada.categoria.categoria  : ""

    const columns = [
        { field: 'numeroUniforme', headerName: 'Número', width: 200 },
        { field: 'nomeCompleto', headerName: 'Nome', width: 600 },
        { field: 'posicao', headerName: 'Posição', width: 200 },
        { field: 'checkbox', headerName: 'Presenças',
            renderCell: (params) => (
              params.row.presente == 0 ? 
              <CloseIcon sx={{color: 'red'}}/>
              : <CheckIcon sx={{color: 'green'}}/>
            ),
        },
    ];

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-center items-center'>
                    <h3 className="text-2xl p-4 text-blue-fut-paz-900 m-3 font-bold">{titulo}</h3>
                </div>

                <div className='m-8 mt-2 flex'>
                    <DataGrid
                        className='m-3'
                        sx={{ width: '80%' }}
                        autoHeight
                        loading={load}
                        rows={atletaList?.data || []}
                        columns={columns}
                    />
                </div>

                <div className='flex float-right p-5'>
                    <Button 
                        onClick={()=> {voltarPagina()}}
                        variant="contained" 
                        className='bg-blue-fut-paz hover:bg-blue-fut-paz-900' 
                        startIcon={<ReplyIcon />}>
                        Voltar
                    </Button>
                </div>
            </div>
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />
        </>
    )
}