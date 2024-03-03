import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends User, mongoose.Document {}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

const UsersModel = mongoose.model<UserDocument>("User", UserSchema);

export default UsersModel;
