import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Sun, Battery, Leaf, Shield, Zap, ArrowRight, IndianRupee, Send, CheckCircle2, Quote, ChevronDown, ChevronUp, ArrowLeft, BarChart3, TreePine, Award, TrendingUp, Phone, MessageSquare, Printer, Share2, MapPin, Mail, PhoneCall, ExternalLink, Download } from 'lucide-react';
import './App.css'; // empty
import { supabase } from './supabaseClient';
import * as XLSX from 'xlsx';

const Facebook = ({ size = 20, fill = "none", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 20, fill = "none", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsApp = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.445h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);



function Home() {
  const navigate = useNavigate();
  const [bill, setBill] = useState(5000);
  const [openFaq, setOpenFaq] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quotePin, setQuotePin] = useState('');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackType, setCallbackType] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: quoteName,
          phone: quotePhone,
          pin_code: quotePin,
          installation_type: 'Quote Request'
        }
      ]);
      if (error) throw error;
      alert("Thanks for your interest! A Falcon Energy representative will contact you soon.");
      setQuoteName('');
      setQuotePhone('');
      setQuotePin('');
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection or Supabase settings.");
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingCallback(true);
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: callbackName,
          phone: callbackPhone,
          installation_type: callbackType || 'General Enquiry'
        }
      ]);
      if (error) throw error;
      alert("Enquiry Sent! Our team will contact you shortly.");
      setCallbackName('');
      setCallbackPhone('');
      setCallbackType('');
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection or Supabase settings.");
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCalculate = () => {
    navigate(`/calculator-results?bill=${bill}`);
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const faqs = [
    {
      q: "How long does a solar panel system last?",
      a: "Our tier-1 solar panels come with a 25-year performance warranty, but they typically continue to generate electricity for 30-35 years."
    },
    {
      q: "Will solar panels work during a power outage?",
      a: "If you install a grid-tied system without a battery, it will shut off during an outage for safety. However, with our Battery Storage add-ons, you can keep essential appliances running."
    },
    {
      q: "Do I need to clean the solar panels?",
      a: "Yes, regular cleaning ensures maximum efficiency. Dust and debris can reduce power generation by 5-10%. We recommend cleaning them once a month."
    },
    {
      q: "Is financing available for solar installation?",
      a: "Absolutely! We offer flexible financing options and EMI plans to make transitioning to solar energy affordable and hassle-free."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '120px', objectFit: 'contain', margin: '-20px 0' }} />
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#calculator">Calculator</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact" onClick={openModal} className="btn btn-primary">Get a Quote</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          {/* Using a local video file. You can replace public/solar-video.mp4 with your actual solar footage later */}
          <source src="/388f3ae0764f3114601f5a5995b75849_720w.mp4" type="video/mp4" />
        </video>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="hero-content animate-up text-center">
            <h1 className="hero-title">
              Power Your Future with<br /><span>Solar Energy</span>
            </h1>
            <p className="hero-subtitle">
              Falcon Energy Solution provides premium, high-efficiency solar panels designed to eliminate your electricity bills and secure a greener tomorrow.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#contact" onClick={openModal} className="btn btn-primary">Start Your Journey <ArrowRight size={18} style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} /></a>
              <a href="#calculator" className="btn btn-accent">Calculate Savings</a>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <Shield size={20} /> 25-Year Warranty
              </div>
              <div className="hero-feature">
                <Leaf size={20} /> 100% Green
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Marquee */}
      <section className="client-marquee">
        <div className="marquee-content">
          <span>Trusted by 500+ Homes</span>
          <span className="dot"></span>
          <span>ISO 9001 Certified</span>
          <span className="dot"></span>
          <span>Tier-1 Panel Partners</span>
          <span className="dot"></span>
          <span>MNRE Approved Vendor</span>
          <span className="dot"></span>
          <span>Trusted by 500+ Homes</span>
          <span className="dot"></span>
          <span>ISO 9001 Certified</span>
          <span className="dot"></span>
          <span>Tier-1 Panel Partners</span>
          <span className="dot"></span>
          <span>MNRE Approved Vendor</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Falcon Energy?</h2>
            <p>We deliver top-tier renewable energy solutions tailored to your specific residential or commercial needs.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon"><Sun size={32} /></div>
              <h3>Maximum Efficiency</h3>
              <p>Our Tier-1 solar panels capture more sunlight and convert it to energy faster than industry standards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Battery size={32} /></div>
              <h3>Battery Storage</h3>
              <p>Store excess energy during the day and power your home through the night or during grid outages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap size={32} /></div>
              <h3>Smart Monitoring</h3>
              <p>Track your energy production and consumption in real-time through our intuitive mobile application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products and Services Section */}
      <section id="services" className="section products-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Products & Services</h2>
            <p>Comprehensive solar solutions designed for unmatched performance and reliability.</p>
          </div>
          <div className="products-grid">
            <div className="product-card reveal">
              <div className="product-img" style={{ backgroundImage: "url('/solar-systm-instllation-cost_15423659-8d1f-40a0-8587-a72551a839e8.jpg.jpeg')" }}></div>
              <div className="product-info">
                <h3>Residential Solar Systems</h3>
                <p>Complete rooftop installations tailored to power your home efficiently.</p>
                <ul>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Tier-1 Monocrystalline Panels</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Smart Inverter Technology</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Net-Metering Support</li>
                </ul>
              </div>
            </div>
            <div className="product-card reveal">
              <div className="product-img" style={{ backgroundImage: "url('/solarroofinstal_1024x1024.webp')" }}></div>
              <div className="product-info">
                <h3>Commercial Solutions</h3>
                <p>Large-scale solar installations for factories, offices, and institutions.</p>
                <ul>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> High-Yield ROI</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Tax Depreciation Benefits</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> O&M Services Included</li>
                </ul>
              </div>
            </div>
            <div className="product-card reveal">
              <div className="product-img" style={{ backgroundImage: "url('/industrial.png')" }}></div>
              <div className="product-info">
                <h3>Industrial Solar Solutions</h3>
                <p>Heavy-duty, high-capacity solar setups for large factories and warehouses.</p>
                <ul>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> MW Scale Ground & Roof Mounts</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Open Access Power Options</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Industrial Grid Connections</li>
                </ul>
              </div>
            </div>
            <div className="product-card reveal">
              <div className="product-img" style={{ backgroundImage: "url('/PMKYOJNA_2.png')" }}></div>
              <div className="product-info">
                <h3>PM Kusum Yojana</h3>
                <p>Government scheme enabling solar energy accessibility for agricultural growth.</p>
                <ul>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Government Subsidies Up to 60%</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Extra Income via Grid Exports</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Secure Energy Independence</li>
                </ul>
              </div>
            </div>
            <div className="product-card reveal">
              <div className="product-img" style={{ backgroundImage: "url('/SOLAR PUMP.jpeg')" }}></div>
              <div className="product-info">
                <h3>Solar Pump Systems</h3>
                <p>High-discharge water pumping solutions powered entirely by solar panels.</p>
                <ul>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> AC & DC High-Discharge Pumps</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Zero Electric Operational Cost</li>
                  <li><CheckCircle2 size={16} color="var(--accent-color)" /> Maintenance-Free Long Life</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Saving Calculator */}
      <section id="calculator" className="section calculator-section">
        <div className="container calc-container">
          <div className="calc-info">
            <h2>Energy Saving Calculator</h2>
            <p>See how much you could save by switching to solar with Falcon Energy. Our advanced algorithm calculates your estimated savings and required system size instantly.</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '600' }}>
                <div style={{ background: 'var(--accent-color)', borderRadius: '50%', padding: '0.8rem' }}><IndianRupee size={20} /></div>
                Reduce your electric bill by up to 80%
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '600' }}>
                <div style={{ background: 'var(--accent-color)', borderRadius: '50%', padding: '0.8rem' }}><Leaf size={20} /></div>
                Lower your carbon footprint dramatically
              </li>
            </ul>
          </div>

          <div className="calc-card">
            <div className="calc-group">
              <label>Average Monthly Electric Bill</label>
              <div className="input-wrapper">
                <span className="input-icon">₹</span>
                <input
                  type="number"
                  className="calc-input"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  min="1000" max="50000"
                />
              </div>
              <input
                type="range"
                className="calc-range"
                min="1000" max="50000" step="500"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
              />
            </div>

            <button onClick={handleCalculate} className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              Calculate Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Installation Process Timeline */}
      <section id="how-it-works" className="section timeline-section">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>From your first enquiry to a fully operational solar system — here's your simple 5-step journey with Falcon Energy.</p>
          </div>
          <div className="timeline reveal">
            <div className="timeline-item reveal">
              <div className="timeline-dot">1</div>
              <div className="timeline-content">
                <div className="timeline-icon"><Zap size={24} /></div>
                <h3>Free Site Survey</h3>
                <p>Our expert visits your property to assess roof orientation, shading, structural integrity, and current energy consumption patterns.</p>
                <span className="timeline-tag">Day 1–3</span>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot">2</div>
              <div className="timeline-content">
                <div className="timeline-icon"><BarChart3 size={24} /></div>
                <h3>Custom System Design</h3>
                <p>We engineer a tailor-made solar layout, optimising panel count, inverter size, and battery storage for your specific energy needs.</p>
                <span className="timeline-tag">Day 4–7</span>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot">3</div>
              <div className="timeline-content">
                <div className="timeline-icon"><Shield size={24} /></div>
                <h3>Permits & Approvals</h3>
                <p>We handle all government net-metering applications, DISCOM approvals, and subsidy paperwork on your behalf — completely hassle-free.</p>
                <span className="timeline-tag">Day 8–21</span>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot">4</div>
              <div className="timeline-content">
                <div className="timeline-icon"><Battery size={24} /></div>
                <h3>Professional Installation</h3>
                <p>Our certified engineers install your panels, inverter, and smart monitoring unit in just 1–2 days with zero disruption to your daily life.</p>
                <span className="timeline-tag">Day 22–24</span>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot">5</div>
              <div className="timeline-content">
                <div className="timeline-icon"><Sun size={24} /></div>
                <h3>Go Live & Start Saving</h3>
                <p>Your system is activated, connected to the grid, and you receive access to the Falcon Energy monitoring app. Start saving from day one!</p>
                <span className="timeline-tag">Day 25+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery / Portfolio */}
      <section id="portfolio" className="section gallery-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Portfolio</h2>
            <p>Take a look at some of our recent residential, commercial, and industrial solar installations.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item reveal">
              <img src="/solar-systm-instllation-cost_15423659-8d1f-40a0-8587-a72551a839e8.jpg.jpeg" alt="Premium Solar Rooftop" />
              <div className="gallery-overlay"><span>Premium Solar Rooftop</span></div>
            </div>
            <div className="gallery-item reveal">
              <img src="/solarroofinstal_1024x1024.webp" alt="Commercial Rooftop Grid" />
              <div className="gallery-overlay"><span>Commercial Rooftop Grid</span></div>
            </div>
            <div className="gallery-item reveal">
              <img src="/INDUSTRAIL SOLAR.jpg.jpeg" alt="Mega-Watt Solar Field" />
              <div className="gallery-overlay"><span>Mega-Watt Solar Field</span></div>
            </div>
            <div className="gallery-item reveal">
              <img src="/solar-rooftop-annual-maintenance-contract-services-500x500.webp" alt="AMC Maintenance & Safety" />
              <div className="gallery-overlay"><span>AMC Maintenance & Safety</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p>Don't just take our word for it. See how we've helped others save on energy.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <Quote size={40} className="quote-icon" />
              <p>"Falcon Energy completely transformed how we consume electricity. Our bills have dropped by 85%, and the installation was seamless!"</p>
              <div className="client-info">
                <div className="client-avatar">RK</div>
                <div className="client-details">
                  <h4>Rahul Kapoor</h4>
                  <span>Homeowner</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote size={40} className="quote-icon" />
              <p>"The team was highly professional. They guided us through the subsidy process and got our 10kW system up and running in no time."</p>
              <div className="client-info">
                <div className="client-avatar">SM</div>
                <div className="client-details">
                  <h4>Sneha Mishra</h4>
                  <span>Business Owner</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <Quote size={40} className="quote-icon" />
              <p>"Excellent post-installation support. The mobile app lets me see my daily generation, and it's amazing to watch the savings grow."</p>
              <div className="client-info">
                <div className="client-avatar">AS</div>
                <div className="client-details">
                  <h4>Amit Singh</h4>
                  <span>Residential Client</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section faq-section">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about switching to solar energy.</p>
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.q}
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen Form */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h3>Ready to Make the Switch?</h3>
              <p style={{ marginBottom: '2rem' }}>Get a free, no-obligation quote and custom solar design for your home or business.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ opacity: 0.9, fontSize: '0.9rem', fontFamily: 'Open Sans' }}>Email Us</h4>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Montserrat' }}>info@falconenergysolution.com</p>
                </div>
                <div>
                  <h4 style={{ opacity: 0.9, fontSize: '0.9rem', fontFamily: 'Open Sans' }}>Call Us</h4>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Montserrat' }}>+91-9630349148, +91 7771800880, +91 9340499254</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Request Your Free Quote</h3>
              <form onSubmit={handleQuoteSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone Number"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="PIN Code"
                    value={quotePin}
                    onChange={(e) => setQuotePin(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1.2rem', fontSize: '1.1rem' }}
                  disabled={isSubmittingQuote}
                >
                  {isSubmittingQuote ? 'Submitting...' : 'Get Free Quote'} <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



      {/* Service Area & Contact Info */}
      <section id="contact-info" className="section contact-details-section reveal">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card-wide">
              <h3>Get In Touch</h3>
              <p>Have questions about solar? Our team is ready to help you transition to clean energy.</p>
              <div className="contact-methods">
                <div className="method">
                  <div className="method-icon"><MapPin size={24} /></div>
                  <div>
                    <h4>Headquarters</h4>
                    <p>Head quarter 7Th floor 6th Cabin Keshar Tower Race course Raod Gwalior  474002</p>
                  </div>
                </div>
                <div className="method">
                  <div className="method-icon"><PhoneCall size={24} /></div>
                  <div>
                    <h4>Sales Enquiry</h4>
                    <p>+91-9630349148, +91 7771800880, +91 9340499254</p>
                  </div>
                </div>
                <div className="method">
                  <div className="method-icon"><Mail size={24} /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p>info@falconenergysolution.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-card-wide">
              <h3>Service Locations</h3>
              <p>We provide end-to-end solar solutions in the following regions:</p>
              <div className="location-tags">
                <span>Gwalior</span>
                <span>Dabra</span>
                <span>Datia</span>
                <span>Bhind</span>
                <span>Guna</span>
                <span>Shivpuri</span>
                <span>Morena</span>
              </div>
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,168,255,0.05)', borderRadius: '8px', border: '1px dashed var(--accent-color)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                  <ExternalLink size={14} style={{ marginRight: '5px' }} /> Not in these cities? We're expanding! Contact us for remote consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <a href="https://wa.me/919630349148" className="fab fab-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
          <WhatsApp size={28} />
          <span className="fab-tooltip">Chat with us</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content animate-up" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Get Your Custom Solar Plan</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Leave your details and our expert will call you back within 24 hours.</p>
              <form onSubmit={handleCallbackSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone Number"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-input"
                    value={callbackType}
                    onChange={(e) => setCallbackType(e.target.value)}
                    required
                  >
                    <option value="">Installation Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem' }}
                  disabled={isSubmittingCallback}
                >
                  {isSubmittingCallback ? 'Sending...' : 'Request Free Callback'}
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo" style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem' }}>
                <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '140px', objectFit: 'contain', margin: '-20px 0' }} />
              </div>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', paddingRight: '2rem' }}>
                Empowering homes and businesses with sustainable, high-efficiency solar energy solutions for a brighter tomorrow.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#calculator">Calculator</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Service Areas</h4>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                We proudly deliver custom solar energy solutions across Madhya Pradesh.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Gwalior', 'Dabra', 'Datia', 'Bhind', 'Guna', 'Shivpuri', 'Morena'].map((loc, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <div className="social-icons-container">
              <a 
                href="https://www.facebook.com/profile.php?id=61589983001673" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon facebook"
              >
                <Facebook size={20} fill="currentColor" />
              </a>
              <a 
                href="https://www.instagram.com/falconenergysolution?igsh=MWtpdmJzMDU3c3gzMQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/919630349148" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon whatsapp"
              >
                <WhatsApp size={20} />
              </a>
            </div>
            <p style={{ margin: 0, opacity: 0.8 }}>&copy; {new Date().getFullYear()} Falcon Energy Solution. All rights reserved.</p>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.65 }}>
              Crafted with precision by <span style={{ color: '#00a8ff', fontWeight: '600' }}>Dcrypt Code</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

