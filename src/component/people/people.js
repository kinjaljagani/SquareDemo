import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";

function People() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 characters per page
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCharacters();
  }, [currentPage]);

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      {loading && <Spinner />}
      {error && (
        <div className="text-white text-center m-5 d-flex flex-column">
          <img src="./component/error.jpeg" alt="" />
          <p>Error loading data...</p>
        </div>
      )}
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

      <div className="pagination d-flex justify-content-around m-auto mt-5 w-25 ">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span className="text-white">
          {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={goToNextPage}>
          Next
        </button>
      </div>

      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedCharacter.name}</h2>
            <p>Height: {selectedCharacter.height} meters</p>
            <p>Mass: {selectedCharacter.mass} kg</p>
            <p>Date added to API: {selectedCharacter.created.slice(8, 10)}-{selectedCharacter.created.slice(5, 7)}-{selectedCharacter.created.slice(0, 4)}</p>
            <p>Films: {selectedCharacter.films.length}</p>
            <p>Birth Year: {selectedCharacter.birth_year}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default People;
