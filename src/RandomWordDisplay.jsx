import React, { useEffect } from 'react';

const RandomWordDisplay = ({ word }) => {
  // Function to pronounce the word using the Web Speech API
  const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(utterance);
  };

  // Effect to pronounce the word when it changes
  useEffect(() => {
    if (word) {
      pronounceWord(word);
    }
  }, [word]);

  // Determine how to display the word
  const renderWord = () => {
    if (word.length > 5) {
      return `${word[0]}...${word[word.length - 1]}`;
    }
    return word;
  };

  return (
    <div className="word-display-container">
      <h2>{renderWord()}</h2>
    </div>
  );
};

export default RandomWordDisplay;
