import { useState, useEffect } from "react"
import CarModal from "../components/CarModal"
import BankLogos from "../components/BankLogos"
import MapComponent from "../components/GoogleMap"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./Home.module.css"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebaseConfig"

function CarShowcase() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    brand: "",
    year: "",
    transmission: "",
    doors: "",
    priceMin: "",
    priceMax: "",
  })

  const [currentImageIndices, setCurrentImageIndices] = useState({})

  // const banners = [
  //   {
  //     image: oferta,
  //     title: "Ofertas Especiais",
  //     description: "Confira nossos melhores preços em carros seminovos!",
  //   },
  //   {
  //     image: oferta,
  //     title: "Financiamento Facilitado",
  //     description: "Aprove seu crédito em minutos e saia dirigindo!",
  //   },
  // ];

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
      const matchesSearch =
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = !filters.brand || car.brand === filters.brand
      const matchesYear = !filters.year || car.year === filters.year
      const matchesTransmission = !filters.transmission || car.transmission === filters.transmission
      const matchesDoors = !filters.doors || car.doors === filters.doors
      const matchesPriceMin = !filters.priceMin || Number(car.price) >= Number(filters.priceMin)
      const matchesPriceMax = !filters.priceMax || Number(car.price) <= Number(filters.priceMax)

      return (
        matchesSearch &&
        matchesBrand &&
        matchesYear &&
        matchesTransmission &&
        matchesDoors &&
        matchesPriceMin &&
        matchesPriceMax
      )
    })
    setFilteredCars(filtered)
  }, [searchTerm, filters, cars])

  const openModal = (car) => {
    setSelectedCar(car)
  }

  const closeModal = () => {
    setSelectedCar(null)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageNav = (carId, direction) => {
    setCurrentImageIndices((prev) => {
      const currentIndex = prev[carId] || 0
      const images = cars.find((car) => car.id === carId)?.images || []
      const newIndex =
        direction === "next" ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length
      return { ...prev, [carId]: newIndex }
    })
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
      <BankLogos />
      <div className={styles.carShowcase} id="estoque">
        <div className="container">
          <section className={styles.carsSection}>
            <h2>Veículos Disponíveis no Estoque</h2>
            <div className={styles.searchAndFilter}>
              <div className={styles.searchBar}>
                <input type="text" placeholder="Buscar veículo..." value={searchTerm} onChange={handleSearchChange} />
                <Search size={20} />
              </div>
              <div className={styles.filters}>
                <select name="brand" value={filters.brand} onChange={handleFilterChange}>
                  <option value="">Todas as Marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <select name="year" value={filters.year} onChange={handleFilterChange}>
                  <option value="">Todos os Anos</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select name="transmission" value={filters.transmission} onChange={handleFilterChange}>
                  <option value="">Todos os Câmbios</option>
                  <option value="Manual">Manual</option>
                  <option value="Automático">Automático</option>
                </select>
                <select name="doors" value={filters.doors} onChange={handleFilterChange}>
                  <option value="">Todas as Portas</option>
                  <option value="2">2 Portas</option>
                  <option value="4">4 Portas</option>
                </select>
                <input
                  type="number"
                  name="priceMin"
                  placeholder="Preço Mínimo"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Preço Máximo"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className={styles.carros}>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <div key={car.id} className={styles.carro} onClick={() => openModal(car)}>
                    <div className={styles.carImageContainer}>
                      {car.images && car.images.length > 0 ? (
                        <>
                          <div
                            className={styles.imageWrapper}
                            style={{
                              transform: `translateX(-${(currentImageIndices[car.id] || 0) * 100}%)`,
                            }}
                          >
                            {car.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`${car.brand} ${car.model}`}
                                className={styles.carImage}
                              />
                            ))}
                          </div>
                          {car.images.length > 1 && (
                            <>
                              <button
                                className={`${styles.imageNavButton} ${styles.left}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleImageNav(car.id, "prev")
                                }}
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                className={`${styles.imageNavButton} ${styles.right}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleImageNav(car.id, "next")
                                }}
                              >
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <img src="/placeholder.svg" alt={car.name} className={styles.carImage} />
                      )}
                    </div>
                    <div className={styles.carInfo}>
                      <h3 className={styles.carTitle}>
                        {car.brand} {car.model}
                      </h3>
                      <p className={styles.carDetails}>Ano: {car.year}</p>
                      <p className={styles.carDetails}>{car.mileage} km</p>
                      <p className={styles.carPrice}>R$ {Number(car.price).toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noResults}>Não foi possível encontrar o veículo</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <MapComponent />
      {selectedCar && <CarModal car={selectedCar} onClose={closeModal} />}
    </div>
  )
}

export default CarShowcase


