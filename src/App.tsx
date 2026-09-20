import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { TrafficAnalysis } from './pages/TrafficAnalysis';
import { ModelPerformance } from './pages/ModelPerformance';
import { DatasetPreprocessing } from './pages/DatasetPreprocessing';
import { ModelTraining } from './pages/ModelTraining';
import { DetectionLogs } from './pages/DetectionLogs';
import { ReportFigures } from './pages/ReportFigures';
import { About } from './pages/About';
import { initialDetectionLogs } from './data/mockData';
import { DetectionLog } from './types/ids';

export function App() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);
  const [logs, setLogs] = useState<DetectionLog[]>(initialDetectionLogs);

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentTab(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleAddLog = (newLog: DetectionLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleNavigate = (tab: string) => {
    window.location.hash = tab;
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on landing page
  if (currentTab === 'home') {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Navbar currentTab={currentTab} onNavigate={handleNavigate} />
        <main className="flex-grow">
          <LandingPage onNavigate={handleNavigate} />
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  // If in SaaS Dashboard mode
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar currentTab={currentTab} onNavigate={handleNavigate} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {(currentTab === 'dashboard' || currentTab === 'fig6') && (
            <Dashboard onNavigate={handleNavigate} mode={currentTab === 'fig6' ? 'fig6' : 'standard'} />
          )}
          {(currentTab === 'dataset' || currentTab === 'fig1') && (
            <DatasetPreprocessing />
          )}
          {(currentTab === 'training' || currentTab === 'fig2') && (
            <ModelTraining />
          )}
          {(currentTab === 'traffic-analysis' || currentTab === 'fig4') && (
            <TrafficAnalysis onNavigate={handleNavigate} onAddLogEntry={handleAddLog} initialMode="normal" />
          )}
          {currentTab === 'fig5' && (
            <TrafficAnalysis onNavigate={handleNavigate} onAddLogEntry={handleAddLog} initialMode="attack" />
          )}
          {(currentTab === 'model' || currentTab === 'fig3') && (
            <ModelPerformance />
          )}
          {currentTab === 'logs' && (
            <DetectionLogs logs={logs} />
          )}
          {currentTab === 'figures' && (
            <ReportFigures />
          )}
          {currentTab === 'about' && (
            <About />
          )}
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
