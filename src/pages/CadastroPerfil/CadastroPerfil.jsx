import { useState, useEffect } from 'react'
import { get, del } from "../../../services/http"
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { SIDButton, SIDTitles, SIDSnackbar } from '../../../components';
import AddIcon from '@mui/icons-material/Add';

export default function Cenario() {
  const [cenarioList, setCenarioList] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getCenarios = () => {
    setLoad(true)
    get(`api/fluxodecaixa/cenario?page=${page + 1}&size=${pageSize}`).then((response) => {
      setCenarioList(response.data)
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

  const delCenario = (id) => {
    setLoad(true)
    del(`api/fluxodecaixa/cenario/${id}`).then((response) => {
      setLoad(false)
      setSnackOptions(prev => ({ mensage: "Cenario deletado com Sucesso", type: "success", open: true }));
      getCenarios()
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
    getCenarios();
  }, [page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  const createItem = () => {
    startTransition(() => {
      navegacao(`/cenario/0`)
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', headerName: 'Name', width: 200 },
    { field: 'data', headerName: 'Data de Referencia', width: 200 },
    { field: 'created_at', headerName: 'Data de Criação', width: 250 },
    { field: 'updated_at', headerName: 'Data de Atualização', width: 250 },
    {
      field: 'edit_button', headerName: 'Editar', width: 65,
      renderCell: (params) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              startTransition(() => {
                navegacao(`/cenario/${params.row.id}`)
              });
            }}>
            <EditIcon />
          </IconButton>
        );
      }
    },
    {
      field: 'delete_button', headerName: 'Deletar', width: 65,
      renderCell: (params) => {
        return (
          <IconButton
            color="error"
            onClick={() => {
              delCenario(params.row.id);
            }}>
            <DeleteIcon />
          </IconButton>
        );
      }
    },
  ];

  return (
    <>
      <SIDTitles title={"Lista de Cenarios"} />
      <SIDButton className='pl-6' color="primary" click={createItem} icon={<AddIcon />} />
      <DataGrid
        className='m-3'
        sx={{ width: '100%' }}
        pagination
        paginationMode={'server'}
        loading={load}
        rows={cenarioList?.data || []}
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
        rowCount={cenarioList?.pagination?.total_records || 0}
        pageSizeOptions={[10, 25, 50]}
      />
      <SIDSnackbar
        mensage={snackOptions.mensage}
        type={snackOptions.type}
        open={snackOptions.open}
        handleClose={closeSnackBar} />
    </>
  )
}