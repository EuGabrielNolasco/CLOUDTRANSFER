// src/Registro.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Certifique-se de que o Firebase está configurado corretamente
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import icon from '../imgs/icon.png';
import Header from './HeaderInicio';

const Registro = () => {
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [mensagemErro, setMensagemErro] = useState(''); // Estado para mensagem de erro
    const navigate = useNavigate();
    const db = getFirestore(); // Inicializa o Firestore

    const handleRegister = async (e) => {
        e.preventDefault();

        if (senha !== senhaConfirmacao) {
            setMensagemErro("As senhas não correspondem!");
            return;
        }

        if (senha.length < 8) {
            setMensagemErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const usuarioLogado = userCredential.user;

            // Salva os dados no Firestore
            await setDoc(doc(db, 'usuarios', usuarioLogado.uid), {
                nome: nome,
                usuario: usuario, // Salva o nome de usuário fornecido
                email: email,
            });

            console.log("Usuário registrado:", usuarioLogado);
            navigate('/home'); // Redireciona após o registro
        } catch (error) {
            console.error("Erro ao registrar:", error);
            setMensagemErro("Erro ao registrar usuário. Tente novamente."); // Mensagem de erro
        }
    };  

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24"> {/* Adicionei pt-16 aqui */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-20 w-auto" src={icon} alt="Fluxo de Trabalho" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Crie uma nova conta
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                    Ou <br></br>
                    <a
                        href="/login"
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        faça login na sua conta
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleRegister}>
                        {mensagemErro && (
                            <p className="text-red-500 text-sm">{mensagemErro}</p>
                        )}
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium leading-5 text-gray-700">Nome</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="nome"
                                    name="nome"
                                    placeholder="João Silva"
                                    type="text"
                                    required
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="usuario" className="block text-sm font-medium leading-5 text-gray-700">Usuário</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                    CloudTransfer.com/
                                </span>
                                <input
                                    id="usuario"
                                    name="usuario"
                                    placeholder="joao"
                                    type="text"
                                    required
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="flex-1 border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Endereço de e-mail</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="usuario@exemplo.com"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="senha" className="block text-sm font-medium leading-5 text-gray-700">Senha</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    required
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="senha_confirmacao" className="block text-sm font-medium leading-5 text-gray-700">Confirmar Senha</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="senha_confirmacao"
                                    name="senha_confirmacao"
                                    type="password"
                                    required
                                    value={senhaConfirmacao}
                                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-primary focus:shadow-outline-primary active:bg-primary transition duration-150 ease-in-out">
                                    Criar conta
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div></>
    );
};

export default Registro;
