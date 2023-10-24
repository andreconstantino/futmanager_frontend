import { Button, TextField, Typography, IconButton, Grid, Box, Container, MenuItem} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { get } from '../../services/http';

export default function AtletaForm (props){

    const {titulo, createItem, id} = props
    const [atleta, setAtleta] = useState({
        nm_atletaCompleto: "", 
        nm_apelido: "",
        categoria_id: "",
        dt_nascimento: "",
        nu_idade: "",
        tp_genero: "",
        nu_cpf: "",
        nu_rg: "",
        nm_camiseta: "",
        nu_camiseta: "",
        nu_calcado: ""
    });
    const [categoria, setCategoria] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(id == 0) createItem(atleta)
        else updateItem(atleta)
    };

    const salvarParametros = (event) => {
        const { name, value } = event.target;
        setAtleta({
            ...atleta,
            [name]: value,
        });
    };

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

    useEffect(() => {
        getCategoria();
    }, []);

    return (
    <form onSubmit={handleSubmit}>
        <Container maxWidth="sx" className='p-10'>
            <Box className='mb-5'>
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <div className='text-center'>
                            <IconButton className='text-red-400' edge="start" color="inherit" onClick={salvarParametros}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                    <div className='text-center'>
                    {titulo}
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        label="Nome Completo"
                        name="nm_atletaCompleto"
                        value={atleta.nm_atletaCompleto}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                        label="Apelido"
                        name="nm_apelido"
                        value={atleta.nm_apelido}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                        required
                        select
                        name='categoria_id'
                        value={atleta.categoria_id}
                        label="Categoria"
                        onChange={salvarParametros}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        {categoria.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.nm_categoria}</MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
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
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
                        required
                        label="Idade"
                        name="nu_idade"
                        value={atleta.nu_idade}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
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
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        label="CPF"
                        name="nu_cpf"
                        value={atleta.nu_cpf}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        label="RG"
                        name="nu_rg"
                        value={atleta.nu_rg}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <div className='text-left m-4'>
                    <Typography className='text-blue-fut-paz-900' variant="h5" gutterBottom>Informações de Uniforme</Typography>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
                        required
                        label="Nome da Camiseta"
                        name="nm_camiseta"
                        value={atleta.nm_camiseta}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
                        required
                        label="Número da Camiseta"
                        name="nu_camiseta"
                        value={atleta.nu_camiseta}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
                        required
                        label="Número do Calçado"
                        name="nu_calcado"
                        value={atleta.nu_calcado}
                        onChange={salvarParametros}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    </Grid>
                    <Grid item xs={12} className='text-right'>
                    <Button startIcon={<SaveIcon />} className="bg-green-500 hover:bg-green-600" 
                    type="submit" variant="contained" color="primary">Salvar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </form>
    )
}