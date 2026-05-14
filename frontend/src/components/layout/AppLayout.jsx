import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationBanner from './NotificationBanner';
import SitePopupDisplay from '../SitePopupDisplay';

export default function AppLayout() {
  const [hideTopHeader, setHideTopHeader] = useState(false);
  const missionInfo = {
    shortHeaderName: 'Ghana High Commission, Canada',
    missionName: 'High Commission of Ghana in Canada',
    missionNameWithCity: 'High Commission of Ghana in Ottawa, Canada',
    address: '1 Clemow Avenue, Ottawa, Ontario K1S 2A9, Canada',
    phone: '+1 613-236-0871',
    consularEmail: 'ottawaconsular@ghanahighcommission.ca',
    generalEmail: 'ghanacom@ghc-ca.com',
    website: 'www.ghanahighcommission.ca',
    officeHours: 'Monday - Thursday: 9:00 am - 04:00 pm. Visits to the Consular Section are by online appointment only.',
  };

  useEffect(() => {
    const handleScroll = () => setHideTopHeader(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [bannerVisible, setBannerVisible] = useState(true);
  const bannerHeight = bannerVisible ? 48 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <SitePopupDisplay />
      <NotificationBanner
        message="Ghanaians in the Middle East:"
        linkText="View More"
        linkHref="#"
        color="red"
        onDismiss={() => setBannerVisible(false)}
      />
      <Navbar bannerHeight={bannerHeight} missionInfo={missionInfo} />
      <main
        id="main-content"
        className="flex-1"
        style={{ paddingTop: hideTopHeader ? '5rem' : `calc(${bannerHeight}px + 3rem + 5rem)` }}
      >
        <Outlet />
      </main>
      <Footer missionInfo={missionInfo} />
    </div>
  );
}
