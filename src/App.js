import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/navbar';
import LoadingBar from 'react-top-loading-bar'; // Import LoadingBar component
import Spinner from './component/Spinner';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [progress, setProgress] = useState(0); // Define progress state

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCharacters();
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };
  
  return (
    <div>
      <Navbar />
      <LoadingBar
        height={4}
        color="#f11946"
        progress={progress}
      /> {/* Make sure to pass props to LoadingBar component */}
      {loading && <Spinner />}
      {error && <div className='text-white text-center m-5 d-flex flex-column'><img src="./component/error.jpeg" alt=""/><p>Error loading data...</p></div>}
      {!loading && !error && (
        <div className="character-container">
          {characters.map((character, index) => (
            <div

              key={index}
              className="character-card"
              onClick={() => openModal(character)}
            >
              {character.name}
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedCharacter.name}</h2>
            <p>Height: {selectedCharacter.height} meters</p>
            <p>Mass: {selectedCharacter.mass} kg</p>
            <p>Date added to API: {selectedCharacter.created.slice(0, 10)}</p>
            <p>Films: {selectedCharacter.films.length}</p>
            <p>Birth Year: {selectedCharacter.birth_year}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
