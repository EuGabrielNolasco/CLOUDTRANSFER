// src/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import icon from '../imgs/icon.png';
import Header from './HeaderInicio';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Tentando fazer login com:", email);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuário logado:", userCredential.user);
            navigate('/home');
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErrorMessage("Credenciais incorretas. Tente novamente."); // Define a mensagem de erro
        }
    };

    return (
        <>
            <Header />
            <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="relative py-6 sm:max-w-md sm:mx-auto">
                    <div className="min-h-96 px-10 py-8 mt-4 text-left bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col justify-center items-center h-full select-none mb-6">
                                <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                    <a href="/" target="_blank" rel="noopener noreferrer">
                                        <img src={icon} className="w-16" alt="Logo" />
                                    </a>
                                    <h2 className="m-0 text-2xl font-bold">Login</h2>
                                    <p className="m-0 text-sm text-gray-600 text-center max-w-[90%]">
                                        Inicie sua experiência no CloudTransfer.
                                    </p>
                                </div>
                                {errorMessage && ( // Exibe a mensagem de erro, se existir
                                    <p className="text-red-500 text-sm">{errorMessage}</p>
                                )}
                                <div className="w-full flex flex-col gap-2">
                                    <label className="font-semibold text-xs text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2 mb-4">
                                <label className="font-semibold text-xs text-gray-600">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Não tem uma conta?{' '}
                                <a
                                    href="/registro"
                                    className="text-blue-600 hover:underline"
                                >
                                    Registre-se aqui.
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
