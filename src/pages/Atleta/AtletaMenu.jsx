import { useState, useEffect } from 'react'
import { get, del } from "../../services/http"
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { FutmanagerButton, FutmanagerTitles, FutmanagerSnackbar, FutmanagerCard } from "../../components";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function AtletaMenu() {
  const [categoriaList, setCategoriaList] = useState({
    ativo: '',
    categoria: "",
    created_at: "",
    id: '',
    updated_at: ""
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [load, setLoad] = useState(false);
  const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
  const navegacao = useNavigate()

  const getCategorias = () => {
    setLoad(true)
    get(`api/categoria?page=${page + 1}&size=${pageSize}`).then((response) => {
      setCategoriaList(response.data.data)
      console.log(response.data.data)
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
    getCategorias();
  }, [page, pageSize]);

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOptions(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <FutmanagerTitles title={"Atletas"} />

      <div className='flex'>
        <div className='grid grid-cols-2'>
          {categoriaList.length > 0 ? categoriaList.map((item) => {
            return <FutmanagerCard 
              key={item.id}
              image={item.caminhoImagem}
              alt={item.categoria}
              title={item.categoria}
              onClick={() => navegacao('/atletaList/'+item.id)}
            />;
          }) : ""}
        </div>
      </div>  
      
      <FutmanagerSnackbar
        mensage={snackOptions.mensage}
        type={snackOptions.type}
        open={snackOptions.open}
        handleClose={closeSnackBar} />
    </>
  )
}

export default AtletaMenu;