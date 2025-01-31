import React, { useEffect,  useRef } from "react"
import { useLocation } from "react-router-dom"
import styles from "./sobre.module.css"

const Principal = () => {
  const contatoRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get("section") === "contato" && contatoRef.current) {
      contatoRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  return (
    <div className={styles.root}>
      <section className={styles.section} id="home">
  <h2 className={styles.sectionTitle}>Bem-vindo à MCar Veículos!</h2>
  <div className={styles.welcomeContent}>
    <div className={styles.welcomeText}>
      <p className={styles.sectionText}>
        Na MCar Veículos, nossa missão é transformar a compra de carros em uma experiência prazerosa, prática e confiável. Sabemos que adquirir um veículo é mais do que uma compra — é uma conquista que precisa ser acompanhada de segurança e satisfação. Por isso, oferecemos um serviço que vai além das expectativas.
      </p>
      <p>
        Nosso catálogo conta com uma ampla variedade de veículos seminovos e usados, cuidadosamente selecionados para garantir a mais alta qualidade. Desde modelos compactos ideais para o dia a dia até SUVs espaçosos e elegantes, aqui você encontra o carro perfeito para o seu estilo de vida.
      </p>
      <p>
        Na MCar Veículos, você não apenas escolhe um carro, mas também conta com o suporte de uma equipe especializada, pronta para te guiar em todas as etapas do processo. Seja sua primeira compra ou a atualização do seu carro atual, estamos ao seu lado para ajudar na melhor decisão.
      </p>
      <p>
        <strong>Por que escolher a MCar Veículos?</strong>
      </p>
      <ul>
        <li>
          🛠️ <strong>Carros Inspecionados:</strong> Cada veículo é submetido a uma rigorosa inspeção para garantir que você dirija com total tranquilidade e segurança.
        </li>
        <li>
          📜 <strong>Documentação Regularizada:</strong> Toda a documentação dos veículos é verificada e entregue em dia, sem complicações.
        </li>
        <li>
          💬 <strong>Atendimento Personalizado:</strong> Nossa equipe está sempre à disposição para responder suas dúvidas, entender suas necessidades e oferecer a melhor orientação.
        </li>
        <li>
          🌟 <strong>Facilidade no Financiamento:</strong> Trabalhamos com condições de pagamento flexíveis que cabem no seu bolso, facilitando sua conquista.
        </li>
        <li>
          🚗 <strong>Ampla Variedade:</strong> Desde veículos econômicos a modelos premium, temos opções para atender aos mais variados gostos e objetivos.
        </li>
      </ul>
      <p>
        Além disso, oferecemos um ambiente acolhedor em nossa loja física, onde você pode explorar os veículos, conversar com nossa equipe e tomar decisões com total confiança. Se preferir, também disponibilizamos um catálogo online atualizado, para você conferir nossas opções no conforto de sua casa.
      </p>
      <p>
        Venha descobrir por que somos referência no mercado de automóveis. Na MCar Veículos, qualidade, credibilidade e transparência são nossos compromissos com você. Aqui, seu próximo carro está mais perto do que você imagina.
      </p>
      <a href="/carros" className={styles.btnVisit}>
        Explore Nossos Carros Agora
      </a>
    </div>
  </div>
</section>

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
  )
}

export default Principal

