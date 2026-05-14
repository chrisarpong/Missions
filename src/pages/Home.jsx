import React from 'react';
import HeroSection from '../components/home/HeroSection';
import DirectorProfile from '../components/home/DirectorProfile';
import MissionsAbroad from '../components/home/MissionsAbroad.jsx';
import LatestNews from '../components/home/LatestNews';
import UpcomingEventsHome from '../components/home/UpcomingEventsHome';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <DirectorProfile />
      <LatestNews />
      <MissionsAbroad />
      <UpcomingEventsHome />
    </div>
  );
}