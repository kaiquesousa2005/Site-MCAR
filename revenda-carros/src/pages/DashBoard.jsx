import { useState, useEffect } from "react"
import { db, storage } from "../firebaseConfig"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import "./Dashboard.css"

const Admin = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    version: "",
    year: "",
    mileage: "",
    doors: "",
    transmission: "",
    price: "",
    description: "",
    images: [],
  })
  const [vehicles, setVehicles] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const vehiclesCollection = collection(db, "vehicles")
      const vehicleSnapshot = await getDocs(vehiclesCollection)
      const vehicleList = vehicleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setVehicles(vehicleList)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
      alert("Erro ao carregar veículos. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setPreviewImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ])
  }

  const handleImageRemove = (index) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    const dragIndex = Number(e.dataTransfer.getData("text/plain"))
    const newImages = arrayMove(previewImages, dragIndex, dropIndex)
    setPreviewImages(newImages)
  }

  const arrayMove = (arr, fromIndex, toIndex) => {
    const newArr = [...arr]
    const [movedItem] = newArr.splice(fromIndex, 1)
    newArr.splice(toIndex, 0, movedItem)
    return newArr
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrls = []

      if (previewImages.length > 0) {
        imageUrls = await Promise.all(
          previewImages.map(async (image) => {
            if (image.file) {
              const uniqueFileName = `${uuidv4()}-${image.file.name}`
              const imageRef = ref(storage, `vehicles/${uniqueFileName}`)
              await uploadBytes(imageRef, image.file)
              return getDownloadURL(imageRef)
            } else {
              return image.url
            }
          }),
        )
      }

      const vehicleData = {
        ...formData,
        images: imageUrls,
        mileage: Number(formData.mileage),
        doors: Number(formData.doors),
        year: Number(formData.year),
        price: Number(formData.price),
        createdAt: new Date(),
      }

      if (editingVehicle) {
        await updateDoc(doc(db, "vehicles", editingVehicle.id), vehicleData)
        alert("Veículo atualizado com sucesso!")
      } else {
        await addDoc(collection(db, "vehicles"), vehicleData)
        alert("Veículo adicionado com sucesso!")
      }

      setFormData({
        brand: "",
        model: "",
        version: "",
        year: "",
        mileage: "",
        doors: "",
        transmission: "",
        price: "",
        description: "",
        images: [],
      })
      setPreviewImages([])
      setEditingVehicle(null)
      fetchVehicles()
    } catch (error) {
      console.error("Erro ao adicionar/atualizar veículo:", error)
      alert("Erro ao adicionar/atualizar veículo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      ...vehicle,
      year: vehicle.year.toString(),
      mileage: vehicle.mileage.toString(),
      doors: vehicle.doors.toString(),
      price: vehicle.price.toString(),
    })
    setPreviewImages(vehicle.images.map((url) => ({ url })))
  }

  const handleDelete = async (id, images) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      setLoading(true)
      try {
        await deleteDoc(doc(db, "vehicles", id))

        for (const imageUrl of images) {
          try {
            const imageRef = ref(storage, imageUrl)
            await deleteObject(imageRef)
          } catch (error) {
            console.warn(`Erro ao excluir a imagem: ${imageUrl}`, error)
          }
        }

        alert("Veículo excluído com sucesso!")
        fetchVehicles()
      } catch (error) {
        console.error("Erro ao excluir veículo:", error)
        alert("Erro ao excluir veículo. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="admin-container">
      {loading && <div className="loading-spinner" />}
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
      </div>
      <div className="admin-content">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="brand">Marca</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a marca</option>
              <option value="Fiat">Fiat</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Jeep">Jeep</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Renault">Renault</option>
              <option value="Ford">Ford</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="model">Modelo</label>
            <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="version">Versão</label>
            <input type="text" id="version" name="version" value={formData.version} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Ano</label>
              <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="mileage">Quilometragem</label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doors">Portas</label>
              <input type="number" id="doors" name="doors" value={formData.doors} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="transmission">Câmbio</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="manual">Manual</option>
                <option value="automatico">Automático</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Preço</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea value={formData.description} onChange={handleChange} name="description" type="text" id="description">
          </textarea>
          </div>
          <div className="form-group">
            <label htmlFor="images">Imagens do veículo</label>
            <input type="file" id="images" name="images" onChange={handleImageChange} multiple />
          </div>
          <div className="image-previews">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="image-preview-container"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img src={image.url} alt={`Preview ${index + 1}`} className="image-preview" />
                <button type="button" className="remove-image" onClick={() => handleImageRemove(index)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {editingVehicle ? "Atualizar Veículo" : "Adicionar Veículo"}
          </button>
        </form>
        <div className="vehicle-list">
          <h2 className="vehicle-list-title">Veículos Cadastrados: {vehicles.length}</h2>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <img src={vehicle.images[0] || "/placeholder.svg"} alt={vehicle.brand} className="vehicle-image" />
                <div className="vehicle-info">
                  <h3 className="vehicle-title">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="vehicle-details">Versão: {vehicle.version}</p>
                  <p className="vehicle-details">Ano: {vehicle.year}</p>
                  <p className="vehicle-details">Preço: R$ {vehicle.price.toLocaleString()}</p>
                </div>
                <div className="vehicle-actions">
                  <button onClick={() => handleEdit(vehicle)} className="edit-button" disabled={loading}>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id, vehicle.images)}
                    className="delete-button"
                    disabled={loading}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin