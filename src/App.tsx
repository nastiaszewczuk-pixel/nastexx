import React from 'react';
import { BrutalistPortfolio } from './components/BrutalistPortfolio';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="w-full min-h-screen bg-[#001489]">
        <BrutalistPortfolio />
      </div>
    </ErrorBoundary>
  );
}
