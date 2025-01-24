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
                    <img src={car.images[0] || "/placeholder.svg"} alt={car.name} className={styles.carouselImage} />
                  )}
                  <p className={styles.carPrice}>R$ {Number(car.price).toLocaleString("pt-BR")}</p>
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
        <h2 className={styles.sectionTitle}>Bem-vindo à nossa loja!</h2>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeText}>
            <p className={styles.sectionText}>
              Na MCar Veículos, nossa prioridade é oferecer uma experiência de compra de veículos sem complicações, com
              total transparência e confiança. Contamos com um portfólio diversificado de carros seminovos e usados,
              criteriosamente selecionados para garantir a melhor qualidade e custo-benefício.
            </p>
            <p>
              Seja você um comprador de primeira viagem ou um conhecedor de carros, nossa equipe está pronta para te
              ajudar a encontrar o veículo ideal que atenda suas necessidades e expectativas.
            </p>
            <p>
              <strong>Por que escolher a MCar Veículos?</strong>
            </p>
            <ul>
              <li>
                🛠️ <strong>Carros Inspecionados</strong>: Todos os nossos veículos passam por uma rigorosa inspeção de
                qualidade.
              </li>
              <li>
                📜 <strong>Documentação Completa</strong>: Garantimos que toda a documentação dos veículos está em dia.
              </li>
              <li>
                💬 <strong>Atendimento Personalizado</strong>: Nossa equipe está sempre pronta para esclarecer suas
                dúvidas e ajudar na escolha do seu carro.
              </li>
              <li>
                🌟 <strong>Financiamento Facilitado</strong>: Oferecemos opções de financiamento que se encaixam no seu
                orçamento.
              </li>
            </ul>
            <p>
              Visite nossa loja e descubra por que somos referência em atendimento e credibilidade no mercado de
              automóveis!
            </p>
            <a href="/carros" className={styles.btnVisit}>
              Ver Carros Disponíveis
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Principal

