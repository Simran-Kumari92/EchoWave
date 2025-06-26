import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  nativeLanguage: {
    type: String,
    default: "",
  },
  learningLanguage: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
}, {timestamps:true}); // automatically adds and updates createdAt and updatedAt fields in MongoDB documents.


//TOOO: Explain this one again (pre hook)
// This complete code below tries to get and hash the password
// It’s a Mongoose middleware called pre-save hook.
// This code automatically hashes the password before saving the user to MongoDB for better security.
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error)
  }
});

// This function checks if the entered login password matches the hashed password in the database.
// this.password - This is the hashed password stored in the database for that user.
// enteredPassword - This is the password the user types during login.
//"Hey Mongoose, please add a new custom function called matchPassword to every User document."
// You can use user.matchPassword(...) anywhere, just like built-in methods

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword , this.password);
  return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema);

export default User;