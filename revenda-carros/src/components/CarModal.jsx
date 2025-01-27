import React, { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "../pages/carros.module.css"

function CarModal({ car, onClose }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % car.images.length)
  }

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length)
  }

  const handleSimulationClick = () => {
    onClose()
    navigate(`/simulação?carro=${encodeURIComponent(car.name)}`)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.modalTitle}>{car.name}</h2>
        <div className={styles.modalCarousel}>
          <div className={styles.modalImageWrapper}>
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${car.name}, vista ${index + 1}`}
                className={`${styles.modalImage} ${index === currentIndex ? styles.active : ""}`}
                style={{ transform: `translateX(${-100 * currentIndex}%)` }}
              />
            ))}
          </div>
          <button className={`${styles.carouselBtn} ${styles.left}`} onClick={slidePrev}>
            <ChevronLeft size={24} />
          </button>
          <button className={`${styles.carouselBtn} ${styles.right}`} onClick={slideNext}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={styles.modalDetails}>
          <h3 className={styles.modalSubtitle}>Detalhes do Veículo</h3>
          <p className={styles.modalPrice}>Preço: R$ {Number(car.price).toLocaleString("pt-BR")}</p>
          <div className={styles.modalDescription}>
            <ul>
              {car.description.split("\n").map((paragraph, index) => (
                <li key={index}>{paragraph}</li>
              ))}
            </ul>
          </div>
          <div className={styles.modalAdditionalInfo}>
            <h4>Condição</h4>
            <p>{car.condition || "Informações não disponíveis"}</p>
          </div>
        </div>
        <button className={styles.simulationButton} onClick={handleSimulationClick}>
          Fazer Simulação do Veículo
        </button>
      </div>
    </div>
  )
}

export default CarModal

