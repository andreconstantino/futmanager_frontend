import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress, MenuItem, Card, CardMedia } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { get, put } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';

export default function AtletaViewEdit() {
    var { id } = useParams();
    const [atleta, setAtleta] = useState({
        nomeCompleto: "", 
        apelido: "",
        categoria_id: "",
        dataNascimento: "",
        idade: "",
        genero: "",
        posicao: "",
        cpf: "",
        rg: "",
        peso: "",
        altura: "",
        nomeUniforme: "",
        numeroUniforme: "",
        tamanhoUniforme: "",
        numeroCalcado: ""
    });
    const [image, setImage] = useState();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const [categoria, setCategoria] = useState([]);
    const navegacao = useNavigate();

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

    const getAtleta = () => {
        setLoad(true)
        get(`api/atleta/${id}`).then((response) => {
            setAtleta(response.data)
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

    const editarAtleta = (body) => {
        setLoad(true)
        put(`api/atleta/${id}`, body).then((response) => {
            setSnackOptions(prev => ({ 
                mensage: "Atleta atualizado com Sucesso", 
                type: "success", 
                open: true 
            }));
            setTimeout(() => {
                navegacao('/atletaview/1')
            }, 3000);
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
        if (!atleta?.id && id != 0) {
            getAtleta();
        } 
        setImage(atleta.caminhoImagem)
        
    }, [atleta]);

    useEffect(() => {
        getCategoria();     
    }, []);


    const salvarAtleta = (event) => {
        event.preventDefault();
        var body = {
            ...atleta,
            imagem: image
        }
        editarAtleta(body)
    };

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setAtleta({
            ...atleta,
            [name]: value,
        });
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    var titulo = "Minhas informações"

    return (
        <>
            <FutmanagerTitles title={titulo} />
            {!load && (
                <form onSubmit={salvarAtleta}>
                    <div className='w-full flex flex-row items-start ml-10 mb-1'>
                        <Card className="border-solid border-blue-fut-paz-900 border-2 mt-5 mr-4">
                            <CardMedia
                                style={{transition: 'transform 0.3s', height:'200px', width: '200px'}}
                                component="img"
                                image={image}
                                alt="Imagem do Atleta"
                            />  
                        </Card>
                    </div>
                    <div className='w-full flex flex-row items-start ml-10 mb-1'>
                    <TextField className='w-5/12 mt-5 mr-2'
                        required
                        label="Nome"
                        name="nomeCompleto"
                        value={atleta.nomeCompleto}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    />
            
                    <TextField className='w-3/12 mt-5 mr-2'
                         label="Apelido"
                         name="apelido"
                         value={atleta.apelido}
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
                            name="dataNascimento"
                            value={atleta.dataNascimento}
                            onChange={salvarParametros}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                readOnly: true,
                              }}
                        />

                    <TextField className='w-2/12 mt-5 mr-1'
                        required
                        label="Idade"
                        name="idade"
                        value={atleta.idade}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="CPF"
                        name="cpf"
                        value={atleta.cpf}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="RG"
                        name="rg"
                        value={atleta.rg}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    </div>

                    <div className='w-full flex flex-row items-start ml-10 mb-2'>
                    
                    <TextField className='w-3/12 mt-5 mr-1'
                        required
                        select
                        name='genero'
                        value={atleta.genero}
                        label="Gênero"
                        onChange={salvarParametros}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    >
                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    </TextField>

                    <TextField className='w-2/12 mt-5 mr-1'
                        required
                        select
                        label="Posição"
                        name="posicao"
                        value={atleta.posicao}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    >
                        <MenuItem value={"GOL"}>Goleiro</MenuItem>
                        <MenuItem value={"ZAG"}>Zagueiro</MenuItem>
                        <MenuItem value={"LAT"}>Lateral</MenuItem>
                        <MenuItem value={"MC"}>Meio-Campo</MenuItem>
                        <MenuItem value={"ATA"}>Atacante</MenuItem>
                    </TextField>

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="Peso"
                        name="peso"
                        value={atleta.peso}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="Altura"
                        name="altura"
                        value={atleta.altura}
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
                        name="nomeUniforme"
                        value={atleta.nomeUniforme}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    />

                    <TextField className='w-6/12 mt-5 mr-2'
                        required
                        label="Tamanho da Camiseta"
                        name="tamanhoUniforme"
                        value={atleta.tamanhoUniforme}
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
                        name="numeroUniforme"
                        value={atleta.numeroUniforme}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                          }}
                    />

                    <TextField className='w-6/12 mt-5 mr-2'
                        required
                        label="Número do Calçado"
                        name="numeroCalcado"
                        value={atleta.numeroCalcado}
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