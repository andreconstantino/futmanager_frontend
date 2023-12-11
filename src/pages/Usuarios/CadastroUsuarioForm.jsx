import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, IconButton, MenuItem, Card, CardMedia } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { VisuallyHiddenInput } from './style';

export default function CadastroUsuarioForm() {
    var { id } = useParams();
    const [usuario, setUsuario] = useState({
        name: '',
        login: '',
        password: '',
        perfil_id: '',
        atleta_id: '',
        ativo: 1
    });
    const [categoria, setCategoria] = useState({
        ativo: '',
        categoria: "",
        created_at: "",
        id: '',
        updated_at: ""
    });
    const [atletaList, setAtletaList] = useState({});
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const [perfil, setPerfil] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
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
        setImage(usuario.caminhoImagem)
    }, [usuario]);

    useEffect(() => {
        getPerfils();
    }, [page, pageSize]);

    useEffect(() => {
        getCategoria(); 
    }, []);

    const salvarUsuario = (event) => {
        event.preventDefault();
        var body = {
            ...usuario,
            imagem: image
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

  const handleImagemChange = (event) => {
    const file = event.target.files[0];

    setImageName(file ? file.name : '');
    const reader = new FileReader();
        reader.onloadend = () => {
        setImage(reader.result);
    };

    reader.readAsDataURL(file);
};

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

    const cardImagem = (
        <Card className="border-solid border-blue-fut-paz-900 border-2">
            <CardMedia
                style={{transition: 'transform 0.3s', height:'150px', width: '150px'}}
                component="img"
                image={image}
                alt="Imagem do Usuário"
            />  
        </Card>
    )

  const selecionarImagem = (
    <>
        <TextField
            className='w-3/5'
            label="Imagem do Atleta"
            name="image"
            value={imageName}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
                style: {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                },
                endAdornment: (
                    <IconButton color='primary' component="label" variant="contained">
                        <CloudUploadIcon />
                        <VisuallyHiddenInput key={image} type="file" accept="image/*" onChange={handleImagemChange} />
                    </IconButton>
                ),
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </>
  )

  const atleta = (
    <>
    <TextField
        className='w-3/5'
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
        )) : <MenuItem value="">Nenhuma categoria disponível</MenuItem>}
    </TextField>

    {atletaList.length > 0 ? 
        <TextField 
            className='w-3/5'
            required
            select
            name='atleta_id'
            label="Atletas"
            value={usuario.atleta_id}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
        >
            {atletaList.length > 0 ? atletaList.map(atleta => (
                <MenuItem key={atleta.id} value={atleta.id}>{atleta.nomeCompleto}</MenuItem>
            )) : ""}
        </TextField>
    : ""
    }
    </>
  )

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full flex flex-col items-center' onSubmit={salvarUsuario}>
                    {usuario.perfil_id === 1 || usuario.perfil_id === 3 || usuario.perfil_id === 4 ?
                    cardImagem
                    : ""}
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

                    {usuario.perfil_id === 5 ? (
                        atleta
                    ) : usuario.perfil_id === 1 || usuario.perfil_id === 3 || usuario.perfil_id === 4 ? (
                        selecionarImagem
                    ) : (
                        ""
                    )}
                    

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