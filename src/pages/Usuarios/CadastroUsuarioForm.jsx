import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, Container, Box, Grid, IconButton, MenuItem, InputLabel, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function CadastroUsuarioForm() {
    var { id } = useParams();
    const [usuario, setUsuario] = useState({
        name: '',
        login: '',
        password: '',
        perfil_id: '',
        ativo: 1
    });
    const [showPassword, setShowPassword] = useState(false);
    const [perfil, setPerfil] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getPerfils = () => {
        setLoad(true)
        get(`api/perfil?page=${page + 1}&size=${pageSize}`).then((response) => {
            setPerfil(response.data.data)
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

    const getUsuario = () => {
        setLoad(true)
        get(`api/user/${id}`).then((response) => {
            setUsuario(response.data)
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

    const editarUsuario = (body) => {
        setLoad(true)
        put(`api/user/${id}`, body).then((response) => {
            setSnackOptions(prev => ({ 
                mensage: "Usuário atualizado com Sucesso", 
                type: "success", 
                open: true 
            }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/usuarios')
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

    const criarUsuario = (body) => {
        setLoad(true)
        post(`api/user`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Usuário criado com Sucesso", type: "success", open: true }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/usuarios')
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

    useEffect(() => {
        if (!usuario?.id && id != 0) {
            getUsuario();
        }
    }, [usuario]);

    useEffect(() => {
        getPerfils();
    }, [page, pageSize]);

    const salvarUsuario = (event) => {
        event.preventDefault();
        var body = {
            ...usuario,
        }
        if (id == 0) criarUsuario(body)
        else editarUsuario(body)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
        console.log(usuario)
    };

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/usuarios')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? "Cadastrar Usuário" : "Editar Usuário"

    const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full flex flex-col items-center' onSubmit={salvarUsuario}>
                    <TextField className='w-3/5'
                        required
                        label="Nome do Usuário"
                        name="name"
                        value={usuario.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/5'
                        required
                        label="Login"
                        name="login"
                        value={usuario.login}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
            
                    <TextField className='w-3/5'
                        required={id == 0 ? true : false}
                        type="password"
                        name='password'
                        value={usuario.password}
                        label="Senha"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <TextField className='w-3/5'
                         required
                         select
                         name='perfil_id'
                         value={usuario.perfil_id}
                         label="Perfil"
                         onChange={handleChange}
                         fullWidth
                         variant="outlined"
                         margin="normal"
                    >
                        {perfil.map(item => (
                            <MenuItem key={item.id} value={item.id}>{item.perfil}</MenuItem>
                        ))}
                    </TextField>
                    

                    <TextField className='w-3/5'
                        required
                        select
                        name='ativo'
                        value={usuario.ativo}
                        label="Ativo"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        <MenuItem value={1}>SIM</MenuItem>
                        <MenuItem value={0}>Não</MenuItem>
                    </TextField>
    
                    <div className='mt-6 self-end p-5'>
                        <Button type="submit" variant="contained" className='bg-green-600 hover:bg-green-700' 
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
                handleClose={closeSnackBar} />
        </>
    )
}