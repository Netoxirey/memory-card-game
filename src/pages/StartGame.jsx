import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function StartGame() {
  return (
    <div className="xl:container mx-auto h-screen flex flex-col justify-center items-center gap-10 max-[90%]:">
      <img src={Logo} alt="an image of three geometric figures" className="w-3/6 animate-slideInDown" />
      <Link className="w-full" to="/playing">
        <button className=" w-full p-5 bg-purple-500 text-white shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl animate-slideInUp text-2xl">
          Start
        </button>
      </Link>
    </div>
  );
}

export default StartGame;
