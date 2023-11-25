import { useState, useEffect } from 'react'
import { get, del } from "../../services/http"
import { CircularProgress, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { startTransition } from 'react';
import { FutmanagerButton, FutmanagerTitles, FutmanagerSnackbar } from "../../components";
import AddIcon from '@mui/icons-material/Add';

export default function ResponsavelList() {
    const [responsavelList, setResponsavelList] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState(false);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate()

  const getResponsaveis = () => {
    setLoad(true)
    get(`api/responsavel?page=${page + 1}&size=${pageSize}`).then((response) => {
      setResponsavelList(response.data)
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
    getResponsaveis();
  }, [page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/responsaveisForm/0/`)
    });
  }

  const columns = [
    { field: 'nomeCompleto', headerName: 'Nome Responsável', width: 300 },
    { field: 'dataNascimento', headerName: 'Data de Nascimento', width: 175 },
    { field: 'atletas', headerName: 'Nome Atleta', width: 300,
      renderCell: (params) => {
        var teste = "";
        params.row.atletas.forEach((element, index) => {
          if (index != params.row.atletas.length - 1) {
            teste += element.nomeUniforme + ', ';
          } else {
            teste += element.nomeUniforme;
          }          
        }); 
        return (
          teste 
        );
      }
    },
    { field: 'subs', headerName: 'SUB', width: 250,
      renderCell: (params) => {
        var teste = "";
        params.row.atletas.forEach((element, index) => {
          if (index != params.row.atletas.length - 1) {
            teste += element.nomeUniforme + ', ';
          } else {
            teste += element.nomeUniforme;
          }          
        }); 
        return (
          teste 
        );
      }
    },
    {
      field: 'edit_button', headerName: 'Editar', width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/responsaveisForm/${params.row.id}`)
              });
            }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
  ];

  return (
    <>
    {load && (<CircularProgress />)}
      <FutmanagerTitles title={"Responsáveis"}/>
      <FutmanagerButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      <DataGrid
        className='m-5'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={responsavelList?.data || []}
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
        rowCount={responsavelList?.pagination?.total_records || 0}
        pageSizeOptions={[10, 25, 50]}
      />
      
      <FutmanagerSnackbar
        mensage={snackOptions.mensage}
        type={snackOptions.type}
        open={snackOptions.open}
        handleClose={closeSnackBar} />
    </>
  )
}