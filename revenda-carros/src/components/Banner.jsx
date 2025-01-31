import { useState, useEffect } from "react"
import styles from "./Banner.module.css"

const Banner = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  return (
<div className={styles.bannerContainer}>
  {banners.map((banner, index) => (
    <div
      key={index}
      className={`${styles.banner} ${index === currentBanner ? styles.active : ""}`}
    >
      <img src={banner.image} alt={banner.title} className={styles.bannerImage} />
      <div className={styles.bannerContent}>
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
      </div>
    </div>
  ))}
</div>
  )
}

export default Banner

