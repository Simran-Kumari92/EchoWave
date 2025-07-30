import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon  , Search} from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });
  
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
            <img src="/japanese.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/english.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/hindi.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/spanish.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/french.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/german.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/chinese.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/portuguese.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/korean.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/russian.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/arabic.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/italian.png" alt="Connecting People" className="w-8 h-8" />
            <img src="/turkish.png" alt="Connecting People" className="w-8 h-8" />
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