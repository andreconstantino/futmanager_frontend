import { useState, useEffect, startTransition } from 'react'
import { Button, TextField, CircularProgress, MenuItem, Card, CardMedia } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { get, put } from '../../services/http';
import { FutmanagerTitles, FutmanagerSnackbar} from '../../components';

export default function AtletaView() {
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

    useEffect(() => {
        if (!atleta?.id && id != 0) {
            getAtleta();
        } 
        setImage(atleta.caminhoImagem)
        
    }, [atleta]);

    useEffect(() => {
        getCategoria();     
    }, []);

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOptions(prev => ({ ...prev, open: false }));
    };

    const editarAtleta = () => {
        startTransition(() => {
            navegacao('/atletaviewedit/1')
        });
    };

    var titulo = "Minhas informações"
    var edit = "Editar"

    return (
        <>
            <FutmanagerTitles title={titulo} edit={editarAtleta} titleEdit={edit}/>
            {!load && (
                <form>
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
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="RG"
                        name="rg"
                        value={atleta.rg}
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
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <TextField className='w-3/12 mt-5 mr-2'
                        label="Altura"
                        name="altura"
                        value={atleta.altura}                        
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
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
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