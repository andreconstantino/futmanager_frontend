import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Roboto } from '../../styles/Styles';
import { useState } from 'react';
import {get, post, put, doDelete, setHeader} from "../../services/http"
import FutmanagerSnackbar from '../FutmanagerSnackbar';
import { useEffect } from 'react';

export default function LoginPage(){
    const [username, setUserName] = useState([""]);
    const [password, setPassword] = useState([""]);
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [snackOptions, setSnackOptions] = useState({ mensage: "Unknow", type: "error", open: false });
    const navigate = useNavigate();

    function login() {
        if (username == ""){
          setSnackOptions(prev => ({ mensage: "Preencha o E-mail para prosseguir", type: "warning", open: true }));
        } else if (password == ""){
          setSnackOptions(prev => ({ mensage: "Preencha a senha para prosseguir", type: "warning", open: true }));
        } else {
          if (username && password) {
            var body = {
              grant_type: 'password',
              client_id: import.meta.env.VITE_CLIENT_ID, 
              client_secret: import.meta.env.VITE_CLIENT_SECRET,
              username: username, //futmanager@example.com
              password: password //12345
            }
        
            post('oauth/token', body).then((response) => {
              navigate('/home');
            }).catch ((error) => {
              console.log(error)
              setSnackOptions(prev => ({ mensage: "Não foi possivel realizar o seu login", type: "error", open: true }));
            });
          }
        }
        
    }

    const closeSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackOptions(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
      if (erro) {
          setErro(false)
          setMensagemErro('')
      }
    }, [username, password]);

    return(
       <>
       <div className='md:h-4/6 sm:h-5/6 w-96 h-3/5 flex flex-col items-center m-10 bg-white rounded'>
            <Logo />
            <Roboto>
            <div className=' w-80'>
                <TextField 
                  required
                  id="standard-required"
                  onChange={(e) => setUserName(e.target.value)}
                  error={erro}
                  label="E-mail" 
                  variant="outlined" 
                  style={{margin:'10px', width:'300px'}}
                />
                <TextField 
                  required
                  id="standard-required"
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  error={erro}
                  label="Senha" 
                  variant="outlined" 
                  style={{margin:'10px', width:'300px'}} 
                />
            </div>
            <div className='flex flex-row mb-12'> 
                <Link to="" style={{color:'rgb(0, 85, 150)'}}>Esqueci minha senha</Link>
            </div>    
                <Button onClick={login} variant="contained" style={{margin:'10px', width:'300px', backgroundColor:'rgb(0, 85, 150)'}}>Entrar</Button>
            </Roboto> 
            <FutmanagerSnackbar
              mensage={snackOptions.mensage}
              type={snackOptions.type}
              open={snackOptions.open}
              handleClose={closeSnackBar} />
        </div>  
       </>    
    )
}