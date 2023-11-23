import express from 'express'
import Likes from '../schemas/likesSchema'


// Like venue

export const addLike = async (req: express.Request, res: express.Response) => {

  const { user, venue } = req.body

  const like = await Likes.create({ user, venue })

  if(!like) res.status(500).json({ message: 'Something went wrong when creating like' })

  res.status(201).json(like)
}

// Unlike venue

export const removeLike = async (req: express.Request, res: express.Response) => {

  const { user, venue } = req.body
  
  const like = await Likes.findOneAndDelete({ user, venue })
  
  if(!like) res.status(404).json({ message: 'Could not find like' })
  
  res.status(200).json({ removedLikeId: like._id })
}


// Get user's liked venues
export const getLikedVenues = async (req: express.Request, res: express.Response) => {
  
  
  const likes = await Likes.find({ user: req.params.id })
    .populate({ path: 'venue' })

  if(!likes) res.status(404).json({ message: 'Could not find likes' })

  res.status(200).json(likes)
}