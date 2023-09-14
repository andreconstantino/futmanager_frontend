import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Roboto } from '../../styles/Styles';
import { useState } from 'react';
import {get, post, put, doDelete, setHeader} from "../../services/index"
import { ChangeEvent } from 'react';

export default function LoginPage(){

    const [loginData, setLoginData] = useState([]);
    const [username, setUserName] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();

    function login() {
        if (username && password) {
          var body = {
            grant_type: 'password',
            client_id:'9a1c065d-c561-429a-adc8-c0034567ef3c', 
            client_secret:'R88Y3WdjaGf0KYZuez9TxvN70RwabYKK0iR9WR9i',
            username: username, //futmanager@example.com
            password: password //12345
          }
      
          post('http://127.0.0.1:8000/oauth/token', body).then((response) => {
            setLoginData(response.data)
            setHeader(response.data.token_type, response.data.access_token)
            navigate('/register');
          }).catch ((error) => {
            console.log(error)
            alert('deu ruim')
          });
        } else {
          alert("deu ruim")
        }
    }

    const buscarUserName = (event) => {
        setUserName(event.target.value);
    }

    const buscarPassword = (event) => {
        setPassword(event.target.value);
    }

    return(
       <>
       <div className='md:h-4/6 sm:h-5/6 w-96 h-3/5 flex flex-col items-center m-10 bg-white rounded'>
            <Logo />
            <Roboto>
            <div className=' w-80'>
                <TextField 
                  id="username" 
                  value={username} 
                  onChange={buscarUserName}
                  label="E-mail" 
                  variant="outlined" 
                  style={{margin:'10px', width:'300px'}}
                  required
                />
                <TextField 
                  id="password" 
                  type='password'
                  value={password} 
                  onChange={buscarPassword}
                  label="Senha" 
                  variant="outlined" 
                  style={{margin:'10px', width:'300px'}} 
                  required
                />
            </div>
            <div className='flex flex-row mb-12'> 
                <Link to="" style={{color:'rgb(0, 85, 150)'}}>Esqueci minha senha</Link>
            </div>    
                <Button onClick={login} variant="contained" style={{margin:'10px', width:'300px', backgroundColor:'rgb(0, 85, 150)'}}>Entrar</Button>
            </Roboto> 
        </div>  
       </>    
    )

    
}