import { portfolioData } from "../data/portfolioData";
import "./styles/Gallery.css";

const Gallery = () => {
    const images = portfolioData.achievements;

    return (
        <div className="gallery-section section-container" id="gallery">
            <h2 className="section-title">Achievements <span>&</span> Success Stories</h2>
            <div className="gallery-grid">
                {images.map((img, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={img.url} alt={img.title} />
                        <div className="gallery-overlay">
                            <span>{img.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
