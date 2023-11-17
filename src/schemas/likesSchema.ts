import mongoose from 'mongoose'

export interface LikesDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  venue: mongoose.Schema.Types.ObjectId;
}

const likesSchema = new mongoose.Schema<LikesDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
}, { timestamps: true })

const Likes = mongoose.model<LikesDocument>('Likes', likesSchema)

export default Likes