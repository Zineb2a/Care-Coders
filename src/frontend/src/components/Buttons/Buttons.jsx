import React, { useState, useRef } from 'react';
import './Buttons.css';

// Import the sound files
import sound1 from './sounds/sound1.mp3';
import sound2 from './sounds/sound2.mp3';
import sound3 from './sounds/sound3.mp3';
import sound4 from './sounds/sound4.mp3';
import sound5 from './sounds/sound5.mp3';
import sound6 from './sounds/sound6.mp3';
import sound7 from './sounds/sound7.mp3';
import sound8 from './sounds/sound8.mp3';
import sound9 from './sounds/sound9.mp3';
import sound10 from './sounds/sound10.mp3';
import sound11 from './sounds/sound11.mp3';
import sound12 from './sounds/sound12.mp3';

const Buttons = () => {
  // Sound data with imported files
  const sounds = [
    { name: 'Nature', file: sound1 },
    { name: 'Piano', file: sound2 },
    { name: 'Rain', file: sound3 },
    { name: 'Bells', file: sound4 },
    { name: 'Fire', file: sound5 },
    { name: 'Meditation', file: sound6 },
    { name: 'Waves', file: sound7 },
    { name: 'Spa', file: sound8 },
    { name: 'Bubbling', file: sound9 },
    { name: 'Chimes', file: sound10 },
    { name: 'Jazz', file: sound11 },
    { name: 'Guitar', file: sound12 },
  ];

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  const handleClick = (index) => {
    // If another sound is playing, pause it
    if (audioRef.current && playing !== null && playing !== index) {
      audioRef.current.pause();
      setPlaying(null);
    }

    // Create a new audio element for the selected sound
    if (playing !== index) {
      const audio = new Audio(sounds[index].file);
      audioRef.current = audio;
      audio.play();
      setPlaying(index);
    } else {
      // Pause the current audio if the same button is clicked
      audioRef.current.pause();
      setPlaying(null);
    }
  };

  return (
    <div className="ButtonsPage">
      <h1 className="header">For Calming Noises Click on the Buttons</h1> 
      <div className="ButtonsCont">
        {sounds.map((sound, index) => (
          <button
            className="button"
            key={index}
            onClick={() => handleClick(index)}
          >
            {sound.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;