import React from 'react';
import Marquee from 'react-fast-marquee';
import { portfolioData } from '../data/portfolioData';
import { FaQuoteLeft } from 'react-icons/fa';
import './styles/Testimonials.css';

const Testimonials: React.FC = () => {
  return (
    <div className="testimonials-section section-container" id="testimonials">
      <h2>Client <span>Testimonials</span></h2>
      <p className="section-subtitle">What people say about my work.</p>
      
      <div className="testimonials-container">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {portfolioData.testimonials.map((testimonial, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="testimonial-icon"><FaQuoteLeft /></div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
