// import { useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
// import { completeOnboarding } from "../lib/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { CameraIcon, ShuffleIcon } from "lucide-react";
// import { LANGUAGES } from "../constants";
// import { MapPinIcon } from "lucide-react";


// const OnboardingPage = () => {
//   const { authUser } = useAuthUser();
//   const queryClient = useQueryClient();

//   const [formState, setFormState] = useState({
//     fullName: authUser?.fullName || "",
//     bio: authUser?.bio || "",
//     nativeLanguage: authUser?.nativeLanguage || "",
//     learningLanguage: authUser?.learningLanguage || "",
//     location: authUser?.location || "",
//     profilePic: authUser?.profilePic || "",
//   });

//   const { mutate: onboardingMutation, isPending } = useMutation({
//     mutationFn: completeOnboarding,
//     onSuccess: () => {
//       toast.success("Profile onboarded successfully");
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },

//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onboardingMutation(formState);
//   };

//   const handleRandomAvatar = () => {
//   const randomGender = Math.random() > 0.5 ? "male" : "female";
//   const randomSeed = Date.now(); // or Math.floor(Math.random() * 10000)
//   const randomAvatar = `https://xsgames.co/randomusers/avatar.php?g=${randomGender}&id=${randomSeed}`;

//   setFormState({ ...formState, profilePic: randomAvatar });
//   toast.success("Random profile picture generated!");
// };


//   return (
//     <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
//       <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
//         <div className="card-body p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//             Complete Your Profile
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* PROFILE PIC CONTAINER */}
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="size-32 rounded-full bg-base-300 overflow-hidden">
//                 {formState.profilePic ? (
//                   <img
//                     src={formState.profilePic}
//                     alt="Profile Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <CameraIcon className="size-12 text-base-content opacity-40" />
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={handleRandomAvatar}
//                   className="btn btn-accent"
//                 >
//                   <ShuffleIcon className="size-4 mr-2" />
//                   Generate Random Avatar
//                 </button>
//               </div>
//             </div>

//             {/* FULL NAME */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Full Name</span>
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formState.fullName}
//                 onChange={(e) =>
//                   setFormState({ ...formState, fullName: e.target.value })
//                 }
//                 className="input input-bordered w-full"
//                 placeholder="Your full name"
//               />
//             </div>

//             {/* BIO */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Bio</span>
//               </label>
//               <textarea
//                 name="bio"
//                 value={formState.bio}
//                 onChange={(e) =>
//                   setFormState({ ...formState, bio: e.target.value })
//                 }
//                 className="textarea textarea-bordered h-24"
//                 placeholder="Tell others about yourself and your language learning goals"
//               />
//             </div>

//             {/* LANGUAGES */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* NATIVE LANGUAGE */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Native Language</span>
//                 </label>
//                 <select
//                   name="nativeLanguage"
//                   value={formState.nativeLanguage}
//                   onChange={(e) =>
//                     setFormState({
//                       ...formState,
//                       nativeLanguage: e.target.value,
//                     })
//                   }
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select your native language</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`native-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>
            

//             {/* LEARNING LANGUAGE */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Learning Language</span>
//                 </label>
//                 <select
//                   name="learningLanguage"
//                   value={formState.learningLanguage}
//                   onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select language you're learning</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`learning-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//               {/* LOCATION */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Location</span>
//               </label>
//               <div className="relative">
//                 <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
//                 <input
//                   type="text"
//                   name="location"
//                   value={formState.location}
//                   onChange={(e) => setFormState({ ...formState, location: e.target.value })}
//                   className="input input-bordered w-full pl-10"
//                   placeholder="City, Country"
//                 />
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               className="btn btn-primary w-full mt-4"
//               disabled={isPending}
//             >
//               {isPending ? "Submitting..." : "Complete Onboarding"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingPage;


















import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnboarding } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CameraIcon, ShuffleIcon, MapPinIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const seed = Date.now();
    const avatar = `https://xsgames.co/randomusers/avatar.php?g=${gender}&id=${seed}`;
    setFormState({ ...formState, profilePic: avatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-4">
      <div className="border border-[#2a2a2a] flex flex-col w-full max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 text-center mb-8">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROFILE PIC */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-600">
              {formState.profilePic ? (
                <img src={formState.profilePic} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full bg-[#2a2a2a]">
                  <CameraIcon className="w-10 h-10 text-white/30" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="btn bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white border-none px-4 py-2 rounded-md"
            >
              <ShuffleIcon className="w-4 h-4 mr-2" /> Generate Avatar
            </button>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              value={formState.bio}
              onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* LANGUAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Native Language</label>
              <select
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                className="select bg-[#2a2a2a] border-[#3a3a3a] text-white w-full"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Learning Language</label>
              <select
                value={formState.learningLanguage}
                onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                className="select bg-[#2a2a2a] border-[#3a3a3a] text-white w-full"
              >
                <option value="">Select learning language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm mb-1">Location</label>
            <div className="relative">
              <MapPinIcon className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="pl-10 w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Complete Onboarding"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;

