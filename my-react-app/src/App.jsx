import { useState, useEffect } from 'react';
import { Menu, X, Code, Smartphone, Cloud, Megaphone, Linkedin, Github, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import './index.css';
import abhishekImage from './assets/abhishek.jpeg';
import sahilImage from './assets/sahil.jpeg';
import mimanshaImage from './assets/mimansha.jpeg';
import narmeshimage from './assets/tm1.jpg';
import yashiboyimage from './assets/testimonial1.jpg';

export default function ideasforgeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Check if URL has been modified (simulating 404)
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      setPageNotFound(true);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && pageNotFound) {
        setPageNotFound(false);
        window.history.pushState({}, '', '/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNotFound]);

  // Handle scroll for sticky navbar and section visibility
  useEffect(() => {
    const handleScroll = () => {
      // Sticky navbar
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = ['home', 'services', 'portfolio', 'testimonials', 'team', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add scroll animation effect
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fadeInUp');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Initial checks
    handleScroll();
    handleScrollAnimation();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  // Success popup timer
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  // Logo animation effect
  useEffect(() => {
    if (logoClicks > 0) {
      const timer = setTimeout(() => {
        setLogoClicks(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  // Form handling
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        alert("❌ Failed to send message: " + errorData.detail);
      }
    } catch (error) {
      console.error("Error while sending message:", error);
      alert("❌ An unexpected error occurred. Please try again.");
    }
  };

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Logo Easter egg handler
  const handleLogoClick = () => {
    setLogoClicks(prev => prev + 1);
  };

  // Service cards data
  const services = [
    {
      title: 'Website Development',
      description: 'Modern and responsive websites tailored to your needs',
      icon: <Code className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      icon: <Smartphone className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: <Cloud className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Digital Marketing',
      description: 'Grow your online presence and reach more customers',
      icon: <Megaphone className="h-10 w-10 text-indigo-600" />
    }
  ];
  
  // Portfolio projects data
  const projects = [
    {
      title: 'E-Commerce Platform',
      type: 'Web',
      technologies: 'React, Node.js, MongoDB',
      description: 'A fully responsive e-commerce solution with secure payment processing and inventory management.',
      image: 'https://source.unsplash.com/random/800x600/?ecommerce,technology'
    },
    {
      title: 'Health & Fitness App',
      type: 'Mobile',
      technologies: 'React Native, Firebase',
      description: 'Cross-platform mobile application for tracking workouts, nutrition, and personal goals.',
      image: 'https://source.unsplash.com/random/800x600/?fitness,app'
    },
    {
      title: 'Business Analytics Dashboard',
      type: 'Web',
      technologies: 'Vue.js, D3.js, PostgreSQL',
      description: 'Interactive data visualization dashboard for real-time business metrics and KPIs.',
      image: 'https://source.unsplash.com/random/800x600/?dashboard,analytics'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      name: 'Narmesh Nigam',
      role: 'Founder of AdsHere',
      testimonial: 'ideasforge didnt just redesign our website — they redefined our digital presence. The new site is modern, fast, and perfectly aligned with our brand.',
      avatar: narmeshimage
    },
    {
      name: 'Yash Chawla',
      role: 'CTO Chawla Fireworks',
      testimonial: 'Working with ideasforge on our mobile app was a seamless experience.',
      avatar: yashiboyimage
    }
  ];
  
  // Team members data
  const teamMembers = [
    {
      name: 'Sahil Obhrai',
      role: 'Solutions Architect',
      bio: 'Designs and builds scalable multi-cloud systems with React, Django, Python across frontend and backend.',
      photo: sahilImage,
      linkedin: 'https://www.linkedin.com/in/sahil-obhrai-665771215/'
    },
    {
      name: 'Abhishek Singh',
      role: 'Full-Stack Developer',
      bio: 'Builds responsive, scalable web and mobile apps using MERN stack and Django with clean, modular architecture.',
      photo: abhishekImage,
      linkedin: 'https://www.linkedin.com/in/abhishek-singh29/'
    },
    {
      name: 'Mimansha burakoti',
      role: 'Digital Marketing',
      bio: 'Boosts online presence through targeted SEO and marketing strategies that drive traffic and engagement.',
      photo: mimanshaImage,
      linkedin: 'https://www.linkedin.com/in/mimanshaburakoti/'
    }
  ];

  // 404 Page Not Found
  if (pageNotFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full mx-auto mb-8 animate-spin"></div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={() => {
              setPageNotFound(false);
              window.history.pushState({}, '', '/');
            }}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Back to Home
          </button>
          <p className="mt-6 text-gray-500 text-sm">Press ESC to return home</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 animate-pop-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">We've received your message and will get back to you soon.</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a 
                href="#" 
                className={`text-2xl font-bold text-indigo-600 transition-all duration-300 relative ${
                  logoClicks === 1 ? 'scale-125' : 
                  logoClicks === 2 ? 'rotate-12' : 
                  logoClicks === 3 ? 'text-purple-600' : 
                  logoClicks >= 4 ? 'animate-bounce text-green-600' : 
                  isLogoHovered ? 'text-indigo-800 scale-110' : ''
                }`}
                onClick={handleLogoClick}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                ideasforge
                {logoClicks >= 5 && (
                  <span className="absolute -top-3 -right-3 text-xs bg-yellow-400 text-black px-1 py-0.5 rounded-md animate-pulse shadow-md">
                    Easter Egg Found!
                  </span>
                )}
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${activeSection === 'home' ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${activeSection === 'services' ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${activeSection === 'portfolio' ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${activeSection === 'testimonials' ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${activeSection === 'contact' ? 'text-indigo-600 font-semibold' : ''}`}
              >
                Contact
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 absolute bg-white w-full left-0 p-4 shadow-xl rounded-b-lg">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors ${activeSection === 'home' ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors ${activeSection === 'services' ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors ${activeSection === 'portfolio' ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors ${activeSection === 'testimonials' ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded transition-colors ${activeSection === 'contact' ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''}`}
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Updated with modern dark design */}
      <section 
        id="home" 
        className="pt-32 pb-20 px-4 md:px-0 relative overflow-hidden min-h-screen flex items-center justify-center"
        style={{
          background: `
            linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%),
            url('https://source.unsplash.com/random/1600x900/?technology,code,dark')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-blue-900/20 pointer-events-none"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto text-center relative z-10 scroll-animate">
          <div className="mb-8 inline-block px-4 py-2 bg-indigo-600/10 backdrop-blur-sm rounded-full border border-indigo-600/30">
            <span className="text-indigo-400 text-sm font-medium">We build digital experiences</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Innovative Solutions
            </span><br />
            For Your Digital Needs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            We specialize in creating cutting-edge digital solutions that help businesses grow and thrive in the modern landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
            >
              Let's Talk
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="px-8 py-3 bg-transparent text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform backdrop-blur-sm"
            >
              Our Services
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-4 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scrollIndicator"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="scroll-animate bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 transform"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Projects</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Some of our recent work that we're proud of
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="scroll-animate bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 transform"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image}
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium">{project.technologies}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                    <span className="text-xs font-medium text-white bg-indigo-600 rounded-full px-3 py-1 shadow-sm">{project.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500">{project.technologies}</span>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center transition-colors"
                    >
                      View <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              What our clients say about working with us
            </p>
          </div>
          
          <div className="relative scroll-animate">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full mr-4 border-2 border-indigo-200 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors text-indigo-600 hover:text-indigo-800"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors text-indigo-600 hover:text-indigo-800"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 md:px-0">
        <div className="container mx-auto max-w-5xl">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              The talented people behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="scroll-animate bg-white rounded-xl overflow-hidden shadow-lg text-center group hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 transform"
              >
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-indigo-900 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 transform"
                  >
                    <Linkedin size={18} className="text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-0 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Get in touch and let's build something great together
            </p>
          </div>
          
          <div className="scroll-animate bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your email"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleSubmit}
                type="button"
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a 
                href="#" 
                className="text-2xl font-bold text-white"
                onClick={handleLogoClick}
              >
                ideasforge
              </a>
              <p className="mt-2 text-gray-400">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/company/ideasforge" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/ideasforge" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>Made with ❤️ by the ideasforge team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}