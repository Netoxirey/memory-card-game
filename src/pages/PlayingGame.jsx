import Cards from "../components/Cards"
import MuteButton from "../components/MuteButton"

function PlayingGame({setWinner}) {
  return (
    <div className="2xl:container mx-auto flex flex-col">
        <MuteButton/>
        <Cards setWinner={setWinner}/>
    </div>
  )
}

export default PlayingGame