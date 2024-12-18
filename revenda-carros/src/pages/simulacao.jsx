import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './simulacao.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FinancingSimulation() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    carroInteresse: '',
    cnh: '',
    whatsapp: '',
    mensagem: ''
  });

  const [autoFillOccurred, setAutoFillOccurred] = useState(false);

  const query = useQuery();

  useEffect(() => {
    const carro = query.get('carro');
    if (carro && !autoFillOccurred) {
      setFormData(prevState => ({
        ...prevState,
        carroInteresse: decodeURIComponent(carro)
      }));
      setAutoFillOccurred(true);
    }
  }, [query, autoFillOccurred]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (Object.values(formData).every(value => value)) {
      try {
        const response = await fetch('https://site-mcar-production.up.railway.app/simulacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nomeCompleto: formData.nome,
            dataNascimento: formData.dataNascimento,
            cpf: formData.cpf,
            carroInteresse: formData.carroInteresse,
            possuiCnh: formData.cnh,
            whatsapp: formData.whatsapp,
            mensagem: formData.mensagem
          })
        });

        if (response.ok) {
          const result = await response.json();
          alert(`Obrigado, ${formData.nome}! Sua solicitação de simulação para o carro "${formData.carroInteresse}" foi enviada.`);
          setFormData({
            nome: '',
            dataNascimento: '',
            cpf: '',
            carroInteresse: '',
            cnh: '',
            whatsapp: '',
            mensagem: ''
          });
          console.log(result);
        } else {
          alert('Ocorreu um erro ao enviar sua solicitação.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar sua solicitação.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleNameInput = (event) => {
    const input = event.target;
    const previousValue = input.value;
    input.value = input.value.replace(/[^a-zA-Z\sÀ-ÖØ-öø-ÿ]/g, '');
    if (previousValue !== input.value) {
      alert('Utilize somente letras!');
    }
    handleInputChange(event);
  };

  const handleNumberInput = (event) => {
    const input = event.target;
    const previousValue = input.value;
    input.value = input.value.replace(/\D/g, '');
    if (previousValue !== input.value) {
      alert('Utilize somente números!');
    }
    handleInputChange(event);
  };

  return (
    <div className={styles.root}>
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />
      <div className={styles.financingSimulation}>
        <section className={styles.simulacaoExplicacao}>
          <h2>Como Funciona a Simulação de Financiamento</h2>
          <p>
            Ao preencher o formulário de simulação de financiamento, você nos fornece informações essenciais
            que nos ajudam a entender suas necessidades e a encontrar a melhor opção de financiamento para você.
            Abaixo, explicamos cada campo do formulário:
          </p>
          <ul>
            <li>
              <strong>Nome Completo:</strong> Informe seu nome completo para que nós possamos identificar para quem estamos fazendo o atendimento.
            </li>
            <li>
              <strong>Data de Nascimento:</strong> A idade é um fator importante na avaliação do crédito.
            </li>
            <li>
              <strong>CPF:</strong> Precisamos do seu CPF para o banco verificar sua situação e oferecer as melhores condições.
            </li>
            <li>
              <strong>Qual carro você possui interesse?</strong> Informe o modelo e o ano do carro que você deseja fazer a simulação de financiamento.
            </li>
            <li>
              <strong>Possui CNH?</strong> Essa informação é necessária para a simulação ser feita, mas não é obrigatório ter a CNH para fazer uma simulação.
            </li>
            <li>
              <strong>WhatsApp para contato:</strong> Insira seu número de WhatsApp para que possamos entrar em contato com você facilmente.
            </li>
          </ul>
          <p>
            Após preencher todas as informações, clique no botão "Enviar Simulação" para receber as opções de
            financiamento disponíveis. Nossa equipe entrará em contato com você o mais breve possível!
          </p>
        </section>

        <section className={styles.formSection}>
          <h2>Simulação de Financiamento</h2>
          <form id={styles.formSimulacao} onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome Completo:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome}
              onChange={handleNameInput}
              required 
            />

            <label htmlFor="data-nascimento">Data de Nascimento:</label>
            <input 
              type="date" 
              id="data-nascimento" 
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="cpf">CPF:</label>
            <input 
              type="text" 
              id="cpf" 
              name="cpf" 
              placeholder="xxx.xxx.xxx-xx" 
              value={formData.cpf}
              onChange={handleNumberInput}
              required 
            />

            <label htmlFor="carro-interesse">Qual carro você possui interesse?</label>
            <input 
              type="text" 
              id="carro-interesse" 
              name="carroInteresse" 
              placeholder="Ex: Fiat Mobi 2024" 
              value={formData.carroInteresse}
              onChange={handleInputChange}
              required 
            />

            <label htmlFor="cnh">Possui CNH?</label>
            <select 
              id="cnh" 
              name="cnh"
              value={formData.cnh}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <label htmlFor="whatsapp">WhatsApp para contato:</label>
            <input 
              type="tel" 
              id="whatsapp" 
              name="whatsapp" 
              placeholder="(xx) xxxx-xxxx" 
              value={formData.whatsapp}
              onChange={handleNumberInput}
              required 
            />

            <label htmlFor="mensagem">Mensagem:</label>
            <input 
              type="text" 
              id="mensagem" 
              name="mensagem"
              value={formData.mensagem}
              onChange={handleInputChange}
            />

            <button type="submit">Enviar Simulação</button>
          </form>
        </section>
      </div>
    </div>
  );
}

