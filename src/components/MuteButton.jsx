import { useState, useRef } from "react";
import Mute from "../assets/sound--off.svg";
import Unmute from "../assets/sound--on.svg";
import Background from "../assets/background.mp3";

function MuteButton() {
  const [mute, setMute] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (mute) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setMute(!mute);
  };

  const handleButtonClick = () => {
    toggleAudio();
  };

  const imageSrc = mute ? Mute : Unmute;

  return (
    <div className="w-20 self-end">
      <audio ref={audioRef} src={Background} autoPlay loop muted={mute} />
      <img src={imageSrc} alt={mute ? "Mute" : "Unmute"} onClick={handleButtonClick} />
    </div>
  );
}

export default MuteButton;
