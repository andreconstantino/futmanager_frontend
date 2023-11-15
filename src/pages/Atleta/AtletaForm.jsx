import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, Container, Box, Grid, IconButton, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { get, put, post } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';
import { VisuallyHiddenInput } from './style';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function AtletaForm() {
    var { id, categoria_id } = useParams();
    const [atleta, setItem] = useState({
        nm_atletaCompleto: "", 
        nm_apelido: "",
        categoria_id: categoria_id,
        dt_nascimento: "",
        nu_idade: "",
        tp_genero: "",
        nu_cpf: "",
        nu_rg: "",
        nm_camiseta: "",
        nu_camiseta: "",
        nu_calcado: "",
        caminho: ""
    });
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate();
    const [categoria, setCategoria] = useState([]);

    const getCategoria = () => {
        get('api/categoria').then((response) => {
            setCategoria(response.data.data)
        }).catch((erro) => {
            setSnackOptions(prev => ({
                mensage: erro?.response?.data?.message ? erro.response.data.message : erro?.message ? erro.message : 'Unespected error appears',
                type: "error",
                open: true
            }));
        });
    }

    useEffect(() => {
        getCategoria();
    }, []);

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
        if (!atleta?.id && id != 0) {
            getCategoria();
        }
    }, [atleta]);

    const salvarCategoria = (event) => {
        event.preventDefault();
        var body = {
            ...atleta,
        }
        if (id == 0) criarCategoria(body)
        else editarCategoria(body)
    };

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setItem({
            ...atleta,
            [name]: value,
        });
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

    const salvarCaminhoImagem = (event) => {
        const selectedFile = event.target.files[0]; // Acessa o primeiro arquivo selecionado
          
        if (selectedFile) {
            const fileName = selectedFile.name; // Obtém o nome do arquivo
            console.log('Nome do arquivo selecionado:', fileName);
            setItem({...atleta, caminho: fileName});
            console.log(atleta)
        }
    }

    var titulo = id == 0 ? "Cadastrar Atleta" : "Editar Atleta"

    return (
        <>
            <FutmanagerTitles back={voltarPagina} title={titulo} />
            {!load && (
                <form onSubmit={salvarCategoria}>
                    <div className='w-full flex flex-row items-start ml-10 mb-1'>
                        <Button className='bg-blue-fut-paz-400' type='submit' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Selecione uma foto do Atleta
                            <VisuallyHiddenInput key={atleta.categoria_id} type="file" accept="image/*" onChange={salvarCaminhoImagem} />
                        </Button>
                    </div>
                    <div className='w-full flex flex-row items-start ml-10 mb-1'>
                    <TextField className='w-5/12 mt-5 mr-2'
                        required
                        label="Nome "
                        name="categoria"
                        value={atleta.categoria}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
            
                    <TextField className='w-3/12 mt-5 mr-2'
                         label="Apelido"
                         name="nm_apelido"
                         value={atleta.nm_apelido}
                         onChange={salvarParametros}
                         variant="outlined"
                         fullWidth
                         margin="normal"
                    />
                    <TextField className='w-3/12 mt-5 mr-2'
                         required
                         select
                         name='categoria_id'
                         value={atleta.categoria_id}
                         label="Categoria"
                         onChange={salvarParametros}
                         fullWidth
                         variant="outlined"
                         margin="normal"
                         InputProps={{
                            readOnly: true,
                          }}
                    >
                         {categoria.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.categoria}</MenuItem>
                        ))}
                    </TextField>
                    </div>

                    <div className='w-full flex flex-row items-start ml-10 mb-1'>
                        <TextField className='w-3/12 mt-5 mr-1'
                            type='date'
                            required
                            label="Data de Nascimento"
                            name="dt_nascimento"
                            value={atleta.dt_nascimento}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    <TextField className='w-2/12 mt-5 mr-1'
                        required
                        label="Idade"
                        name="nu_idade"
                        value={atleta.nu_idade}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        required
                        label="CPF"
                        name="nu_cpf"
                        value={atleta.nu_cpf}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        required
                        label="RG"
                        name="nu_rg"
                        value={atleta.nu_rg}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    </div>

                    <div className='w-full flex flex-row items-start ml-10 mb-2'>
                    
                    <TextField className='w-4/12 mt-5 mr-2'
                        required
                        select
                        name='tp_genero'
                        value={atleta.tp_genero}
                        label="Gênero"
                        onChange={salvarParametros}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    </TextField>

                    <TextField className='w-4/12 mt-5 mr-2'
                        label="Peso"
                        name="nu_idade"
                        value={atleta.nu_idade}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="Altura"
                        name="nu_idade"
                        value={atleta.nu_idade}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                   
                    </div>

                    <FutmanagerTitles title={"Informações do Uniforme"} />

                    <div className='w-full flex flex-row items-start ml-10 mb-2'>
                    <TextField className='w-5/12 mt-5 mr-4'
                        required
                        label="Nome da Camiseta"
                        name="nm_camiseta"
                        value={atleta.nm_camiseta}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-6/12 mt-5 mr-2'
                        required
                        label="Tamanho da Camiseta"
                        name="nu_camiseta"
                        value={atleta.nu_camiseta}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </div>

                    <div className='w-full flex flex-row items-start ml-10 mb-2'>
                    <TextField className='w-5/12 mt-5 mr-4'
                        required
                        label="Número da Camiseta"
                        name="nu_calcado"
                        value={atleta.nu_calcado}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-6/12 mt-5 mr-2'
                        required
                        label="Número do Calçado"
                        name="nu_camiseta"
                        value={atleta.nu_camiseta}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </div>

                    <div className='flex flex-col items-end p-5'>
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
                handleClose={closeSnackBar} 
            />
        </>
    )
}