interface User {
  firstName?: string
  lastName?: string
  email: string
  password: string
}

interface Venue {
  _id: string
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
  images: string[]
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

interface Booking {
  _id: string
  customerId: string
  venue: Venue
  date: Date
  startTime: string
  endTime: string
  totalHours: number
  attendees: number
  cateringAdded: boolean
  subTotal: number
  message?: string
  billingInformation: {
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
}

interface NewBooking {
  venue: string
  date: string
  startTime: string
  endTime: string
  totalHours: number
  attendees: number
  cateringAdded: boolean
  subTotal: number
  message: string
  billingInformation: {
    billingAddress: {
      companyName: string
      address: string
    }
    pricing: {
      pricePerHour: number
      cleaningFee?: number
      adminFee: number
    }
  }
}

interface ContactInquiry {
  email: string
  title: string
  message: string
}

interface AuthErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  repeatPassword?: string
}

export type { User, Venue, Booking, NewBooking, ContactInquiry, AuthErrors }