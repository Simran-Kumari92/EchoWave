

import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnboarding } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {  MapPinIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import { uploadImage } from "../lib/utils";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
   const [isuploadingprofilepic, setIsUploadingProfilePic] = useState(false);
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

   const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingProfilePic(true);
    const url = await uploadImage(file);
    setFormState({ ...formState, profilePic: url });
    setIsUploadingProfilePic(false);
    toast.success("Profile picture uploaded successfully!");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f0f0f] text-white p-4">
      <div className="border border-[#2a2a2a] flex flex-col w-full max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl shadow-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 text-center mb-8">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                <img
                  src={formState.profilePic || "/user.png"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload from pc */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                  className=" file-input file-input-bordered w-full disabled:opacity-50"
                  disabled={isuploadingprofilepic}
                />
              </div>
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

