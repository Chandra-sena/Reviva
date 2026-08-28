import { useState, useEffect } from 'react';
import { useRouter } from './useRouter';
import { Header } from './components/Header';
import { IntroVideoPlaceholder } from './components/IntroVideoPlaceholder';
import { PropertySearchBar } from './components/PropertySearchBar';
import { PassionAtWork } from './components/PassionAtWork';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { LocationsSection } from './components/LocationsSection';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { MoreAboutSection } from './components/MoreAboutSection';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';

// Dedicated Sub-Pages
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { WhatWeDoPage } from './pages/WhatWeDoPage';
import { CommercialPage } from './pages/CommercialPage';
import { ContractingPage } from './pages/ContractingPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { CareersPage } from './pages/CareersPage';
import { MediaCentrePage } from './pages/MediaCentrePage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { InvestorRelationsPage } from './pages/InvestorRelationsPage';
import { SobhaPrivilegePage } from './pages/SobhaPrivilegePage';
import { HomebuyersCornerPage } from './pages/HomebuyersCornerPage';
import { BlogListPage, BlogDetailPage } from './pages/BlogPages';
import { EmiCalculatorPage } from './pages/EmiCalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

import type { Property, CityInfo, BlogPost } from './types';
import { INITIAL_CITY_INFO, INITIAL_PROPERTIES, INITIAL_BLOGS } from './data/initialData';

