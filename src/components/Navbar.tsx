import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
import { portfolioData } from "../data/portfolioData";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { smoother, setSmoother } from "../utils/gsapUtils";

const Navbar = () => {
  const { personal } = portfolioData;
  const { theme, cycleTheme } = useTheme();
  const initials = personal.firstName.charAt(0) + personal.lastName.charAt(0);

  useEffect(() => {
    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(instance);

    instance.scrollTop(0);
    instance.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLAnchorElement;
        if (target.hasAttribute("download")) return;

        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = target.getAttribute("data-href");
          if (section) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {initials}
        </a>
        <a
          href={`mailto:${personal.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {personal.email}
        </a>
        <button 
          className="theme-toggle" 
          onClick={cycleTheme} 
          data-cursor="disable"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              Contact
            </a>
          </li>
          <li>
            <a href="/resume.pdf" download="Naveen_Kota_Resume.pdf" className="navbar-resume">
              Resume
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
