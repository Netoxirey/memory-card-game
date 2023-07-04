import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import matchSound from "../assets/correct.mp3";
import errorSound from "../assets/incorrect.mp3";
import tickingSound from "../assets/ticking.mp3";

function Cards({ setWinner }) {
  const [cards, setCards] = useState([
    { id: 0, name: "Star", status: "", flipped: false },
    { id: 0, name: "Star", status: "", flipped: false },
    { id: 1, name: "Moon", status: "", flipped: false },
    { id: 1, name: "Moon", status: "", flipped: false },
    { id: 2, name: "Sun", status: "", flipped: false },
    { id: 2, name: "Sun", status: "", flipped: false },
    { id: 3, name: "Comet", status: "", flipped: false },
    { id: 3, name: "Comet", status: "", flipped: false },
  ].sort(() => Math.random() - Math.random()));

  const [prevCardIndex, setPrevCardIndex] = useState(-1);
  const [disableCards, setDisableCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [matches, setMatches] = useState(0);
  const tickingSoundRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkForMatch();
  }, [cards]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          tickingSoundRef.current.pause();
          tickingSoundRef.current.currentTime = 0;
          endGame();
          return prevTimer;
        }
        if (prevTimer === 10) {
          tickingSoundRef.current.play();
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkForMatch = () => {
    const flippedCards = cards.filter((card) => card.flipped && card.status !== "correct");
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.id === secondCard.id) {
        playSound(matchSound);
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, status: "correct" }
                : card
            )
          );
          setPrevCardIndex(-1);
          setShowModal(true);
          setMessage("Nice! It's a match");
          setDisableCards(true);
          setMatches((prevMatches) => prevMatches + 1);
          setTimeout(() => {
            setShowModal(false);
            setDisableCards(false);
            if (matches === 3) {
              navigate("/results");
              setWinner(true);
            }
          }, 1000);
        }, 500);
      } else {
        playSound(errorSound);
        setDisableCards(true);
        setShowModal(true);
        setMessage("Sorry, but this is not a match");
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.flipped && card.status !== "correct"
                ? { ...card, flipped: false }
                : card
            )
          );
          setPrevCardIndex(-1);
          setDisableCards(false);
          setShowModal(false);
        }, 1000);
      }
    }
  };

  const handleClick = (index) => {
    if (!disableCards && !cards[index].flipped && cards[index].status !== "correct") {
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === index ? { ...card, flipped: true } : card
        )
      );
      if (prevCardIndex === -1) {
        setPrevCardIndex(index);
      } else {
        setPrevCardIndex(-1);
      }
    }
  };

  const playSound = (sound, loop = false) => {
    const audio = new Audio(sound);
    audio.loop = loop;
    audio.play();
  };

  const endGame = () => {
    setDisableCards(true);
    setShowModal(true);
    setMessage("Time's up!");
    setTimeout(() => {
      navigate("/results");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-5 gap-4 relative">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          handleClick={() => handleClick(index)}
          disable={disableCards}
        />
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{message}</h2>
          </div>
        </div>
      )}
      <div className="bg-purple-500 p-3 text-white text-2xl">Time left: {timer}s</div>
      <audio ref={tickingSoundRef} src={tickingSound} loop />
    </div>
  );
}

export default Cards;
