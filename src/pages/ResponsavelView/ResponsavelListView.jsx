import { useState, useEffect } from 'react'
import { get, del } from "../../services/http"
import { CircularProgress, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useNavigate, useParams } from 'react-router-dom';
import { startTransition } from 'react';
import { FutmanagerButton, FutmanagerTitles, FutmanagerSnackbar } from "../../components";
import {getUser} from './../../services/storage'
import EditIcon from '@mui/icons-material/Edit';

export default function ResponsavelListView() {
    const [responsavelList, setResponsavelList] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [load, setLoad] = useState(false);
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navegacao = useNavigate()

  const getResponsaveis = () => {
    setLoad(true)
    get(`api/atletaResponsaveis/${user.atleta_id}`).then((response) => {
      setResponsavelList(response)
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

  const user = getUser();

  const columns = [
    { field: 'nomeCompleto', headerName: 'Nome Responsável', width: 500 },
    { field: 'dataNascimento', headerName: 'Data de Nascimento', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    {
      field: 'view_button', headerName: 'Visualizar', width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/responsavelview/${params.row.id}`)
              });
            }}>
            <ContentPasteSearchIcon />
          </IconButton>
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
                navegacao(`/responsavelviewedit/${params.row.id}`)
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