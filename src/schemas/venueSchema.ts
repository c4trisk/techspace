import mongoose from "mongoose";
import slugify from "slugify";

export interface VenueDocument extends mongoose.Document {
  venueName: string
  address: string
  location: string
  slug: string
  capacity: number
  squareMeters: number
  description: string
  technicalEquipment: [
    {
      title: string
      description: string
    }
  ]
  amenities: {
    wifi: boolean
    screen: boolean
    accessibility: boolean
    catering: boolean
    breakoutRooms: boolean
  }
  furnitureArrangements: {
    standing: number
    classroom: number
    boardroom: number
    theatre: number
    uShape: number
    dining: number
  }
  thumbnail: string
  images: [string]
  pricingInformation: { 
    pricePerHour: number
    cleaningFee?: number
    adminFee: number 
  }
  ratingCount: number
  ratingAvg: number
  contactInformation: {
    website: string
    contactPerson: {
      name: string
      phone: string
      email: string
    }
  }
}


const venueSchema = new mongoose.Schema<VenueDocument>({
  venueName: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  slug: { type: String},
  capacity: { type: Number, required: true },
  squareMeters: { type: Number, required: true },
  description: { type: String, required: true },
  technicalEquipment: [
    {
      title: { type: String },
      description: { type: String }
    }
  ],
  amenities: {
    wifi: { type: Boolean, required: true },
    screen: { type: Boolean, required: true },
    accessibility: { type: Boolean, required: true },
    catering: { type: Boolean, required: true },
    breakoutRooms: { type: Boolean, required: true }
  },
  furnitureArrangements: {
    standing: { type: Number },
    classroom: { type: Number },
    boardroom: { type: Number },
    theatre: { type: Number },
    uShape: { type: Number },
    dining: { type: Number },
  },
  images: [{ type: String }],
  pricingInformation: {
    pricePerHour: { type: Number, required: true },
    cleaningFee: { type: Number},
    adminFee: { type: Number, default: 49 }
  },
  ratingCount: { type: Number },
  ratingAvg: { type: Number },
  contactInformation: {
    website: { type: String, required: true },
    contactPerson: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
})

venueSchema.pre('save', function (next) {
  this.slug = slugify(this.venueName, { lower: true, remove: /[*+~.()'"!:@]/g })
  next()
})

const Venue = mongoose.model<VenueDocument>('Venue', venueSchema)

export default Venue