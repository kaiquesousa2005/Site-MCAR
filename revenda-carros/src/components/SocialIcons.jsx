import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Olx from "../imagens/icone-olx.png"
import iCarros from "../imagens/iCarros icon.png"
import Whatsapp from "../imagens/icone-zap-.png"
import Instagram from "../imagens/instagram-icone.png"
import MobiAutos from "../imagens/mobi auto icon.png"
import "./SocialIcons.css"

const Social = () => {

    const [showSocialIcons, setShowSocialIcons] = useState(true)


    const toggleSocialIcons = () => {
        setShowSocialIcons(!showSocialIcons)
    }
    return (
        <div className={`social-sidebar ${showSocialIcons ? "show" : "hide"}`}>
            <button onClick={toggleSocialIcons} className="toggle-social-icons">
                {showSocialIcons ? <FaEyeSlash /> : <FaEye />}
            </button>
            <a
                href="https://www.instagram.com/mcarveiculos"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
            >
                <img src={Instagram || "/placeholder.svg"} alt="Instagram" />
            </a>
            <a href="https://wa.me/558532324632" target="_blank" rel="noopener noreferrer" className="social-icon">
                <img src={Whatsapp || "/placeholder.svg"} alt="WhatsApp" />
            </a>
            <a
                href="https://www.olx.com.br/perfil/mcar-veiculos-3db64f60"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-olx"
            >
                <img src={Olx || "/placeholder.svg"} alt="OLX" />
            </a>
            <a
                href="https://www.mobiauto.com.br/comprar/estoque/m-car-veiculos-23370"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
            >
                <img src={MobiAutos || "/placeholder.svg"} alt="MobiAutos" />
            </a>
            <a
                href="https://www.icarros.com.br/ache/estoque.jsp?id=2628223"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
            >
                <img src={iCarros || "/placeholder.svg"} alt="iCarros" />
            </a>
        </div>
    )
}

export default Social

