import React, { useState, useEffect, useRef } from 'react';
import { SEO } from './src/components/SEO';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Check, 
  Star, 
  Shield, 
  Key, 
  Hammer,
  MapPin,
  Home,
  ChevronDown,
  Send,
  MessageSquare,
  X,
  ArrowRight,
  Facebook,
  Plus,
  Minus
} from 'lucide-react';

/* --- CUSTOM ICONS --- */

const XIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/* --- LOGO COMPONENT --- */
const Logo = ({ size = 16, className = "" }) => (
  <div className={`bg-slate-900 text-amber-500 p-2 rounded-full shadow-sm ${className}`}>
    <Home size={size} aria-hidden="true" />
  </div>
);

/**
 * REVEAL COMPONENT
 */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- SIMULATION COMPONENTS --- */

const ChatSimulation = ({ active, onClick }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) {
      const timers = [
        setTimeout(() => setStep(1), 500),  // User message
        setTimeout(() => setStep(2), 1500), // Typing
        setTimeout(() => setStep(3), 2500), // Reply
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setStep(0);
    }
  }, [active]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Open WhatsApp Support Chat"
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 w-full max-w-[240px] mx-auto cursor-pointer group transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
    >
      {/* WhatsApp Header - Compact */}
      <div className="bg-[#075e54] p-2 flex items-center gap-2 text-white">
        <Logo size={10} className="w-6 h-6 flex items-center justify-center border border-white/10" />
        <div>
          <p className="text-[10px] font-bold">Davidoff RES</p>
          <p className="text-[8px] opacity-80">{step >= 2 && step < 3 ? 'typing...' : 'online'}</p>
        </div>
      </div>
      
      {/* Chat Body - Reduced Height */}
      <div className="bg-[#ece5dd] h-32 md:h-40 p-2 relative flex flex-col gap-1.5 text-[10px] overflow-hidden">
        <div className={`self-end bg-[#dcf8c6] text-slate-800 p-1.5 px-2 rounded-lg rounded-tr-none shadow-sm max-w-[90%] transition-all duration-500 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Hi, I have an apartment in Jerusalem...
          <span className="text-[8px] text-slate-500 block text-right mt-0.5">10:30 AM <Check size={8} className="inline text-blue-500" /></span>
        </div>

        {step === 2 && (
          <div className="self-start bg-white p-1.5 rounded-lg rounded-tl-none shadow-sm w-8 flex gap-0.5 items-center justify-center animate-pulse">
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          </div>
        )}

        <div className={`self-start bg-white text-slate-800 p-1.5 px-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%] transition-all duration-500 transform ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Shalom! We'd love to help. We handle everything.
          <span className="text-[8px] text-slate-500 block text-right mt-0.5">10:31 AM</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur p-1.5 flex items-center gap-1.5 border-t border-slate-200">
          <div className="bg-slate-100 flex-grow p-1 rounded-full text-slate-400 pl-2">Start chat...</div>
          <div className="bg-[#075e54] p-1 rounded-full text-white">
            <Send size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

