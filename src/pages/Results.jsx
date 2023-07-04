import { Link } from "react-router-dom"

function Results({winner, setWinner}) {
  return (
    <div className="container h-screen mx-auto flex flex-col justify-center items-center">
        {winner? <h3 className="text-9xl">You did it</h3> : <h3 className="text-9xl">Oops you didn’t find them all </h3>}
        <Link className="w-full mt-5" to="/playing"><button className="w-full p-5 bg-purple-500 text-white shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl animate-slideInUp text-2xl" onClick={() => setWinner(false)}>Play again</button></Link>
    </div>
  )
}

export default Results