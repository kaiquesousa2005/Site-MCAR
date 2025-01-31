import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db } from "../firebaseConfig"
import { Trash2, Edit, X, ChevronLeft, ChevronRight } from "lucide-react"
import "./Dashboard.css"


export default function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    version: "",
    year: "",
    mileage: "",
    price: "",
    transmission: "",
    doors: "",
    description: "",
    condition: "",
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)

  const fetchVehicles = async () => {
    const q = query(collection(db, "vehicles"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const vehiclesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setVehicles(vehiclesData)
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleAddVehicle = async (e) => {
    e.preventDefault()
    try {
      const storage = getStorage()
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          try {
            const imageRef = ref(storage, `vehicles/${image.name}`)
            await uploadBytes(imageRef, image)
            return getDownloadURL(imageRef)
          } catch (error) {
            console.error("Error uploading image:", error)
            return null
          }
        }),
      )

      const validImageUrls = imageUrls.filter((url) => url !== null)

      await addDoc(collection(db, "vehicles"), {
        ...newVehicle,
        images: validImageUrls,
        createdAt: new Date(),
      })
      setNewVehicle({
        brand: "",
        model: "",
        version: "",
        year: "",
        mileage: "",
        price: "",
        transmission: "",
        doors: "",
        description: "",
        condition: "",
      })
      setImages([])
      setImagePreviews([])
      fetchVehicles()
    } catch (error) {
      console.error("Error adding vehicle:", error)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
    setImagePreviews(files.map((file) => URL.createObjectURL(file)))
  }

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index)
    setImages(updatedImages)
    setImagePreviews(updatedPreviews)
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, overIndex) => {
    e.preventDefault()
    const draggedIndex = Number.parseInt(e.dataTransfer.getData("index"))
    const updatedImages = arrayMove(images, draggedIndex, overIndex)
    const updatedPreviews = arrayMove(imagePreviews, draggedIndex, overIndex)
    setImages(updatedImages)
    setImagePreviews(updatedPreviews)
  }

  const arrayMove = (arr, fromIndex, toIndex) => {
    const newArr = [...arr]
    const element = newArr.splice(fromIndex, 1)[0]
    newArr.splice(toIndex, 0, element)
    return newArr
  }

  const handleUpdateVehicle = async (e) => {
    e.preventDefault()
    try {
      const storage = getStorage()
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          if (image.url) {
            return image.url // Return existing image URL
          }
          try {
            const imageRef = ref(storage, `vehicles/${image.name}`)
            await uploadBytes(imageRef, image)
            return getDownloadURL(imageRef)
          } catch (error) {
            console.error("Error uploading image:", error)
            return null
          }
        }),
      )

      const validImageUrls = imageUrls.filter((url) => url !== null)

      await updateDoc(doc(db, "vehicles", editingVehicle.id), {
        ...newVehicle,
        images: validImageUrls,
        updatedAt: new Date(),
      })
      setEditingVehicle(null)
      setNewVehicle({
        brand: "",
        model: "",
        version: "",
        year: "",
        mileage: "",
        price: "",
        transmission: "",
        doors: "",
        description: "",
        condition: "",
      })
      setImages([])
      setImagePreviews([])
      fetchVehicles()
    } catch (error) {
      console.error("Error updating vehicle:", error)
    }
  }

  const handleEditVehicle = (vehicle) => {
    setNewVehicle(vehicle)
    setEditingVehicle(vehicle)
    if (vehicle.images) {
      setImages(vehicle.images.map((url) => ({ name: url.split("/").pop(), url })))
      setImagePreviews(vehicle.images)
    } else {
      setImages([])
      setImagePreviews([])
    }
  }

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteDoc(doc(db, "vehicles", id))
      fetchVehicles()
    } catch (error) {
      console.error("Error deleting vehicle:", error)
    }
  }

  const handleImageNav = (vehicleId, direction) => {
    setVehicles((prevVehicles) => {
      return prevVehicles.map((vehicle) => {
        if (vehicle.id === vehicleId) {
          const currentIndex = vehicle.currentImageIndex || 0
          const newIndex =
            direction === "next"
              ? (currentIndex + 1) % vehicle.images.length
              : (currentIndex - 1 + vehicle.images.length) % vehicle.images.length
          return { ...vehicle, currentImageIndex: newIndex }
        }
        return vehicle
      })
    })
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Administrador</h1>

      <form onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle} className="vehicle-form">
        <input
          type="text"
          placeholder="Marca"
          value={newVehicle.brand}
          onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          value={newVehicle.model}
          onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Versão"
          value={newVehicle.version}
          onChange={(e) => setNewVehicle({ ...newVehicle, version: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Ano"
          value={newVehicle.year}
          onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Quilometragem"
          value={newVehicle.mileage}
          onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={newVehicle.price}
          onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
          className="form-input"
          required
        />
        <select
          value={newVehicle.transmission}
          onChange={(e) => setNewVehicle({ ...newVehicle, transmission: e.target.value })}
          className="form-input"
          required
        >
          <option value="">Selecione o tipo de câmbio</option>
          <option value="Manual">Manual</option>
          <option value="Automático">Automático</option>
        </select>
        <input
          type="number"
          placeholder="Quantidade de portas"
          value={newVehicle.doors}
          onChange={(e) => setNewVehicle({ ...newVehicle, doors: e.target.value })}
          className="form-input"
          required
        />
        <textarea
          placeholder="Descrição"
          value={newVehicle.description}
          onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
          className="form-input-description"
          required
        />
        <input
          type="text"
          placeholder="Condição do Veículo"
          value={newVehicle.condition}
          onChange={(e) => setNewVehicle({ ...newVehicle, condition: e.target.value })}
          className="form-input"
          required
        />
        <input type="file" multiple onChange={handleImageChange} className="form-input" />
        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <div
              className="image-preview-container"
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <img src={preview || "/placeholder.svg"} alt={`Preview ${index + 1}`} className="image-preview" />
              <button type="button" className="delete-image-button" onClick={() => handleDeleteImage(index)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          {editingVehicle ? "Atualizar Veículo" : "Adicionar Veículo"}
        </button>
      </form>

      <div className="vehicles-section">
        <h2 className="vehicles-count">Veículos Disponíveis: {vehicles.length}</h2>
        <div className="vehicles-grid">
          {vehicles.map((vehicle) => (
            <div className="vehicle-card" key={vehicle.id}>
              <div className="vehicle-image-container">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <>
                    <div
                      className="image-wrapper"
                      style={{ transform: `translateX(-${vehicle.currentImageIndex * 100}%)` }}
                    >
                      {vehicle.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          className="vehicle-image"
                        />
                      ))}
                    </div>
                    {vehicle.images.length > 1 && (
                      <>
                        <button className="image-nav-button left" onClick={() => handleImageNav(vehicle.id, "prev")}>
                          <ChevronLeft size={20} />
                        </button>
                        <button className="image-nav-button right" onClick={() => handleImageNav(vehicle.id, "next")}>
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <img src="/placeholder.svg" alt={`${vehicle.brand} ${vehicle.model}`} className="vehicle-image" />
                )}
              </div>
              <div className="vehicle-info">
                <h3 className="vehicle-title">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="vehicle-details">Versão: {vehicle.version}</p>
                <p className="vehicle-details">Ano: {vehicle.year}</p>
                <p className="vehicle-price">R$ {Number(vehicle.price).toLocaleString("pt-BR")}</p>
              </div>
              <div className="vehicle-actions">
                <button className="action-button edit" onClick={() => handleEditVehicle(vehicle)}>
                  <Edit size={20} />
                </button>
                <button className="action-button delete" onClick={() => handleDeleteVehicle(vehicle.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

