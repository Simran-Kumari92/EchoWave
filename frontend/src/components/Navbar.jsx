import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon  , Search} from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  
  const {logoutMutation} = useLogout()

  return <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-end w-full">
      {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <img
                  src="/live-chat.png" 
                  className="w-8 h-8 "/>
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  EchoWave
                </span>
              </Link>
            </div>
          )}
          {/* Search Bar for users by username */}
          <div className="hidden md:flex items-center gap-2 px-4">
            <Search className="w-7 h-7 text-base-content opacity-70 " />
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered input-sm w-48 focus:outline-none hover:scale-105"
            />
          </div>

          <div className="hidden md:flex items-center gap-8 sm:gap-6 ml-auto">
            <img src="/gloab.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/english.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/german.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/bonjour.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/languages.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/ch.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/portuguese.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/language-exchange.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/letter-b.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/understanding.png" alt="Connecting People" className="w-10 h-10" />
            <img src="/hola.png" alt="Connecting People" className="w-10 h-10" />
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic  || "/user.png"} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
      </div>
    </div>
  </nav>
};

export default Navbar;