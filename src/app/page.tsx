"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Truck,
  Users,
  Heart,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Food Share Logo"
              className="w-10 h-10"
            />
            <div className="text-2xl font-bold text-green-600">Food Share</div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#about"
              className="text-black hover:text-green-600 transition-colors"
            >
              About
            </a>
            <a
              href="#what-we-do"
              className="text-black hover:text-green-600 transition-colors"
            >
              What We Do
            </a>
            <a
              href="#get-involved"
              className="text-black hover:text-green-600 transition-colors"
            >
              Get Involved
            </a>
            <a
              href="#contact"
              className="text-black hover:text-green-600 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex space-x-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Donate
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              Partner Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/herosection.mp4"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Rescuing Food,
            <br />
            <span className="gradient-text">Feeding Communities</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl drop-shadow">
            Food Share rescues and distributes more than{" "}
            <strong>2,000,000 lbs. of food</strong> every week in partnership
            with grocers, wholesalers, and farmers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
              Support Our Mission
              <ArrowRight className="ml-2" />
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
              Donate Surplus Food
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Mission Section
const MissionSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We bridge the gap between food waste and food scarcity
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            In the United States, nearly <strong>40% of food</strong> goes to
            waste while 47 million Americans go hungry.
            <strong> We believe food should be shared– not wasted.</strong>
          </p>
          <p className="text-lg text-gray-600 mb-8">
            With innovative technology and a nationwide network,{" "}
            <strong>Food Share</strong> rescues edible surplus from food
            businesses and redistributes it to local hunger relief
            organizations.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            Help us close the gap
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const services = [
    {
      title: "Retail Rescue",
      description:
        "Designed for grocery stores, restaurants, cafés, and catering halls — any place with daily excess. Our drivers use refrigerated vans and box trucks, guided by our app, to pick up and deliver fresh food to local partners.",
      icon: Truck,
      color: "bg-blue-500",
    },
    {
      title: "Wholesale Rescue",
      description:
        "We work on-site at major produce markets to glean, pack, and distribute large volumes of surplus food. Perfect for wholesalers who want to do good with what they can't sell — and avoid costly disposal fees.",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Direct Link",
      description:
        "For high-volume surplus from farms, manufacturers, and distribution centers, we activate our network of third-party transportation partners to deliver food across the country. It's bulk-scale food rescue, with zero friction.",
      icon: Heart,
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="what-we-do" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We make it easy to donate fresh food
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Food Share provides solutions for food business of any scale -
              helping capture surplus and redirect it to community hunger relief
              organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg card-hover"
              >
                <div
                  className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative`}
                >
                  <service.icon
                    className={`w-8 h-8 text-white ${
                      service.title === "Retail Rescue" ? "truck-move" : ""
                    } ${service.title === "Direct Link" ? "heart-beat" : ""}`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Impact Section
const ImpactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Over 2,000 distribution locations across 36 states
            </h2>
          </div>

          <div className="bg-green-50 p-12 rounded-2xl mb-12">
            <div className="stat-number mb-4">1,974,434</div>
            <p className="text-xl text-gray-600 mb-2">
              pounds of food distributed so far
            </p>
            <p className="text-sm text-gray-500">
              (live data from app.foodshare.com)
            </p>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Since 2018, Food Share has distributed enough surplus to food to
            feed over <strong>10 million people</strong> across the country.
            Thanks to our Food Rescue App, we know exactly where every pound of
            food came from - and where it went. Because food shouldn't go to
            waste. And impact shouldn't be a mystery.
          </p>

          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
            Learn About our Impact
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Support Section
const SupportSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            733 million people globally lack consistent access to fresh and
            healthy food.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our work to end hunger and food waste needs your support. You can
            help us deliver food directly to communities in need — creating
            access to nutrition, stability, and food security for millions of
            people.
          </p>

          <div className="bg-green-600 p-12 rounded-2xl mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Giving $1 can provide 10 meals.
            </h3>
            <p className="text-lg mb-6">
              All the food we rescue is donated — we just need to move it. That
              means your donation isn't spent on buying food or overhead. It
              goes directly towards transportation and logistics to feed people
              in need. We keep our costs low so every dollar makes a big impact.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want to get in touch?
            </h2>
            <p className="text-xl text-gray-600">
              Reach out to partner, donate, collaborate, or just learn more!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Connect with us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">info@foodshare.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Philadelphia, PA</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Food Share
            </h3>
            <p className="text-gray-400">
              Rescuing food, feeding communities. Join us in the fight against
              food waste and hunger.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  className="hover:text-white transition-colors"
                >
                  What We Do
                </a>
              </li>
              <li>
                <a
                  href="#get-involved"
                  className="hover:text-white transition-colors"
                >
                  Get Involved
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            Sharing Excess is a registered 501(c)(3) nonprofit organization.
            Donations are tax-deductible. Nonprofit Tax ID/EIN: 86-2161466.
            "Sharing Excess" is a registered trademark, all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <ImpactSection />
      <SupportSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
