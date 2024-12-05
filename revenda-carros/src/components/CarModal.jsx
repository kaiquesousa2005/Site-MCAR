import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/carros.module.css';

function CarModal({ car, onClose }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length);
  };

  const handleSimulationClick = () => {
    onClose();
    navigate(`/simulação?carro=${encodeURIComponent(car.name)}`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.modalTitle}>{car.name}</h2>
        <div className={styles.modalCarousel}>
          <button className={`${styles.carouselBtn} ${styles.left}`} onClick={slidePrev}>
            <ChevronLeft size={24} />
          </button>
          <div className={styles.modalImageContainer}>
            <img
              src={car.images[currentIndex]}
              alt={`${car.name}, vista ${currentIndex + 1}`}
              className={styles.modalImage}
            />
          </div>
          <button className={`${styles.carouselBtn} ${styles.right}`} onClick={slideNext}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={styles.modalDetails}>
          <h3 className={styles.modalSubtitle}>Detalhes do Veículo</h3>
          <p className={styles.modalDescription}>{car.description}</p>
          <div className={styles.modalAdditionalInfo}>
            <h4>Características</h4>
            <ul>
              {car.features && car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <h4>Histórico</h4>
            <p>{car.history || 'Informações não disponíveis'}</p>
            <h4>Condição</h4>
            <p>{car.condition || 'Informações não disponíveis'}</p>
          </div>
        </div>
        <button className={styles.simulationButton} onClick={handleSimulationClick}>
          Fazer Simulação do Veículo
        </button>
      </div>
    </div>
  );
}

export default CarModal;

