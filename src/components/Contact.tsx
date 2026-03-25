import { useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { portfolioData } from "../data/portfolioData";
import "./styles/Contact.css";

const Contact = () => {
    const { personal, socials } = portfolioData;
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if(email.trim()) {
            alert(`Thanks for subscribing with ${email}!`);
            setEmail("");
        }
    };
    return (
        <div className="contact-section section-container" id="contact">
            <div className="contact-container">
                <h3>Contact</h3>
                <div className="contact-flex">
                    <div className="contact-box">
                        <h4>Email</h4>
                        <p>
                            <a href={`mailto:${personal.email}`} data-cursor="disable">
                                {personal.email}
                            </a>
                        </p>
                        <h4>Phone</h4>
                        <p>
                            <a href={`tel:${personal.phone}`} data-cursor="disable">
                                {personal.phone}
                            </a>
                        </p>
                        <h4>Education</h4>
                        <p>{personal.education_summary || "B.Tech (CSE), MVR College (2027)"}</p>
                    </div>
                    <div className="contact-box">
                        <h4>Social</h4>
                        <a
                            href={socials.github}
                            target="_blank"
                            data-cursor="disable"
                            className="contact-social"
                        >
                            <FaGithub style={{ marginRight: "8px" }} /> Github <MdArrowOutward />
                        </a>
                        <a
                            href={socials.linkedin}
                            target="_blank"
                            data-cursor="disable"
                            className="contact-social"
                        >
                            <FaLinkedinIn style={{ marginRight: "8px" }} /> Linkedin <MdArrowOutward />
                        </a>
                        <a
                            href={socials.instagram}
                            target="_blank"
                            data-cursor="disable"
                            className="contact-social"
                        >
                            <FaInstagram style={{ marginRight: "8px" }} /> {socials.instagramDisplay} <MdArrowOutward />
                        </a>
                    </div>
                    <div className="contact-box">
                        <h4>Newsletter</h4>
                        <p>Get the latest updates on my projects.</p>
                        <form onSubmit={handleSubscribe} className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                    <div className="contact-box">
                        <h2>
                            Designed and Developed <br /> by <span>{personal.name}</span>
                        </h2>
                        <h5>
                            <MdCopyright /> {new Date().getFullYear()}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
