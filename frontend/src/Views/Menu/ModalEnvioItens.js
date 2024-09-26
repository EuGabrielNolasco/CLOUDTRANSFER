// src/Views/Menu/ModalEnvioItens.js
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const ModalEnvioItens = ({ onClose, files }) => {
    const [email, setEmail] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [selectedFiles, setSelectedFiles] = useState({});

    // Função fictícia para simular o envio de email
    const sendEmail = async (emailData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulando sucesso
                resolve();
            }, 1000);
        });
    };

    const handleSendEmail = async () => {
        const filesToSend = Object.keys(selectedFiles).filter(fileId => selectedFiles[fileId]);

        if (filesToSend.length === 0) {
            alert('Nenhum arquivo selecionado para enviar.');
            return;
        }

        const emailData = {
            to: email,
            files: filesToSend.map(fileId => files.find(file => file.id === fileId)),
        };

        try {
            await sendEmail(emailData); // Chamando a função fictícia
            alert('Email enviado com sucesso!');
            onClose();
            setSelectedFiles({});
        } catch (error) {
            alert('Falha ao enviar o email: ' + error.message);
        }
    };

    return (
        <>
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClose}>
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                Enviar para
                            </h3>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="Digite o e-mail do destinatário"
                                    className="mt-2 border border-gray-300 rounded-md px-4 py-2 w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleSendEmail}
                            >
                                Enviar
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalEnvioItens;
