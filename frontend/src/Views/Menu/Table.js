// src/Views/Menu/Table.js
import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import ModalEnvioItens from './ModalEnvioItens';

const Table = () => {
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [selectedFiles, setSelectedFiles] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState([]); // Adicionado o estado para 'files'
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadError('');
        }
    };

    const handleUpload = async () => {
        if (!file || !userId) {
            setUploadError('Por favor, escolha um arquivo e faça login antes de enviar.');
            return;
        }

        const storageRef = ref(storage, `uploads/${userId}/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            alert('Arquivo enviado com sucesso!');
            setFile(null);
            fetchFiles();
        } catch (error) {
            setUploadError('Falha ao enviar o arquivo: ' + error.message);
        }
    };

    const fetchFiles = async () => {
        if (!userId) return;

        const listRef = ref(storage, `uploads/${userId}/`);

        try {
            const res = await listAll(listRef);
            const urls = await Promise.all(
                res.items.map(item => getDownloadURL(item))
            );

            const filesList = res.items.map((item, index) => ({
                id: item.name,
                name: item.name,
                url: urls[index]
            }));

            setFiles(filesList);
            setSelectedFiles({});
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
        }
    };

    const handleDelete = async (fileName) => {
        if (!userId) return;

        const fileRef = ref(storage, `uploads/${userId}/${fileName}`);

        try {
            await deleteObject(fileRef);
            fetchFiles();
        } catch (error) {
            console.error('Erro ao excluir arquivo:', error);
        }
    };

    const handleSelect = (fileId) => {
        setSelectedFiles(prevState => ({
            ...prevState,
            [fileId]: !prevState[fileId]
        }));
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allSelected = files.reduce((acc, file) => {
                acc[file.id] = true;
                return acc;
            }, {});
            setSelectedFiles(allSelected);
        } else {
            setSelectedFiles({});
        }
    };

    const handleDeleteSelected = async () => {
        const filesToDelete = Object.keys(selectedFiles).filter(fileId => selectedFiles[fileId]);
        if (filesToDelete.length === 0) {
            alert('Nenhum arquivo selecionado para excluir.');
            return;
        }

        for (const fileId of filesToDelete) {
            await handleDelete(fileId);
        }
        setSelectedFiles({});
    };

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        alert('URL copiada para a área de transferência!');
    };

    const truncateUrl = (url) => {
        return url.length > 16 ? url.substring(0, 13) + '...' : url;
    };

    useEffect(() => {
        fetchFiles();
    }, [userId]);

    return (
        <>
            <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                <div className="grid gap-1">
                    <h2 className="text-center text-gray-400 text-sm leading-4">PNG, JPG ou PDF, menor que 15MB</h2>
                </div>
                <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Arraste e solte seu arquivo aqui ou</h4>
                    <div className="flex items-center justify-center">
                        <label className="flex flex-col items-center border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer">
                            <input type="file" hidden onChange={handleFileChange} />
                            <div className="flex w-40 h-9 px-3 flex-col bg-primary rounded-full shadow text-white text-s font-semibold leading-4 items-center justify-center">
                                Escolher Arquivo
                            </div>
                            <span className="mt-2 text-gray-600">{file ? file.name : "Nenhum arquivo selecionado"}</span>
                        </label>
                        <button
                            onClick={handleUpload}
                            className="ml-4 flex w-28 h-9 px-2 bg-green-500 rounded-full shadow text-white font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none"
                        >
                            Enviar
                        </button>
                    </div>
                    {uploadError && <p className="text-red-500 text-xs text-center">{uploadError}</p>}
                </div>
            </div>

            <div className="p-7 shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 mt-5">
                <div className="flex justify-between mb-4 flex-col sm:flex-row">
                    <div className="flex gap-4 ml-auto">
                        <button onClick={() => setShowModal(true)} className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-300 hover:text-gray-900">Enviar Selecionados</span>
                        </button>
                        <button onClick={handleDeleteSelected} className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-300 hover:text-gray-900">Excluir Selecionados</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-4 px-2 text-left text-gray-600 font-bold uppercase"><input type="checkbox" onChange={handleSelectAll} /></th>
                                <th className="py-4 px-2 text-left text-gray-600 font-bold uppercase">Nome</th>
                                <th className="py-4 px-2 text-left text-gray-600 font-bold uppercase">Link</th>
                                <th className="py-4 px-2 text-left text-gray-600 font-bold uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {files.map((file) => (
                                <tr key={file.id}>
                                    <td className="py-4 px-2 border-b border-gray-200"><input type="checkbox" checked={selectedFiles[file.id] || false} onChange={() => handleSelect(file.id)} /></td>
                                    <td className="py-4 px-2 border-b border-gray-200">{file.name}</td>
                                    <td className="py-4 px-2 border-b border-gray-200">
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{truncateUrl(file.url)}</a>
                                    </td>
                                    <td className="py-4 px-2 border-b border-gray-200 flex flex-col sm:flex-row sm:gap-2">
                                        <button onClick={() => handleCopy(file.url)} className="bg-blue-500 text-white rounded px-3 py-2 text-sm mt-1">Copiar</button>
                                        <button onClick={() => handleDelete(file.id)} className="bg-red-500 text-white rounded px-3 py-2 text-sm mt-1">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <ModalEnvioItens
                    onClose={() => setShowModal(false)}
                    files={files}
                    selectedFiles={selectedFiles}
                />
            )}
        </>
    );
};

export default Table;
