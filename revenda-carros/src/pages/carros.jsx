import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './carros.module.css';

function CarShowcase() {
  const [cars, setCars] = React.useState([]);
  const [currentIndices, setCurrentIndices] = React.useState([]);

  React.useEffect(() => {
    const fetchedCars = [
      {
        name: "Chevrolet Trailblazer SUV Turbo 2018",
        images: [
          "https://img.olx.com.br/images/66/660495311204623.jpg",
          "https://img.olx.com.br/images/66/666422078280454.jpg",
          "https://img.olx.com.br/images/65/654450556906446.jpg"
        ],
        description: "146.000km rodados, Potencia 2.8 do Motor, 7 Lugares, Automático, R$ 179.900"
      },
      {
        name: "Fiat Mobi Like 2017",
        images: [
          "https://img.olx.com.br/images/60/601483446225616.jpg",
          "https://img.olx.com.br/images/60/600477445739370.jpg",
          "https://img.olx.com.br/images/60/606445442900063.jpg"
        ],
        description: "83.000 km rodados. R$ 45.900"
      },
      {
        name: "Toyota Corolla GLI 2019",
        images: [
          "https://img.olx.com.br/images/58/584459686725370.jpg",
          "https://img.olx.com.br/images/58/583490325683338.jpg",
          "https://img.olx.com.br/images/57/576459327344175.jpg"
        ],
        description: "117.000 km rodados, Potencia do Motor 1.8 R$ 95.900"
      },
      {
        name: "Toyota Hilux 4x4 CD SRV 2013",
        images: [
          "https://img.olx.com.br/images/39/395456899650408.jpg",
          "https://img.olx.com.br/images/40/402423416141478.jpg",
          "https://img.olx.com.br/images/39/393453290321748.jpg"
        ],
        description: "154.000km rodados, Cabine Dupla, Potencia 3.0 do Motor, R$ 132.900"
      },
      {
        name: "Saveiro Trendline CD 2015",
        images: [
          "https://img.olx.com.br/images/30/309468920517955.jpg",
          "https://img.olx.com.br/images/30/303470809259693.jpg",
          "https://img.olx.com.br/images/30/305434321788295.jpg"
        ],
        description: "107.000 km rodados, Potencia 1.6 do Motor, Volante Multifuncional R$ 66.900"
      },
      {
        name: "Volkswagen Saveiro Robust CD 2018",
        images: [
          "https://img.olx.com.br/images/13/135487578529610.jpg",
          "https://img.olx.com.br/images/13/130481335223863.jpg",
          "https://img.olx.com.br/images/12/120422215511068.jpg"
        ],
        description: "43.000 km rodados, Cabine Dupla. R$ 71.900"
      }
    ];

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

    return (
      <div className={styles.root}>
        <div className={styles.backgroundImage} />
        <div className={styles.backgroundOverlay} />
        <div className={styles.carShowcase}>
          <main className={styles.main}>
            <section className={styles.carsSection}>
              <h2>Carros Disponíveis</h2>
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
                        onError={(e) => { e.target.src = "fallback-image.jpg"; }}
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
      </div>
    );
  }

export default CarShowcase;