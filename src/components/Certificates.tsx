import { portfolioData } from "../data/portfolioData";
import "./styles/Certificates.css";

const Certificates = () => {
    return (
        <div className="certificates-section section-container" id="certificates">
            <h2 className="section-title">Awards <span>&</span> Certifications</h2>
            <div className="certificates-grid">
                {portfolioData.certificates.map((cert, index) => (
                    <div className="certificate-card" key={index}>
                        <div className="certificate-info">
                            <h4>{cert.title}</h4>
                            <p>{cert.issuer} • {cert.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
