import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import LoadingBar from "react-top-loading-bar";

const People = (props) =>{
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [progress, setProgress] = useState(0); // Added progress state

  useEffect(() => {
    const fetchCharacters = async () => {
      props.setProgress(10);
      setLoading(true); // Set loading to true when fetching data
      try {
        let response = await fetch(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        props.setProgress(30);
        let data = await response.json();
        props.setProgress(70);
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 characters per page
        setLoading(false); // Set loading to false after fetching data
        props.setProgress(100);
      } catch (error) {
        setLoading(false); // Set loading to false in case of error
        setError(true);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  useEffect(() => {
    // Simulate loading progress while loading is true
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 5
        );
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading]);

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
      {/* Loading bar displayed only when loading is true */}
      {loading && <LoadingBar height={4} color="#fdfbfc" progress={progress} />}

      {loading && <Spinner />} {/* Spinner displayed only when loading is true */}

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
        <div className="modal  ">
          <div className="modal-content bg-info">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedCharacter.name}</h2>
            <p>Height: {selectedCharacter.height} meters</p>
            <p>Mass: {selectedCharacter.mass} kg</p>
            <p>
              Date added to API:{" "}
              {selectedCharacter.created.slice(8, 10)}-
              {selectedCharacter.created.slice(5, 7)}-
              {selectedCharacter.created.slice(0, 4)}
            </p>
            <p>Films: {selectedCharacter.films.length}</p>
            <p>Birth Year: {selectedCharacter.birth_year}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default People;
