// import { useState } from "react";
// import { ShipWheelIcon } from "lucide-react";
// import { Link } from "react-router-dom"; 

// const SignUpPage = () => {
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const handleSignup = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
//       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
//         {/* SIGNUP FORM - LEFT SIDE */}
//         <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          
//           {/* LOGO */}
//           <div className="mb-4 flex items-center justify-start gap-2">
//             <ShipWheelIcon className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//               EchoWave
//             </span>
//           </div>

//           {/* FORM */}
//           <div className="w-full">
//             <form onSubmit={handleSignup}>
//               <div className="space-y-4">

//                 {/* HEADING */}
//                 <div>
//                   <h2 className="text-xl font-semibold">Create an Account</h2>
//                   <p className="text-sm opacity-70">
//                     Join EchoWave and start your language learning adventure!
//                   </p>
//                 </div>

//                 <div className="space-y-3">
                  
//                   {/* FULL NAME */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Full Name</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       className="input input-bordered w-full"
//                       value={signupData.fullName}
//                       onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
//                       required
//                     />
//                   </div>

//                   {/* EMAIL */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="john@gmail.com"
//                       className="input input-bordered w-full"
//                       value={signupData.email}
//                       onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                       required
//                     />
//                   </div>

//                   {/* PASSWORD */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Password</span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="********"
//                       className="input input-bordered w-full"
//                       value={signupData.password}
//                       onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                       required
//                     />
//                     <p className="text-xs opacity-70 mt-1">
//                       Password must be at least 6 characters long
//                     </p>
//                   </div>

//                   {/* TERMS */}
//                   <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-2">
//                       <input type="checkbox" className="checkbox checkbox-sm" required />
//                       <span className="text-xs leading-tight">
//                         I agree to the{" "}
//                         <span className="text-primary hover:underline">terms of service</span> and{" "}
//                         <span className="text-primary hover:underline">privacy policy</span>
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* SUBMIT BUTTON */}
//                 <button className="btn btn-primary w-full" type="submit">
//                   Create Account
//                 </button>

//                 {/* LINK TO LOGIN */}
//                 <div className="text-center mt-4">
//                   <p className="text-sm">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-primary hover:underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>

//               </div>
//             </form>
//           </div>
//         </div>

//         {/* SIGNUP FORM - RIGHT SIDE */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
//           <div className="max-w-md p-8">
//             {/* Illustration */}
//             <div className="relative aspect-square max-w-sm mx-auto">
//               <img src="/logo.svg" alt="Language connection illustration" className="w-full h-full" />
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

// export default SignUpPage;
























import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  // This is how we did it first version, without using our custom hook
  // const queryClient = useQueryClient();
  // const { 
  //   mutate:signupMutation, 
  //   isPending, 
  //   error, 
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const {isPending, error, signupMutation} = useSignUp();


  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-4">
      <div className="border border-[#2a2a2a] flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">

        {/* SIGNUP FORM - LEFT FORM SIDE */}
        <div className="w-full lg:w-1/2 p-8">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon className="size-8 text-purple-400" />
            <span className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
              EchoWave
            </span>
          </div>
          
          {/* ERROR MESSAGE IF ANY */}
         {error && (
  <div className="w-full bg-[#2a1a3a] text-purple-300 border border-purple-700 px-4 py-2 rounded-md mb-4">
    <span>{error?.response?.data?.message || "Something went wrong."}</span>
  </div>
)}


          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Create an Account</h2>
              <p className="text-sm text-gray-400 mt-1">
                Join EchoWave and start your language learning adventure!
              </p>
            </div>

            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
             
              <p className="text-xs opacity-70 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 accent-purple-500" required />
              <span className="text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-purple-400 hover:underline cursor-pointer">terms of service</span> and{" "}
                <span className="text-purple-400 hover:underline cursor-pointer">privacy policy</span>.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
            >
              {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT IMAGE SIDE WITH PURPLE BLOB */}
        <div className="relative hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-[#121212] overflow-hidden">
          {/* Purple blob background */}
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-800 rounded-full blur-[100px] opacity-30 z-0"></div>

          {/* Image & Text */}
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

export default SignUpPage;
