import React, { useState, useEffect } from 'react';
import './BreathingExercisePage.css';

const BreathingExercisePage = () => {
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(true); // To control popup visibility

  useEffect(() => {
    let timeout;
    let interval;

    if (!showDisclaimer) {
      if (breathPhase === 'Inhale') {
        setScale(1.5); // Expand
        setProgress(0); // Reset progress
        interval = animateProgress(4000); // Progress for 4 seconds
        timeout = setTimeout(() => setBreathPhase('Hold'), 4000);
      } else if (breathPhase === 'Hold') {
        setProgress(0); // Reset progress
        interval = animateProgress(7000); // Progress for 7 seconds
        timeout = setTimeout(() => setBreathPhase('Exhale'), 7000);
      } else if (breathPhase === 'Exhale') {
        setScale(1); // Shrink
        setProgress(0); // Reset progress
        interval = animateProgress(8000); // Progress for 8 seconds
        timeout = setTimeout(() => setBreathPhase('Inhale'), 8000);
      }
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [breathPhase, showDisclaimer]);

  const animateProgress = (duration) => {
    const step = 100 / (duration / 50); // Update every 50ms
    return setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, 50);
  };

  return (
    <div className="breathing-container">
      {showDisclaimer && (
        <div className="disclaimer-popup">
          <p className="disclaimer-text">
            DISCLAIMER: Please consult your doctor or medical provider to ensure breathwork is suitable for you. Breathing exercises may present a risk of harm for people with certain medical and/or neurological conditions including epilepsy, cardiovascular issues, anxiety and PTSD, or people who are pregnant.
          </p>
          <button
            className="disclaimer-button"
            onClick={() => setShowDisclaimer(false)}
          >
            I Understand
          </button>
        </div>
      )}
      {!showDisclaimer && (
        <>
          <div className="progress-ring">
            <svg className="circle-svg">
              <circle
                className="progress-background"
                cx="100"
                cy="100"
                r="90"
              ></circle>
              <circle
                className="progress-circle"
                cx="100"
                cy="100"
                r="90"
                style={{ strokeDashoffset: 565 - (progress / 100) * 565 }}
              ></circle>
            </svg>
            <div className="circle" style={{ transform: `scale(${scale})` }}></div>
          </div>
          <h1 className="breath-phase">{breathPhase}</h1>
          <p className="instructions">
            Follow the breathing pattern: Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds.
          </p>
        </>
      )}
    </div>
  );
};

export default BreathingExercisePage;
