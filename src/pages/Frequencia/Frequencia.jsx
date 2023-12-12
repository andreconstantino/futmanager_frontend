import { useState, useEffect } from 'react'
import { CircularProgress, Checkbox, Button, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { get, post} from '../../services/http';
import { FutmanagerSnackbar, FutmanagerTitles} from '../../components';
import { getUser } from '../../services/storage';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function Frequencia() {
    var { id } = useParams();
    const usuario = getUser();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [advertencia, setAdvertencia] = useState({
        advertencia_tipo_id: '',
        justificativa: ''
    });
    const [categoria, setCategoria] = useState();
    const [atletaAdvertencia, setAtletaAdvertencia] = useState([]);
    const [chamada, setChamada] = useState([]);
    const [atleta, setAtleta] = useState({});
    const [atletasSelecionados, setAtletasSelecionados] = useState([]);
    const [advertenciaList, setAdvertenciaList] = useState({});
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const [open, setOpen] = useState(false);
    const navegacao = useNavigate();

    console.log("Chamadas", chamada)

    // const getChamada = () => {
    //     get(`api/presenca/${id}`).then((response) => {
    //         setChamada(response.data)
    //         console.log("Chamada Get", response.data)
    //         setLoad(false)
    //         setCategoria(response.data.categoria.id)
    //         getAtletas(response.data.categoria.id)
    //     }).catch((erro) => {
    //         setSnackOptions(prev => ({
    //             mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
    //             type: "error",
    //             open: true
    //         }));
    //     });
    // }

    const getAtletas = () => {
        setLoad(true)
        get(`api/presencasIndividual/${id}`).then((response) => {
          setChamada(response.data.data)
          setAtleta(response.data.atleta)
          console.log("Atletas", response.data.atleta)
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

    useEffect(() => {
        getAtletas(); 
    }, []);

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = atleta.nomeCompleto ? atleta.nomeCompleto  : ""

    const columns = [
        { field: 'data_chamada', headerName: 'Data da Chamada', width: 250 },
        { field: 'hora_chamada', headerName: 'Horário da Chamada', width: 250 },
        { field: 'sub', headerName: "Categoria", width: 250,
            renderCell: (params) => (
                atleta.categoria.categoria
            ),
        },
        { field: 'tipo_chamada', headerName: 'Tipo da Chamada', width: 250 },
        { field: 'checkbox', headerName: "Presença",
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
                        loading={load}
                        rows={chamada || []}
                        columns={columns}
                    />
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