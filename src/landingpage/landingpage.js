import React, { useState, useEffect,useRef } from 'react';
import logo from './images/d.jpg';
import { Link } from 'react-router-dom';

import './landingpage.css'; // Custom CSS for animations and layout
import slide1 from './images/d2.jpg'; // Replace with actual images
import slide2 from './images/d3.png';
import slide3 from './images/d4.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTeeth, faTeethOpen, faBed, faBedPulse, faStethoscope, faFaceGrinBeam, faFaceGrinWide, faCircleH, faHouseMedicalFlag, faHospital, faHospitalUser, faSmileBeam } from '@fortawesome/free-solid-svg-icons'; // Import more icons as needed

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import emailjs from 'emailjs-com';

const Landingpage = () => {
    const [showDropdown, setShowDropdown] = useState(false);  // Dropdown visibility state

    // Toggle dropdown when clicking the login icon
    const toggleDropdown = () => {
      setShowDropdown(prevState => !prevState);
    };
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is outside the dropdown element
        const dropdownElement = document.querySelector('.login-options');
        const loginIconElement = document.querySelector('.login-icon');
        
        if (dropdownElement && !dropdownElement.contains(event.target) &&
            loginIconElement && !loginIconElement.contains(event.target)) {
          setShowDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  

  // State for current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // List of slides with images and text content
  const slides = [
    {
      image: slide1,
      tagline: "We Provide",
      note: "Comprehensive dental care with a smile.",
    },
    {
      image: slide2,
      tagline: "Quality Dental Services",
      note: "We provide personalized treatment plans for every patient.",
    },
    {
      image: slide3,
      tagline: "Advanced Smile Design",
      note: "State-of-the-art technology for your perfect smile.",
},
  ];

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  // Navigate to the previous or next slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };




  const images = [
    { src: '/images/s1.jpg', details: 'Details for Image 1' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    { src: '/images/s1.jpg', details: 'Details for Image 4' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    { src: '/images/s1.jpg', details: 'Details for Image 1' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    { src: '/images/s1.jpg', details: 'Details for Image 1' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    { src: '/images/s1.jpg', details: 'Details for Image 1' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    { src: '/images/s1.jpg', details: 'Details for Image 1' },
    { src: '/images/s2.jpg', details: 'Details for Image 2' },
    { src: '/images/s3.jpg', details: 'Details for Image 3' },
    // Add more images with their details
  ];
  const [flippedIndex, setFlippedIndex] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scroll = () => {
      scrollContainer.scrollLeft += 1;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // Loop back to the start
      }
    };

    const scrollInterval = setInterval(scroll, 20); // Adjust speed if needed

    return () => clearInterval(scrollInterval);
  }, []);

  const handleClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };



  const Card = ({ icon, title, details }) => {
    return (
      <div className="landingpage-card">
        <div className="landingpage-card-header">
          <FontAwesomeIcon icon={icon} size="3x" className="landingpage-service-logo" />
        </div>
        <div className="landingpage-card-body">
          
          <h5 className="landingpage-card-title">{title}</h5>
          <hr />
          <p className="landingpage-card-text">{details}</p>
        </div>
      </div>
    );
  };
  const cardData = [
    { icon: faSmileBeam, title: 'Digital Smile Designing', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
    { icon: faTeethOpen, title: 'Teeth Cleaning', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
    { icon: faFaceGrinWide, title: 'Teeth Whitening / Bleaching', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faTeeth, title: 'Teeth Filling (Restoration)', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faTeethOpen, title: 'Root Canal Treatment', details:'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faBed, title: 'Pediatric Treatment', details:'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faBedPulse, title: 'Diigtal X-rays (Radiographs)', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
    { icon: faStethoscope, title: 'Extraction', details: 'regular and impaction' },
    { icon: faCircleH, title: 'Dental Crowns', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faHouseMedicalFlag, title: 'Dental Implants', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faHospital, title: 'Dentures', details: 'Partial, Complete, Immediate dentures,one day dentures' },
    { icon: faHospitalUser, title: 'Veneers and Laminate', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faTeethOpen, title: 'Braces', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'  },
    { icon: faTeeth, title: 'Invisible Aligners', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
    { icon: faFaceGrinBeam, title: 'TMD (Jaw treatment , Night guards)', details: 'elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' },
   ];


   const explanations = [
    { text: "Download our app for a seamless dental care experience.", 
      imgSrc: "/images/s2.jpg" },
    { text: "Quickly book your dental appointments by selecting your preferred date and time. Manage and track your appointments effortlessly.", imgSrc: "/images/s1.jpg" },
    { text: "Create a patient account on Cladent by entering your name, email, and phone number. Verify your account via email to start booking appointments.", imgSrc: "/images/s4.jpg" },
    { text: "Log in to Cladent by entering your registered email and password on the login screen. Access your account to manage appointments and view your details.", imgSrc: "/images/s3.jpg" },
    // Add more steps as needed
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      nextStep();
    }, 5000); // Change step every 5 seconds
    return () => clearInterval(autoScroll);
  }, [currentStep]);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % explanations.length);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + explanations.length) % explanations.length);
  };
  


  const mapStyles = {
    height: "30vh",
    width: "100%",
  };

  // Fixed coordinates for a specific place (e.g., Eiffel Tower, Paris)
  const defaultCenter = {
    lat: 11.92993,  // Latitude for the Eiffel Tower
    lng: 79.82468,   // Longitude for the Eiffel Tower
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_qe5wqvp', 'template_iznpaft', formData, 'IslWuBapTdn4z-Q7x')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
      }, (err) => {
        console.log('Failed to send email:', err);
        alert('Failed to send message. Please try again.');
      });
  };





  return (
    <div className="landingpage-container">

    <div className="landingpage-navbar">
      <div className="landingpage-navbar-left">
        <img src={logo} alt="Clinic Logo" className="landingpage-logo" />
        <span className="landingpage-clinic-name">Dr. Nithya's Dental & Smile Design Clinic</span>
      </div>
      <div className="landingpage-navbar-menu">
      <a href="#home-section" className="landingpage-login-icon">HOME</a> 
    <a href="#about-section" className="landingpage-login-icon">ABOUT</a> 
    <a href="#health-section" className="landingpage-login-icon">HEALTH TIPS</a>
    <a href="#services-section" className="landingpage-login-icon">SERVICES</a>
    <a href="#app-section" className="landingpage-login-icon">PATIENT APP</a>
    <a href="#find-section" className="landingpage-login-icon">FIND US</a>
    <a href="#contact-section" className="landingpage-login-icon">CONTACT US</a>
  
       <span className="landingpage-login-icon" onClick={toggleDropdown}>LOGIN</span>
        {showDropdown && (
          <div className="landingpage-login-options">
           <Link to="/authenticate"> Doctor</Link>
          </div> 
        )}
      
      </div>
    </div>


    <div className="landingpage-start-container" id="home-section" >
      {/* Sliding Window */}
      <div className="landingpage-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`landingpage-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="landingpage-content">
              <h1>{slide.tagline}</h1>
              <p>{slide.note}</p>
              {/* <button className="learn-more-btn" >Learn More</button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="landingpage-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`landingpage-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
    
    
    <div className="landingpage-about-main" id="about-section">
    <div className="landingpage-about">
      <h1>About Us</h1>
      <p>
      <i>
        Lorem ipsum dolor sit amet, consectetur adipiscing   
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,   
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.   
      </i>
      </p>  
      </div>
      </div>
   

    <div id="health-section"/* "landingpage-scroll-container" */  className="landingpage-scroll-container" ref={scrollContainerRef}>
      
      <div className="landingpage-scroll-content" >
        {images.map((image, index) => (
          <div
            key={index}
            className={`landingpage-image-container ${flippedIndex === index ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="landingpage-image-front">
              <img src={image.src} alt={` ${index + 1}`} />
            </div>
            <div className="landingpage-image-back">
              <p>{image.details}</p>
            </div>
          </div>
        ))}
    
        {images.map((image, index) => (
          <div
            key={index + images.length}
            className={`landingpage-image-container ${flippedIndex === index ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="landingpage-image-front">
              <img src={image.src} alt={` ${index + 1}`} />
            </div>
            <div className="landingpage-image-back">
              <p>{image.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="landingpage-service-container" id="services-section" >
      <div className="landingpage-service">
        <h1>Services</h1>
        <div className="landingpage-treat">
        {cardData.map((card, index) => (
          <Card key={index} icon={card.icon} title={card.title} details={card.details} />
        ))}
        </div>
      </div>
    </div>
  

    <div className="landingpage-mobile-container" id="app-section">
      <div className="landingpage-title">
      <h1>Patient App</h1>
    
      </div>
      <div className="landingpage-left-explanation">
      
        {explanations[currentStep].text}
        <br/><br/>
        <a href="path_to_download_link" className="landingpage-download-button">
          Download Now
        </a>
       
        </div>
      <div className="landingpage-right-screenshot">
        <div className="landingpage-android-frame">
          <img src={explanations[currentStep].imgSrc} alt={`Step ${currentStep + 1}`} />
        </div>
        <div className="landingpage-arrows">
          <div className="landingpage-arrow-left" onClick={prevStep}>&#9664;</div>
          <div className="landingpage-arrow-right" onClick={nextStep}>&#9654;</div>
        </div>
      </div>
    </div>


    <div  id="find-section">
    <LoadScript googleMapsApiKey="AIzaSyBWaUPlDOdvM9RtboiUppWJS2lbK2kdLUU"   >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}  // Adjust the zoom level as needed
        center={defaultCenter}  // Center the map on the fixed location
       
      >
        <Marker position={defaultCenter}
      
         />   
      </GoogleMap>
    </LoadScript>
    </div>

     
    <footer className="landingpage-footer" id="contact-section" >
      <div className="landingpage-footer-left">
        <p>Dr. Nithya's Dental and Smile Design Clinic</p>
        <p>Address: Pondicherry university, Kalapet.</p>
        <p>Contact Number: <a href="tel:+919876543210">+91 9876543210</a></p>
        <p>Email: <a href="mailto:clinic@example.com">clinic@example.com</a></p>
        <div className="landingpage-footer-bottom">
        <p>&copy; TS. All rights reserved.</p>
      </div>
      </div>
      <div className="landingpage-footer-right">
        <h3>Contact Us</h3>
        <form onSubmit={handleSubmit} className="landingpage-contact-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
          />
          <button type="submit" className="landingpage-contact-submit">Send</button>
        </form>
      </div>
      
    </footer>

    </div>
  );
};

export default Landingpage;
