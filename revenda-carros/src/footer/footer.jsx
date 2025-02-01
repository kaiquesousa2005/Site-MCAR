import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Sobre a MCar Veículos</h3>
          <p>
            Especializada em veículos de qualidade, a MCar oferece as melhores
            opções para você encontrar o carro dos seus sonhos.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Links Rápidos</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre Nós</Link>
            </li>
            <li>
              <a href="/#estoque">Nosso Estoque</a>
            </li>
            <li>
              <Link to="/simulação">Faça sua Simulação</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contato</h3>
          <p>
            <MapPin size={18} /> Av. Américo Barreira, 5626 - Demócrito Rocha,
            Fortaleza - CE
          </p>
          <p>
            <Phone size={18} /> (85) 3232-4632
          </p>
          <p>
            <Mail size={18} /> mcarveiculos2015@gmail.com
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Siga-nos</h3>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/mcarveiculos3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/mcarveiculos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 MCar Veículos. Todos os direitos reservados.</p>
        <div>
          <Link to="/politica-privacidade">Política de Privacidade</Link> |
          <Link to="/termos-uso">Termos de Uso</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
