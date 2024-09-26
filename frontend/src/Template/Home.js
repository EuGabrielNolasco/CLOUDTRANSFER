import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Header from './Header';
import Table from '../Views/Menu/Table';

const Home = () => {
    const { user, loading } = useAuth(); // Certifique-se de que 'loading' é fornecido pelo contexto

    useEffect(() => {
        if (loading) {
            return; // Enquanto estiver carregando, não faça nada
        }

        if (!user) {
            window.location.href = "/"; // Redireciona para a página de login
        }
    }, [user, loading]);

    if (loading) {
        return <div>Carregando...</div>; // Mostra "Carregando..." enquanto verifica o estado
    }

    return (
        <div>
            <Header />
            <main className="pt-16">
                <Table />
            </main>
        </div>
    );
};

export default Home;
