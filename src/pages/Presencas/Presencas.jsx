import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, Container, Box, Grid, IconButton, MenuItem, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';
import { getUser } from '../../services/storage';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Presencas() {
    var { id } = useParams();
    const usuario = getUser();
    const [item, setItem] = useState({
        dataChamada: '',
        horaChamada: '',
        categoria_id: '',
        chamada_tipo_id: '',
        user_id: usuario.id,
        finalizada: 0
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [chamada, setChamada] = useState({});
    const [atletaList, setAtletaList] = useState({});
    const [presencas, setPresencas] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isCheck, setCheck] = useState(false);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getChamada = () => {
        get(`api/presenca/${id}`).then((response) => {
            setChamada(response.data)
            console.log(response.data)
            setLoad(false)
            getAtletas(response.data.categoria.id)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

    const getAtletas = (id) => {
        setLoad(true)
        get(`api/atletaSub/${id}?page=${page + 1}&size=${pageSize}`).then((response) => {
          setAtletaList(response.data)
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
        getChamada();    
    }, []);

    const salvar = (event) => {
        event.preventDefault();
        var body = {
            ...item,
        }
        if (id == 0) criar(body)
        else editar(body)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/cadastroPerfil')
        });
    };

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
        {
          field: 'check_button', headerName: <CheckIcon sx={{color: 'green'}}/>, width: 125,
          renderCell: (params) => {
            return (
                isCheck ? (<FormControlLabel value={isCheck} control={<Radio />} checked onClick={()=> setCheck(true)}/>) : (<FormControlLabel value={isCheck} control={<Radio />} />)
            );
          }
        },
        {
            field: 'close_button', headerName: <CloseIcon sx={{color: 'red'}}/>, width: 125,
            renderCell: (params) => {
              return (
                !isCheck ? (<FormControlLabel value={isCheck} control={<Radio />} onClick={()=> setCheck(false)} checked/>) : (<FormControlLabel value={isCheck} control={<Radio />} />)
              );
            }
          },
      ];

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-center items-center'>
                    <h3 className="text-2xl p-4 text-blue-fut-paz-900 m-3 font-bold">{titulo}</h3>
                </div>

                <div className='m-8 flex'>
                <DataGrid
                    className='m-3'
                    sx={{ width: '80%' }}
                    pagination
                    paginationMode={'server'}
                    loading={load}
                    rows={atletaList?.data || []}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: page, pageSize: pageSize },
                    },
                    }}
                    onPaginationModelChange={(model) => {
                    setPage(model.page)
                    setPageSize(model.pageSize)
                    getCenarios
                    }}
                    paginationModel={{ page: page, pageSize: pageSize }}
                    pageSize={pageSize}
                    rowCount={presencas?.pagination?.total_records || 0}
                    pageSizeOptions={[10, 25, 50]}
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