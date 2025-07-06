// import { useState } from "react";
// import { ShipWheelIcon } from "lucide-react";
// import { Link } from "react-router-dom";
// import useLogin from "../hooks/useLogin";

// const LoginPage = () => {
//   const [loginData, setLoginData] =  useState({
//     email: "",
//     password: "",
//   });
    
//   // this is how we did it first without using custom hook
//   // const queryClient = useQueryClient();
//   // const {
//   //  mutate: loginMutation, 
//   //  isPending, 
//   //  error,
//   // } = useMutation({
//   //  mutationFn: login,
//   //  onSuccess:()=>queryClient.invalidateQueries({queryKey: ["authUser"]}),
//   // });

//   const {isPending, error, loginMutation} = useLogin();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     loginMutation(loginData);
//   };
  
//   return (
//     <div  className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
//       data-theme="forest">
//         <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
//           {/* LOGIN FORM SECTION */}
//           <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
//             {/* LOGO */}
//           <div className="mb-4 flex items-center justify-start gap-2">
//             <ShipWheelIcon className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//               EchoWave
//             </span>
//           </div>

//            {/* ERROR MESSAGE DISPLAY */}
//           {error && (
//             <div className="alert alert-error mb-4">
//               <span>{error.response.data.message}</span>
//             </div>
//           )}

//           <div className="w-full">
//             <form onSubmit={handleLogin}>
//               <div className="space-y-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">Welcome Back</h2>
//                   <p className="text-sm opacity-70">
//                     Sign in to your account to continue your language journey
//                   </p>
//                 </div>

//                 {/* EMAIL */}
//                 <div className="flex flex-col gap-3">
//                  <div className="form-control w-full space-y-2">
//                     <label className="label">
//                       <span className="label-text">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="hello@example.com"
//                       className="input input-bordered w-full"
//                       value={loginData.email}
//                       onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                       required
//                     />
//                   </div>
                   
//                    {/* PASSWORD */}
//                    <div className="form-control w-full space-y-2">
//                     <label className="label">
//                       <span className="label-text">Password</span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       className="input input-bordered w-full"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                       required
//                     />
//                   </div>

//                    {/* SUBMIT BUTTON */}
//                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
//                     {isPending ? (
//                       <>
//                         <span className="loading loading-spinner loading-xs"></span>
//                         Signing in...
//                       </>
//                     ) : (
//                       "Sign In"
//                     )}
//                   </button>

//                   <div className="text-center mt-4">
//                     <p className="text-sm">
//                       Don't have an account?{" "}
//                       <Link to="/signup" className="text-primary hover:underline">
//                         Sign up
//                       </Link>
//                     </p>
//                   </div>

//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//                 {/* IMAGE SECTION */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
//           <div className="max-w-md p-8">
//             {/* Illustration */}
//             <div className="relative aspect-square max-w-sm mx-auto">
//               <img src="/i.svg" alt="Language connection illustration" className="w-full h-full" />
//             </div>

//             <div className="text-center space-y-3 mt-6">
//               <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
//               <p className="opacity-70">
//                 Practice conversations, make friends, and improve your language skills together
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LoginPage;












import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-4">
      <div className="border border-[#2a2a2a] flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">

        {/* LEFT LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-8">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon className="size-8 text-purple-400" />
            <span className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
              EchoWave
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="w-full bg-[#2a1a3a] text-purple-300 border border-purple-700 px-4 py-2 rounded-md mb-4">
              <span>{error?.response?.data?.message || "Something went wrong."}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-gray-400 mt-1">
                Sign in to continue your language journey!
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="relative hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-[#121212] overflow-hidden">
          {/* Purple blob background */}
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-800 rounded-full blur-[100px] opacity-30 z-0"></div>

          {/* Image and text */}
          <div className="relative z-10 p-10 text-center max-w-sm">
            <img src="/i.svg" alt="language chat" className="w-full h-auto max-w-[350px] md:max-w-[400px] scale-105 rounded-xl" />
            <h2 className="text-xl font-semibold mt-6">Connect with language partners worldwide</h2>
            <p className="text-sm text-gray-400 mt-2">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
