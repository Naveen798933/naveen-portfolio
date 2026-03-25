import { FaWhatsapp } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";
import "./styles/FAB.css";

const FAB = () => {
    const whatsappUrl = `https://wa.me/${portfolioData.personal.phone.replace(/[^0-9]/g, "")}`;

    return (
        <a 
            href={whatsappUrl} 
            className="whatsapp-fab" 
            target="_blank" 
            rel="noopener noreferrer"
            data-cursor="disable"
            aria-label="Contact on WhatsApp"
        >
            <FaWhatsapp />
            <span className="fab-text">Chat with me</span>
        </a>
    );
};

export default FAB;
