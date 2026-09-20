import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">AI-IDS</span>
              <p className="text-xs text-slate-500 font-medium">Intelligent Network Security</p>
            </div>
          </div>

          <div className="text-center md:text-center text-xs text-slate-500 font-medium">
            AI-Based Intrusion Detection System for Network Traffic
          </div>

          <div className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} AI-IDS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
