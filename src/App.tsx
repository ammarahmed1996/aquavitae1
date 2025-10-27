
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SuccessPage from './pages/SuccessPage';
import LegalPage from './pages/LegalPage';
import AgeGateModal from './components/AgeGateModal';
import { LEGAL_PAGES } from './config';

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('age_verified') === 'true';
    setIsAgeVerified(verified);
  }, []);

  const handleAgeVerification = () => {
    localStorage.setItem('age_verified', 'true');
    setIsAgeVerified(true);
  };

  if (!isAgeVerified) {
    return <AgeGateModal onVerify={handleAgeVerification} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        {LEGAL_PAGES.map(page => (
           <Route key={page.path} path={page.path} element={<LegalPage type={page.type} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
