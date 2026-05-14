import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import History from './pages/History';
import BureauxUnits from './pages/BureauxUnits';
import PressRoom from './pages/PressRoom';
import News from './pages/News';
import NewsArticleDetail from './pages/NewsArticleDetail';
import ComingSoon from './pages/ComingSoon';
import PassportApplication from './pages/PassportApplication';
import MissionsAbroad from './pages/MissionsAbroad';
import ForeignPolicyGuidelines from './pages/ForeignPolicyGuidelines';
import ForeignPolicyObjectives from './pages/ForeignPolicyObjectives';
import CountryProfile from './pages/CountryProfile';
import RightToInformation from './pages/RightToInformation';
import ConsularServices from './pages/ConsularServices';
import ProtocolServices from './pages/ProtocolServices';
import Scholarships from './pages/Scholarships';
import Vacancies from './pages/Vacancies';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            {/* About Us */}
            <Route path="/about" element={<About />} />
            <Route path="/about/executive-summary" element={<About />} />
            <Route path="/about/organisation/history" element={<History />} />
            <Route path="/about/organisation/bureaux-units" element={<BureauxUnits />} />
            <Route path="/about/leadership/current-minister" element={<Leadership />} />
            <Route path="/about/leadership/deputy-minister" element={<Leadership />} />
            <Route path="/about/leadership/chief-director" element={<Leadership />} />
            <Route path="/about/leadership/former-ministers" element={<Leadership />} />
            <Route path="/about/more-about-us/ghana-missions-abroad" element={<MissionsAbroad />} />
            
            {/* Services */}
            <Route path="/services" element={<ConsularServices />} />
            <Route path="/services/passport-application" element={<PassportApplication />} />
            <Route path="/services/protocol-services" element={<ProtocolServices />} />
            <Route path="/services/consular-services" element={<ConsularServices />} />
            <Route path="/services/right-to-information" element={<RightToInformation />} />
            
            {/* Foreign Policy */}
            <Route path="/foreign-policy" element={<ForeignPolicyGuidelines />} />
            <Route path="/foreign-policy/objectives" element={<ForeignPolicyObjectives />} />
            <Route path="/foreign-policy/guidelines" element={<ForeignPolicyGuidelines />} />
            
            {/* Ghana */}
            <Route path="/ghana" element={<CountryProfile />} />
            <Route path="/ghana/country-profile" element={<CountryProfile />} />
            <Route path="/ghana/tourism-arts-culture" element={<ComingSoon />} />
            
            {/* News & Media */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticleDetail />} />
            <Route path="/press-releases" element={<PressRoom />} />
            <Route path="/press-room" element={<PressRoom />} />
            <Route path="/public-announcements" element={<PressRoom />} />
            <Route path="/publications" element={<ComingSoon />} />
            
            {/* Other */}
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/vacancies" element={<Vacancies />} />
          </Route>
          
          {/* CRM Routes Commented Out for Migration */}
          {/* <Route path="/crm/*" element={<CRMLayout />} /> */}
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App