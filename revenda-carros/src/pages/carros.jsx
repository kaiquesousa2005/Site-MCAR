import React, { useState, useEffect } from "react"
import CarModal from "../components/CarModal"
import { Search } from "lucide-react"
import styles from "./carros.module.css"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebaseConfig"

function CarShowcase() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedYear, setSelectedYear] = useState("")

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const q = query(collection(db, "vehicles"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const carsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setCars(carsData)
      setFilteredCars(carsData)
    } catch (error) {
      console.error("Error fetching cars:", error)
    }
  }

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const price = Number.parseInt(car.price)
      const matchesPrice = price >= priceRange.min && price <= priceRange.max
      const matchesBrand = selectedBrand === "" || car.name.toLowerCase().includes(selectedBrand.toLowerCase())
      const matchesYear = selectedYear === "" || car.name.includes(selectedYear)

      return matchesSearch && matchesPrice && matchesBrand && matchesYear
    })
    setFilteredCars(filtered)
  }, [searchTerm, priceRange, selectedBrand, selectedYear, cars])

  const openModal = (car) => {
    setSelectedCar(car)
  }

  const closeModal = () => {
    setSelectedCar(null)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target
    setPriceRange((prev) => ({ ...prev, [name]: Number.parseInt(value) }))
  }

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value)
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value)
  }

  const brands = [
    "Fiat",
    "Chevrolet",
    "Toyota",
    "Volkswagen",
    "Jeep",
    "Honda",
    "BMW",
    "Mitsubishi",
    "Nissan",
    "Hyundai",
    "Renault",
    "Ford",
  ]
  const years = Array.from({ length: 26 }, (_, i) => (2000 + i).toString())

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
                <input type="text" placeholder="Buscar veículo..." value={searchTerm} onChange={handleSearchChange} />
                <Search size={20} />
              </div>
              <div className={styles.filters}>
                <div className={styles.priceFilter}>
                  <label>Preço Mínimo:</label>
                  <input type="number" name="min" value={priceRange.min} onChange={handlePriceRangeChange} />
                  <label>Preço Máximo:</label>
                  <input type="number" name="max" value={priceRange.max} onChange={handlePriceRangeChange} />
                </div>
                <select value={selectedBrand} onChange={handleBrandChange}>
                  <option value="">Todas as Marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <select value={selectedYear} onChange={handleYearChange}>
                  <option value="">Todos os Anos</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.carros}>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <div key={car.id} className={styles.carro} onClick={() => openModal(car)}>
                    <p className={styles.carName}>{car.name}</p>
                    {car.images && car.images.length > 0 && (
                      <img src={car.images[0] || "/placeholder.svg"} alt={car.name} className={styles.carImage} />
                    )}
                    <p className={styles.carPrice}>Preço: R$ {Number(car.price).toLocaleString("pt-BR")} </p>
                  </div>
                ))
              ) : (
                <p className={styles.noResults}>Não foi possível encontrar o veículo</p>
              )}
            </div>
          </section>
        </main>
      </div>
      {selectedCar && <CarModal car={selectedCar} onClose={closeModal} />}
    </div>
  )
}

export default CarShowcase

