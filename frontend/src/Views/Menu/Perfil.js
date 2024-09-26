import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebase'; // Certifique-se de que o caminho está correto
import { doc, getDoc } from 'firebase/firestore';
import Header from '../../Template/Header';

const Perfil = () => {
    const { user, loading } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (loading) {
            return; // Enquanto estiver carregando, não faça nada
        }

        if (!user) {
            window.location.href = "/"; // Redireciona para a página de login
            return;
        }

        const fetchUserData = async () => {
            const userRef = doc(db, 'usuarios', user.uid); // Altere 'usuarios' se o nome da coleção for diferente
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchUserData();
    }, [user, loading]);

    if (loading) {
        return <div>Carregando...</div>; // Mostra "Carregando..." enquanto verifica o estado
    }

    return (
        <div>
            <Header />
            <main className="pt-16">
                <div className="flex justify-center mt-20 px-8">
                    <form className="max-w-2xl">
                        <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                            <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>

                            <div className="flex flex-col gap-2 w-full border-gray-400">

                                <div>
                                    <label className="text-gray-600 dark:text-gray-400">User name</label>
                                    <input
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="text"
                                        value={userData?.usuario || ''} // Usando a propriedade "usuario"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-600 dark:text-gray-400">Email</label>
                                    <input
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="text"
                                        value={userData?.email || ''} // Usando a propriedade "email"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-600 dark:text-gray-400">Bio</label>
                                    <textarea
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        name="bio"
                                        value={userData?.bio || ''} // Usando a propriedade "bio"
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                        type="submit" disabled
                                    >Save changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Perfil;
