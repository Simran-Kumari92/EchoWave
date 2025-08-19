import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon} from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api.js";
import SearchUsers from "./SearchUsers.jsx";
import { useState } from "react";


const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {logoutMutation} = useLogout()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 5000, // every 5 seconds
  });


  const x = friendRequests?.incomingReqs.length || 0;
  const y = friendRequests?.acceptedReqs.length || 0;

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
         <SearchUsers />

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
               {!isLoading && (x + y > 0) && (
                  <span className="badge badge-primary ml-2 -translate-x-8 -translate-y-4">
                    {x + y}
                  </span>
                )}
            </Link>
          </div>
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full hover:scale-105 transition-transform duration-100" 
            onClick={() => setIsModalOpen(true)}
            >
              <img src={authUser?.profilePic  || "/user.png"} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
      </div>
      {/* Modal for user profile */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={authUser?.profilePic || "/user.png"}
            alt="User Avatar Large"
            className="h-100 w-96 rounded-full"
            onClick={(e) => e.stopPropagation()} // prevents closing on image click
          />
        </div>
      )}
    </div>
  </nav>
};

export default Navbar;