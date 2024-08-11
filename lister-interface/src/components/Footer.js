import React from 'react';
import { Facebook, Twitter, Youtube, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-navy-blue py-8 border-t border-orange">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Vacant</h2>
          <a href="/help" className="text-orange hover:underline">Visit Help Center</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-orange">About us</a></li>
              <li><a href="/services" className="hover:text-orange">Our services</a></li>
              <li><a href="/news" className="hover:text-orange">Newsroom</a></li>
              <li><a href="/careers" className="hover:text-orange">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Products</h3>
            <ul className="space-y-2">
              <li><a href="/add-property" className="hover:text-orange">Add Property</a></li>
              <li><a href="/view-properties" className="hover:text-orange">View Properties</a></li>
              <li><a href="/manage" className="hover:text-orange">Property Management</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Global Management</h3>
            <ul className="space-y-2">
              <li><a href="/sustainability" className="hover:text-orange">Sustainability</a></li>
              <li><a href="/safety" className="hover:text-orange">Safety</a></li>
            </ul>
          </div>
        
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-navy-blue hover:text-orange"><Facebook size={24} /></a>
          <a href="#" className="text-navy-blue hover:text-orange"><Twitter size={24} /></a>
          <a href="#" className="text-navy-blue hover:text-orange"><Youtube size={24} /></a>
          <a href="#" className="text-navy-blue hover:text-orange"><Linkedin size={24} /></a>
          <a href="#" className="text-navy-blue hover:text-orange"><Instagram size={24} /></a>
        </div>

       
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:opacity-80">
            <img src="/api/placeholder/135/40" alt="Google Play" className="h-10" />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src="/api/placeholder/120/40" alt="App Store" className="h-10" />
          </a>
        </div>

        <div className="text-center text-sm">
          <p>&copy; {currentYear} Vacant Property Manager, Inc.</p>
          <div className="mt-2">
            <a href="/privacy" className="hover:underline mr-4">Privacy</a>
            <a href="/accessibility" className="hover:underline mr-4">Accessibility</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;