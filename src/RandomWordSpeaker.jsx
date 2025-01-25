import React, { useEffect } from 'react';
import './RandomWordSpeaker.css';

const RandomWordSpeaker = ({ word }) => {
  useEffect(() => {
    const speakWord = (text) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Your browser doesn't support text-to-speech.");
      }
    };

    if (word) {
      speakWord(word);
    }
  }, [word]);

  return (
    <div className="random-word-container">
      {word && word.length > 2 && (
        <div className="random-word">
          {word.split('').map((letter, index) => {
            if (index === 0 || index === word.length - 1) {
              return (
                <span key={index} className="letter-box highlighted">
                  {letter.toUpperCase()}
                </span>
              );
            } else {
              return (
                <span key={index} className="letter-box hidden-letter">
                  _
                </span>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default RandomWordSpeaker;
