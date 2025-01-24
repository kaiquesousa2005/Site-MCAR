import React, { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db } from "../firebaseConfig"
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react"
import "./Dashboard.css"

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    description: "",
    price: "",
    condition: "",
    features: [],
    history: "",
    featured: false,
  })
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [currentImageIndices, setCurrentImageIndices] = useState({})

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const q = query(collection(db, "vehicles"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const vehiclesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setVehicles(vehiclesData)
      setCurrentImageIndices(
        vehiclesData.reduce((acc, vehicle) => {
          acc[vehicle.id] = 0
          return acc
        }, {}),
      )
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    }
  }

  const handleAddVehicle = async (e) => {
    e.preventDefault()
    try {
      const storage = getStorage()
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `vehicles/${image.name}`)
          await uploadBytes(imageRef, image)
          return getDownloadURL(imageRef)
        }),
      )

      await addDoc(collection(db, "vehicles"), {
        ...newVehicle,
        images: imageUrls,
        createdAt: new Date(),
      })
      setNewVehicle({
        name: "",
        description: "",
        price: "",
        condition: "",
        features: [],
        history: "",
        featured: false,
      })
      setImages([])
      setImagePreviews([])
      fetchVehicles()
    } catch (error) {
      console.error("Error adding vehicle:", error)
    }
  }

  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esse veículo?")) {
      try {
        await deleteDoc(doc(db, "vehicles", id))
        fetchVehicles()
      } catch (error) {
        console.error("Error em deletar veículo", error)
      }
    }
  }

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setNewVehicle(vehicle)
    setImagePreviews(vehicle.images || [])
  }

  const handleUpdateVehicle = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(db, "vehicles", editingVehicle.id), newVehicle)
      setEditingVehicle(null)
      setNewVehicle({
        name: "",
        description: "",
        price: "",
        condition: "",
        features: [],
        history: "",
        featured: false,
      })
      setImages([])
      setImagePreviews([])
      fetchVehicles()
    } catch (error) {
      console.error("Error em atualizar o veículo:", error)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)

    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleImageNav = (vehicleId, direction) => {
    setCurrentImageIndices((prev) => {
      const vehicle = vehicles.find((v) => v.id === vehicleId)
      const currentIndex = prev[vehicleId]
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % vehicle.images.length
          : (currentIndex - 1 + vehicle.images.length) % vehicle.images.length
      return { ...prev, [vehicleId]: newIndex }
    })
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Administrador</h1>
      

      <form onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle} className="vehicle-form">
        <input
          type="text"
          placeholder="Nome do Veículo"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
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
        <textarea
          placeholder="Descrição"
          value={newVehicle.description}
          onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
          className="form-input"
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
        <textarea
          placeholder="Histórico"
          value={newVehicle.history}
          onChange={(e) => setNewVehicle({ ...newVehicle, history: e.target.value })}
          className="form-input"
        />
        <input type="file" multiple onChange={handleImageChange} className="form-input" />
        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              className="image-preview"
            />
          ))}
        </div>

        <button type="submit" className="submit-button">
          {editingVehicle ? "Atualizar Veículo" : "Adicionar Veículo"}
        </button>
      </form>
      <p className="vehicle-count">Total de veículos: {vehicles.length}</p>
      <div className="vehicles-grid">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <div className="vehicle-image-container">
              {vehicle.images && vehicle.images.length > 0 && (
                <>
                  <div className="image-wrapper">
                    {vehicle.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={vehicle.name}
                        className={`vehicle-image ${index === currentImageIndices[vehicle.id] ? "active" : ""}`}
                        style={{
                          transform: `translateX(${-100 * currentImageIndices[vehicle.id]}%)`,
                        }}
                      />
                    ))}
                  </div>
                  <button className="image-nav-button left" onClick={() => handleImageNav(vehicle.id, "prev")}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="image-nav-button right" onClick={() => handleImageNav(vehicle.id, "next")}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <h2 className="vehicle-name">{vehicle.name}</h2>
            <p className="vehicle-price">Preço: R$ {Number(vehicle.price).toLocaleString("pt-BR")}</p>
            <p className="vehicle-description">{vehicle.description}</p>
            <p className="vehicle-condition">Condição: {vehicle.condition}</p>
            <p className="vehicle-history">Histórico: {vehicle.history}</p>
            <div className="vehicle-actions">
              <button onClick={() => handleDeleteVehicle(vehicle.id)} className="action-button delete">
                <Trash2 size={16} />
              </button>
              <button onClick={() => handleEditVehicle(vehicle)} className="action-button edit">
                <Edit size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

