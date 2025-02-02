import { useState } from "react"
import { Menu, X } from "lucide-react"
import WhatsApp from "../imagens/icone-zap-.png"
import Facebook from "../imagens/facebook-icone.png"
import Instagram from "../imagens/instagram-icone.png"
import LOGO from "../imagens/logomcar.png"
import styles from "./header.module.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.socialContainer}>
          <a
            href="https://api.whatsapp.com/send/?phone=558532324632"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={WhatsApp || "/placeholder.svg"} alt="WhatsApp" width={24} height={24} />
            <span>(85) 3232-4632</span>
          </a>
          <div className={styles.horario}>
          <span>Horario de funcionamento: 8h as 17h Segunda a Sexta e de 8h as 14h aos Sábados</span>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/mcarveiculos/" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" width={28} height={28} />
            </a>
            <a href="https://www.facebook.com/mcarveiculos3/" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" width={28} height={28} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <a href="/" className={styles.logoLink}>
            <img src={LOGO} alt="MCAR Logo" className={styles.logo} />
          </a>

          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/sobre">Empresa</a>
              </li>
              <li>
                <a href="/simulação">Simulação</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </header>
  )
}

