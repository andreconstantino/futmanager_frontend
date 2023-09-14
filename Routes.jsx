import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import Register from './src/pages/Register';

export default function MyRoute(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}>
                </Route>
                <Route path="/register" element={<Register/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}