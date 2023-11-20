import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, IconButton, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar, FutmanagerButton} from '../../components';
import BlockIcon from '@mui/icons-material/Block';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function ResponsavelForm() {
    var { id } = useParams();
    const [responsavel, setResponsavel] = useState({
        nomeCompleto: "", 
        dataNascimento: "",
        cpf: "",
        rg: "",
        ativo: 1,
    });
    const [atletaList, setAtletaList] = useState({});
    const [atletaResponsavel, setAtletaResponsavel] = useState({
        atleta_id: "", 
        responsavel_id: id,
    });
    const [atletaResponsavelList, setAtletaResponsavelList] = useState({});
    const [categoria, setCategoria] = useState({
        ativo: '',
        categoria: "",
        created_at: "",
        id: '',
        updated_at: ""
    });
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const [open, setOpen] = useState(false);
    const navegacao = useNavigate();

    const getCategoria = () => {
        get('api/categoria').then((response) => {
            setCategoria(response.data.data)
            console.log(response.data.data)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

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

    const getAtletaResponsavel = () => {
        setLoad(true)
        get(`api/responsavelAtletas/${id}`).then((response) => {
            setAtletaResponsavelList(response)
            setLoad(false)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

    const criarResponsavel = (body) => {
        setLoad(true)
        post(`api/responsavel`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Responsável criado com Sucesso", type: "success", open: true }));
            setLoad(false)
            console.log(response)
            setTimeout(() => {
                navegacao('/responsaveisForm/'+response.data.id)
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
                navegacao('/responsaveis')
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

    const desativarAtleta = () => {

    }

    useEffect(() => {
        if (!responsavel?.id && id != 0) {
            getResponsavel();
            getAtletaResponsavel();
        } 
    }, [responsavel], [atletaResponsavelList]);

    useEffect(() => {
        getCategoria();     
    }, []);

    const salvarResponsavel = (event) => {
        event.preventDefault();
        var body = {
            ...responsavel,
        }
        if (id == 0) criarResponsavel(body)
        else editarResponsavel(body)
    };

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setResponsavel({
            ...responsavel,
            [name]: value,
        });
    };

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/responsaveis/')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? "Cadastrar Responsável" : "Editar Responsável"

    const columns = [
        { field: 'caminhoImagem', headerName: 'Foto', width: 200,
        renderCell: (params) => {
          return (
            <img 
            style={{width:'100px', height:'100px'}}
            src={params.row.caminhoImagem} 
            />
          );
        } },
        { field: 'nomeCompleto', headerName: 'Nome Completo', width: 400 },
        { field: 'idade', headerName: 'Idade', width: 100},
        { field: 'numeroUniforme', headerName: 'Número', width: 100 },
        { field: 'posicao', headerName: 'Posição', width: 75 },
    ];

    const openDialog = () => {
        setOpen(true);
    }

    const buscarAtletas = (event) => {
        const cat = event.target;
        get(`api/atletaSub/${cat.value}?page=${page + 1}&size=${pageSize}`).then((response) => {
            setAtletaList(response.data.data)
            console.log(response.data.data)
          }).catch((erro) => {
            setSnackOptions(prev => ({
              mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
              type: "error",
              open: true
            }));
            setLoad(false)
          });
    }

    const salvarParametrosAtleta = (event) => {
        const newValue = event.target.value;
        setAtletaResponsavel((prev) => ({
        ...prev,
        atleta_id: newValue,
        }));
    };

    const salvarResponsavelAtleta = (event) => {
        event.preventDefault();
        var bodyAtleta = {
            ...atletaResponsavel,
        }
        salvarAtleta(bodyAtleta)
    };

    const salvarAtleta = (bodyAtleta) => {
        post(`api/atletaResponsavel`, bodyAtleta).then((response) => {
            handleClose(); 
            getAtletaResponsavel();
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

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

                        <TextField className='w-3/5'
                            required
                            select
                            name='ativo'
                            value={responsavel.ativo}
                            label="Ativo"
                            onChange={salvarParametros}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        >
                            <MenuItem value={1}>SIM</MenuItem>
                            <MenuItem value={0}>Não</MenuItem>
                        </TextField>
                    </div>

                    {id != 0 ? (
                    <div className='mt-10 ml-5 mr-5'>
                        <FutmanagerTitles title={"Atletas"} />
                        <FutmanagerButton color="primary" click={openDialog} icon={<AddIcon />} />
                        <DataGrid
                            sx={{ width: '100%' }}
                            pagination
                            paginationMode={'server'}
                            loading={load}
                            rows={atletaResponsavelList?.data || []}
                            getRowId={(row) => row.id}
                            getRowHeight={(params) => 100}
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
                            rowCount={atletaList?.pagination?.total_records || 0}
                            pageSizeOptions={[10, 25, 50]}
                        />
                    </div>) : ""}
                    
                    <div className='flex float-right p-5 mt-5'>
                        <Button 
                            onClick={desativarAtleta}
                            variant="contained" 
                            className='bg-red-600 hover:bg-red-700 mr-5' 
                            startIcon={<BlockIcon />}>
                            Desativar
                        </Button>

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

            <Dialog open={open} fullWidth>
                <DialogTitle> 
                    <FutmanagerTitles title={"Atletas"}/>
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
                <DialogContent sx={{ height: '300px' }} className='flex flex-col justify-center'>
                    <TextField sx={{ m: 2, width: 500 }}
                         required
                         select
                         name='id'
                         label="Categoria"
                         onChange={buscarAtletas}
                         fullWidth
                         variant="outlined"
                         margin="normal"
                    >
                         {categoria.length > 0 ? categoria.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.categoria}</MenuItem>
                        )) : ""}
                    </TextField>

                    {atletaList.length > 0 ? 
                        <TextField sx={{ m: 2, width: 500 }}
                            required
                            select
                            name='atleta_id'
                            label="Atletas"
                            value={atletaResponsavel.atleta_id}
                            onChange={salvarParametrosAtleta}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        >
                            {atletaList.length > 0 ? atletaList.map(atleta => (
                                <MenuItem key={atleta.id} value={atleta.id}>{atleta.nomeCompleto}</MenuItem>
                            )) : ""}
                        </TextField>
                    :"" }
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={salvarResponsavelAtleta}
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