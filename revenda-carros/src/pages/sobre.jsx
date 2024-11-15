import React from 'react';
import styles from './sobre.module.css';

function AboutUs() {
    return (
    <div className={styles.root}>
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />
      <div className={styles.aboutUs}>
        <section className={styles.aboutUsSection}>
          <h2 className={styles.aboutUsTitle}>Sobre Nós</h2>
          
          <div className={styles.aboutUsContent}>
            <div className={styles.aboutUsText}>
              <p>Na <strong>MCar Veículos</strong>, somos apaixonados por oferecer a melhor experiência para nossos clientes. Com mais de 30 anos de atuação no mercado de revenda, selecionamos os melhores automóveis seminovos e usados, garantindo <strong>qualidade</strong>, <strong>procedência</strong> e <strong>preços justos</strong>.</p>
              <p>Nossa missão é fazer você sair de carro novo com segurança e confiança. Temos uma equipe especializada que oferece atendimento personalizado e consultoria completa, seja para <strong>compra</strong>, <strong>troca</strong> ou <strong>financiamento</strong>, estamos localizados na Avenida Americo Barreira, 5626 - Democrito Rocha - Fortaleza-CE</p>
            </div>
            
            <div className={styles.aboutUsFeatures}>
              <h3>Por que Escolher a MCar?</h3>
              <ul>
                <li><strong>Segurança:</strong> Na MCar, a segurança vem em primeiro lugar. Realizamos uma rigorosa verificação de cada veículo, assegurando que você adquira um carro de confiança.</li>
                <li><strong>Preço Justo:</strong> Acreditamos que a qualidade não deve custar uma fortuna. Nossas ofertas são pensadas para atender seu bolso, garantindo que você faça um excelente negócio.</li>
                <li><strong>Atendimento Personalizado:</strong> Sua satisfação é a nossa prioridade. Nossa equipe dedicada está sempre pronta para ouvir suas necessidades e ofertas de negocios para um atendimento que realmente faz a diferença.</li>
                <li><strong>Pagamento Facilitado:</strong> Para tornar sua experiência ainda mais simples, aceitamos uma variedade de formas de pagamento. Trabalhamos com financiamento, cartão de credito em até 18x, á vista, carta de credito e aceitamos trocas de veículos para que você possa conquistar seu novo veículo sem complicações.</li>
              </ul>
            </div>
          </div>

          <div className={styles.aboutUsMedia}>
            <h3>O que nossos clientes dizem:</h3>
            <div className={styles.testimonials}>
              <blockquote>
                <p>"A melhor experiência que tive ao comprar um carro. Atendimento excelente e muita confiança!"</p>
                <cite>- João Silva</cite>
              </blockquote>
              <blockquote>
                <p>"A MCar me ajudou a encontrar o carro dos meus sonhos com um ótimo preço e atendimento super profissional!"</p>
                <cite>- Maria Santos</cite>
              </blockquote>
            </div>
          </div>

          <div className={styles.callToAction}>
            <p>Quer saber mais?&nbsp;<strong>Visite nossa loja</strong></p>
            <a href="https://www.google.com/maps/place/M+Car+Ve%C3%ADculos/@-3.7610285,-38.5649082,21z/data=!4m14!1m7!3m6!1s0x7c749541ebe7ce7:0x76fcb962f91f2015!2sAvenida+Am%C3%A9rico+Barreira,+5626!8m2!3d-3.76099!4d-38.56484!16s%2Fg%2F11c6_bzl4h!3m5!1s0x7c7495416864d73:0xc9a040168063dc15!8m2!3d-3.7609033!4d-38.5649269!16s%2Fg%2F1ptx3kwkp?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>Localização</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;