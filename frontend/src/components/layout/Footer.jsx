import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer({ missionInfo }) {
  const phone = missionInfo?.phone || '+1 613-236-0871';
  const generalEmail = missionInfo?.generalEmail || 'ghanacom@ghc-ca.com';
  const consularEmail = missionInfo?.consularEmail || 'ottawaconsular@ghanahighcommission.ca';
  const address = missionInfo?.address || '1 Clemow Avenue, Ottawa, Ontario K1S 2A9, Canada';
  const officeHours = missionInfo?.officeHours || 'Monday - Thursday: 9:00 am - 04:00 pm. Visits to the Consular Section are by online appointment only.';
  const website = missionInfo?.website || 'www.ghanahighcommission.ca';

  return (
    <footer className="bg-[#051A53] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="mb-12">
          <img
            src="https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/0d720b5a0_MFALogo6.png"
            alt="Ministry of Foreign Affairs - Republic of Ghana"
            className="h-20 w-auto"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wide">Contact</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Phone: {phone}</p>
              <p>General Email: {generalEmail}</p>
              <p>Consular Email: {consularEmail}</p>
              <p>Website: {website}</p>
              <p className="text-xs mt-3">Address: {address}</p>
              <p className="text-xs">Office Hours: {officeHours}</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wide">Services</h3>
            <nav className="space-y-2.5 text-sm text-white/70">
              <Link to="/services/passport-application" className="block hover:text-white transition-colors">Passport</Link>
              <Link to="/services/consular-services" className="block hover:text-white transition-colors">Consular Services</Link>
              <Link to="/services/protocol-services" className="block hover:text-white transition-colors">Protocol</Link>
              <Link to="/events" className="block hover:text-white transition-colors">Events</Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wide">Quick Links</h3>
            <nav className="space-y-2.5 text-sm text-white/70">
              <Link to="/about" className="block hover:text-white transition-colors">About the Ministry</Link>
              <Link to="/leadership" className="block hover:text-white transition-colors">Leadership</Link>
              <Link to="/history" className="block hover:text-white transition-colors">History</Link>
              <Link to="/about/more-about-us/ghana-missions-abroad" className="block hover:text-white transition-colors">Missions</Link>
            </nav>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wide">Useful Links</h3>
            <nav className="space-y-2.5 text-sm text-white/70">
              <a href="#" className="block hover:text-white transition-colors">Ghana Fine Gallery</a>
              <a href="#" className="block hover:text-white transition-colors">Visit Ghana</a>
              <a href="#" className="block hover:text-white transition-colors">SIGA</a>
              <Link to="/scholarships" className="block hover:text-white transition-colors">Scholarships</Link>
              <Link to="/vacancies" className="block hover:text-white transition-colors">Vacancies</Link>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-wide">Connect</h3>
            <div className="space-y-2.5 text-sm text-white/70 mb-6">
              <a href="#" className="block hover:text-white transition-colors">Facebook</a>
              <a href="#" className="block hover:text-white transition-colors">Instagram</a>
              <a href="#" className="block hover:text-white transition-colors">Twitter</a>
              <a href="#" className="block hover:text-white transition-colors">LinkedIn</a>
            </div>
            <button className="bg-yellow-400 text-[#051A53] px-6 py-2 text-xs font-bold hover:bg-yellow-300 transition-colors">
              View on Map
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50 text-xs text-center">
            &copy; {new Date().getFullYear()} HIGH COMMISSION OF GHANA IN CANADA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
