import express from 'express'
import Review from '../schemas/reviewSchema'

export const addReview = async (req: express.Request, res: express.Response) => {
  const { venue, review } = req.body

  const _review = await Review.create({ userId: req.userId, venue, review })

  if(!_review) res.status(500).json({ message: 'Something went wrong when creating review' })

  res.status(201).json(_review)
}

export const getReviewsByVenue = async (req: express.Request, res: express.Response) => {

  const reviews = await Review.find({ venue: req.params.venueId })

  if(!reviews) res.status(500).json({ message: 'Something went wrong when getting reviews' })

  res.status(200).json(reviews)

}