import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Leadership from './pages/Leadership';
import History from './pages/History';
import BureauxUnits from './pages/BureauxUnits';
import CRMLayout from './pages/crm/CRMLayout';
import CRMDashboard from './pages/crm/CRMDashboard';
import CRMNews from './pages/crm/CRMNews';
import CRMPopups from './pages/crm/CRMPopups';
import CRMHeroSlides from './pages/crm/CRMHeroSlides';
import CRMEvents from './pages/crm/CRMEvents';
import PressRoom from './pages/PressRoom';
import News from './pages/News';
import NewsArticleDetail from './pages/NewsArticleDetail';
import SitePopupDisplay from './components/SitePopupDisplay';
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

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
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
        {/* Legacy paths */}
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/history" element={<History />} />
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
        <Route path="/events" element={<ComingSoon />} />
        <Route path="/events/:slug" element={<ComingSoon />} />
        {/* Other */}
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/vacancies" element={<Vacancies />} />
      </Route>
      <Route path="/crm/*" element={<CRMLayout />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App