export function App() {
  const { route, navigate } = useRouter();

  // Data States
  const [cityInfo, setCityInfo] = useState<CityInfo>(INITIAL_CITY_INFO);
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [blogs] = useState<BlogPost[]>(INITIAL_BLOGS);

  // Modal States
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Synchronize city parameter & scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if (route.params.cityId) {
      const formattedCity = route.params.cityId.charAt(0).toUpperCase() + route.params.cityId.slice(1);
      if (formattedCity !== cityInfo.cityName) {
        setCityInfo(prev => ({
          ...prev,
          cityName: formattedCity,
          heroTitle: `Flats for Sale in ${formattedCity} | Reviva Projects`,
        }));
      }
    }
  }, [route.path, route.params.cityId]);

  const handleBookVisit = (property: Property) => {
    setEnquiryProperty(property);
    setIsEnquiryOpen(true);
  };

  // Route Renderer
  const renderCurrentPage = () => {
    const path = route.path;

    // Single Project Detail Page (/project/:id or /properties/:id)
    if ((path.startsWith('/project') || path.startsWith('/properties')) && route.params.projectId) {
      return (
        <PropertyDetailPage
          propertyId={route.params.projectId}
          properties={properties}
          cityInfo={cityInfo}
          onNavigate={navigate}
          onBookVisit={handleBookVisit}
        />
      );
    }

    // Properties & City Catalog (/properties, /residential, /city/:id)
    if (path.startsWith('/properties') || path.startsWith('/residential') || path.startsWith('/city')) {
      return (
        <PropertiesPage
          properties={properties}
          cityInfo={cityInfo}
          onNavigate={navigate}
          onBookVisit={handleBookVisit}
        />
      );
    }

    if (path.startsWith('/philosophy')) {
      return (
        <PhilosophyPage
          cityInfo={cityInfo}
          onOpenEnquiry={() => { setEnquiryProperty(null); setIsEnquiryOpen(true); }}
        />
      );
    }

    if (path.startsWith('/leadership')) {
      return (
        <LeadershipPage
          cityInfo={cityInfo}
          onNavigate={navigate}
        />
      );
    }

    if (path.startsWith('/showcase')) {
      return (
        <ShowcasePage
          cityInfo={cityInfo}
        />
      );
    }

    if (path.startsWith('/who-we-are')) {
      return (
        <WhoWeArePage
          cityInfo={cityInfo}
          onNavigate={navigate}
          onOpenEnquiry={() => { setEnquiryProperty(null); setIsEnquiryOpen(true); }}
        />
      );
    }

    if (path.startsWith('/commercial')) {
      return (
        <CommercialPage
          cityInfo={cityInfo}
          onNavigate={navigate}
        />
      );
    }

    if (path.startsWith('/contracting')) {
      return (
        <ContractingPage
          cityInfo={cityInfo}
          onNavigate={navigate}
        />
      );
    }

    if (path.startsWith('/manufacturing')) {
      return (
        <ManufacturingPage
          cityInfo={cityInfo}
          onNavigate={navigate}
        />
      );
    }

    if (path.startsWith('/what-we-do')) {
      return (
        <WhatWeDoPage
          cityInfo={cityInfo}
          onNavigate={navigate}
          onOpenEnquiry={() => { setEnquiryProperty(null); setIsEnquiryOpen(true); }}
        />
      );
    }

    if (path.startsWith('/careers')) {
      return <CareersPage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/media-centre')) {
      return <MediaCentrePage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/sustainability')) {
      return <SustainabilityPage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/investor-relations')) {
      return <InvestorRelationsPage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/sobha-privilege')) {
      return (
        <SobhaPrivilegePage
          cityInfo={cityInfo}
          onNavigate={navigate}
          onOpenEnquiry={() => { setEnquiryProperty(null); setIsEnquiryOpen(true); }}
        />
      );
    }

    if (path.startsWith('/homebuyers-corner')) {
      return (
        <HomebuyersCornerPage
          cityInfo={cityInfo}
          onNavigate={navigate}
          onOpenEnquiry={() => { setEnquiryProperty(null); setIsEnquiryOpen(true); }}
        />
      );
    }

    if (path.startsWith('/blog') && route.params.blogId) {
      return (
        <BlogDetailPage
          blogId={route.params.blogId}
          blogs={blogs}
          cityInfo={cityInfo}
          onNavigate={navigate}
        />
      );
    }

    if (path.startsWith('/blog')) {
      return <BlogListPage blogs={blogs} cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/emi-calculator')) {
      return <EmiCalculatorPage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/contact')) {
      return <ContactPage cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/privacy-policy')) {
      return <LegalPage type="privacy-policy" cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/terms-and-conditions')) {
      return <LegalPage type="terms-and-conditions" cityInfo={cityInfo} onNavigate={navigate} />;
    }

    if (path.startsWith('/disclaimer')) {
      return <LegalPage type="disclaimer" cityInfo={cityInfo} onNavigate={navigate} />;
    }

    // Default Reviva Homepage
    return (
      <>
        {/* 1. Intro Video Placeholder Hero Section */}
        <IntroVideoPlaceholder onExplore={() => navigate('/properties')} />

        {/* 1.5 Property Search Filter Bar */}
        <PropertySearchBar onNavigate={navigate} />

        {/* 2. PASSION AT WORK Legacy Section */}
        <PassionAtWork onReadMore={() => navigate('/philosophy')} />

        {/* 3. Featured Banner Carousel */}
        <FeaturedCarousel onSelectProject={(link) => navigate(link)} />

        {/* 4. LOCATIONS Section & City Cards Slider */}
        <LocationsSection 
          onNavigateCity={(citySlug) => navigate(`/city/${citySlug}/`)}
          onNavigateProject={(projSlug) => navigate(`/project/${projSlug}/`)}
        />

        {/* 5. WHAT WE DO Portfolio Overview */}
        <WhatWeDoSection onNavigate={navigate} />

        {/* 6. MORE ABOUT REVIVA Legacy Section */}
        <MoreAboutSection />
      </>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0d14', color: '#ffffff' }}>
      
      {/* Header Navbar */}
      <Header 
        onNavigate={navigate}
      />

      {/* Render Active Page Content */}
      {renderCurrentPage()}

      {/* Footer */}
      <Footer 
        onNavigate={navigate}
      />

      {/* Enquiry / Site Visit Modal */}
      {isEnquiryOpen && (
        <EnquiryModal 
          property={enquiryProperty}
          cityName={cityInfo.cityName}
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}

    </div>
  );
}

export default App;
