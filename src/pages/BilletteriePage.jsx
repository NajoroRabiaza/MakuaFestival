import React, { useState, useEffect } from 'react';
import { Check, MapPin, Banknote } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import orangeMoneyLogo from '../assets/payment-logos/orange-money.png';
import mvolaLogo from '../assets/payment-logos/mvola.png';
import airtelMoneyLogo from '../assets/payment-logos/airtel-money.png';

const passes = [
  {
    id: 1,
    name: "FAN ZONE",
    price: "50,000",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    features: [
      "Accès général au festival",
      "Accès aux 2 scènes principales",
      "Village artisanal",
      "Zone restauration",
      "Animations de rue"
    ]
  },
  {
    id: 2,
    name: "SILVER",
    price: "120,000",
    color: "from-gray-400 to-gray-600",
    glowColor: "rgba(156, 163, 175, 0.5)",
    popular: true,
    features: [
      "Tous les avantages Fan Zone",
      "Accès zone Silver VIP",
      "Vue privilégiée sur scène",
      "Bar privé",
      "Toilettes VIP",
      "Fast track entrée"
    ]
  },
  {
    id: 3,
    name: "VIP",
    price: "250,000",
    color: "from-orange-500 to-red-600",
    glowColor: "rgba(255, 100, 50, 0.5)",
    features: [
      "Tous les avantages Silver",
      "Accès lounge VIP climatisé",
      "Open bar premium",
      "Restauration gastronomique",
      "Parking réservé",
      "Meet & Greet avec artistes",
      "Goodie bag exclusif"
    ]
  }
];

const paymentMethods = [
  {
    name: "Orange Money",
    logo: orangeMoneyLogo
  },
  {
    name: "MVola",
    logo: mvolaLogo,
  },
  {
    name: "Airtel Money",
    logo: airtelMoneyLogo,
  },
  {
    name: "Espèces",
    icon: Banknote,
    bgColor: "bg-green-50"
  }
];

const salesPoints = [
  {
    name: "Hôtel Neptune & SPA",
    address: "Boulevard Ratsimilaho, Toamasina 501",
    hours: "9h - 18h (Lun-Sam)"
  },
  {
    name: "Centre Commercial Toamasina",
    address: "Avenue de l'Indépendance",
    hours: "10h - 20h (Tous les jours)"
  },
  {
    name: "Makua Entertainment Office",
    address: "Quartier Tanambao V, Toamasina",
    hours: "8h - 17h (Lun-Ven)"
  }
];

const BilletteriePage = () => {
  const [hoveredPass, setHoveredPass] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Header */}
      <Header />

      {/* Sales Points Section - EN PREMIER */}
      <section className="relative bg-black py-2 px-6" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Points de Vente
          </h2>
          <p className="text-lg text-white/60 mb-12 text-center">
            Achetez vos billets directement à Toamasina
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salesPoints.map((point, index) => (
              <div
                key={index}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 80, 40, 0.3), rgba(255, 140, 50, 0.2))',
                    filter: 'blur(8px)',
                  }}
                />
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-white">{point.name}</h3>
                  </div>
                  <p className="text-white/70 mb-3">{point.address}</p>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {point.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center" data-aos="fade-up">
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Choisissez votre pass et vivez une expérience inoubliable au MAKUA Festival 2026. 
            Trois formules adaptées à tous les budgets pour profiter du meilleur de la musique malgache.
          </p>
        </div>
      </div>

      {/* Passes Section - EN DEUXIÈME */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black pb-5 px-6" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-white/60 mb-16 text-center">
            3 jours de festival, des souvenirs pour la vie
          </p>

          {/* Pass Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {passes.map((pass, index) => (
              <div
                key={pass.id}
                className="relative"
                onMouseEnter={() => setHoveredPass(pass.id)}
                onMouseLeave={() => setHoveredPass(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Popular Badge */}
                {pass.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white text-sm font-bold uppercase tracking-wide shadow-lg">
                      Plus Populaire
                    </div>
                  </div>
                )}

                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-2 rounded-3xl transition-all duration-700 ${
                    hoveredPass === pass.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${pass.glowColor}, rgba(255, 140, 50, 0.3), ${pass.glowColor})`,
                    filter: 'blur(12px)',
                  }}
                />

                {/* Card */}
                <div className={`relative bg-gradient-to-br from-gray-900 to-black border-2 ${
                  pass.popular ? 'border-orange-500/50' : 'border-white/10'
                } rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${
                  pass.popular ? 'md:scale-105' : ''
                }`}>
                  {/* Pass Name with Gradient */}
                  <div className={`inline-block bg-gradient-to-r ${pass.color} text-transparent bg-clip-text mb-4`}>
                    <h3 className="text-3xl font-bold uppercase tracking-wide">
                      {pass.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold text-white">{pass.price}</span>
                      <span className="text-2xl text-white/60 mb-1">Ar</span>
                    </div>
                    <p className="text-white/50 text-sm mt-2">Pass 3 jours</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {pass.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${pass.color} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Buy Button */}
                  <button className={`w-full py-4 rounded-full bg-gradient-to-r ${pass.color} text-white font-bold text-lg uppercase tracking-wide hover:scale-105 transition-transform shadow-2xl`}>
                    Acheter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section - EN DERNIER */}
      <section className="relative bg-black py-2 px-6" data-aos="fade-up">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Modes de Paiement
          </h2>
          <p className="text-lg text-white/60 mb-12 text-center">
            Payez en toute sécurité avec votre méthode préférée
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 80, 40, 0.3), rgba(255, 140, 50, 0.2))',
                    filter: 'blur(8px)',
                  }}
                />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                  {/* Logo ou Icône */}
                  {method.logo ? (
                    <div className={`w-full h-32 ${method.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 p-2`}>
                      <img 
                        src={method.logo} 
                        alt={method.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-10 h-30 text-white" />
                    </div>
                  )}
                  <h3 className="text-white font-semibold">{method.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-center" data-aos="fade-up">
            <p className="text-white/90 text-lg">
              💳 <strong>Paiement en ligne</strong> disponible bientôt ! Inscrivez-vous à notre newsletter pour être informé.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BilletteriePage;