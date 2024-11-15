import React from 'react';
import styles from './regras.module.css';

function TermsOfUse() {
  return (
    <div className={styles.legalPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Termos de Uso</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Introdução</h2>
          <p>Estes Termos de Uso regem a utilização do site MCar Veículos. Ao acessar ou utilizar nossos serviços, você concorda com estes termos.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uso do Site</h2>
          <p>Você se compromete a utilizar o site de forma legal e a não realizar atividades que possam prejudicar o funcionamento ou a segurança do site.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Propriedade Intelectual</h2>
          <p>Todo o conteúdo, incluindo textos, imagens e logotipos, é de propriedade da MCar Veículos e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Isenção de Responsabilidade</h2>
          <p>Os serviços e informações fornecidas no site são oferecidos "como estão" e "conforme disponíveis". Não garantimos a precisão, integridade ou adequação das informações apresentadas.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alterações aos Termos</h2>
          <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Quaisquer alterações serão publicadas nesta página.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contato</h2>
          <p>Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: <a href="mailto:mcarveiculos2015@gmail.com" className={styles.link}>mcarveiculos2015@gmail.com</a>.</p>
        </section>
      </main>
    </div>
  );
}

export default TermsOfUse;