import { useState, useEffect } from 'react'
import { get, del } from "../../services/http"
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { FutmanagerButton, FutmanagerTitles, FutmanagerSnackbar } from "../../components";
import AddIcon from '@mui/icons-material/Add';

export default function CadastroAdvertencia() {
  const [advertenciaList, setAdvertenciaList] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getAdvertencias = () => {
    setLoad(true)
    get(`api/advertenciaTipo?page=${page + 1}&size=${pageSize}`).then((response) => {
      setAdvertenciaList(response.data)
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

  const deletarAdvertencia = (id) => {
    setLoad(true)
    del(`api/advertenciaTipo/${id}`).then((response) => {
      setLoad(false)
      setSnackOptions(prev => ({ mensage: "Tipo de Advertência deletado com Sucesso", type: "success", open: true }));
      getAdvertencias()
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
    getAdvertencias();
  }, [page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/cadastroAdvertenciaTipoForm/0`)
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'tipoAdvertencia', headerName: 'Tipo de Advertência', width: 300},
    { field: 'ativo', headerName: 'Ativo', width: 200,
    renderCell: (params) => {
      return (
        params.value ? 'SIM' : 'NÃO'
      );
    } },
    { field: 'created_at', headerName: 'Data de Criação', width: 200 },
    { field: 'updated_at', headerName: 'Data de Atualização', width: 200 },
    {
      field: 'edit_button', headerName: 'Editar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/cadastroAdvertenciaTipoForm/${params.row.id}`)
              });
            }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
    {
      field: 'delete_button', headerName: 'Deletar', width: 75,
      renderCell: (params) => {
        return (
          <IconButton
            color="error"
            onClick={() => {
              deletarAdvertencia(params.row.id);
            }}>
            <DeleteIcon />
          </IconButton>
        );
      }
    },
  ];

  return (
    <>
      <FutmanagerTitles title={"Tipos de Advertências Cadastradas"} />
      <FutmanagerButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={advertenciaList?.data || []}
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
        rowCount={advertenciaList?.pagination?.total_records || 0}
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