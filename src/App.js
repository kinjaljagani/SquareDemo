import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

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
    {loading && <div>Loading...</div>}
    {error && <div>Error loading data</div>}
    {!loading && !error && (
      <div>
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
