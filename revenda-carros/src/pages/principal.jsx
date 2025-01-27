import React, { useState, useEffect, useCallback, useRef } from "react"
import { useLocation } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebaseConfig"
import styles from "./principal.module.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Principal = () => {
  const [cars, setCars] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const contatoRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const q = query(collection(db, "vehicles"), orderBy("createdAt", "desc"), limit(10))
      const querySnapshot = await getDocs(q)
      const carsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setCars(carsData)
    } catch (error) {
      console.error("Error fetching cars:", error)
    }
  }

  const slideNext = useCallback(() => {
    if (cars.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
    }
  }, [cars])

  useEffect(() => {
    const timer = setInterval(slideNext, 8000)
    return () => clearInterval(timer)
  }, [slideNext])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get("section") === "contato" && contatoRef.current) {
      contatoRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  return (
    <div className={styles.root}>
      <div className={styles.carousel}>
        <div className={styles.carouselContainer}>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <div
                key={car.id}
                className={`${styles.carouselItem} ${index === currentIndex ? styles.carouselItemActive : ""}`}
                style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
              >
                <div className={styles.carCard}>
                  <h3 className={styles.carTitle}>{car.name}</h3>
                  {car.images && car.images.length > 0 && (
                    <img src={car.images[0]} alt={car.name} className={styles.carouselImage} />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.carouselItem}>
              <div className={styles.carCard}>
                <h3 className={styles.carTitle}>Nenhum veículo disponível no momento</h3>
                <p>Estamos atualizando nosso estoque. Por favor, volte mais tarde.</p>
              </div>
            </div>
          )}
          {cars.length > 1 && (
            <>
              <button
                className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length)}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.carouselControl} ${styles.carouselControlNext}`}
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>

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


    </div>
  )
}

export default Principal

