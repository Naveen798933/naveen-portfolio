import { PropsWithChildren } from "react";
import { portfolioData } from "../data/portfolioData";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { personal } = portfolioData;
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {personal.firstName}
              <br />
              <span>{personal.lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Full Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{personal.role1}</div>
              <div className="landing-h2-2">{personal.role2}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{personal.role3}</div>
              <div className="landing-h2-info-1">{personal.role1}</div>
            </h2>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
