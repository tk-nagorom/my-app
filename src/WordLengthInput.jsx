import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementScore, incrementCorrect, incrementIncorrect, resetScore } from './scoreSlice';
import RandomWordSpeaker from './RandomWordSpeaker';
import './WordLengthInput.css';

// Function to show only the first and last letters, hiding the middle letters
const hideMiddleLetters = (word) => {
  const length = word.length;
  return length <= 2 ? '' : word[0] + "_".repeat(length - 2) + word[length - 1];
};

const WordLengthInput = () => {
  const [length, setLength] = useState('');
  const [randomWord, setRandomWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const correctAnswers = useSelector((state) => state.score.correctAnswers);
  const incorrectAnswers = useSelector((state) => state.score.incorrectAnswers);
  const dispatch = useDispatch();

  const handleInputChange = (e) => setLength(e.target.value);
  const handleWordInputChange = (e) => setUserInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedLength = parseInt(length, 10);
    if (!isNaN(parsedLength) && parsedLength > 0) {
      await fetchRandomWord(parsedLength);
      setFeedback('');
    } else {
      setFeedback('Please enter a valid number.');
    }
  };

  const fetchRandomWord = async (wordLength) => {
    try {
      const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setRandomWord(data[0]);
        setDisplayWord(hideMiddleLetters(data[0])); // Call hideMiddleLetters to set the display word
      }
    } catch (error) {
      console.error('Error fetching the random word:', error);
    }
  };

  const handleWordSubmit = async () => {
    if (userInput.toLowerCase() === randomWord.toLowerCase()) {
      setFeedback('Correct! You typed the word correctly.');
      dispatch(incrementScore());
      dispatch(incrementCorrect());
    } else {
      setFeedback(`Incorrect. The correct word was "${randomWord}".`);
      dispatch(incrementIncorrect());
    }

    setUserInput('');
    setQuestionCount((prevCount) => prevCount + 1);

    if (questionCount + 1 === 10) {
      setShowModal(true); // Show modal after 10 questions
    } else {
      await fetchRandomWord(length); // Fetch a new word for the next question
    }
  };

  const resetGame = async () => {
    dispatch(resetScore());
    setQuestionCount(0);
    setShowModal(false);
    setFeedback('');
    setUserInput('');
    await fetchRandomWord(length);
  };

  const closeModal = () => {
    setShowModal(false);
    resetGame();
  };

  return (
    <div className="word-length-container">
      <h1>Random Words Game</h1>
      <div className="score-display">
        Correct: {correctAnswers} | Incorrect: {incorrectAnswers}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            <input
              type="number"
              value={length}
              onChange={handleInputChange}
              min="1"
              placeholder="Enter number of letters"
              className="word-length-input"
            />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" className="set-word-button">Generate word</button>
        </div>
      </form>

      {randomWord && <RandomWordSpeaker word={randomWord} />}

      {/* Render the word only if its length is more than 2 */}
      {displayWord && randomWord.length > 2 && (
        <div>
          <p className="display-word">{displayWord}</p> {/* Display the modified word */}
        </div>
      )}

      {/* Always display the input field for word typing */}
      <div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleWordInputChange}
            placeholder="Type the word you heard"
            className="word-input"
          />
        </div>
        <div className="button-container">
          <button onClick={handleWordSubmit} className="submit-word-button">Submit</button>
        </div>
      </div>

      {feedback && <div className="feedback-box">{feedback}</div>}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <h2>Score Summary</h2>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Incorrect Answers: {incorrectAnswers}</p>
            <button onClick={resetGame}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordLengthInput;
