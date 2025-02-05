import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import styles from "./GoogleMap.module.css"

const MapComponent = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  }

  const defaultCenter = {
    lat: -3.7608144344169085,
    lng: -38.5649556176291,
  }

  return (
    <div className={styles.mapContainer}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapComponent

