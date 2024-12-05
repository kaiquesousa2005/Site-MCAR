import React, { useState, useEffect } from 'react';
import CarModal from '../components/CarModal';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import styles from './carros.module.css';
import { fetchedCars } from '../components/Estoque';

function CarShowcase() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setCars(fetchedCars);
    setFilteredCars(fetchedCars);
    setCurrentIndices(new Array(fetchedCars.length).fill(0));
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const price = parseInt(car.description.split('R$ ')[1].split(',')[0].replace('.', ''));
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;
      const matchesBrand = selectedBrand === '' || car.name.toLowerCase().includes(selectedBrand.toLowerCase());
      const matchesYear = selectedYear === '' || car.features.some(feature => feature.includes(selectedYear));
      return matchesSearch && matchesPrice && matchesBrand && matchesYear;
    });
    setFilteredCars(filtered);
  }, [searchTerm, priceRange, selectedBrand, selectedYear, cars]);

  const slideNext = (carIndex) => {
    setCurrentIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[carIndex] = (newIndices[carIndex] + 1) % filteredCars[carIndex].images.length;
      return newIndices;
    });
  };

  const slidePrev = (carIndex) => {
    setCurrentIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[carIndex] = (newIndices[carIndex] - 1 + filteredCars[carIndex].images.length) % filteredCars[carIndex].images.length;
      return newIndices;
    });
  };

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const brands = ['Fiat', 'Chevrolet', 'Toyota', 'Volkswagen', 'Jeep', 'Honda', 'BMW', 'Mitsubishi', 'Nissan', 'Hyundai', 'Renault', 'Ford'];
  const years = Array.from({length: 26}, (_, i) => (2000 + i).toString());

  return (
    <div className={styles.root}>
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />
      <div className={styles.carShowcase}>
        <main className={styles.main}>
          <section className={styles.carsSection}>
            <h2>Veículos Disponíveis no Estoque</h2>
            <div className={styles.searchAndFilter}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Buscar veículo..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search size={20} />
              </div>
              <div className={styles.filters}>
                <div className={styles.priceFilter}>
                  <label>Preço Mínimo:</label>
                  <input
                    type="number"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                  />
                  <label>Preço Máximo:</label>
                  <input
                    type="number"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                  />
                </div>
                <select value={selectedBrand} onChange={handleBrandChange}>
                  <option value="">Todas as Marcas</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value="">Todos os Anos</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.carros}>
              {filteredCars.length > 0 ? (
                filteredCars.map((car, index) => (
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
                ))
              ) : (
                <p className={styles.noResults}>Não foi possível encontrar o veículo</p>
              )}
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

