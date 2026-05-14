import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Facebook, Twitter, Instagram, Youtube, Search } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  {
    name: 'About Us', path: '/about',
    subItems: [
      { name: 'Executive Summary', path: '/about/executive-summary' },
      { name: 'History', path: '/about/organisation/history' },
      { name: 'Bureaux & Units', path: '/about/organisation/bureaux-units' },
      { name: 'Current Minister', path: '/about/leadership/current-minister' },
      { name: 'Deputy Minister', path: '/about/leadership/deputy-minister' },
      { name: 'Chief Director', path: '/about/leadership/chief-director' },
      { name: 'Former Ministers', path: '/about/leadership/former-ministers' },
      { name: 'Ghana Missions Abroad', path: '/about/more-about-us/ghana-missions-abroad' },
    ]
  },
  {
    name: 'Services', path: '/services',
    subItems: [
      { name: 'Passport Application', path: '/services/passport-application' },
      { name: 'Protocol Services', path: '/services/protocol-services' },
      { name: 'Consular Services', path: '/services/consular-services' },
      { name: 'Right to Information', path: '/services/right-to-information' },
    ]
  },
  {
    name: 'Foreign Policy', path: '/foreign-policy',
    subItems: [
      { name: 'Objectives', path: '/foreign-policy/objectives' },
      { name: 'Guidelines', path: '/foreign-policy/guidelines' },
    ]
  },
  {
    name: 'Ghana', path: '/ghana',
    subItems: [
      { name: 'Country Profile', path: '/ghana/country-profile' },
      { name: 'Tourism, Arts & Culture', path: '/ghana/tourism-arts-culture' },
    ]
  },
  {
    name: 'News & Media', path: '/news',
    subItems: [
      { name: 'News', path: '/news' },
      { name: 'Press Releases', path: '/press-releases' },
      { name: 'Press Room', path: '/press-room' },
      { name: 'Public Announcements', path: '/public-announcements' },
      { name: 'Publications', path: '/publications' },
      { name: 'Events', path: '/events' },
    ]
  },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Vacancies', path: '/vacancies' },
];

export default function Navbar({ bannerHeight = 0, missionInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideTopHeader, setHideTopHeader] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setHideTopHeader(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Header Bar */}
      <div
        className={`fixed left-0 right-0 z-40 bg-[#051A53] text-white text-sm transition-all duration-300`}
        style={{ height: '3rem', top: hideTopHeader ? '-3rem' : `${bannerHeight}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href={`tel:${(missionInfo?.phone || '+1 613-236-0871').replace(/\s+/g, '')}`}
              className="hover:text-gray-200 transition-colors text-xs"
            >
              {missionInfo?.phone || '+1 613-236-0871'}
            </a>
            <span className="hidden md:inline text-gray-400">|</span>
            <a
              href={`mailto:${missionInfo?.generalEmail || 'ghanacom@ghc-ca.com'}`}
              className="hidden md:inline hover:text-gray-200 transition-colors text-xs"
            >
              {missionInfo?.generalEmail || 'ghanacom@ghc-ca.com'}
            </a>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Facebook"><Facebook size={14} /></a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Twitter"><Twitter size={14} /></a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Youtube"><Youtube size={14} /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}
        style={{ top: hideTopHeader ? '0' : `${bannerHeight + 48}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/0d720b5a0_MFALogo6.png"
                alt="Ministry of Foreign Affairs - Republic of Ghana"
                className="h-24 w-auto object-contain"
              />
              <div className="hidden xl:block">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Republic of Ghana</p>
                <p className="text-sm font-semibold text-[#051A53]">{missionInfo?.shortHeaderName || 'Ghana High Commission, Canada'}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hasSubItems && setOpenDropdown(item.name)}
                    onMouseLeave={() => hasSubItems && setOpenDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center gap-0.5 text-sm font-medium text-gray-700 hover:text-[#051A53] transition-colors pb-1"
                    >
                      {item.name}
                      {hasSubItems && <ChevronDown size={13} />}
                    </Link>

                    {hasSubItems && openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-0 pt-2 w-56 z-50">
                        <div className="bg-white shadow-lg border border-gray-200 py-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#051A53] transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                className="text-gray-700 hover:text-[#051A53] transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </nav>



            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-gray-700 hover:text-[#051A53]"
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-sm text-gray-500 hover:text-[#051A53]"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </nav>
          </div>
        )}
      </header>
    </>
  );
}
