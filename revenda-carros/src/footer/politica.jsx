import React from 'react';
import styles from './regras.module.css';

function PrivacyPolicy() {
  return (
    <div className={styles.legalPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Política de Privacidade</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Introdução</h2>
          <p>A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos as suas informações pessoais quando você visita nosso site e utiliza nossos serviços.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Coleta de Informações</h2>
          <p>Coletamos informações pessoais que você nos fornece diretamente, como nome, e-mail, cpf, data de nascimento e telefone.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uso das Informações</h2>
          <p>As informações coletadas são utilizadas para:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Melhorar nossos serviços;</li>
            <li className={styles.listItem}>Enviar comunicações relevantes, como ofertas e novidades;</li>
            <li className={styles.listItem}>Atender às suas solicitações e responder às suas dúvidas.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Compartilhamento de Informações</h2>
          <p>Não vendemos, trocamos ou transferimos suas informações pessoais a terceiros sem o seu consentimento, exceto quando necessário para fornecer nossos serviços ou cumprir obrigações legais.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Segurança das Informações</h2>
          <p>Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alterações a Esta Política</h2>
          <p>Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. Quaisquer alterações serão publicadas nesta página.</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contato</h2>
          <p>Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: <a href="mailto:mcarveiculos2015@gmail.com" className={styles.link}>mcarveiculos2015@gmail.com</a>.</p>
        </section>
      </main>
    </div>
  );
}

export default PrivacyPolicy;