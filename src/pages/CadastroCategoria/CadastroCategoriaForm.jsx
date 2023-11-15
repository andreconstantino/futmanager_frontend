import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, Container, Box, Grid, IconButton, MenuItem, CardMedia, Card } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { VisuallyHiddenInput } from './style';

export default function CadastroCategoriaForm() {
    var { id } = useParams();
    const [item, setItem] = useState({
        categoria: '',
        ativo: 1
    });
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();

    const getCategoria = () => {
        setLoad(true)
        get(`api/categoria/${id}`).then((response) => {
            setItem(response.data)
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

    const editarCategoria = (body) => {
        setLoad(true)
        put(`api/categoria/${id}`, body).then((response) => {
            setSnackOptions(prev => ({ 
                mensage: "Categoria atualizado com Sucesso", 
                type: "success", 
                open: true 
            }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroCategoria')
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

    const criarCategoria = (body) => {
        setLoad(true)
        post(`api/categoria`, body).then((response) => {
            setSnackOptions(prev => ({ mensage: "Categoria criado com Sucesso", type: "success", open: true }));
            setLoad(false)
            setTimeout(() => {
                navegacao('/cadastroCategoria')
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
        if (!item?.id && id != 0) {
            getCategoria();
        }
        setImage(item.caminhoImagem)
    }, [item]);

    const salvarCategoria = (event) => {
        event.preventDefault();
        var body = {
            ...item,
            imagem: image
        }
        if (id == 0) criarCategoria(body)
        else editarCategoria(body)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleImagemChange = (event) => {
        const file = event.target.files[0];

        setImageName(file ? file.name : '');
        const reader = new FileReader();
            reader.onloadend = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const voltarPagina = () => {
        startTransition(() => {
            navegacao('/cadastroCategoria')
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = id == 0 ? "Cadastrar Categoria" : "Editar Categoria"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form className='w-full flex flex-col items-center' onSubmit={salvarCategoria}>
                    <Card className="border-solid border-blue-fut-paz-900 border-8 w-2/5 mb-10 ">
                        <CardMedia
                            style={{transition: 'transform 0.3s', height: '250px', width: '500px'}}
                            component="img"
                            image={image}
                        />  
                    </Card>
                    <TextField className='w-3/5'
                        required
                        label="Categoria"
                        name="categoria"
                        value={item.categoria}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        className='w-3/5'
                        label="Imagem da Categoria"
                        name="cenario"
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
            
                    <TextField className='w-3/5'
                        required
                        select
                        name='ativo'
                        value={item.ativo}
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