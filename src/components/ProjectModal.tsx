import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { smoother } from "../utils/gsapUtils";
import "./styles/ProjectModal.css";

interface Project {
  title: string;
  category: string;
  tools: string;
  image: string;
  longDescription?: string;
  link?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && modalRef.current && contentRef.current) {
      if (smoother) smoother.paused(true);
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.2)" }
      );
    } else {
      if (smoother) smoother.paused(false);
    }
    
    return () => {
      if (smoother) smoother.paused(false);
    };
  }, [project]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 50, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in"
      });
      gsap.to(modalRef.current, {
        opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onClose
      });
    }
  };

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" ref={modalRef} onClick={handleClose}>
      <div 
        className="project-modal-content" 
        ref={contentRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <FiX />
        </button>

        <div className="modal-inner">
          <div className="modal-image-col">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="modal-info-col">
            <span className="modal-category">{project.category}</span>
            <h2 className="modal-title">{project.title}</h2>
            
            <div className="modal-description">
              <p>{project.longDescription || "A cutting-edge project engineered with the latest technologies to deliver unparalleled performance."}</p>
            </div>

            <div className="modal-tools">
              <h3>Tech Stack</h3>
              <div className="tools-badges">
                {project.tools.split(",").map((tool, i) => (
                  <span key={i} className="tool-badge">{tool.trim()}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary">
                  <FiExternalLink /> Live Demo
                </a>
              ) : (
                <button className="btn-primary" onClick={() => alert("Demo unavailable")}>
                  <FiExternalLink /> Live Demo
                </button>
              )}
              <a href="#" className="btn-secondary">
                <FiGithub /> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
