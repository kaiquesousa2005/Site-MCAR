import React from 'react';
import WhatsApp from '../imagens/icone-zap-.png';
import Facebook from '../imagens/facebook-icone.png';
import Instagram from '../imagens/instagram-icone.png';
import LOGO from '../imagens/logomcar.png';
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src={LOGO} alt="MCAR Logo" width={280} height={110} className="mcar" />
      </a>

      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/sobre">Sobre Nós</a></li>
          <li><a href="/carros">Veiculos Disponíveis</a></li>
          <li><a href="/simulação">Simulação</a></li>
        </ul>
      </nav>

      <div className="icones-redes-sociais">
        <a href="https://api.whatsapp.com/send/?phone=558532324632&text=Oii+gostaria+de+falar+com+um+vendedor+%21+&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="icone-rede-social">
          <img src={WhatsApp} alt="WhatsApp" width={50} height={50} />
        </a>
        <a href="https://www.instagram.com/mcarveiculos/" target="_blank" rel="noopener noreferrer" className="icone-rede-social">
          <img src={Instagram} alt="Instagram" width={50} height={50} />
        </a>
        <a href="https://www.facebook.com/mcarveiculos3/?ref=pages_you_manage" target="_blank" rel="noopener noreferrer" className="icone-rede-social">
          <img src={Facebook} alt="Facebook" width={50} height={50} />
        </a>
      </div>
    </header>
  );
}