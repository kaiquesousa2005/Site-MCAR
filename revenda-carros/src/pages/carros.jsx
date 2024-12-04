import React from 'react';
import CarModal from '../components/CarModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './carros.module.css';
import { fetchedCars } from '../components/Estoque';

function CarShowcase() {
  const [cars, setCars] = React.useState([]);
  const [currentIndices, setCurrentIndices] = React.useState([]);
  const [selectedCar, setSelectedCar] = React.useState(null);

  React.useEffect(() => {
    setCars(fetchedCars);
    setCurrentIndices(new Array(fetchedCars.length).fill(0));
  }, []);

  const slideNext = (carIndex) => {
    setCurrentIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[carIndex] = (newIndices[carIndex] + 1) % cars[carIndex].images.length;
      return newIndices;
    });
  };

  const slidePrev = (carIndex) => {
    setCurrentIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[carIndex] = (newIndices[carIndex] - 1 + cars[carIndex].images.length) % cars[carIndex].images.length;
      return newIndices;
    });
  };

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />
      <div className={styles.carShowcase}>
        <main className={styles.main}>
          <section className={styles.carsSection}>
            <h2>Veículos Disponíveis no Estoque</h2>
            <div className={styles.carros}>
              {cars.map((car, index) => (
                <div key={index} className={styles.carro}>
                  <p className={styles.carName}>{car.name}</p>
                  <div className={styles.carousel}>
                    <button className={`${styles.carouselBtn} ${styles.left}`} onClick={() => slidePrev(index)}>
                      <ChevronLeft size={24} />
                    </button>
                    <img
                      src={car.images[currentIndices[index]]}
                      alt={`${car.name}, vista ${currentIndices[index] + 1}`}
                      onClick={() => openModal(car)}
                      onError={(e) => { e.target.src = "fallback-image.jpg"; }}
                      style={{ cursor: 'pointer' }}
                    />
                    <button className={`${styles.carouselBtn} ${styles.right}`} onClick={() => slideNext(index)}>
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  <p className={styles.carDescription}>{car.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      {selectedCar && (
        <CarModal car={selectedCar} onClose={closeModal} />
      )}
    </div>
  );
}

export default CarShowcase;

