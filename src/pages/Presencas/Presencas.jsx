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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Presencas() {
    var { id } = useParams();
    const usuario = getUser();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [advertencia, setAdvertencia] = useState({
        advertencia_tipo_id: '',
        justificativa: ''
    });
    const [categoria, setCategoria] = useState();
    const [atletaAdvertencia, setAtletaAdvertencia] = useState([]);
    const [chamada, setChamada] = useState({});
    const [atletaList, setAtletaList] = useState({});
    const [atletasSelecionados, setAtletasSelecionados] = useState([]);
    const [advertenciaList, setAdvertenciaList] = useState({});
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const [open, setOpen] = useState(false);
    const navegacao = useNavigate();

    const getChamada = () => {
        get(`api/presenca/${id}`).then((response) => {
            setChamada(response.data)
            console.log(response.data)
            setLoad(false)
            setCategoria(response.data.categoria.id)
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
        get(`api/chamadaSub/${id}`).then((response) => {
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

    const salvarPresencas = (body) => {
        setLoad(true)
        post(`api/presencasAtletas`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Chamada criada com Sucesso", type: "success", open: true }));
            setLoad(false)
            console.log(response.data.message);
            setTimeout(() => {
                navegacao('/chamadas')
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

    const prepararDados = () => {
        var body = {
            chamada_id: id,
            categoria_id: categoria,
            atletas: atletasSelecionados,
        }
        salvarPresencas(body)
    }

    useEffect(() => {
        getChamada(); 
        getAdvertencias()   
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
        { field: 'nomeCompleto', headerName: 'Nome', width: 500 },
        { field: 'posicao', headerName: 'Posição', width: 175 },
        { field: 'checkbox', headerName: <CheckIcon sx={{color: 'green'}}/>,
            renderCell: (params) => (
              <Checkbox
                checked={atletasSelecionados.includes(params.row.id)}
                onChange={() => handleCheckboxChange(params.row.id)}
              />
            ),
        },
        { field: 'advertencias', headerName: 'Advertência',
            renderCell: (params) => (
                <IconButton
                color="primary"
                onClick={() => {
                    openDialog(params.row.id)
                }}>
                <WarningAmberIcon sx={{color: 'red'}}/>
              </IconButton>
            ),
        },
      ];

      const handleCheckboxChange = (id) => {
        if (atletasSelecionados.includes(id)) {
          setAtletasSelecionados(atletasSelecionados.filter((atletaId) => atletaId !== id));
        } else {
          setAtletasSelecionados([...atletasSelecionados, id]);
        }
      };

    const handleClose = () => {
        setOpen(false);
    };

    const openDialog = (id) => {
        setOpen(true);
        const atletaDesejado = atletaList.data.find((atleta) => atleta.id === id);
        setAtletaAdvertencia(atletaDesejado)
    }

    const getAdvertencias = () => {
        setLoad(true)
        get(`api/advertenciaTipo`).then((response) => {
          setAdvertenciaList(response.data.data)
          console.log(response.data.data)
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

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setAdvertencia({
            ...advertencia,
            [name]: value,
        });
    };

    const salvarInformacoesAdvertencia = (event) => {
        event.preventDefault();
        var body = {
            ...advertencia,
            data: chamada.dataChamada,
            chamada_id: id,
            atleta_id: atletaAdvertencia.id,
        }
        criarAdvertencia(body)
    };

    const criarAdvertencia = (body) => {
        setLoad(true)
        post(`api/advertencia`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Advertência aplicada com Sucesso", type: "success", open: true }));
            setLoad(false)
            console.log(response)
            handleClose()
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
            setLoad(false)
        });
    }

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
                        rows={atletaList?.data || []}
                        columns={columns}
                        pagination={false}
                    />
                </div>

                <div className='flex float-right p-5'>
                    <Button 
                        onClick={()=> {prepararDados()}}
                        variant="contained" 
                        className='bg-green-600 hover:bg-green-700' 
                        startIcon={<SaveIcon />}>
                        Finalizar Chamada
                    </Button>
                </div>
            </div>
            {load && (<CircularProgress />)}
            <FutmanagerSnackbar
                mensage={snackOptions.mensage}
                type={snackOptions.type}
                open={snackOptions.open}
                handleClose={closeSnackBar} />

            <Dialog open={open} fullWidth>
                <DialogTitle> 
                    <FutmanagerTitles title={"Advertências"}/>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ height: '450px' }} className='flex flex-col justify-center'>
                    <TextField sx={{ m: 2, width: 500 }}
                        type='date'
                        required
                        label="Data da Advertência"
                        name="dataNascimento"
                        value={chamada.dataChamada}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField sx={{ m: 2, width: 500 }}
                        required
                        select
                        name='ativo'
                        value={atletaAdvertencia.id}
                        label="Atleta"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    >
                        <MenuItem value={atletaAdvertencia.id}>{atletaAdvertencia.nomeCompleto}</MenuItem>
                    </TextField>

                    <TextField sx={{ m: 2, width: 500 }}
                         required
                         select
                         name='advertencia_tipo_id'
                         label="Tipo de Advertência"
                         fullWidth
                         onChange={salvarParametros}
                         variant="outlined"
                         margin="normal"
                    >
                        {advertenciaList.length > 0 ? advertenciaList.map(advert => (
                            <MenuItem key={advert.id} value={advert.id}>{advert.tipoAdvertencia}</MenuItem>
                        )) : ""}
                    </TextField>

                    <TextField sx={{ m: 2, width: 500 }}
                        multiline
                        rows={4}
                        label="Justificativa"
                        name="justificativa"
                        variant="outlined"
                        onChange={salvarParametros}
                        fullWidth
                        margin="normal"
                    />

                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={salvarInformacoesAdvertencia}
                        variant="contained" 
                        className='bg-green-600 hover:bg-green-700' 
                        startIcon={<SaveIcon />}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}