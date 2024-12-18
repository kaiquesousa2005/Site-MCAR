import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './principal.module.css';
import { fetchedCars } from '../components/Estoque';

const Principal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contatoRef = useRef(null);
  const location = useLocation();

  const slideNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fetchedCars.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, [slideNext]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('section') === 'contato' && contatoRef.current) {
      contatoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className={styles.root}>
      <div className={styles.carousel}>
        <div className={styles.carouselContainer}>
          {fetchedCars.map((car, index) => (
            <div 
              key={index} 
              className={`${styles.carouselItem} ${index === currentIndex ? styles.carouselItemActive : ''}`}
              style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
            >
              <div className={styles.carCard}>
                <h3 className={styles.carTitle}>{car.name}</h3>
                <img src={car.images[0]} alt={car.name} className={styles.carouselImage} />
                <p className={styles.carPrice}>{car.description}</p>
              </div>
            </div>
          ))}
          <button className={`${styles.carouselControl} ${styles.carouselControlPrev}`} onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + fetchedCars.length) % fetchedCars.length)}>&#10094;</button>
          <button className={`${styles.carouselControl} ${styles.carouselControlNext}`} onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % fetchedCars.length)}>&#10095;</button>
        </div>
      </div>

      <section className={styles.section} id="home">
        <h2 className={styles.sectionTitle}>Bem-vindo à nossa loja!</h2>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <p className={styles.sectionText}>Na MCar Veículos, nossa prioridade é oferecer uma experiência de compra de veículos sem complicações, com total transparência e confiança. Contamos com um portfólio diversificado de carros seminovos e usados, criteriosamente selecionados para garantir a melhor qualidade e custo-benefício.</p>
            <p>Seja você um comprador de primeira viagem ou um conhecedor de carros, nossa equipe está pronta para te ajudar a encontrar o veículo ideal que atenda suas necessidades e expectativas.</p>
            <p><strong>Por que escolher a MCar Veículos?</strong></p>
            <ul>
                <li>🛠️ **Carros Inspecionados**: Todos os nossos veículos passam por uma rigorosa inspeção de qualidade.</li>
                <li>📜 **Documentação Completa**: Garantimos que toda a documentação dos veículos está em dia.</li>
                <li>💬 **Atendimento Personalizado**: Nossa equipe está sempre pronta para esclarecer suas dúvidas e ajudar na escolha do seu carro.</li>
                <li>🌟 **Financiamento Facilitado**: Oferecemos opções de financiamento que se encaixam no seu orçamento.</li>
            </ul>
            <p>Visite nossa loja e descubra por que somos referência em atendimento e credibilidade no mercado de automóveis!</p>
            <a href="/carros" className={styles.btnVisit}>Ver Carros Disponíveis</a>
          </div>
        </div>
      </section>

      <section className={styles.section} id="contato" ref={contatoRef}>
        <h2 className={styles.sectionTitle}>Entre em Contato</h2>
        <form 
          className={styles.formContato} 
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
              const response = await fetch('https://site-mcar-production.up.railway.app/contato', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  nome: formData.get('nome'),
                  email: formData.get('email'),
                  mensagem: formData.get('mensagem'),
                }),
              });
              if (!response.ok) throw new Error('Erro no envio');
              alert('Mensagem enviada com sucesso!');
            } catch (error) {
              alert('Erro: Tente novamente mais tarde.');
            }
          }}
        >
          <input type="text" name="nome" placeholder="Seu Nome" className={styles.inputField} />
          <input type="email" name="email" placeholder="Seu Email" className={styles.inputField} />
          <textarea name="mensagem" placeholder="Sua Mensagem" className={styles.textAreaField}></textarea>
          <button type="submit" className={styles.submitButton}>Enviar</button>
        </form>
      </section>
    </div>
  );
};

export default Principal;