function Results() {
  const [searchParams] = useSearchParams();
  const bill = Number(searchParams.get('bill')) || 5000;

  // Robust Logic for Indian Energy Saving Calculator (with Govt Subsidy & Tariffs)
  const kwhUsage = bill / 8; // Monthly kWh based on avg ₹8/unit tariff
  const requiredKwSystem = kwhUsage / 120; // 1 kW produces ~120 units/month

  // Dynamic pricing based on system size in India
  let ratePerKw = 60000;
  if (requiredKwSystem <= 3) {
    ratePerKw = 65000;
  } else if (requiredKwSystem <= 10) {
    ratePerKw = 55000;
  } else {
    ratePerKw = 48000;
  }
  const estimatedCost = requiredKwSystem * ratePerKw;

  // PM Surya Ghar Muft Bijli Yojana Subsidy Logic
  let subsidy = 0;
  if (requiredKwSystem >= 3) {
    subsidy = 78000;
  } else if (requiredKwSystem >= 2) {
    subsidy = 60000 + (requiredKwSystem - 2) * 18000;
  } else {
    subsidy = requiredKwSystem * 30000;
  }
  const netInvestment = estimatedCost - subsidy;

  // Fixed connection charges + minimal maintenance fee as the new bill (instead of dummy 10% cut)
  const newMonthlyBill = 150 + Math.min(Math.floor(requiredKwSystem) * 50, 1000);
  const monthlySavings = bill - newMonthlyBill;
  const annualSavings = monthlySavings * 12;
  const roiYears = netInvestment / annualSavings;

  // Additional detail parameters
  const lifetimeSavings = annualSavings * 25; // 25 years warranty
  const co2Reduced = (requiredKwSystem * 1.5).toFixed(1); // tonnes per year
  const treesPlanted = Math.round(annualSavings * 0.05); // symbolic

  return (
    <div className="results-page">
      {/* Top Navbar */}
      <nav className="navbar" style={{ position: 'sticky', top: 0, background: 'var(--primary-color)' }}>
        <div className="container">
          <Link to="/" className="logo" style={{ color: '#fff' }}>
            <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '100px', objectFit: 'contain', margin: '-10px 0' }} />
          </Link>
          <Link to="/" className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        {/* Print-Only Professional Header */}
        <div className="print-header" style={{ display: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid var(--primary-color)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
            <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '80px', objectFit: 'contain' }} />
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '1.8rem', fontFamily: 'Montserrat' }}>Custom Solar Proposal</h2>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: 'var(--text-light)', fontFamily: 'Open Sans' }}>Prepared by: Falcon Energy Solution</p>
              <p style={{ margin: '0.1rem 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="section-title">
          <h2>Your Comprehensive Solar Report</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => window.print()} className="btn-outline">
              <Printer size={18} /> Print Report
            </button>
            <button onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Falcon Energy Solar Report',
                  text: `Check out my solar savings: ₹${annualSavings.toLocaleString('en-IN')} per year!`,
                  url: window.location.href
                });
              } else {
                alert("URL copied to clipboard!");
                navigator.clipboard.writeText(window.location.href);
              }
            }} className="btn-outline">
              <Share2 size={18} /> Share
            </button>
          </div>
          <p style={{ marginTop: '1.5rem' }}>Based on your average monthly bill of ₹{bill.toLocaleString('en-IN')}, here is your customized solar installation and savings breakdown.</p>
        </div>

        {/* Before and After Billing Visualization */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div className="stat-card" style={{ flex: '1', minWidth: '250px', background: '#ffebee', borderLeft: '5px solid #f44336' }}>
            <h4 style={{ color: '#c62828' }}>Current Monthly Bill</h4>
            <div className="val" style={{ color: '#d32f2f' }}>₹{bill.toLocaleString('en-IN')}</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>What you currently pay the grid.</p>
          </div>
          <div className="stat-card" style={{ flex: '1', minWidth: '250px', background: '#e8f5e9', borderLeft: '5px solid #4caf50' }}>
            <h4 style={{ color: '#2e7d32' }}>New Estimated Bill</h4>
            <div className="val" style={{ color: '#388e3c' }}>₹{newMonthlyBill.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Only fixed connection charges remain.</p>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Main System Requirement with Cost & Subsidy details */}
          <div className="stat-card" style={{ gridColumn: '1 / -1', background: 'var(--primary-color)', color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Recommended System Size</h4>
              <div className="val" style={{ color: '#fff', fontSize: '3rem', fontFamily: 'Montserrat' }}>{requiredKwSystem.toFixed(1)} kW</div>
              <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.85rem' }}>Capable of offsetting ~90% of your energy consumption.</p>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Estimated System Cost</h4>
              <div className="val" style={{ color: '#fff', fontSize: '2rem', fontFamily: 'Montserrat' }}>₹{estimatedCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <p style={{ marginTop: '0.5rem', color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.85rem' }}>Govt Subsidy: -₹{subsidy.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Net Investment</h4>
              <div className="val" style={{ color: 'var(--accent-color)', fontSize: '2.5rem', fontFamily: 'Montserrat' }}>₹{netInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.85rem' }}>Net cost after PM-Surya Ghar subsidy.</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper"><IndianRupee size={28} /></div>
            <h4>Annual Savings</h4>
            <div className="val">₹{annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Projected savings on your electricity bill for the first year.</p>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper"><BarChart3 size={28} /></div>
            <h4>25-Year Lifetime Savings</h4>
            <div className="val">₹{lifetimeSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Total savings over the warrantied life of your panels.</p>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper"><Award size={28} /></div>
            <h4>Estimated ROI Timeline</h4>
            <div className="val">{roiYears.toFixed(1)} Years</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Time taken for your system to pay for itself.</p>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper"><Leaf size={28} /></div>
            <h4>CO2 Reduction</h4>
            <div className="val">{co2Reduced} Tonnes</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Carbon dioxide emissions avoided annually.</p>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper"><TreePine size={28} /></div>
            <h4>Equivalent Trees Planted</h4>
            <div className="val">{treesPlanted} Trees</div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Environmental impact equivalent in mature trees planted.</p>
          </div>
        </div>

        {/* ROI Milestone Timeline */}
        <div style={{ marginTop: '5rem' }}>
          <div className="section-title">
            <h2>Your Savings Milestone Timeline</h2>
            <p>Watch your investment transform into pure profit — year by year, milestone by milestone.</p>
          </div>
          <div className="roi-timeline">
            {[
              { year: 1, label: 'Year 1', event: 'System Operational', desc: `You save ₹${annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })} in the very first year. New monthly bill is just ₹${newMonthlyBill.toLocaleString('en-IN', { maximumFractionDigits: 0 })}.`, color: '#00a8ff', icon: <Sun size={22} /> },
              { year: Math.ceil(roiYears / 2), label: `Year ${Math.ceil(roiYears / 2)}`, event: 'Halfway to Break-Even', desc: `You have recovered ₹${(annualSavings * Math.ceil(roiYears / 2)).toLocaleString('en-IN', { maximumFractionDigits: 0 })} of your ₹${netInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })} net investment.`, color: '#005bb5', icon: <TrendingUp size={22} /> },
              { year: Math.ceil(roiYears), label: `Year ${Math.ceil(roiYears)}`, event: '🎉 Break-Even Achieved!', desc: `Your system has fully paid for itself. Every rupee saved from this point is 100% pure profit.`, color: '#003366', icon: <Award size={22} /> },
              { year: 15, label: 'Year 15', event: 'Mid-Life Profits', desc: `Cumulative savings reach ₹${(annualSavings * 15).toLocaleString('en-IN', { maximumFractionDigits: 0 })}. You are well into the profit zone.`, color: '#388e3c', icon: <BarChart3 size={22} /> },
              { year: 25, label: 'Year 25', event: 'Full System Life', desc: `Total lifetime savings of ₹${lifetimeSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}. CO2 avoided: ${(co2Reduced * 25).toFixed(0)} tonnes.`, color: '#2e7d32', icon: <Leaf size={22} /> },
            ].map((milestone, i) => (
              <div className="roi-milestone" key={i}>
                <div className="roi-year" style={{ background: milestone.color }}>
                  <div className="roi-year-icon">{milestone.icon}</div>
                  <span>{milestone.label}</span>
                </div>
                <div className="roi-connector"></div>
                <div className="roi-card">
                  <h4 style={{ color: milestone.color }}>{milestone.event}</h4>
                  <p>{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--primary-color)' }}>Ready to transform your energy bills?</h3>
          <button onClick={() => alert("A solar expert will be with you shortly!")} className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
            Request Official Proposal
          </button>
        </div>
      </div>
    </div>
  )
}

function LeadsExport() {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [downloading, setDownloading] = useState(false);

  const fetchLeads = async () => {
    try {
      setStatus('loading');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      setStatus('success');
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Check your Supabase URL and Key configurations.');
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDownloadExcel = () => {
    try {
      setDownloading(true);
      if (!leads || leads.length === 0) {
        alert('No leads data available to export.');
        setDownloading(false);
        return;
      }

      // Format database rows into clean Excel headers and data
      const formattedData = leads.map((lead, index) => ({
        'S.No': index + 1,
        'Full Name': lead.name,
        'Phone Number': lead.phone,
        'PIN Code': lead.pin_code || 'N/A',
        'Installation Type': lead.installation_type || 'N/A',
        'Status': lead.status || 'New',
        'Date Submitted': new Date(lead.created_at).toLocaleString('en-IN')
      }));

      // Create Excel workbook & worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

      // Generate file and trigger browser download
      XLSX.writeFile(workbook, 'Falcon_Energy_Leads.xlsx');
      setDownloading(false);
    } catch (err) {
      console.error('Failed to export leads:', err);
      alert('Error exporting Excel sheet: ' + err.message);
      setDownloading(false);
    }
  };

  const getWhatsAppLink = (phone) => {
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    return `https://wa.me/${cleanPhone}`;
  };

  // Stats derivation
  const totalLeads = leads.length;
  const quoteRequests = leads.filter(l => l.installation_type === 'Quote Request').length;
  const callbackRequests = leads.filter(l => l.installation_type !== 'Quote Request').length;
  const todayStr = new Date().toDateString();
  const leadsToday = leads.filter(l => new Date(l.created_at).toDateString() === todayStr).length;

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', fontFamily: 'Open Sans, sans-serif' }}>
        <div style={{ background: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.08)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '80px', marginBottom: '2rem', objectFit: 'contain' }} />
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.4rem' }}>Connecting to Database...</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Fetching secure leads information from Supabase.</p>
          <div style={{ margin: '2rem auto 0', width: '40px', height: '40px', border: '4px solid rgba(0, 168, 255, 0.1)', borderTop: '4px solid var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', fontFamily: 'Open Sans, sans-serif', padding: '2rem' }}>
        <div style={{ background: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.08)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '80px', marginBottom: '2rem', objectFit: 'contain' }} />
          <h2 style={{ color: '#c62828', marginBottom: '1rem', fontSize: '1.4rem' }}>⚠️ Connection Failed</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>We couldn't retrieve lead data from your database:</p>
          <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '2rem', wordBreak: 'break-all', textAlign: 'left' }}>
            {errorMsg}
          </div>
          <button onClick={fetchLeads} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Retry Connection</button>
          <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', fontFamily: 'Open Sans, sans-serif', paddingBottom: '4rem' }}>
      {/* Dashboard Top Header */}
      <nav style={{ background: 'var(--primary-color)', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/FACLON ENERGY LOGO.png" alt="Falcon Energy Logo" style={{ height: '60px', objectFit: 'contain' }} />
            <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '1rem', fontFamily: 'Montserrat' }}>Leads Center</span>
          </div>
          <Link to="/" className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>
      </nav>

      {/* Main Grid Content */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        {/* Title Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', fontFamily: 'Montserrat', margin: 0 }}>Business Leads Dashboard</h1>
            <p style={{ color: 'var(--text-light)', margin: '0.3rem 0 0', fontSize: '0.95rem' }}>Secure, passwordless real-time leads manager for Falcon Energy.</p>
          </div>
          <button
            onClick={handleDownloadExcel}
            disabled={downloading || leads.length === 0}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2e7d32', border: 'none', boxShadow: '0 4px 15px rgba(46,125,50,0.2)', padding: '1rem 2rem', fontSize: '1rem' }}
          >
            <Download size={18} /> {downloading ? 'Compiling Sheet...' : 'Export to Excel'}
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {/* Card 1 */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,51,102,0.05)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyText: 'center', justifyContent: 'center' }}><Award size={24} /></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-color)', fontFamily: 'Montserrat' }}>{totalLeads}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600' }}>TOTAL LEADS</div>
            </div>
          </div>
          {/* Card 2 */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,168,255,0.05)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyText: 'center', justifyContent: 'center' }}><Zap size={24} /></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)', fontFamily: 'Montserrat' }}>{leadsToday}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600' }}>CAPTURED TODAY</div>
            </div>
          </div>
          {/* Card 3 */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(56,142,60,0.05)', color: '#388e3c', display: 'flex', alignItems: 'center', justifyText: 'center', justifyContent: 'center' }}><Quote size={20} /></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#388e3c', fontFamily: 'Montserrat' }}>{quoteRequests}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600' }}>QUOTE REQUESTS</div>
            </div>
          </div>
          {/* Card 4 */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(211,47,47,0.05)', color: '#d32f2f', display: 'flex', alignItems: 'center', justifyText: 'center', justifyContent: 'center' }}><PhoneCall size={20} /></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#d32f2f', fontFamily: 'Montserrat' }}>{callbackRequests}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600' }}>CALLBACK ENQUIRIES</div>
            </div>
          </div>
        </div>

        {/* Leads Table Card Container */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '1.2rem', fontFamily: 'Montserrat' }}>Lead Registry Intake</h3>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,168,255,0.1)', color: 'var(--accent-color)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
              Live Sync Active
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {leads.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>No leads captured in the database yet.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Submissions from your landing page forms will show up here in real-time.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
                <thead>
                  <tr style={{ background: '#fcfcfc', borderBottom: '1px solid #f0f0f0' }}>
                    <th style={{ padding: '1.2rem 2rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '80px' }}>S.No</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '180px' }}>Date Submitted</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem' }}>Name</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '150px' }}>Phone</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '120px' }}>PIN Code</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem' }}>Type</th>
                    <th style={{ padding: '1.2rem 1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '120px' }}>Status</th>
                    <th style={{ padding: '1.2rem 2rem', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.85rem', width: '150px', textAlign: 'center' }}>Quick Connect</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #f8f8f8', transition: 'background 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '1.2rem 2rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>{i + 1}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                        {new Date(lead.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem', fontWeight: '600', color: 'var(--text-dark)', fontSize: '0.95rem' }}>{lead.name}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-dark)', fontSize: '0.9rem', fontFamily: 'monospace' }}>{lead.phone}</td>
                      <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>{lead.pin_code || '—'}</td>
                      <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          background: lead.installation_type === 'Quote Request' ? 'rgba(0,51,102,0.06)' : 'rgba(0,168,255,0.06)',
                          color: lead.installation_type === 'Quote Request' ? 'var(--primary-color)' : 'var(--accent-color)'
                        }}>
                          {lead.installation_type || 'General Callback'}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1.5rem', fontSize: '0.9rem' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          padding: '#0.2rem 0.6rem',
                          borderRadius: '12px',
                          background: '#e8f5e9',
                          color: '#2e7d32'
                        }}>
                          {lead.status || 'New'}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.5rem', borderBottom: 'none' }}>
                        <a
                          href={`tel:${lead.phone}`}
                          title="Call Lead"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(0, 168, 255, 0.1)',
                            color: 'var(--accent-color)',
                            transition: 'transform 0.2s'
                          }}
                          className="action-btn-hover"
                        >
                          <Phone size={14} />
                        </a>
                        <a
                          href={getWhatsAppLink(lead.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Lead"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(37, 211, 102, 0.1)',
                            color: '#25d366',
                            transition: 'transform 0.2s'
                          }}
                          className="action-btn-hover"
                        >
                          <MessageSquare size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .table-row-hover:hover { background: #fdfdfd; }
        .action-btn-hover:hover { transform: scale(1.15); }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator-results" element={<Results />} />
      <Route path="/dashboard" element={<LeadsExport />} />
      <Route path="/leads-export-fa982bc3" element={<LeadsExport />} />
    </Routes>
  );
}

export default App;
