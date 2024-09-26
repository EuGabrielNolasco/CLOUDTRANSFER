// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Template/Login';
import Home from './Template/Home';
import Registro from './Template/Registro';
import Inicio from './Template/Inicio';
import Perfil from './Views/Menu/Perfil';

import { AuthProvider } from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Inicio />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
