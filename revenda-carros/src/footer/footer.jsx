import React from "react";
import { Link } from "react-router-dom";
import WhatsApp from '../imagens/icone-zap-.png';
import OLX from '../imagens/icone-olx.png';
import Facebook from '../imagens/facebook-icone.png';
import Instagram from '../imagens/instagram-icone.png';
import './footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <p>&copy; 2024 MCar Veículos. Todos os direitos reservados.</p>

                <div className="contact-info">
                    <p>Telefone: (85) 3232-4632</p>
                    <p>Email: mcarveiculos2015@gmail.com</p>
                    <p>Endereço: Avenida Americo Barreira, 5626 - Democrito Rocha - Fortaleza, CE</p>
                </div>

                <div className="nav-links">
                    <Link to="/sobre">Sobre Nós</Link>
                    <Link to="/?section=contato">Contato</Link>
                    <Link to="/politica-privacidade">Política de Privacidade</Link>
                    <Link to="/termos-uso">Termos de Uso</Link>
                </div>

                <div className="social-icons">
                    <a href="https://www.olx.com.br/perfil/mcar-veiculos-3db64f60" target="_blank" rel="noopener noreferrer" aria-label="Perfil OLX">
                        <img src={OLX} alt="OLX" className="social-icon" />
                    </a>
                    <a href="https://www.facebook.com/mcarveiculos3/?ref=pages_you_manage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <img src={Facebook} alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/mcarveiculos/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src={Instagram} alt="Instagram" className="social-icon" />
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=558532324632&text=Oii+gostaria+de+falar+com+um+vendedor+%21+&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <img src={WhatsApp} alt="WhatsApp" className="social-icon" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