const IMessageSimulation = ({ active, onClick }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) {
      const timers = [
        setTimeout(() => setStep(1), 500),  // User message
        setTimeout(() => setStep(2), 1500), // Typing
        setTimeout(() => setStep(3), 2500), // Reply
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setStep(0);
    }
  }, [active]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Open iMessage Direct Chat"
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 w-full max-w-[240px] mx-auto cursor-pointer group transform transition-transform hover:scale-105 h-full min-h-[180px] md:min-h-[220px] relative flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/50"
    >
      {/* iOS Header - Compact */}
      <div className="bg-white/80 backdrop-blur-md p-2 border-b border-slate-100 flex flex-col items-center z-10 sticky top-0">
        <Logo size={10} className="w-6 h-6 flex items-center justify-center mb-0.5" />
        <p className="text-[9px] text-slate-500 font-medium">Davidoff RES</p>
      </div>

      {/* Chat Body */}
      <div className="flex-grow bg-white p-3 flex flex-col gap-1.5 overflow-hidden relative">
        
        {/* User Bubble (Blue) */}
        <div className={`self-end bg-[#007AFF] text-white p-1.5 px-3 rounded-2xl rounded-br-sm max-w-[90%] text-[10px] leading-relaxed transition-all duration-500 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Hey, can you help manage my place...
        </div>
        {step >= 1 && <p className={`text-[8px] text-slate-400 self-end mr-1 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>Delivered</p>}

        {/* Typing Bubble */}
        {step === 2 && (
          <div className="self-start bg-[#E9E9EB] p-2 rounded-2xl rounded-bl-sm w-10 flex items-center justify-center gap-0.5">
             <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
             <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75"></div>
             <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150"></div>
          </div>
        )}

        {/* Reply Bubble (Gray) */}
        <div className={`self-start bg-[#E9E9EB] text-black p-1.5 px-3 rounded-2xl rounded-bl-sm max-w-[90%] text-[10px] leading-relaxed transition-all duration-500 transform ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Absolutely! We handle key holding...
        </div>

        {/* Input Area Fake */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1.5">
           <div className="bg-slate-100 rounded-full h-6 flex-grow border border-slate-200 px-2 flex items-center">
             <span className="text-slate-300 text-[8px]">iMessage</span>
           </div>
           <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center text-white">
             <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45 -translate-x-0.5"></div>
           </div>
        </div>
      </div>
    </div>
  );
};


/* --- MODAL COMPONENTS --- */

const QuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Construct email body
    const subject = `Quote Request - ${data.name}`;
    const body = `Name: ${data.name}%0D%0A` +
                 `Phone: ${data.phone}%0D%0A` +
                 `Email: ${data.email}%0D%0A` +
                 `Service Needed: ${data.service}%0D%0A%0D%0A` +
                 `Message:%0D%0A${data.message}`;
    
    window.open(`mailto:davidoffpm@gmail.com?subject=${subject}&body=${body}`, '_self');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded p-1"
          aria-label="Close quote modal"
        >
          <X size={24} />
        </button>

        <div className="bg-slate-900 p-6 text-white">
          <h2 id="quote-modal-title" className="text-2xl font-serif font-bold mb-1">Get a Quote</h2>
          <p className="text-slate-300 text-sm">Tell us about your property needs.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
            <input required id="name" name="name" type="text" placeholder="John Doe" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
              <input required id="phone" name="phone" type="tel" placeholder="+1 (555)..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
              <input required id="email" name="email" type="email" placeholder="you@email.com" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Service Needed</label>
            <select id="service" name="service" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white transition-all">
              <option value="Property Management">Property Management</option>
              <option value="Renovations">Renovations & Repairs</option>
              <option value="Brokerage">Brokerage (Buy/Rent)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Message</label>
            <textarea id="message" name="message" rows={3} placeholder="I have a 3-bedroom apartment in Rehavia..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"></textarea>
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2 focus:outline-none focus:ring-4 focus:ring-amber-500/50">
            Send Request <ArrowRight size={18} />
          </button>
          
          <p className="text-[10px] text-center text-slate-400 mt-2">
            This will open your email client to send the request.
          </p>
        </form>
      </div>
    </div>
  );
};

const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  const getTitle = () => {
    switch(type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'accessibility': return 'Accessibility Statement';
      default: return '';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
          <h2 id="modal-title" className="text-xl font-bold text-slate-900">
            {getTitle()}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto text-slate-700 text-sm leading-relaxed space-y-6">
          {type === 'privacy' && (
            <>
              <p className="italic text-slate-500">Effective Date: October 2023</p>
              
              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">1. Introduction</h3>
                <p>Davidoff Real Estate Solutions ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">2. Data We Collect</h3>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Identity Data:</strong> includes first name, last name, title.</li>
                  <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
                  <li><strong>Property Data:</strong> includes details about the property you wish for us to manage in Israel.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">3. How We Use Your Data</h3>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>To perform the contract we are about to enter into or have entered into with you (Property Management Agreement).</li>
                  <li>To facilitate communication regarding your property (e.g., updates on repairs, tenants).</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">4. Data Security</h3>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">5. Third-Party Sharing</h3>
                <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business (e.g., local Israeli maintenance contractors), or servicing you, so long as those parties agree to keep this information confidential.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">6. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <ul className="list-none mt-2">
                  <li><strong>Email:</strong> davidoffpm@gmail.com</li>
                  <li><strong>Phone:</strong> 054-321-0002</li>
                </ul>
              </section>
            </>
          )}

          {type === 'terms' && (
             <>
              <p className="italic text-slate-500">Last Updated: October 2023</p>
              
              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">1. Agreement to Terms</h3>
                <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Davidoff Real Estate Solutions ("we," "us" or "our"), concerning your access to and use of our services. By using our services, you agree to be bound by these Terms.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">2. Services Provided</h3>
                <p>Davidoff Real Estate Solutions provides residential property management, renovation oversight, and real estate brokerage services within Israel for overseas owners. Specific deliverables, fees, and timelines are outlined in your individual Management Agreement.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">3. Fees and Payments</h3>
                <p>Fees for our services are due as specified in your invoice or Management Agreement. Late payments may be subject to interest charges. All currency exchange risks are the responsibility of the client unless otherwise stated.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">4. Limitation of Liability</h3>
                <p>To the fullest extent permitted by applicable law, Davidoff Real Estate Solutions shall not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues. We act as agents for the property owner and are not liable for pre-existing defects in the property or force majeure events.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">5. Governing Law</h3>
                <p>These Terms shall be governed by and defined following the laws of the State of Israel. Davidoff Real Estate Solutions and yourself irrevocably consent that the courts of Israel shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
              </section>
            </>
          )}

          {type === 'accessibility' && (
            <>
              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">General Commitment</h3>
                <p>Davidoff Real Estate Solutions is committed to ensuring digital accessibility for people with disabilities. We adhere to the belief that every person has the right to live with dignity, equality, comfort, and independence. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">Compliance Status</h3>
                <p>This website has been designed to comply with the <strong>Equal Rights for Persons with Disabilities Law, 5758-1998</strong> and the <strong>Accessibility Regulations (Service Accessibility Adjustments), 5773-2013</strong>.</p>
                <p className="mt-2">The site strives to meet <strong>Israeli Standard 5568</strong> (based on WCAG 2.0) at Level AA, as well as the international <strong>WCAG 2.1 Level AA</strong> guidelines required by US ADA standards.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">Accessibility Features</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                   <li><strong>Screen Reader Compatibility:</strong> Our site is optimized for NVDA, JAWS, and VoiceOver.</li>
                   <li><strong>Keyboard Navigation:</strong> All interactive elements can be accessed via the Tab key.</li>
                   <li><strong>Visual Contrast:</strong> We maintain high contrast ratios between text and backgrounds for readability.</li>
                   <li><strong>Responsive Design:</strong> The interface fully adapts to various screen sizes and supports zoom up to 200% without loss of functionality.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 text-base mb-2">Feedback & Contact</h3>
                <p>We welcome your feedback on the accessibility of the Davidoff Real Estate Solutions website. Please let us know if you encounter accessibility barriers:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li><strong>Phone:</strong> 054-321-0002</li>
                  <li><strong>E-mail:</strong> davidoffpm@gmail.com</li>
                </ul>
                <p className="mt-2">We aim to respond to accessibility feedback within 2 business days.</p>
              </section>
            </>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end sticky bottom-0 z-10">
          <button 
            onClick={onClose} 
            className="bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-slate-800 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do you handle emergency repairs?",
      a: "We have a 24/7 emergency line. For urgent issues (leaks, electrical), our team is dispatched immediately. You receive real-time updates via WhatsApp."
    },
    {
      q: "Do you handle bill payments (Arnona, Vaad)?",
      a: "Yes. We take over all utility and municipal payments. We can set up standing orders or pay on your behalf and bill you monthly with a single transparent invoice."
    },
    {
      q: "Can you prepare my apartment for Chagim?",
      a: "Absolutely. Our 'Chagim Prep' service includes deep cleaning, boiler checks, stocking the fridge, and setting timers so your home is ready the moment you walk in."
    },
    {
      q: "What are your management fees?",
      a: "Our fees are tailored to the property size and required services. We offer a transparent monthly flat rate with no hidden percentages on repairs."
    }
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-expanded={openIndex === idx}
          >
            <span>{faq.q}</span>
            {openIndex === idx ? <Minus size={18} className="text-amber-500" /> : <Plus size={18} className="text-slate-400" />}
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [legalModal, setLegalModal] = useState(null); 
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const scrollContainerRef = useRef(null);

  // Updated Order: Home -> Services -> Gallery -> Who We Help -> FAQ -> Reviews -> Contact
  const sectionList = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Our Work' },
    { id: 'types', label: 'Who We Help' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'footer', label: 'Contact' }
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } 
    );

    sectionList.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleCall = () => window.open('tel:0543210002', '_self');
  const handleIMessage = () => window.open('sms:+972543210002?body=Hi, I have a property in Israel I need help with.', '_self');
  const handleEmail = () => window.open('mailto:davidoffpm@gmail.com', '_self');
  const handleWhatsApp = () => window.open('https://wa.me/972543210002', '_blank');

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    { text: "Our daughter is in seminary. Davidoff handles the internet, bills, and fixes things so she can focus.", author: "Rachel G.", location: "Brooklyn, NY" },
    { text: "I inherited a property in Beit Shemesh but live in Chicago. They handle tenants and maintenance perfectly.", author: "Mark S.", location: "Chicago, IL" },
    { text: "We have a holiday apartment. Arriving to a clean home with the boiler on is priceless.", author: "The Cohen Family", location: "Baltimore, MD" }
  ];

  return (
    <div 
      ref={scrollContainerRef}
      className="font-sans text-slate-900 bg-stone-50 w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overflow-x-hidden relative"
    >
      <SEO 
        title="Davidoff Real Estate Solutions | Your Eyes & Ears in Israel"
        description="Professional real estate solutions in Israel for overseas owners. We handle everything from tenant management, repairs, and renovations to bill payments (Arnona, Vaad Bayit) and Chagim preparation."
        keywords="property management Israel, real estate management Jerusalem, property management services Israel, tenant management Israel, property repairs Israel, holiday home management, aliyah property management"
      />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-amber-500 focus:p-4">Skip to main content</a>
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      {/* SIDE NAVIGATION DOTS */}
      <div className="fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:gap-4 pointer-events-none">
        {sectionList.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToId(id)} className="group flex items-center gap-3 flex-row-reverse pointer-events-auto" aria-label={`Scroll to ${label}`}>
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 border-2 shadow-sm ${activeSection === id ? 'bg-amber-500 border-amber-500 scale-125' : 'bg-white/50 border-slate-400/50'}`} />
            <span className={`hidden md:block text-[10px] font-bold uppercase tracking-wider transition-all duration-300 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm ${activeSection === id ? 'opacity-100 translate-x-0 text-slate-900' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-slate-500'}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* MINIMAL TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent py-4 transition-all duration-300 pointer-events-none">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm cursor-pointer border border-white/20 min-w-fit" onClick={() => scrollToId('home')}>
            <Logo size={16} />
            <div className="leading-none whitespace-nowrap">
              <h1 className="text-xs font-serif font-bold tracking-tight text-slate-900">DAVIDOFF REAL ESTATE</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 pointer-events-auto bg-white/90 backdrop-blur-md px-2 py-2 rounded-full shadow-sm border border-white/20">
             <button onClick={() => scrollToId('services')} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">Services</button>
             <button onClick={() => scrollToId('gallery')} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">Work</button>
             <button onClick={() => scrollToId('reviews')} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">Reviews</button>
             <div className="h-4 w-px bg-slate-200 mx-1"></div>
             <button onClick={handleCall} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900">
                <Phone size={14} /> Call
             </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        
        {/* SECTION 1: HERO */}
        <section id="home" className="h-screen w-full snap-start relative flex items-center justify-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" alt="Jerusalem real estate solutions - Modern apartment buildings in Israel managed by Davidoff Real Estate Solutions" className={`w-full h-full object-cover opacity-80 transition-transform duration-[20s] ease-in-out ${loaded ? 'scale-110' : 'scale-100'}`} referrerPolicy="no-referrer" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/90"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center h-full pt-12 pb-20">
             <div className={`max-w-3xl text-white transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block bg-amber-500 text-slate-900 text-[10px] md:text-xs font-bold px-3 py-1 mb-4 uppercase tracking-wider rounded-full shadow-lg border border-amber-400">
                Your Eyes & Ears in Israel
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-4 md:mb-6 drop-shadow-lg">
                Your Home,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Well Managed.</span>
              </h2>
              <p className="text-base md:text-xl text-slate-100 font-medium mb-8 leading-relaxed max-w-xl drop-shadow-md">
                We provide end-to-end stewardship for your Israeli asset. From navigating bureaucracy and financials to tenant vetting and renovations.
              </p>
              
              <div className="flex flex-col gap-6 max-w-md">
                {/* Primary CTA - Get a Quote - SIMPLIFIED */}
                <button 
                  onClick={() => setQuoteModalOpen(true)} 
                  className="group relative overflow-hidden bg-white text-slate-900 text-sm md:text-base py-3 px-6 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 flex items-center justify-center gap-3 w-auto self-start focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  <div className="bg-slate-100 p-2 rounded-full group-hover:bg-amber-100 transition-colors">
                    <Mail size={16} className="text-slate-900" />
                  </div>
                  <span>Get a Quote</span>
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer" onClick={() => scrollToId('services')}>
               <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Swipe Up</span>
               <ChevronDown size={24} className="text-white" />
            </div>
          </div>
        </section>

        {/* SECTION 2: SERVICES */}
        <section id="services" className="h-screen w-full snap-start flex flex-col justify-center bg-white relative">
          <div className="container mx-auto px-6 h-full flex flex-col justify-center pb-20 pt-16">
            <Reveal>
              <div className="text-center mb-6 md:mb-12">
                <h3 className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-2">Our Services</h3>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Practical Solutions.</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 overflow-y-auto max-h-[65vh] md:max-h-none p-1">
              <Reveal delay={0}>
                <div className="bg-stone-50 p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield size={24} className="text-slate-900" />
                    <h3 className="text-xl font-serif font-bold text-slate-900">Management</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Arnona, Vaad Bayit, utilities, and tenant calls—all managed.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full font-bold text-slate-600">Monthly Reports</span>
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full font-bold text-slate-600">24/7 Support</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="bg-amber-50 p-6 md:p-8 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">POPULAR</div>
                  <div className="flex items-center gap-3 mb-3">
                    <Hammer size={24} className="text-amber-600" />
                    <h3 className="text-xl font-serif font-bold text-slate-900">Repairs</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Painting, leaks, or renovations. Trusted workers at fair prices.</p>
                   <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] bg-white border border-amber-200 px-2 py-1 rounded-full font-bold text-amber-800">Quality Control</span>
                    <span className="text-[10px] bg-white border border-amber-200 px-2 py-1 rounded-full font-bold text-amber-800">Pre-Chagim</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-stone-50 p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm">
                   <div className="flex items-center gap-3 mb-3">
                    <Key size={24} className="text-slate-900" />
                    <h3 className="text-xl font-serif font-bold text-slate-900">Brokerage</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Finding tenants or buying a foothold in Israel? We guide you.</p>
                   <div className="flex gap-2 flex-wrap">
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full font-bold text-slate-600">Tenant Vetting</span>
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full font-bold text-slate-600">Market Data</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 3: RENOVATION GALLERY */}
        <section id="gallery" className="h-screen w-full snap-start flex flex-col justify-center bg-slate-900 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="container mx-auto px-6 h-full flex flex-col justify-center pb-20 pt-16 relative z-10">
              <Reveal>
                <div className="text-center mb-8">
                  <h3 className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-2">Our Work</h3>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Renovations & Interiors</h2>
                </div>
              </Reveal>
              
              <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory">
                 {[
                   { url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000", title: "Living Room Remodel", loc: "Rehavia" },
                   { url: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1000", title: "Modern Kitchen", loc: "Baka" }
                 ].map((img, idx) => (
                   <div key={idx} className="min-w-[80vw] md:min-w-[30vw] h-[50vh] snap-center rounded-xl overflow-hidden relative group border border-slate-700">
                     <img src={img.url} alt={`${img.title} renovation project in ${img.loc}, Israel - Real estate solutions and renovation services by Davidoff RES`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-6">
                       <h4 className="text-white font-bold text-lg">{img.title}</h4>
                       <p className="text-amber-400 text-xs uppercase tracking-wide flex items-center gap-1"><MapPin size={10} /> {img.loc}</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SECTION 4: WHO WE HELP */}
        <section id="types" className="h-screen w-full snap-start flex flex-col justify-center bg-stone-100 relative overflow-hidden">
           <div className="container mx-auto px-6 h-full flex flex-col justify-center pb-20 pt-16">
              <Reveal>
                <div className="text-center mb-6 md:mb-12">
                  <h3 className="text-amber-600 font-bold tracking-widest uppercase text-xs mb-2">Who We Help</h3>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Tailored Service</h2>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 overflow-y-auto max-h-[60vh] md:max-h-none md:overflow-visible p-1">
                 {[
                   { title: "Holiday Homes", desc: "Clean and stocked before you land." },
                   { title: "Aliyah Properties", desc: "Maintained perfectly until your move." },
                   { title: "Student Apts", desc: "Local support for children in yeshiva/seminary." },
                   { title: "Investments", desc: "Tenant & rent management for max returns." }
                 ].map((item, idx) => (
                   <Reveal key={idx} delay={idx * 100} className="h-full">
                     <div className="bg-white p-5 md:p-8 rounded-lg shadow-sm h-full border-l-4 border-amber-500 md:border-l-0 md:border-b-4 md:border-transparent md:hover:border-amber-500 transition-all flex flex-col justify-center">
                       <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                       <p className="text-sm text-slate-600 leading-snug">{item.desc}</p>
                     </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* SECTION 5: FAQ */}
        <section id="faq" className="h-screen w-full snap-start flex flex-col justify-center bg-white relative">
           <div className="container mx-auto px-6 h-full flex flex-col justify-center pb-20 pt-16">
              <Reveal>
                <div className="text-center mb-8">
                  <h3 className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-2">FAQ</h3>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Common Questions</h2>
                </div>
              </Reveal>
              
              <div className="overflow-y-auto max-h-[60vh] p-1">
                <FAQAccordion />
              </div>
           </div>
        </section>

        {/* SECTION 6: REVIEWS */}
        <section id="reviews" className="h-screen w-full snap-start flex flex-col justify-center bg-slate-50 relative">
          <div className="container mx-auto px-6 h-full flex flex-col justify-center pb-20 pt-16 relative z-10">
            <Reveal>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-serif font-bold mb-2 text-slate-900">Trusted Service</h2>
                <div className="flex items-center justify-center gap-1 text-amber-500">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
            </Reveal>
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-4 px-1">
              {testimonials.map((review, i) => (
                <div key={i} className="min-w-[85vw] md:min-w-0 snap-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="text-amber-500 mb-4 flex gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                  </div>
                  <blockquote className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 flex-grow italic">"{review.text}"</blockquote>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="font-bold text-slate-900 text-sm">{review.author}</p>
                    <p className="text-xs text-slate-500 uppercase flex items-center gap-1 mt-1"><MapPin size={10} /> {review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FOOTER/CONTACT WITH INTERACTIVE SIMULATIONS */}
        <section id="footer" className="min-h-[100dvh] md:h-screen w-full snap-start flex flex-col justify-center bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 h-full flex flex-col pb-6 pt-12 md:pb-20 md:pt-20">
            
            {/* Headline */}
            <div className="text-center mb-6 md:mb-8 flex-shrink-0">
               <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2 text-slate-900">Let's Connect</h2>
               <p className="text-slate-500 text-sm">Tap the screens below to start</p>
            </div>

            {/* Simulation Grid */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center justify-center max-w-4xl mx-auto w-full flex-grow">
               
               {/* Left: iMessage Simulator */}
               <div className="flex flex-col items-center w-full">
                 <IMessageSimulation active={activeSection === 'footer'} onClick={handleIMessage} />
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 md:mt-4">iMessage Direct</p>
               </div>

               {/* Right: WhatsApp Simulator */}
               <div className="flex flex-col items-center w-full">
                 <ChatSimulation active={activeSection === 'footer'} onClick={handleWhatsApp} />
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 md:mt-4">WhatsApp Support</p>
               </div>

            </div>

            {/* Small Footer Links & Socials */}
            <div className="text-center mt-4 md:mt-6 flex-shrink-0">
              
              {/* SOCIAL ICONS ROW */}
              <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="text-slate-400 hover:text-black transition-colors transform hover:scale-110">
                  <TikTokIcon size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-black transition-colors transform hover:scale-110">
                  <XIcon size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors transform hover:scale-110">
                  <Facebook size={20} />
                </a>
              </div>

              <div className="flex justify-center gap-4 text-xs text-slate-400 mb-2">
                <button onClick={() => setLegalModal('privacy')} className="underline">Privacy</button>
                <button onClick={() => setLegalModal('terms')} className="underline">Terms</button>
                <button onClick={() => setLegalModal('accessibility')} className="underline">Accessibility</button>
              </div>
               <p className="text-xs text-slate-400">© {new Date().getFullYear()} Davidoff Real Estate Solutions.</p>
            </div>
          </div>
        </section>

      </main>

      {/* MOBILE STICKY BOTTOM BAR (Disappears on Footer) */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200/50 p-2.5 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-[90] flex gap-3 transition-transform duration-500 ease-in-out ${activeSection === 'footer' ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      >
        <button 
          onClick={handleIMessage} 
          className="group flex-1 bg-gradient-to-br from-[#007AFF] to-[#005ec4] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/20 border border-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
            <MessageSquare size={14} className="text-white" /> 
          </div>
          <span className="tracking-wide text-xs">iMessage</span>
        </button>
        
        <button 
          onClick={handleWhatsApp} 
          className="group flex-1 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 shadow-md shadow-green-500/30 border-t border-white/20 focus:outline-none focus:ring-4 focus:ring-green-500/50"
        >
          <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
            <MessageCircle size={14} className="text-white" /> 
          </div>
          <span className="tracking-wide text-xs">WhatsApp</span>
        </button>
      </div>

    </div>
  );
};

export default App;

