import React from 'react';

export const SuccessIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeDasharray="62.8" strokeDashoffset="62.8">
      <animate attributeName="stroke-dashoffset" from="62.8" to="0" dur="0.5s" fill="freeze" />
    </circle>
    <path d="M9 12l2 2 4-4" strokeDasharray="14" strokeDashoffset="14">
      <animate attributeName="stroke-dashoffset" from="14" to="0" begin="0.5s" dur="0.3s" fill="freeze" />
    </path>
  </svg>
);

export const ErrorIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeDasharray="62.8" strokeDashoffset="62.8">
      <animate attributeName="stroke-dashoffset" from="62.8" to="0" dur="0.5s" fill="freeze" />
    </circle>
    <line x1="9" y1="9" x2="15" y2="15" strokeDasharray="8.49" strokeDashoffset="8.49">
      <animate attributeName="stroke-dashoffset" from="8.49" to="0" begin="0.5s" dur="0.3s" fill="freeze" />
    </line>
    <line x1="15" y1="9" x2="9" y2="15" strokeDasharray="8.49" strokeDashoffset="8.49">
      <animate attributeName="stroke-dashoffset" from="8.49" to="0" begin="0.8s" dur="0.3s" fill="freeze" />
    </line>
  </svg>
);

export const WarningIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeDasharray="48" strokeDashoffset="48">
      <animate attributeName="stroke-dashoffset" from="48" to="0" dur="0.5s" fill="freeze" />
    </path>
    <line x1="12" y1="9" x2="12" y2="13" strokeDasharray="4" strokeDashoffset="4">
      <animate attributeName="stroke-dashoffset" from="4" to="0" begin="0.5s" dur="0.3s" fill="freeze" />
    </line>
    <line x1="12" y1="17" x2="12.01" y2="17" strokeDasharray="0.01" strokeDashoffset="0.01">
      <animate attributeName="stroke-dashoffset" from="0.01" to="0" begin="0.8s" dur="0.1s" fill="freeze" />
    </line>
  </svg>
);

export const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeDasharray="62.8" strokeDashoffset="62.8">
      <animate attributeName="stroke-dashoffset" from="62.8" to="0" dur="0.5s" fill="freeze" />
    </circle>
    <line x1="12" y1="16" x2="12" y2="12" strokeDasharray="4" strokeDashoffset="4">
      <animate attributeName="stroke-dashoffset" from="4" to="0" begin="0.5s" dur="0.3s" fill="freeze" />
    </line>
    <line x1="12" y1="8" x2="12.01" y2="8" strokeDasharray="0.01" strokeDashoffset="0.01">
      <animate attributeName="stroke-dashoffset" from="0.01" to="0" begin="0.8s" dur="0.1s" fill="freeze" />
    </line>
  </svg>
);

export const LoadingIcon: React.FC = () => (
  <svg className="w-6 h-6 text-white animate-spin" viewBox="0 0 50 50" fill="currentColor">
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30);
      const opacity = 1 - i * 0.08;
      return (
        <rect key={i} x="22" y="6" width="6" height="12" rx="3" ry="3" transform={`rotate(${angle} 25 25)`} fill="currentColor" opacity={opacity} />
      );
    })}
  </svg>
);
