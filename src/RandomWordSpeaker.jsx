import React, { useEffect } from 'react';
import './RandomWordSpeaker.css';

const RandomWordSpeaker = ({ word }) => {
  useEffect(() => {
    console.log("Word received:", word);
    if (word && typeof word === 'string' && word.trim().length > 0) {
      const speakWord = (text) => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // Cancel previous speech
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        } else {
          alert("Your browser doesn't support text-to-speech.");
        }
      };
      speakWord(word);
    }
  }, [word]);

  return (
    <div className="random-word-container">
      {word && word.length > 2 && (
        <div className="random-word">
          {word.split('').map((letter, index) => (
            <span
              key={index}
              className={`letter-box ${index === 0 || index === word.length - 1 ? 'highlighted' : 'hidden-letter'}`}
            >
              {index === 0 || index === word.length - 1 ? letter.toUpperCase() : '_'}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomWordSpeaker;
