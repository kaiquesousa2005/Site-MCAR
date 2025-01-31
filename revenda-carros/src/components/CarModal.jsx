import { useState } from "react"
import { X, ChevronLeft, ChevronRight, } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "./CarModal.module.css"


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
    navigate(`/simulação?carro=${encodeURIComponent(car.brand + car.model + car.year)}`)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.modalTitle}>{`${car.brand} ${car.model} ${car.version}`}</h2>
        <div className={styles.modalCarousel}>
          <div className={styles.modalImageWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}, vista ${index + 1}`}
                className={styles.modalImage}
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
          <div className={styles.modalInfo}>
            <p>
              <strong>Ano:</strong> {car.year}
            </p>
            <p>
              <strong>Kilometragem:</strong> {car.mileage} km
            </p>
            <p>
              <strong>Câmbio:</strong> {car.transmission}
            </p>
            <p>
              <strong>Portas:</strong> {car.doors}
            </p>
            <p>
              <strong>Condição:</strong> {car.condition}
            </p>
          </div>
          <p className={styles.modalPrice}>Preço: R$ {Number(car.price).toLocaleString("pt-BR")}</p>
          <div className={styles.modalDescription}>
            <h4>Descrição</h4>
            <ul>
              {car.description.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
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

