import React, { useState, useEffect } from "react";
import Moon from "../assets/moon.svg";
import Star from "../assets/star.svg";
import Sun from "../assets/sun.svg";
import Comet from "../assets/comet.svg";

const cardsImages = {
  Comet,
  Moon,
  Star,
  Sun
};

function Card({ card, handleClick, index }) {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (card.flipped) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }
  }, [card.flipped]);

  const classItem = card.flipped ? "is-flipped" : "";
  const clickable = !isFlipping && !card.flipped;

  return (
    <div
      className={`scene scene--card ${clickable ? "clickable" : ""}`}
      onClick={clickable ? () => handleClick(index) : null}
    >
      <div className={`card ${classItem} ${isFlipping ? "flipping" : ""}`}>
        <div className="card__face card__face--front">?</div>
        <div className="card__face card__face--back">
          <img src={cardsImages[card.name]} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
