import { useState, useEffect } from 'react';
import { Menu, X, Code, Smartphone, Cloud, Megaphone, Linkedin, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import './index.css';
import abhishekImage from './assets/abhishek.jpeg';
import sahilImage from './assets/sahil.jpeg';
import mimanshaImage from './assets/mimansha.jpeg';
import narmeshimage from './assets/tm1.jpg';
import yashiboyimage from './assets/testimonial1.jpg';

export default function BuildnBoostLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

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

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
      icon: <Code className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      icon: <Smartphone className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: <Cloud className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Digital Marketing',
      description: 'Grow your online presence and reach more customers',
      icon: <Megaphone className="h-10 w-10 text-blue-500" />
    }
  ];
  
  // Portfolio projects data
  const projects = [
    {
      title: 'E-Commerce Platform',
      type: 'Web',
      technologies: 'React, Node.js, MongoDB',
      description: 'A fully responsive e-commerce solution with secure payment processing and inventory management.',
      image: 'C:Work/test/my-react-app/src/assets',
      link: 'https://source.unsplash.com/800x600/?technology,ecommerce'

      
    },
    {
      title: 'Health & Fitness App',
      type: 'Mobile',
      technologies: 'React Native, Firebase',
      description: 'Cross-platform mobile application for tracking workouts, nutrition, and personal goals.',
      image: 'https://via.placeholder.com/400x250',
      link: 'https://source.unsplash.com/random/800x600'
    },
    {
      title: 'Business Analytics Dashboard',
      type: 'Web',
      technologies: 'Vue.js, D3.js, PostgreSQL',
      description: 'Interactive data visualization dashboard for real-time business metrics and KPIs.',
      image: 'https://via.placeholder.com/400x250',
      link: 'https://source.unsplash.com/random/800x600'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      name: 'Narmesh Nigam',
      role: 'Founder of AdsHere',
      testimonial: 'BuildnBoost didn’t just redesign our website — they redefined our digital presence. The new site is modern, fast, and perfectly aligned with our brand.',
      avatar: narmeshimage
    },
    {
      name: 'Yash Chawla',
      role: 'CTO Chawla Fireworks',
      testimonial: 'Working with BuildnBoost on our mobile app was a seamless experience.',
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
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
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
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a 
                href="#" 
                className={`text-2xl font-bold text-blue-600 transition-all duration-300 relative ${
                  logoClicks === 1 ? 'scale-125' : 
                  logoClicks === 2 ? 'rotate-12' : 
                  logoClicks === 3 ? 'text-purple-600' : 
                  logoClicks >= 4 ? 'animate-bounce text-green-600' : 
                  isLogoHovered ? 'text-indigo-600 scale-110' : ''
                }`}
                onClick={handleLogoClick}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
              >
                BuildnBoost
                {logoClicks >= 5 && (
                  <span className="absolute -top-3 -right-3 text-xs bg-yellow-400 text-black px-1 py-0.5 rounded-md animate-pulse">
                    Easter Egg Found!
                  </span>
                )}
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 font-medium">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 font-medium">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-blue-600 font-medium">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 font-medium">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 font-medium">Contact</button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 absolute bg-white w-full left-0 p-4 shadow-lg">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Home</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Build Faster. Launch Smarter.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            We specialize in creating cutting-edge digital solutions that help businesses grow and thrive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              Let's Talk
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-all"
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-4 md:px-0">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 md:px-0">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Our Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={abhishekImage}
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                    <span className="text-xs font-medium text-white bg-indigo-600 rounded-full px-3 py-1">{project.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500">{project.technologies}</span>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
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
      <section id="testimonials" className="py-20 bg-gray-50 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Client Testimonials</h2>
          
          <div className="relative">
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
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
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
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md text-center group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-indigo-900 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <a 
                    href={member.linkedin} 
                    className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700 transition-all"
                  >
                    <Linkedin size={16} className="text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-0">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Contact Us</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleSubmit}
                type="button"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
            <p>© BuildnBoost {new Date().getFullYear()}</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}