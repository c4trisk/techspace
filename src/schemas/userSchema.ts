import mongoose from "mongoose";
import { VenueDocument } from "./venueSchema";

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model<UserDocument>('User', userSchema)

export default User