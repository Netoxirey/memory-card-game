import { BrowserRouter, Routes, Route } from "react-router-dom"
import StartGame from "./pages/StartGame"
import PlayingGame from "./pages/PlayingGame"
import { useState } from "react"
import Results from "./pages/Results"

function App() {
const [winner, setWinner] = useState(false)
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<StartGame/>} />
    <Route path="/playing" element={<PlayingGame setWinner={setWinner}/>}/>
    <Route path="/results" element={<Results winner={winner} setWinner={setWinner}/>}/>
   </Routes> 
   </BrowserRouter>
  )
}

export default App
