import mongoose from "mongoose";
import { VenueDocument } from "./venueSchema";
import { UserDocument } from "./userSchema";

//! Booking ID

export interface ReviewDocument extends mongoose.Document {
  venue: VenueDocument;
  userId: UserDocument;
  review: string;
}

const reviewSchema = new mongoose.Schema<ReviewDocument>({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: { type: String, required: true },
}, { timestamps: true })

const Review = mongoose.model<ReviewDocument>('Review', reviewSchema)

export default Review