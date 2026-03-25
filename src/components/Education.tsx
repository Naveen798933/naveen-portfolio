import { portfolioData } from "../data/portfolioData";
import "./styles/Education.css";

const Education = () => {
    const edu = portfolioData.education;

    return (
        <div className="education-section section-container">
            <h2 className="section-title">My <span>Education</span></h2>
            <div className="education-list">
                {edu.map((item, index) => (
                    <div className="education-card" key={index}>
                        <div className="edu-info">
                            <h4>{item.degree}</h4>
                            <h5>{item.institution}</h5>
                        </div>
                        <div className="edu-year">{item.year}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;
