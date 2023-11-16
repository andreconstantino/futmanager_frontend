import { useState, useEffect } from 'react'
import { get, del } from "../../services/http"
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { FutmanagerButton, FutmanagerTitles, FutmanagerSnackbar } from "../../components";
import AddIcon from '@mui/icons-material/Add';

export default function CadastroUsuario() {
  const [usuarios, setUsuarios] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getUsuarios = () => {
    setLoad(true)
    get(`api/user?page=${page + 1}&size=${pageSize}`).then((response) => {
      setUsuarios(response.data)
      console.log(response.data)
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
    getUsuarios();
  }, [page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createUsuario = () => {
    startTransition(() => {
      navegacao(`/usuarioForm/0`)
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nome', width: 250 },
    { field: 'login', headerName: 'Login', width: 250 },
    { field: 'perfil', headerName: 'Perfil', width: 200 ,
    renderCell: (params) => {
      return (
        params.value.perfil
      );
    } },
    { field: 'ativo', headerName: 'Ativo', width: 100,
    renderCell: (params) => {
      return (
        params.value ? 'SIM' : 'NÃO'
      );
    } },
    { field: 'created_at', headerName: 'Data de Criação', width: 175 },
    {
      field: 'edit_button', headerName: 'Editar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/usuarioForm/${params.row.id}`)
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
      <FutmanagerTitles title={"Usuários Cadastrados"} />
      <FutmanagerButton className='pl-6' color="primary" click={createUsuario} icon={<AddIcon />} />
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={usuarios?.data || []}
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
        rowCount={usuarios?.pagination?.total_records || 0}
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