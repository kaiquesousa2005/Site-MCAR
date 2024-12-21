import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Trash2 } from 'lucide-react';
import CarShowcase from '../pages/carros';

const longContentClass = "max-w-xs break-words whitespace-normal";

export default function Dashboard() {
  const [contatos, setContatos] = useState([])
  const [simulacoes, setSimulacoes] = useState([])
  const [activeTab, setActiveTab] = useState('contatos')
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchContatos = async () => {
    try {
      const q = query(collection(db, "contatos"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const contatosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContatos(contatosData);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  }

  const fetchSimulacoes = async () => {
    try {
      const q = query(collection(db, "simulação"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const simulacoesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSimulacoes(simulacoesData);
    } catch (error) {
      console.error('Erro ao buscar simulações:', error);
    }
  }

  useEffect(() => {
    fetchContatos()
    fetchSimulacoes()
  }, [])

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        const collectionName = type === 'contato' ? 'contatos' : 'simulação';
        await deleteDoc(doc(db, collectionName, id));
        if (type === 'contato') {
          setContatos(contatos.filter(contato => contato.id !== id));
        } else {
          setSimulacoes(simulacoes.filter(simulacao => simulacao.id !== id));
        }
        alert('Item excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir item:', error);
        alert('Erro ao excluir item. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard do Usuário-Controlador</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${activeTab === 'contatos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('contatos')}
        >
          Contatos
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'simulacoes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('simulacoes')}
        >
          Simulações
        </button>
      </div>
      
      {activeTab === 'contatos' && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Contatos Recebidos</h2>
          <p className="text-gray-600 mb-4">Lista de todas as mensagens de contato recebidas</p>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Mensagem</th>
                <th className="text-left p-2">Data</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contatos.map((contato) => (
                <tr key={contato.id} className="border-b">
                  <td className="p-2">{contato.nome}</td>
                  <td className="p-2">{contato.email}</td>
                  <td className={`p-2 ${longContentClass}`}>{contato.mensagem}</td>
                  <td className="p-2">{new Date(contato.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(contato.id, 'contato')}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'simulacoes' && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Simulações de Financiamento</h2>
          <p className="text-gray-600 mb-4">Lista de todas as simulações de financiamento solicitadas</p>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Nome Completo</th>
                <th className="text-left p-2">Data de Nascimento</th>
                <th className="text-left p-2">CPF</th>
                <th className="text-left p-2">Carro de Interesse</th>
                <th className="text-left p-2">Possui CNH</th>
                <th className="text-left p-2">WhatsApp</th>
                <th className="text-left p-2">Mensagem</th>
                <th className="text-left p-2">Data</th>
                <th className="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {simulacoes.map((simulacao) => (
                <tr key={simulacao.id} className="border-b">
                  <td className="p-2">{simulacao.nome}</td>
                  <td className="p-2">{simulacao.dataNascimento}</td>
                  <td className="p-2">{simulacao.cpf}</td>
                  <td className="p-2">{simulacao.carroInteresse}</td>
                  <td className="p-2">{simulacao.possuiCnh}</td>
                  <td className="p-2">{simulacao.whatsapp}</td>
                  <td className={`p-2 ${longContentClass}`}>{simulacao.mensagem}</td>
                  <td className="p-2">{new Date(simulacao.createdAt).toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(simulacao.id, 'simulacao')}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {<CarShowcase/>}
      </div>
    </div>
  )
}

