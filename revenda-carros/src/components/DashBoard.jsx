import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [contatos, setContatos] = useState([])
  const [simulacoes, setSimulacoes] = useState([])
  const [activeTab, setActiveTab] = useState('contatos')
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const response = await fetch('site-mcar-production.up.railway.app/contatos')
        if (!response.ok) throw new Error('Erro ao buscar contatos')
        const data = await response.json()
        setContatos(data)
      } catch (error) {
        console.error('Erro:', error)
      }
    }

    const fetchSimulacoes = async () => {
      try {
        const response = await fetch('site-mcar-production.up.railway.app/simulacoes')
        if (!response.ok) throw new Error('Erro ao buscar simulações')
        const data = await response.json()
        setSimulacoes(data)
      } catch (error) {
        console.error('Erro:', error)
      }
    }

    fetchContatos()
    fetchSimulacoes()
  }, [])

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard do Usuário-Controlador</h1>
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
              </tr>
            </thead>
            <tbody>
              {contatos.map((contato, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{contato.nome}</td>
                  <td className="p-2">{contato.email}</td>
                  <td className="p-2">{contato.mensagem}</td>
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
              </tr>
            </thead>
            <tbody>
              {simulacoes.map((simulacao, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{simulacao.nome_completo}</td>
                  <td className="p-2">{new Date(simulacao.data_nascimento).toLocaleDateString()}</td>
                  <td className="p-2">{simulacao.cpf}</td>
                  <td className="p-2">{simulacao.carro_interesse}</td>
                  <td className="p-2">{simulacao.possui_cnh ? 'Sim' : 'Não'}</td>
                  <td className="p-2">{simulacao.whatsapp}</td>
                  <td className="p-2">{simulacao.mensagem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}