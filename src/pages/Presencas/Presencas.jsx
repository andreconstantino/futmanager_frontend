import { useState, useEffect } from 'react'
import { CircularProgress, Checkbox, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { get, post} from '../../services/http';
import { FutmanagerSnackbar} from '../../components';
import { getUser } from '../../services/storage';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function Presencas() {
    var { id } = useParams();
    const usuario = getUser();
    const [load, setLoad] = useState(id == 0 ? false : true);
    const [categoria, setCategoria] = useState();
    const [chamada, setChamada] = useState({});
    const [atletaList, setAtletaList] = useState({});
    const [atletasSelecionados, setAtletasSelecionados] = useState([]);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
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
        { field: 'nomeCompleto', headerName: 'Nome', width: 600 },
        { field: 'posicao', headerName: 'Posição', width: 200 },
        { field: 'checkbox', headerName: <CheckIcon sx={{color: 'green'}}/>,
            renderCell: (params) => (
              <Checkbox
                checked={atletasSelecionados.includes(params.row.id)}
                onChange={() => handleCheckboxChange(params.row.id)}
              />
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
        </>
    )
}