import React, { useState } from 'react';
import { auth } from '../firebase'; // Certifique-se de que o caminho está correto
import { signOut } from 'firebase/auth';
import icon from '../imgs/icon.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar o dropdown

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz o logout do usuário
            window.location.href = '/'; // Redireciona para a página de login
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/home" className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
                            <img src={icon} alt="Logo" className="h-14 w-14 mr-2 inline-block" />
                            CLOUDTRANSFER
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-primary hover:text-white rounded transition duration-200">Sair</button>
                        <a href="#settings" className="block py-2 px-4 text-sm hover:bg-primary hover:text-white rounded transition duration-200">Configurações</a>
                        <a href="/perfil" className="block py-2 px-4 text-sm hover:bg-primary hover:text-white rounded transition duration-200">Perfil</a>
                    </div>

                    {/* Botão para telas pequenas */}
                    <div className="md:hidden">
                        <button onClick={toggleDropdown} className="flex items-center justify-center p-2 text-gray-800 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Dropdown para telas pequenas */}
                {isOpen && (
                    <div className="md:hidden bg-white shadow-md absolute w-full z-50">
                        <button onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-primary hover:text-white transition duration-200">Sair</button>
                        <a href="#settings" className="block py-2 px-4 text-sm hover:bg-primary hover:text-white transition duration-200">Configurações</a>
                        <a href="#profile" className="block py-2 px-4 text-sm hover:bg-primary hover:text-white transition duration-200">Perfil</a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
