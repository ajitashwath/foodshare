import React, { useState } from 'react';
import { Heart, Users, HandHeart, ArrowRight, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface NGO {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  focus: string[];
}

const FoodSharePartnership: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const ngos: NGO[] = [
    {
      id: 'heeals',
      name: 'HEEALS NGO',
      description: 'Health, Education, Environment And Livelihood Society - A grassroots registered non-profit transforming lives through innovative initiatives in public health, education, WASH, menstrual hygiene, mental health, and environmental sustainability.',
      website: 'http://heeals.org/',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      contact: {
        email: 'communications@heeals.org',
        phone: '+91-7982316660',
        address: '#692, Sector 22-B, Gurgaon-122015, Haryana (India)'
      },
      focus: ['Public Health', 'Education & Livelihood', 'WASH', 'Menstrual Hygiene', 'Mental Health', 'Environmental Sustainability']
    },
    {
      id: 'punjabi-samvad',
      name: 'Punjabi Samvad NGO',
      description: 'A social organization operating since 2004, dedicated to women empowerment, child welfare, cultural preservation, and social awareness. Based in Amritsar, Punjab, working towards community growth and development.',
      website: 'https://www.google.com/search?client=ms-android-samsung-rvo1&sca_esv=ee54a96be2d12d25&hl=en-IN&cs=0&sxsrf=AE3TifM7oLreio-UJpGoWu0OIuyYeJUNAA%3A1752236783803&kgmid=%2Fg%2F11r4x9lw6f&q=Punjabi%20Samvad%20NGO&shndl=30&shem=lccpse&source=sh%2Fx%2Floc%2Fact%2Fm1%2F4&kgs=446c5cf37e926421',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      contact: {
        email: 'info@punjabisamvad.org',
        phone: '+91-XXX-XXX-XXXX',
        address: 'Amritsar, Punjab'
      },
      focus: ['Women Empowerment', 'Child Welfare', 'Cultural Preservation', 'Social Awareness', 'Education', 'Vocational Skills']
    }
  ];

  const PartnershipCard: React.FC<{ ngo: NGO }> = ({ ngo }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img 
          src={ngo.logo} 
          alt={`${ngo.name} Logo`} 
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{ngo.name}</h3>
          <a 
            href={ngo.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Globe className="w-4 h-4 mr-1" />
            Visit Website
          </a>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{ngo.description}</p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Focus Areas:</h4>
        <div className="flex flex-wrap gap-2">
          {ngo.focus.map((area, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        {ngo.contact.email && (
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm">{ngo.contact.email}</span>
          </div>
        )}
        {ngo.contact.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">{ngo.contact.phone}</span>
          </div>
        )}
        {ngo.contact.address && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{ngo.contact.address}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FoodShare AI</h1>
                <p className="text-gray-600 text-sm">Connecting surplus food with those in need</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">🇮🇳 India</span>
              <select className="bg-transparent border border-gray-300 rounded px-3 py-1 text-sm">
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Building Partnerships for Food Security
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Together with our NGO partners, we're creating a sustainable network to combat food waste and hunger across India.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Partnership Overview
              </button>
              <button 
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'partners' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Our Partners
              </button>
            </div>
          </div>
        </section>

        {/* Food Safety Guidelines */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Food Safety Guidelines</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Food must be within expiry date',
              'Prepared food should be donated within 2 hours',
              'Keep food at proper temperature',
              'Package food securely',
              'Label with preparation time if applicable'
            ].map((guideline, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{guideline}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <section className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Network</h3>
                <p className="text-gray-600">Building a strong network of NGOs and volunteers to maximize food distribution reach.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Safe Distribution</h3>
                <p className="text-gray-600">Ensuring food safety standards are maintained throughout the donation and distribution process.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Impact Tracking</h3>
                <p className="text-gray-600">Monitoring and measuring the social impact of our food redistribution efforts.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">How Our Partnership Works</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Food Collection</h4>
                    <p className="text-gray-600">Partner NGOs identify surplus food from restaurants, events, and households through our AI platform.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Quality Assessment</h4>
                    <p className="text-gray-600">Our partners ensure all donated food meets safety standards before distribution.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Distribution</h4>
                    <p className="text-gray-600">Food reaches those in need through established community networks and distribution centers.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'partners' && (
          <section>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Partner NGOs</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're proud to work with these dedicated organizations who share our vision of eliminating food waste and hunger.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {ngos.map((ngo) => (
                <PartnershipCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-lg mb-6">
            Together, we can create a world where no food goes to waste and no one goes hungry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Become a Partner
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">FoodShare AI</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">© 2025 FoodShare AI. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodSharePartnership;