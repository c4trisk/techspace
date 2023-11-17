import mongoose from "mongoose";
import { VenueDocument } from "./venueSchema";
import { UserDocument } from "./userSchema";

export interface BillingInformation {
  billingAddress: {
    companyName: string
    address: string
  }
  pricing: {
    pricePerHour: number
    cleaningFee?: number
    adminFee: number
  }
  dueDate: Date
}

export interface BookingDocument extends mongoose.Document {
  customerId: UserDocument
  venue: VenueDocument
  date: Date
  startTime: string
  endTime: string
  totalHours: number
  attendees: number
  cateringAdded: boolean
  subTotal: number
  message?: string
  billingInformation: BillingInformation
}

const billingInformationSchema = new mongoose.Schema<BillingInformation>({
  billingAddress: {
    companyName: { type: String, required: true },
    address: { type: String, required: true }
  },
  pricing: {
    pricePerHour: { type: Number, required: true },
    cleaningFee: { type: Number },
    adminFee: { type: Number, default: 49 },
  },
  dueDate: { type: Date }
})

const bookingSchema = new mongoose.Schema<BookingDocument>({
  customerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  venue: { type: mongoose.Types.ObjectId, ref: 'Venue', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  totalHours: { type: Number, required: true },
  attendees: { type: Number, required: true },
  cateringAdded: { type: Boolean, required: true },
  subTotal: { type: Number, required: true },
  message: { type: String },
  billingInformation: billingInformationSchema,
}, { timestamps: true })

bookingSchema.pre('save', function (next) {
  if(!this.billingInformation.dueDate) {
    const bookingDate = this.date as Date
    const dueDate = new Date(bookingDate)
    dueDate.setMonth(dueDate.getMonth() + 1)
    this.billingInformation.dueDate = dueDate
  }
  next()
})

const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema)

export default Booking