import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Pages from './src/pages/Pages';

export default function MyRoute(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}>
                </Route>
                <Route Component={Pages}>
                    <Route path="/register" element={<Register/>}>
                    </Route>
                    <Route path="/home" element={<Home/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}